import requests
import re
import json
import os
import time
import argparse
import sys
import sqlite3
import threading
import random
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configuration
DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')
CATALOG_FILE = os.path.join(DATA_DIR, 'items-catalog-new.json')
DB_FILE = os.path.join(DATA_DIR, 'goloadup.db')

thread_local = threading.local()
print_lock = threading.Lock()
db_lock = threading.Lock()

# User Agents Pool
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
]

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with print_lock:
        print(f"[{timestamp}] {msg}")
        sys.stdout.flush()

def get_session():
    if not hasattr(thread_local, "session"):
        thread_local.session = requests.Session()
        # Pick a random UA for this thread/session
        ua = random.choice(USER_AGENTS)
        thread_local.session.headers.update({
            'User-Agent': ua
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
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS pricing (
            zip_code TEXT,
            item_id TEXT,
            item_name TEXT,
            total REAL,
            base_price REAL,
            data_json TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (zip_code, item_id)
        )
    ''')
    # Migration: Check if item_name exists, if not add it
    try:
        c.execute("SELECT item_name FROM pricing LIMIT 1")
    except sqlite3.OperationalError:
        c.execute("ALTER TABLE pricing ADD COLUMN item_name TEXT")
    
    conn.commit()
    conn.close()

def get_processed_zip_items():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    try:
        c.execute("SELECT zip_code, item_id FROM pricing")
        rows = c.fetchall()
        return set(f"{r[0]}|{r[1]}" for r in rows)
    except sqlite3.OperationalError:
        return set()
    finally:
        conn.close()

def save_result(zip_code, item_id, item_name, pricing_data):
    with db_lock:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''
            INSERT OR REPLACE INTO pricing (zip_code, item_id, item_name, total, base_price, data_json)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            zip_code, 
            item_id, 
            item_name,
            pricing_data.get('total'), 
            pricing_data.get('basePrice'), 
            json.dumps(pricing_data)
        ))
        conn.commit()
        conn.close()

def process_single_task(zip_code, item_id, item_name, qty=1):
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
        # 10% chance to rotate UA mid-session to avoid looking too static if it's a long running thread
        if random.random() < 0.1:
             session.headers.update({'User-Agent': random.choice(USER_AGENTS)})

        resp = session.post(api_url, json={'query': query_str}, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if 'data' in data and data['data'] and data['data']['pricingDetails']:
                pricing = data['data']['pricingDetails']
                pricing['quantity_requested'] = qty
                save_result(zip_code, item_id, item_name, pricing)
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
    parser.add_argument('--items', type=str, default="Mattress", help='List of items, e.g. "Mattress,Bag of Junk:5"')
    parser.add_argument('--zip-file', type=str, required=True, help='Path to shard JSON file containing zips')
    args = parser.parse_args()

    # Init
    log("Initializing Database...")
    init_db()
    
    # Load Data
    with open(CATALOG_FILE) as f:
        catalog = json.load(f)
    
    # Parse Target Items
    target_args = [x.strip() for x in args.items.split(',')]
    targets = []
    
    for arg in target_args:
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

    # Load Zips from Shard File
    log(f"Loading zips from file: {args.zip_file}")
    with open(args.zip_file) as f:
        all_zips = json.load(f)

    log(f"Total Zips in Shard: {len(all_zips)}")
    
    # Build Task List
    tasks = [] 
    
    if args.resume:
        processed_set = get_processed_zip_items()
        log(f"Found {len(processed_set)} existing records in DB.")
        for z in all_zips:
            for t in targets:
                key = f"{z}|{t['id']}"
                if key not in processed_set:
                    tasks.append((z, t['id'], t['name'], t['qty']))
    else:
        for z in all_zips:
            for t in targets:
                tasks.append((z, t['id'], t['name'], t['qty']))
                
    log(f"Remaining Tasks to Run: {len(tasks)}")

    if not tasks:
        log("No tasks to process. Exiting.")
        return

    log(f"Starting extraction with {args.workers} workers...")
    
    processed_count = 0
    errors_count = 0
    total = len(tasks)
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        future_to_task = {executor.submit(process_single_task, z, tid, tname, q): (z, tid) for (z, tid, tname, q) in tasks}
        
        for future in as_completed(future_to_task):
            (z, tid) = future_to_task[future]
            try:
                success, msg = future.result()
                if success:
                    processed_count += 1
                else:
                    errors_count += 1
                    if errors_count <= 20: 
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
