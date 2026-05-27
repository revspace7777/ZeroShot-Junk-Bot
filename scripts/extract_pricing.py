import requests
import re
import json
import os
import time
import argparse
import sys
import psycopg2
import threading
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configuration
DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')
CATALOG_FILE = os.path.join(DATA_DIR, 'items-catalog-new.json')
ZIP_MASTER_FILE = os.path.join(DATA_DIR, 'zip-codes-master.json')
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://odoo:odoo19pass@127.0.0.1:5432/revspace_zero1")

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
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point', timeout=10)
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        token = csrf_match.group(1) if csrf_match else None
        return token
    except Exception as e:
        log(f"Error getting CSRF: {e}")
        return None

def init_db():
    conn = psycopg2.connect(DATABASE_URL)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS pricing (
            zip_code TEXT,
            item_id TEXT,
            total REAL,
            base_price REAL,
            data_json TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (zip_code, item_id)
        )
    ''')
    conn.commit()
    conn.close()

def get_processed_zip_items():
    conn = psycopg2.connect(DATABASE_URL)
    c = conn.cursor()
    c.execute("SELECT zip_code, item_id FROM pricing")
    rows = c.fetchall()
    conn.close()
    # Return set of "zip|item_id" strings for easy lookup
    return set(f"{r[0]}|{r[1]}" for r in rows)

def save_result(zip_code, item_id, pricing_data):
    # Atomic save
    with db_lock:
        conn = psycopg2.connect(DATABASE_URL)
        c = conn.cursor()
        c.execute('''
            INSERT INTO pricing (zip_code, item_id, total, base_price, data_json)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (zip_code, item_id) DO UPDATE SET
                total = EXCLUDED.total,
                base_price = EXCLUDED.base_price,
                data_json = EXCLUDED.data_json,
                updated_at = CURRENT_TIMESTAMP
        ''', (
            zip_code, 
            item_id, 
            pricing_data.get('total'), 
            pricing_data.get('basePrice'), 
            json.dumps(pricing_data)
        ))
        conn.commit()
        conn.close()

SERVICEABLE_FILE = os.path.join(DATA_DIR, 'serviceable_zips.json')

def load_zips(target_states=None):
    # 1. Load Master (for State info)
    with open(ZIP_MASTER_FILE) as f:
        zip_master = json.load(f)
    
    candidates = []
    # Structure is {"AL": {"zipCodes": [...]}, "GA": ...}
    for state, data in zip_master.items():
        if target_states:
            if state.upper() in target_states:
                candidates.extend(data.get("zipCodes", []))
        else:
            candidates.extend(data.get("zipCodes", []))
    
    # 2. Filter by Serviceable List (if exists)
    if os.path.exists(SERVICEABLE_FILE):
        log(f"Loading serviceable allowlist from {os.path.basename(SERVICEABLE_FILE)}...")
        with open(SERVICEABLE_FILE) as f:
            serviceable = set(json.load(f))
        
        # Intersect
        final_list = [z for z in candidates if z in serviceable]
        log(f"Filtered {len(candidates)} zips down to {len(final_list)} serviceable zips.")
        return sorted(final_list)
    else:
        log("No serviceable whitelist found. Using all candidates.")
        return sorted(list(set(candidates)))

def process_single_task(zip_code, item_id, qty=1):
    session = get_session()
    
    if not hasattr(thread_local, "csrf_token"):
        thread_local.csrf_token = get_csrf(session)
        if not thread_local.csrf_token:
            return False, "CSRF Failed"

    headers = {
        'x-csrf-token': thread_local.csrf_token,
        'content-type': 'application/json'
    }
    api_url = 'https://order.goloadup.com/retail/graphql'

    arg_str = f'{{zip: "{zip_code}", items: [{{id: "{item_id}", pickupCount: {qty}}}]}}'
    
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
                # Store quantity context in the JSON blob if needed, but DB key is (zip, item_id).
                # If we run same item with diff quantity, it might overwrite.
                # For this specific "Bag of Trash:5" run, that's fine.
                pricing['quantity_requested'] = qty
                save_result(zip_code, item_id, pricing)
                return True, "Saved"
            else:
                return False, f"API Error: {json.dumps(data)}"
        elif resp.status_code == 429:
            time.sleep(5) 
            return False, "429 Rate Limit"
        else:
            return False, f"HTTP {resp.status_code}"
    except Exception as e:
        return False, f"Exception: {e}"

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--workers', type=int, default=5, help='Number of concurrent workers')
    parser.add_argument('--resume', action='store_true', help='Skip already extracted zip+item combinations')
    parser.add_argument('--items', type=str, default="Mattress", help='List of items, optionally with quantity e.g. "Mattress,Bag of Trash:5"')
    parser.add_argument('--states', type=str, default="ALL", help='Comma-separated state codes (e.g. GA,FL,TX) or ALL')
    parser.add_argument('--zip-file', type=str, help='Path to specific JSON file containing list of zips to process (Overrides --states)')
    args = parser.parse_args()

    # Init
    log("Initializing Database...")
    init_db()
    
    # Load Data
    with open(CATALOG_FILE) as f:
        catalog = json.load(f)
    
    # Parse Target Items
    if args.items.upper() == "ALL":
        log("Targeting ALL items in catalog.")
        targets = [{'name': i['name'], 'id': str(i['id']), 'qty': 1} for i in catalog]
    else:
        target_args = [x.strip() for x in args.items.split(',')]
        targets = []
        
        for arg in target_args:
            # Check for qty split "Item Name:5"
            parts = arg.split(':')
            name = parts[0]
            qty = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 1
            
            item = next((i for i in catalog if name.lower() in i.get('name', '').lower()), None)
            if item:
                targets.append({'name': item['name'], 'id': str(item['id']), 'qty': qty})
                log(f"Target Added: {item['name']} (ID: {item['id']}, Qty: {qty})")
            else:
                log(f"Warning: Item '{name}' matches no specific item.")

    if not targets:
        log("No valid targets found. Exiting.")
        return

    # Load Zips
    if args.zip_file:
        log(f"Loading zips from file: {args.zip_file}")
        with open(args.zip_file) as f:
            all_zips = json.load(f)
    else:
        # Parse States
        target_states = None
        if args.states.upper() != "ALL":
            target_states = [s.strip().upper() for s in args.states.split(',')]
            log(f"Filtering for states: {target_states}")
        else:
            log("Loading ALL states.")
        all_zips = load_zips(target_states)

    log(f"Total Zips to Process: {len(all_zips)}")
    
    # Build Task List: (zip, item_id, qty)
    tasks = [] 
    
    if args.resume:
        processed_set = get_processed_zip_items()
        log(f"Found {len(processed_set)} existing records.")
        for z in all_zips:
            for t in targets:
                key = f"{z}|{t['id']}"
                if key not in processed_set:
                    tasks.append((z, t['id'], t['qty']))
    else:
        for z in all_zips:
            for t in targets:
                tasks.append((z, t['id'], t['qty']))
                
    log(f"Total Tasks (Zip x Items): {len(tasks)}")

    if not tasks:
        log("No tasks to process. Exiting.")
        return

    log(f"Starting extraction with {args.workers} workers...")
    
    processed_count = 0
    errors_count = 0
    total = len(tasks)
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        # Map future -> task info
        future_to_task = {executor.submit(process_single_task, z, tid, q): (z, tid) for (z, tid, q) in tasks}
        
        for future in as_completed(future_to_task):
            (z, tid) = future_to_task[future]
            try:
                success, msg = future.result()
                if success:
                    processed_count += 1
                else:
                    errors_count += 1
                    if errors_count <= 5:
                        log(f"Failed {z}|{tid}: {msg}")
            except Exception as e:
                errors_count += 1
                log(f"Worker Error {z}: {e}")
            
            completed = processed_count + errors_count
            if completed % 50 == 0:
                log(f"Progress: {completed}/{total} | Success: {processed_count} | Errors: {errors_count}")
            
    log("Extraction Complete.")

if __name__ == "__main__":
    main()
