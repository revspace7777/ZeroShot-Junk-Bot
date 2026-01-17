"""
Generate SQL dump from SQLite database for Turso import
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "goloadup_consolidated.db")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "data", "turso_import.sql")

def dump_database():
    """Create a SQL dump file from the SQLite database"""
    print(f"Reading database: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        for line in conn.iterdump():
            f.write(f'{line}\n')
    
    conn.close()
    
    file_size = os.path.getsize(OUTPUT_PATH) / (1024 * 1024)  # MB
    print(f"✅ SQL dump created: {OUTPUT_PATH}")
    print(f"   File size: {file_size:.2f} MB")
    print(f"\nNext steps:")
    print(f"1. Go to Turso dashboard: https://turso.tech/app")
    print(f"2. Open your database: local-guys-junk-removal")
    print(f"3. Click 'SQL Editor' or 'Query'")
    print(f"4. Copy and paste the contents of: {OUTPUT_PATH}")
    print(f"5. Run the SQL")

if __name__ == "__main__":
    dump_database()
