import requests
import json
import os
import argparse
import time
import re
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')
ZIP_MASTER_FILE = os.path.join(DATA_DIR, 'zip-codes-master.json')
SERVICEABLE_FILE = os.path.join(DATA_DIR, 'serviceable_zips.json')

thread_local = threading.local()
print_lock = threading.Lock()

def log(msg):
    with print_lock:
        print(msg)

def get_session():
    if not hasattr(thread_local, "session"):
        thread_local.session = requests.Session()
        thread_local.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    return thread_local.session

def get_csrf(session):
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point', timeout=10)
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        token = csrf_match.group(1) if csrf_match else None
        return token
    except:
        return None

def check_zip(zip_code):
    session = get_session()
    
    if not hasattr(thread_local, "csrf_token"):
        thread_local.csrf_token = get_csrf(session)
    
    headers = {
        'x-csrf-token': thread_local.csrf_token,
        'content-type': 'application/json'
    }
    
    # Simple boolean query
    # Note: We need to see WHAT this returns. Usually boolean or status.
    # From schema name 'serviceAvailability', it implies a check.
    # Let's request 'status' or similar. 
    # Wait, we need to know the fields of the RETURN type.
    # Blind guess: 'available' or 'status'. 
    # Better strategy: Run one check with introspection of fields first? 
    # Or just try 'isAvailable'. 
    
    # Actually, let's try a safe generic query that might work based on common naming
    # or just use pricingDetails but catch the specific error code faster?
    # NO, we want to optimize.
    
    # Let's assume standard field is 'isAvailable' or just check if it returns data vs error.
    # Introspection output didn't show fields of the RETURN type.
    # However, usually there's a boolean.
    
    query = f"""
    query {{
        serviceAvailability(inputs: {{zip: "{zip_code}"}}) {{
            validZip
            zip
        }}
    }}
    """
    
    try:
        resp = session.post('https://order.goloadup.com/retail/graphql', json={'query': query}, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if 'data' in data and data['data'] and data['data']['serviceAvailability']:
                result = data['data']['serviceAvailability']
                is_valid = result.get('validZip', False)
                return is_valid, "Valid" if is_valid else "Invalid"
            
            return False, "No Data"
            
        return False, f"HTTP {resp.status_code}"
    except Exception as e:
        return False, str(e)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--workers', type=int, default=10)
    args = parser.parse_args()
    
    # 1. Load Zips
    with open(ZIP_MASTER_FILE) as f:
        master = json.load(f)
        
    all_zips = []
    for state, data in master.items():
        all_zips.extend(data['zipCodes'])
        
    log(f"Checking {len(all_zips)} zip codes...")
    
    # 2. Probe one to see structure
    log("Probing API structure...")
    # ... (Actually, let's just run it, the check_zip logic handles errors)
    
    # 3. Filter
    valid_zips = []
    processed = 0
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        future_to_zip = {executor.submit(check_zip, z): z for z in all_zips}
        
        for future in as_completed(future_to_zip):
            z = future_to_zip[future]
            processed += 1
            try:
                is_valid, msg = future.result()
                if is_valid:
                    # Check if msg is explicitly False if it's a boolean return
                    if msg is False:
                         pass
                    else:
                        valid_zips.append(z)
                        if len(valid_zips) % 100 == 0:
                            log(f"Found {len(valid_zips)} valid zips so far...")
            except:
                pass
                
            if processed % 1000 == 0:
                log(f"Processed {processed}/{len(all_zips)}")
                
    log(f"Finished! Found {len(valid_zips)} valid zip codes.")
    
    # Save
    with open(SERVICEABLE_FILE, 'w') as f:
        json.dump(valid_zips, f)
        
if __name__ == "__main__":
    main()
