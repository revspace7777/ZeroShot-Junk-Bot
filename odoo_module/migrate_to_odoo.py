"""
Migrate pricing data from Neon PostgreSQL to Odoo.

Usage:
    python migrate_to_odoo.py

This script:
1. Connects to Neon PostgreSQL (source)
2. Connects to Odoo via XML-RPC (target)
3. Reads all pricing records from Neon
4. Creates them in Odoo's junk.pricing.item model
"""

import xmlrpc.client
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from datetime import datetime

# Neon (Source) credentials - from environment or hardcode
NEON_DATABASE_URL = os.environ.get('DATABASE_URL', 
    'postgresql://neondb_owner:npg_xxxxx@ep-little-firefly-ahl7q0i5-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require'
)

# Odoo (Target) credentials
ODOO_URL = 'https://sagebrush.zero.sbs'
ODOO_DB = 'odoo_new'
ODOO_USER = 'admin'
ODOO_API_KEY = 'a1bd1dfbec053c31f1c9f0c8aac38cafa31428a6'

def get_neon_connection():
    """Connect to Neon PostgreSQL"""
    return psycopg2.connect(NEON_DATABASE_URL, cursor_factory=RealDictCursor)

def get_odoo_connection():
    """Connect to Odoo via XML-RPC"""
    common = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/common')
    uid = common.authenticate(ODOO_DB, ODOO_USER, ODOO_API_KEY, {})
    
    if not uid:
        raise Exception("Failed to authenticate with Odoo")
    
    models = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/object')
    return uid, models

def fetch_neon_data():
    """Fetch all pricing records from Neon"""
    conn = get_neon_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT zip_code, item_id, item_name, price, price_regular, price_curb, state
        FROM pricing
        ORDER BY zip_code, item_name
    """)
    
    records = cursor.fetchall()
    conn.close()
    
    return records

def migrate_to_odoo(records):
    """Push records to Odoo"""
    uid, models = get_odoo_connection()
    
    created = 0
    errors = 0
    batch_size = 100
    total = len(records)
    
    print(f"Starting migration of {total} records...")
    
    # Process in batches for efficiency
    for i in range(0, total, batch_size):
        batch = records[i:i+batch_size]
        
        vals_list = []
        for record in batch:
            vals_list.append({
                'zip_code': record['zip_code'],
                'item_id': record['item_id'],
                'item_name': record['item_name'] or 'Unknown',
                'price': float(record['price']) if record['price'] else 0.0,
                'price_regular': float(record['price_regular']) if record['price_regular'] else 0.0,
                'price_curb': record['price_curb'] or '',
                'state': record['state'] or 'GA',
            })
        
        try:
            # Batch create in Odoo
            result = models.execute_kw(
                ODOO_DB, uid, ODOO_API_KEY,
                'junk.pricing.item', 'create',
                [vals_list]
            )
            created += len(batch)
            print(f"Progress: {created}/{total} ({100*created/total:.1f}%)")
        except Exception as e:
            print(f"Error on batch starting at {i}: {e}")
            # Try one at a time for this batch
            for vals in vals_list:
                try:
                    models.execute_kw(
                        ODOO_DB, uid, ODOO_API_KEY,
                        'junk.pricing.item', 'create',
                        [vals]
                    )
                    created += 1
                except Exception as e2:
                    errors += 1
                    if errors <= 10:
                        print(f"  Error: {vals['zip_code']}/{vals['item_id']}: {e2}")
    
    print(f"\nMigration complete: {created} created, {errors} errors")
    return created, errors

def main():
    print(f"=== Neon → Odoo Migration ===")
    print(f"Started: {datetime.now()}")
    print()
    
    # Fetch from Neon
    print("Fetching records from Neon...")
    records = fetch_neon_data()
    print(f"Found {len(records)} records in Neon")
    print()
    
    if not records:
        print("No records to migrate. Exiting.")
        return
    
    # Migrate to Odoo
    created, errors = migrate_to_odoo(records)
    
    print()
    print(f"Finished: {datetime.now()}")

if __name__ == '__main__':
    main()
