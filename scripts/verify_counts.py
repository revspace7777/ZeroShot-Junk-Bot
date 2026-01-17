import sqlite3
import os

DB_FILE = os.path.join(os.path.dirname(__file__), '../data/goloadup.db')

def main():
    if not os.path.exists(DB_FILE):
        print("DB not found.")
        return

    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    # Items from last batch
    items = {
        'Box Spring - Queen': '7445',
        'Refrigerator - Res': '8001',
        'Dresser': '7979',
        'Washer': '8005',
        'Dryer': '7884',
        'Bag of Junk': '7446',
        'Mattress': '7793'
    }
    
    print("--- Database Verification ---\n")
    total_rows = 0
    for name, tid in items.items():
        try:
            c.execute("SELECT count(*) FROM pricing WHERE item_id=?", (tid,))
            count = c.fetchone()[0]
            print(f"{name:<20} (ID {tid}): {count} records")
            total_rows += count
        except Exception as e:
            print(f"Error {name}: {e}")
            
    c.execute("SELECT count(*) FROM pricing")
    actual_total = c.fetchone()[0]
    
    print("-" * 40)
    print(f"Calculated Total:    {total_rows}")
    print(f"Actual DB Total:     {actual_total}")
    print("\nStatus: " + ("✅ CORRECT" if actual_total >= total_rows else "⚠️ MISMATCH"))
    conn.close()

if __name__ == "__main__":
    main()
