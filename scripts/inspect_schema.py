import os
import sqlite3
import json

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    raise FileNotFoundError(f"Database not found at {DB_PATH}")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# List tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cur.fetchall()]
print("Tables:", tables)

for tbl in tables:
    cur.execute(f"PRAGMA table_info({tbl});")
    cols = cur.fetchall()
    print(f"\nTable: {tbl}")
    for col in cols:
        # col: (cid, name, type, notnull, dflt_value, pk)
        print(f"  {col[0]}: {col[1]} ({col[2]}) default={col[4]}")

conn.close()
