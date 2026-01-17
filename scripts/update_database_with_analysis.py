#!/usr/bin/env python3
"""
Database Update Script
Adds price_addition and price_multiplier columns to the pricing table
and populates them with calculated values for all rows.
"""
import os
import sqlite3
from datetime import datetime


BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")


def safe_float(value, default=None):
    """Convert value to float with fallback"""
    if value is None or value == '':
        return default
    try:
        return float(value)
    except (ValueError, TypeError):
        return default


def main():
    """Main execution function"""
    start_time = datetime.now()
    
    if not os.path.exists(DB_PATH):
        print(f"ERROR: Database not found at {DB_PATH}")
        return 1
    
    print(f"Starting database update: {DB_PATH}")
    print(f"Start time: {start_time.strftime('%H:%M:%S')}")
    print()
    
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    try:
        # Step 1: Check if columns already exist
        cur.execute("PRAGMA table_info(pricing);")
        existing_cols = [col[1] for col in cur.fetchall()]
        
        # Step 2: Add new columns if they don't exist
        if 'price_addition' not in existing_cols:
            print("Adding column 'price_addition' (REAL)...")
            cur.execute("ALTER TABLE pricing ADD COLUMN price_addition REAL;")
            print("  ✓ Column added")
        else:
            print("Column 'price_addition' already exists")
        
        if 'price_multiplier' not in existing_cols:
            print("Adding column 'price_multiplier' (REAL)...")
            cur.execute("ALTER TABLE pricing ADD COLUMN price_multiplier REAL;")
            print("  ✓ Column added")
        else:
            print("Column 'price_multiplier' already exists")
        
        conn.commit()
        print()
        
        # Step 3: Get total row count
        cur.execute("SELECT COUNT(*) FROM pricing;")
        total_rows = cur.fetchone()[0]
        print(f"Total rows to process: {total_rows:,}")
        print()
        
        # Step 4: Process all rows and calculate values
        print("Processing rows and calculating values...")
        
        # Fetch all rows that need updating
        cur.execute("""
            SELECT rowid, price, price_regular
            FROM pricing
            WHERE price_regular IS NOT NULL
        """)
        
        rows_to_update = []
        skipped = 0
        
        for row in cur.fetchall():
            rowid, price_text, price_regular = row
            
            # Convert prices
            total_price = safe_float(price_text)
            base_price = safe_float(price_regular)
            
            if base_price is None:
                skipped += 1
                continue
            
            # Calculate addition and multiplier
            if total_price is not None:
                addition = total_price - base_price
                multiplier = total_price / base_price if base_price != 0 else None
                
                rows_to_update.append((addition, multiplier, rowid))
            else:
                # No total price, set both to NULL
                rows_to_update.append((None, None, rowid))
        
        # Step 5: Update all rows
        print(f"Updating {len(rows_to_update):,} rows in database...")
        
        cur.executemany("""
            UPDATE pricing
            SET price_addition = ?,
                price_multiplier = ?
            WHERE rowid = ?
        """, rows_to_update)
        
        conn.commit()
        
        # Step 6: Verify updates
        cur.execute("""
            SELECT COUNT(*) 
            FROM pricing 
            WHERE price_addition IS NOT NULL
        """)
        updated_addition = cur.fetchone()[0]
        
        cur.execute("""
            SELECT COUNT(*) 
            FROM pricing 
            WHERE price_multiplier IS NOT NULL
        """)
        updated_multiplier = cur.fetchone()[0]
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Final report
        print()
        print("=" * 70)
        print("DATABASE UPDATE COMPLETE")
        print("=" * 70)
        print(f"Start time: {start_time.strftime('%H:%M:%S')}")
        print(f"End time: {end_time.strftime('%H:%M:%S')}")
        print(f"Duration: {duration:.2f} seconds")
        print()
        print(f"Total rows in table: {total_rows:,}")
        print(f"Rows updated: {len(rows_to_update):,}")
        print(f"Rows skipped: {skipped:,}")
        print()
        print(f"Rows with price_addition: {updated_addition:,}")
        print(f"Rows with price_multiplier: {updated_multiplier:,}")
        print()
        
        # Show sample of updated data
        print("Sample of updated rows:")
        cur.execute("""
            SELECT zip_code, item_id, price_regular, price, price_addition, price_multiplier
            FROM pricing
            WHERE price_addition IS NOT NULL
            LIMIT 5
        """)
        
        print(f"{'Zip':<8} {'Item ID':<8} {'Base':<8} {'Total':<8} {'Addition':<10} {'Multiplier':<10}")
        print("-" * 70)
        
        for row in cur.fetchall():
            zip_code, item_id, base, total, addition, mult = row
            print(f"{zip_code:<8} {item_id:<8} ${base:<7.2f} ${safe_float(total, 0):<7.2f} ${addition:<9.2f} {mult:<10.4f}x")
        
        print()
        print("✓ Database successfully updated with analysis columns")
        
        return 0
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        conn.rollback()
        return 1
    finally:
        conn.close()


if __name__ == "__main__":
    exit(main())
