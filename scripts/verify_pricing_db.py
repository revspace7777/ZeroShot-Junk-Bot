import os
import sqlite3
import json

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    print(f"[ERROR] Database not found at {DB_PATH}")
    exit(1)

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Get tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cur.fetchall()]
print("Tables:", tables)

for table in tables:
    cur.execute(f"PRAGMA table_info({table});")
    cols = cur.fetchall()
    print(f"\nSchema for table '{table}':")
    for col in cols:
        # cid, name, type, notnull, dflt_value, pk
        print(f"  {col[1]} ({col[2]}) default={col[4]}")
    # Show first few rows
    cur.execute(f"SELECT * FROM {table} LIMIT 5;")
    rows = cur.fetchall()
    print(f"First rows ({len(rows)}):")
    for r in rows:
        print(r)

conn.close()
