import requests
import re
import json
import os
import time
import argparse
import sys
from datetime import datetime

# Configuration
DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')
CATALOG_FILE = os.path.join(DATA_DIR, 'items-catalog-new.json')
ZIP_MASTER_FILE = os.path.join(DATA_DIR, 'zip-codes-master.json')
OUTPUT_FILE = os.path.join(DATA_DIR, 'pricing_output.json')

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {msg}")
    sys.stdout.flush()

def get_session():
    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0'})
    return session

def get_csrf(session):
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point')
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        token = csrf_match.group(1) if csrf_match else None
        if token:
            log("CSRF Token successfully acquired.")
        else:
            log("Failed to extract CSRF token.")
        return token
    except Exception as e:
        log(f"Exception getting CSRF: {e}")
        return None

def load_catalog():
    if not os.path.exists(CATALOG_FILE):
        log(f"Catalog file not found at {CATALOG_FILE}. Run extract_catalog.py first.")
        sys.exit(1)
    with open(CATALOG_FILE) as f:
        return json.load(f)

def load_zips():
    if not os.path.exists(ZIP_MASTER_FILE):
        log(f"Zip master file not found at {ZIP_MASTER_FILE}.")
        sys.exit(1)
    with open(ZIP_MASTER_FILE) as f:
        zip_master = json.load(f)
    
    # Flatten recursively
    def find_zips(obj):
        found = []
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == 'zipCodes' and isinstance(v, list):
                    found.extend(v)
                else:
                    found.extend(find_zips(v))
        return found
    
    zips = find_zips(zip_master)
    log(f"Loaded {len(zips)} zip codes from master file.")
    return sorted(list(set(zips))) # Dedup and sort

def save_checkpoint(data):
    # Atomic write to prevent corruption
    temp_file = OUTPUT_FILE + '.tmp'
    try:
        with open(temp_file, 'w') as f:
            json.dump(data, f, indent=2)
        os.replace(temp_file, OUTPUT_FILE)
    except Exception as e:
        log(f"Failed to save checkpoint: {e}")

def main():
    parser = argparse.ArgumentParser(description="Extract pricing data for goloadup.com")
    parser.add_argument('--resume', action='store_true', help="Resume from last checkpoint in output file")
    args = parser.parse_args()

    session = get_session()
    csrf_token = get_csrf(session)
    if not csrf_token:
        return

    headers = {'x-csrf-token': csrf_token, 'content-type': 'application/json'}
    api_url = 'https://order.goloadup.com/retail/graphql'

    # 1. Setup Data
    catalog = load_catalog()
    # Find Standard Item (Mattress)
    target_item = next((i for i in catalog if 'Mattress' in i.get('name', '')), None)
    if not target_item:
        target_item = catalog[0] # Fallback
    target_id = str(target_item['id'])
    log(f"Targeting Item: {target_item['name']} (ID: {target_id})")

    all_zips = load_zips()

    # 2. Resume Logic
    results = {}
    if args.resume and os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE) as f:
                results = json.load(f)
            log(f"Resumed session. Loaded {len(results)} existing records.")
        except json.JSONDecodeError:
            log("Output file corrupted or empty. Starting fresh.")

    # Filter out completed zips
    zips_to_process = [z for z in all_zips if z not in results]
    log(f"Queued {len(zips_to_process)} zip codes to process.")

    if not zips_to_process:
        log("All zip codes processed. Exiting.")
        return

    # 3. Extraction Loop
    success_count = 0
    error_count = 0
    save_interval = 20 # Save every 20 requests

    log("Starting extraction...")
    
    for i, zip_val in enumerate(zips_to_process):
        
        # Inline Query Construction (Proven to work)
        # Using keys without quotes for arguments where possible, but JSON strings require quotes.
        # Structure: {zip: "30301", items: [{id: "ITEM_ID", pickupCount: 1}]}
        arg_str = f'{{zip: "{zip_val}", items: [{{id: "{target_id}", pickupCount: 1}}]}}'
        
        query_str = f"""
        query {{
            pricingDetails(inputs: {arg_str}) {{
                total
                basePrice
            }}
        }}
        """
        
        try:
            resp = session.post(api_url, json={'query': query_str}, headers=headers)
            
            if resp.status_code == 200:
                data = resp.json()
                if 'data' in data and data['data']:
                    pricing = data['data']['pricingDetails']
                    results[zip_val] = pricing
                    success_count += 1
                else:
                    error_count += 1
                    # Optional: Log specific errors for first few failures
                    if error_count <= 5:
                        log(f"API Error for {zip_val}: {json.dumps(data)}")
            else:
                 error_count += 1
                 log(f"HTTP Error {resp.status_code} for {zip_val}")
        
        except Exception as e:
            error_count += 1
            log(f"Exception for {zip_val}: {e}")

        # Progress Reporting
        count = i + 1
        if count % 10 == 0:
            log(f"Progress: {count}/{len(zips_to_process)} | Scraped: {success_count} | Errors: {error_count}")

        # Checkpoint Save
        if count % save_interval == 0:
            save_checkpoint(results)
            
        # Mild rate limiting
        time.sleep(0.1)

    # Final Save
    save_checkpoint(results)
    log(f"Completed. saved {len(results)} records to {OUTPUT_FILE}.")

if __name__ == "__main__":
    main()
