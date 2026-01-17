import requests
import re
import json
import os
import time
import argparse
import sys
import sqlite3
import threading
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configuration
DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')
CATALOG_FILE = os.path.join(DATA_DIR, 'items-catalog-new.json')
ZIP_MASTER_FILE = os.path.join(DATA_DIR, 'zip-codes-master.json')
DB_FILE = os.path.join(DATA_DIR, 'goloadup.db')

# Thread-local storage for sessions to avoid sharing non-thread-safe objects
thread_local = threading.local()
print_lock = threading.Lock()
db_lock = threading.Lock()

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with print_lock:
        print(f"[{timestamp}] {msg}")
        sys.stdout.flush()

def get_session():
    if not hasattr(thread_local, "session"):
        thread_local.session = requests.Session()
        thread_local.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    return thread_local.session

def get_csrf(session):
    # Only needed once per session really, or refreshed if expired.
    # We will try to get it.
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point', timeout=10)
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        token = csrf_match.group(1) if csrf_match else None
        return token
    except Exception as e:
        log(f"Error getting CSRF: {e}")
        return None

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS pricing (
            zip_code TEXT PRIMARY KEY,
            item_id TEXT,
            total REAL,
            base_price REAL,
            data_json TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def get_processed_zips():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT zip_code FROM pricing")
    rows = c.fetchall()
    conn.close()
    return set(r[0] for r in rows)

def save_result(zip_code, item_id, pricing_data):
    # Atomic save
    with db_lock:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''
            INSERT OR REPLACE INTO pricing (zip_code, item_id, total, base_price, data_json)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            zip_code, 
            item_id, 
            pricing_data.get('total'), 
            pricing_data.get('basePrice'), 
            json.dumps(pricing_data)
        ))
        conn.commit()
        conn.close()

def load_zips():
    with open(ZIP_MASTER_FILE) as f:
        zip_master = json.load(f)
    
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
    return sorted(list(set(zips)))

def process_single_zip(zip_code, target_id):
    session = get_session()
    
    # Ensure CSRF
    if not hasattr(thread_local, "csrf_token"):
        thread_local.csrf_token = get_csrf(session)
        if not thread_local.csrf_token:
            return False, "CSRF Failed"

    headers = {
        'x-csrf-token': thread_local.csrf_token,
        'content-type': 'application/json'
    }
    api_url = 'https://order.goloadup.com/retail/graphql'

    # Inline arg query
    arg_str = f'{{zip: "{zip_code}", items: [{{id: "{target_id}", pickupCount: 1}}]}}'
    query_str = f"""
    query {{
        pricingDetails(inputs: {arg_str}) {{
            total
            basePrice
        }}
    }}
    """
    
    try:
        resp = session.post(api_url, json={'query': query_str}, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if 'data' in data and data['data'] and data['data']['pricingDetails']:
                pricing = data['data']['pricingDetails']
                save_result(zip_code, target_id, pricing)
                return True, "Saved"
            else:
                return False, f"API Error: {json.dumps(data)}"
        elif resp.status_code == 429:
            time.sleep(5) # Backoff
            return False, "429 Rate Limit"
        else:
            return False, f"HTTP {resp.status_code}"
    except Exception as e:
        return False, f"Exception: {e}"

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--workers', type=int, default=5, help='Number of concurrent workers')
    parser.add_argument('--resume', action='store_true', help='Skip already extracted zips')
    args = parser.parse_args()

    # Init
    log("Initializing Database...")
    init_db()
    
    # Load Data
    with open(CATALOG_FILE) as f:
        catalog = json.load(f)
    target_item = next((i for i in catalog if 'Mattress' in i.get('name', '')), catalog[0])
    target_id = str(target_item['id'])
    
    all_zips = load_zips()
    log(f"Total Zips in Master List: {len(all_zips)}")
    
    # Filter
    if args.resume:
        processed = get_processed_zips()
        zips_to_process = [z for z in all_zips if z not in processed]
        log(f"Skipping {len(processed)} items. {len(zips_to_process)} remaining.")
    else:
        zips_to_process = all_zips
        
    if not zips_to_process:
        log("No zip codes to process.")
        return

    log(f"Starting extraction with {args.workers} workers...")
    
    processed_count = 0
    errors_count = 0
    total = len(zips_to_process)
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        future_to_zip = {executor.submit(process_single_zip, z, target_id): z for z in zips_to_process}
        
        for future in as_completed(future_to_zip):
            zip_val = future_to_zip[future]
            try:
                success, msg = future.result()
                if success:
                    processed_count += 1
                else:
                    errors_count += 1
                    if errors_count <= 5:
                        log(f"Failed {zip_val}: {msg}")
            except Exception as e:
                errors_count += 1
                log(f"Worker Error {zip_val}: {e}")
            
            completed = processed_count + errors_count
            if completed % 10 == 0:
                log(f"Progress: {completed}/{total} | Success: {processed_count} | Errors: {errors_count}")

            # Sleep slightly to avoid purely hammering the exact same CPU slice if running locally
            # But mostly network bound.
            
    log("Extraction Complete.")

if __name__ == "__main__":
    main()
