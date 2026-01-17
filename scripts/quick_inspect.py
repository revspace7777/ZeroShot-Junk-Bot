#!/usr/bin/env python3
"""Quick schema inspector"""
import os, sqlite3

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Schema
cur.execute("PRAGMA table_info(pricing);")
cols = cur.fetchall()
print("Schema:")
for c in cols:
    print(f"  [{c[0]}] {c[1]} ({c[2]})")

# Sample
cur.execute("SELECT * FROM pricing LIMIT 2;")
rows = cur.fetchall()
print("\nSample (2 rows):")
col_names = [c[1] for c in cols]
for row in rows:
    for name, val in zip(col_names, row):
        print(f"  {name} = {repr(val)}")
    print()

# Example case
cur.execute("SELECT * FROM pricing WHERE zip_code='30081' AND item_id='7637' LIMIT 1;")
ex = cur.fetchone()
if ex:
    print("Example case (30081, 7637):")
    for name, val in zip(col_names, ex):
        print(f"  {name} = {repr(val)}")

conn.close()
