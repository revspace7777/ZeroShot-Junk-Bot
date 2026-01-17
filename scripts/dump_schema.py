import os, sqlite3, json

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    raise FileNotFoundError(f"Database not found at {DB_PATH}")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Get tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cur.fetchall()]
print("Tables:", tables)

for tbl in tables:
    cur.execute(f"PRAGMA table_info({tbl});")
    cols = cur.fetchall()
    col_names = [c[1] for c in cols]
    print(f"\nTable {tbl} columns: {col_names}")
    # Show first 5 rows
    cur.execute(f"SELECT * FROM {tbl} LIMIT 5;")
    rows = cur.fetchall()
    print("Sample rows:")
    for r in rows:
        print(r)

conn.close()
