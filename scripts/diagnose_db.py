#!/usr/bin/env python3
"""
Diagnostic script to inspect database schema and sample data.
Outputs full information to help identify root causes of failures.
"""
import os
import sqlite3

# Path to the consolidated DB
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    raise FileNotFoundError(f"Database not found at {DB_PATH}")

print(f"Database path: {DB_PATH}")
print(f"Database size: {os.path.getsize(DB_PATH):,} bytes")
print()

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Get all tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;")
tables = [row[0] for row in cur.fetchall()]
print(f"Tables in database: {tables}")
print()

# Focus on pricing table
if 'pricing' in tables:
    print("=" * 60)
    print("PRICING TABLE SCHEMA")
    print("=" * 60)
    
    cur.execute("PRAGMA table_info(pricing);")
    cols_info = cur.fetchall()
    
    print(f"Total columns: {len(cols_info)}")
    print()
    for col in cols_info:
        col_id, name, dtype, not_null, default, pk = col
        print(f"Column {col_id}: {name}")
        print(f"  Type: {dtype}")
        print(f"  Not Null: {not_null}")
        print(f"  Default: {default}")
        print(f"  Primary Key: {pk}")
        print()
    
    # Get row count
    cur.execute("SELECT COUNT(*) FROM pricing;")
    row_count = cur.fetchone()[0]
    print(f"Total rows: {row_count:,}")
    print()
    
    # Get sample rows
    print("=" * 60)
    print("SAMPLE DATA (First 3 rows)")
    print("=" * 60)
    
    col_names = [col[1] for col in cols_info]
    cur.execute("SELECT * FROM pricing LIMIT 3;")
    rows = cur.fetchall()
    
    for i, row in enumerate(rows):
        print(f"\nRow {i + 1}:")
        for col_name, value in zip(col_names, row):
            print(f"  {col_name}: {repr(value)} (type: {type(value).__name__})")
    
    # Check for NULL values in key columns
    print()
    print("=" * 60)
    print("NULL VALUE ANALYSIS")
    print("=" * 60)
    
    for col_name in col_names:
        cur.execute(f"SELECT COUNT(*) FROM pricing WHERE {col_name} IS NULL;")
        null_count = cur.fetchone()[0]
        if null_count > 0:
            print(f"{col_name}: {null_count:,} NULL values ({100*null_count/row_count:.2f}%)")
    
    # Look for the specific example case mentioned in tried.md
    print()
    print("=" * 60)
    print("EXAMPLE CASE VERIFICATION")
    print("=" * 60)
    print("Looking for: zip_code=30081, item_id=7637")
    
    cur.execute("SELECT * FROM pricing WHERE zip_code = '30081' AND item_id = '7637';")
    example_rows = cur.fetchall()
    
    if example_rows:
        print(f"Found {len(example_rows)} matching rows:")
        for i, row in enumerate(example_rows):
            print(f"\nMatch {i + 1}:")
            for col_name, value in zip(col_names, row):
                print(f"  {col_name}: {repr(value)} (type: {type(value).__name__})")
    else:
        print("No matching rows found")
        
        # Try to find the item_id
        cur.execute("SELECT COUNT(*) FROM pricing WHERE item_id = '7637';")
        item_count = cur.fetchone()[0]
        print(f"Item 7637 appears {item_count} times in the database")
        
        # Try to find the zip code
        cur.execute("SELECT COUNT(*) FROM pricing WHERE zip_code = '30081';")
        zip_count = cur.fetchone()[0]
        print(f"Zip 30081 appears {zip_count} times in the database")

conn.close()
print()
print("Diagnostic complete.")
