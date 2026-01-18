import sqlite3
import psycopg2
import os
from dotenv import load_dotenv

# Load env variables including DATABASE_URL
load_dotenv(os.path.join("web-demo", ".env"))

SQLITE_DB_PATH = os.path.join("data", "goloadup_consolidated.db")
POSTGRES_URL = os.environ.get("DATABASE_URL")

def migrate_data():
    print(f"Connecting to SQLite: {SQLITE_DB_PATH}")
    sqlite_conn = sqlite3.connect(SQLITE_DB_PATH)
    sqlite_cur = sqlite_conn.cursor()

    print(f"Connecting to Postgres...")
    pg_conn = psycopg2.connect(POSTGRES_URL)
    pg_cur = pg_conn.cursor()

    # Create table in Postgres
    print("Creating table 'pricing' in Postgres if not exists...")
    create_table_query = """
    CREATE TABLE IF NOT EXISTS pricing (
        id SERIAL PRIMARY KEY,
        zip_code TEXT NOT NULL,
        item_id TEXT,
        item_name TEXT,
        price_regular REAL,
        price REAL,
        price_addition REAL,
        price_multiplier REAL,
        timestamp TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_zip_code ON pricing(zip_code);
    """
    pg_cur.execute(create_table_query)
    pg_conn.commit()

    # Fetch data from SQLite
    print("Fetching data from SQLite...")
    sqlite_cur.execute("SELECT zip_code, item_id, item_name, price_regular, price, price_addition, price_multiplier, timestamp FROM pricing")
    rows = sqlite_cur.fetchall()
    total_rows = len(rows)
    print(f"Found {total_rows} rows to migrate.")

    # Insert into Postgres
    print("Inserting data into Postgres (this might take a moment)...")
    insert_query = """
    INSERT INTO pricing (zip_code, item_id, item_name, price_regular, price, price_addition, price_multiplier, timestamp)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    batch_size = 1000
    for i in range(0, total_rows, batch_size):
        batch = rows[i:i + batch_size]
        pg_cur.executemany(insert_query, batch)
        pg_conn.commit()
        print(f"Migrated {min(i + batch_size, total_rows)}/{total_rows} rows...")

    print("Migration complete!")
    
    sqlite_conn.close()
    pg_conn.close()

if __name__ == "__main__":
    if not POSTGRES_URL:
        print("Error: DATABASE_URL not found in environment variables.")
    else:
        migrate_data()
