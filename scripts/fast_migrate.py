import sqlite3
import psycopg2
import os
import csv
from io import StringIO
from dotenv import load_dotenv

# Load env variables
load_dotenv(os.path.join("web-demo", ".env"))

SQLITE_DB_PATH = os.path.join("data", "goloadup_consolidated.db")
POSTGRES_URL = os.environ.get("DATABASE_URL")

def fast_migrate():
    print(f"Connecting to SQLite: {SQLITE_DB_PATH}")
    sqlite_conn = sqlite3.connect(SQLITE_DB_PATH)
    sqlite_cur = sqlite_conn.cursor()

    print(f"Connecting to Postgres...")
    pg_conn = psycopg2.connect(POSTGRES_URL)
    pg_cur = pg_conn.cursor()

    # 1. Truncate existing table (to clear the partial upload)
    print("Truncating 'pricing' table in Postgres (clearing old data)...")
    pg_cur.execute("TRUNCATE TABLE pricing;")
    pg_conn.commit()

    # 2. Fetch all data from SQLite
    print("Fetching data from SQLite...")
    sqlite_cur.execute("SELECT zip_code, item_id, item_name, price_regular, price, price_addition, price_multiplier, timestamp FROM pricing")
    
    # 3. Write to in-memory CSV
    print("Preparing bulk data...")
    s_buf = StringIO()
    writer = csv.writer(s_buf)
    # Write rows to buffer
    writer.writerows(sqlite_cur.fetchall())
    s_buf.seek(0)

    # 4. Use COPY to bulk upload
    print("Executng bulk COPY to Postgres...")
    try:
        pg_cur.copy_expert(
            "COPY pricing (zip_code, item_id, item_name, price_regular, price, price_addition, price_multiplier, timestamp) FROM STDIN WITH CSV",
            s_buf
        )
        pg_conn.commit()
        print("SUCCESS: Bulk migration complete!")
    except Exception as e:
        print(f"FAILED: {e}")
    
    sqlite_conn.close()
    pg_conn.close()

if __name__ == "__main__":
    if not POSTGRES_URL:
        print("Error: DATABASE_URL not found.")
    else:
        fast_migrate()
