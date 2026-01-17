"""
Upload local SQLite database to Turso via HTTP API
This script reads the local goloadup_consolidated.db and uploads it to Turso
"""

import sqlite3
import json
import urllib.request
import urllib.parse
import os

# Turso credentials
TURSO_DATABASE_URL = "libsql://local-guys-junk-removal-revspace.aws-us-east-2.turso.io"
TURSO_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njg2ODg1NzMsImlkIjoiN2U5NzEyMTEtNGI1Yy00M2E0LWIzNWYtOWRkMGQyMmJjOTc4IiwicmlkIjoiNmVhN2VhNjQtNzk2ZC00ZWVlLTkwMjYtMzM0OWY3MzE4NjlkIn0.qxNLSblvC9pZFPcveJmN-rMYwjd1WAOqEeD_NwW4WZP6JdONCii_t3xppNGdQy-OUCPpcCWZG3eXeNk8GBZ0Dw"

# Convert to HTTPS URL
TURSO_HTTP_URL = TURSO_DATABASE_URL.replace("libsql://", "https://") + "/v2/pipeline"

# Local database path
DB_PATH = os.path.join(os.path.dirname(__file__), "data", "goloadup_consolidated.db")

def execute_turso_query(statements):
    """Execute statements on Turso database"""
    payload = {"statements": statements}
    
    req = urllib.request.Request(
        TURSO_HTTP_URL,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {TURSO_AUTH_TOKEN}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result
    except Exception as e:
        print(f"Error: {e}")
        return None

def get_table_schema(conn, table_name):
    """Get CREATE TABLE statement for a table"""
    cur = conn.cursor()
    cur.execute(f"SELECT sql FROM sqlite_master WHERE type='table' AND name=?", (table_name,))
    result = cur.fetchone()
    return result[0] if result else None

def upload_database():
    """Upload the entire database to Turso"""
    print(f"Connecting to local database: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # Get all tables
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
    tables = [row[0] for row in cur.fetchall()]
    
    print(f"Found {len(tables)} tables: {', '.join(tables)}")
    
    for table in tables:
        print(f"\n--- Processing table: {table} ---")
        
        # Get table schema
        schema = get_table_schema(conn, table)
        if not schema:
            print(f"  Skipping {table} - no schema found")
            continue
        
        print(f"  Creating table...")
        # Drop table if exists and create new one
        statements = [
            {"q": f"DROP TABLE IF EXISTS {table}"},
            {"q": schema}
        ]
        
        result = execute_turso_query(statements)
        if not result:
            print(f"  Failed to create table {table}")
            continue
        
        # Get all data from table
        cur.execute(f"SELECT * FROM {table}")
        rows = cur.fetchall()
        
        if not rows:
            print(f"  Table {table} is empty")
            continue
        
        print(f"  Uploading {len(rows)} rows...")
        
        # Get column count
        col_count = len(rows[0])
        placeholders = ','.join(['?' for _ in range(col_count)])
        
        # Insert in batches of 100
        batch_size = 100
        for i in range(0, len(rows), batch_size):
            batch = rows[i:i+batch_size]
            statements = []
            
            for row in batch:
                # Convert row to list and handle None values
                params = [val if val is not None else None for val in row]
                statements.append({
                    "q": f"INSERT INTO {table} VALUES ({placeholders})",
                    "params": params
                })
            
            result = execute_turso_query(statements)
            if result:
                print(f"  Uploaded batch {i//batch_size + 1}/{(len(rows)-1)//batch_size + 1}")
            else:
                print(f"  Failed to upload batch {i//batch_size + 1}")
        
        print(f"  ✓ Completed {table}")
    
    conn.close()
    print("\n✅ Database upload complete!")

if __name__ == "__main__":
    upload_database()
