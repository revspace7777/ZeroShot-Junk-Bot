import os
import sqlite3
import sys

# Path to the consolidated database (adjust if necessary)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    print(f"[ERROR] Database not found at {DB_PATH}")
    sys.exit(1)

print(f"[INFO] Connecting to database at {DB_PATH}")
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Identify tables in the database
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cur.fetchall()]
print(f"[INFO] Found tables: {tables}")

# Assuming the main pricing table is named 'pricing' or similar. We'll process all tables.
for table in tables:
    # Get current columns
    cur.execute(f"PRAGMA table_info({table});")
    columns_info = cur.fetchall()
    column_names = [col[1] for col in columns_info]
    print(f"[INFO] Processing table '{table}' with columns: {column_names}")

    # Rename misnamed columns if they exist
    if "item_name" in column_names and "item_count" in column_names:
        # Determine which column holds prices vs item names by sampling a few rows
        cur.execute(f"SELECT item_name, item_count FROM {table} LIMIT 5;")
        sample = cur.fetchall()
        # Heuristic: if any value in item_name looks like a number, treat it as price column
        price_like = any(str(val).replace('.', '', 1).isdigit() for val, _ in sample)
        if price_like:
            # item_name is actually price, item_count is item name
            print(f"[INFO] Swapping column names in '{table}': item_name->price, item_count->item_name")
            cur.execute(f"ALTER TABLE {table} RENAME COLUMN item_name TO price;")
            cur.execute(f"ALTER TABLE {table} RENAME COLUMN item_count TO item_name;")
        else:
            # Otherwise assume the opposite (unlikely)
            print(f"[WARN] Unable to determine column roles in '{table}'. Skipping rename.")
    else:
        print(f"[INFO] Table '{table}' does not have both 'item_name' and 'item_count' columns. Skipping rename.")

    # Add state column if missing
    if "state" not in column_names:
        print(f"[INFO] Adding 'state' column to '{table}' with default 'GA'")
        cur.execute(f"ALTER TABLE {table} ADD COLUMN state TEXT DEFAULT 'GA';")
    else:
        print(f"[INFO] 'state' column already exists in '{table}'.")

conn.commit()
print("[INFO] Migration completed successfully.")
conn.close()
