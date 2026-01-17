#!/usr/bin/env python3
"""
Robust Pricing Analysis Script
Analyzes pricing data to determine floor additions and multipliers per zip code.

Features:
- Schema validation before processing
- Robust type conversion with fallbacks
- Progressive output every 10k rows
- Heartbeat timestamps to prove process is alive
- Comprehensive error logging
"""
import os
import sqlite3
import time
from collections import defaultdict
from datetime import datetime

# Path to the consolidated DB
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")
RESULTS_DIR = os.path.join(BASE_DIR, "data")

# Expected schema
EXPECTED_COLUMNS = {
    'zip_code': 'TEXT',
    'item_id': 'TEXT',
    'price': 'TEXT',  # Total price (as TEXT!)
    'price_regular': 'REAL',  # Base price
    'volume': 'TEXT',
    'timestamp': 'DATETIME',
    'item_name': 'INTEGER',  # Actually contains text
    'state': 'TEXT'
}


def safe_float(value, default=None):
    """
    Convert value to float with fallback.
    Handles None, empty strings, and invalid values gracefully.
    """
    if value is None or value == '':
        return default
    try:
        return float(value)
    except (ValueError, TypeError):
        return default


def log(message, level="INFO"):
    """Log with timestamp"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {level}: {message}")


def validate_schema(cur):
    """Validate database schema matches expectations"""
    log("Validating database schema...")
    
    cur.execute("PRAGMA table_info(pricing);")
    cols_info = cur.fetchall()
    
    actual_columns = {col[1]: col[2] for col in cols_info}
    
    log(f"Found {len(actual_columns)} columns in pricing table")
    
    # Check only critical columns exist
    critical_columns = ['zip_code', 'item_id', 'price', 'price_regular']
    
    missing = []
    for col in critical_columns:
        if col not in actual_columns:
            missing.append(col)
    
    if missing:
        log(f"ERROR: Missing critical columns: {missing}", "ERROR")
        return False
    
    # Show all columns found
    log("Available columns:")
    for col_name, col_type in actual_columns.items():
        log(f"  - {col_name} ({col_type})")
    
    log("✓ Schema validation passed (all critical columns present)")
    return True


def test_example_case(cur):
    """Test the known example case"""
    log("Testing example case (zip=30081, item=7637)...")
    
    cur.execute("""
        SELECT zip_code, item_id, price, price_regular, item_name
        FROM pricing 
        WHERE zip_code = '30081' AND item_id = '7637'
        LIMIT 1
    """)
    
    row = cur.fetchone()
    if not row:
        log("WARNING: Example case not found in database", "WARN")
        return False
    
    zip_code, item_id, price_text, price_regular, item_name = row
    total_price = safe_float(price_text)
    base_price = safe_float(price_regular)
    
    log(f"  Zip: {zip_code}, Item: {item_id}, Name: {item_name}")
    log(f"  Base Price: {base_price}, Total Price: {total_price}")
    
    if total_price and base_price:
        addition = total_price - base_price
        multiplier = total_price / base_price if base_price != 0 else None
        log(f"  Addition: ${addition:.2f}, Multiplier: {multiplier:.4f}")
        log("✓ Example case processed successfully")
        return True
    else:
        log("ERROR: Could not convert prices to float", "ERROR")
        return False


def analyze_pricing(conn):
    """Main analysis function"""
    cur = conn.cursor()
    
    # Get row count
    cur.execute("SELECT COUNT(*) FROM pricing;")
    total_rows = cur.fetchone()[0]
    log(f"Total rows to process: {total_rows:,}")
    
    # Query data
    log("Starting data extraction...")
    cur.execute("""
        SELECT zip_code, item_id, price, price_regular
        FROM pricing
        WHERE price_regular IS NOT NULL
        ORDER BY zip_code, item_id
    """)
    
    # Analysis containers
    zip_additions = defaultdict(list)
    zip_multipliers = defaultdict(list)
    
    # Error tracking
    skipped_rows = 0
    processed_rows = 0
    last_heartbeat = time.time()
    start_time = time.time()
    
    log("Processing rows...")
    
    # Process rows with progressive output
    while True:
        rows = cur.fetchmany(1000)  # Process in batches
        if not rows:
            break
        
        for row in rows:
            zip_code, item_id, price_text, price_regular = row
            
            # Convert prices
            total_price = safe_float(price_text)
            base_price = safe_float(price_regular)
            
            if base_price is None:
                skipped_rows += 1
                continue
            
            processed_rows += 1
            
            # Calculate addition and multiplier
            if total_price is not None:
                addition = total_price - base_price
                zip_additions[zip_code].append(addition)
                
                if base_price != 0:
                    multiplier = total_price / base_price
                    zip_multipliers[zip_code].append(multiplier)
            else:
                # No total price available, treat as base price only
                zip_additions[zip_code].append(0)
            
            # Progress output every 10k rows
            if processed_rows % 10000 == 0:
                elapsed = time.time() - start_time
                rate = processed_rows / elapsed if elapsed > 0 else 0
                eta = (total_rows - processed_rows) / rate if rate > 0 else 0
                log(f"Progress: {processed_rows:,}/{total_rows:,} rows ({100*processed_rows/total_rows:.1f}%) - {rate:.0f} rows/sec - ETA: {eta:.0f}s")
        
        # Heartbeat every 30 seconds
        if time.time() - last_heartbeat > 30:
            log(f"Heartbeat: Still processing... ({processed_rows:,} rows done)")
            last_heartbeat = time.time()
    
    elapsed = time.time() - start_time
    log(f"✓ Processing complete: {processed_rows:,} rows in {elapsed:.1f}s ({processed_rows/elapsed:.0f} rows/sec)")
    log(f"  Skipped rows: {skipped_rows:,}")
    
    return zip_additions, zip_multipliers, processed_rows, skipped_rows


def compute_statistics(zip_additions, zip_multipliers):
    """Compute floor and multiplier per zip code"""
    log("Computing statistics per zip code...")
    
    # Floor (minimum addition) per zip
    floor_per_zip = {}
    for zip_code, additions in zip_additions.items():
        if additions:
            floor_per_zip[zip_code] = round(min(additions), 2)
    
    # Multiplier (when consistent) per zip
    multiplier_per_zip = {}
    for zip_code, multipliers in zip_multipliers.items():
        if not multipliers:
            continue
        
        avg_mult = sum(multipliers) / len(multipliers)
        mult_range = max(multipliers) - min(multipliers)
        
        # Consider consistent if range < 0.001
        if mult_range < 0.001:
            multiplier_per_zip[zip_code] = round(avg_mult, 4)
    
    log(f"✓ Computed statistics for {len(floor_per_zip)} zip codes")
    log(f"  Zip codes with consistent multipliers: {len(multiplier_per_zip)}")
    
    return floor_per_zip, multiplier_per_zip


def group_by_multiplier(multiplier_per_zip):
    """Group zip codes by multiplier value"""
    log("Grouping zip codes by multiplier...")
    
    grouped = defaultdict(list)
    for zip_code, mult in multiplier_per_zip.items():
        grouped[mult].append(zip_code)
    
    log(f"✓ Found {len(grouped)} distinct multiplier groups")
    
    return grouped


def save_results(floor_per_zip, multiplier_per_zip, grouped, processed_rows, skipped_rows):
    """Save analysis results to file"""
    output_file = os.path.join(RESULTS_DIR, "analysis_summary.txt")
    
    log(f"Saving results to {output_file}...")
    
    with open(output_file, 'w') as f:
        f.write("=" * 70 + "\n")
        f.write("PRICING ANALYSIS SUMMARY\n")
        f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("=" * 70 + "\n\n")
        
        f.write(f"Total rows processed: {processed_rows:,}\n")
        f.write(f"Skipped rows: {skipped_rows:,}\n")
        f.write(f"Zip codes analyzed: {len(floor_per_zip):,}\n")
        f.write(f"Zip codes with consistent multipliers: {len(multiplier_per_zip):,}\n")
        f.write(f"Distinct multiplier groups: {len(grouped):,}\n\n")
        
        f.write("-" * 70 + "\n")
        f.write("PRICE FLOOR BY ZIP CODE (First 50)\n")
        f.write("-" * 70 + "\n")
        for i, (zip_code, floor) in enumerate(sorted(floor_per_zip.items())[:50], 1):
            f.write(f"{i:3d}. Zip {zip_code}: ${floor:.2f}\n")
        
        f.write("\n" + "-" * 70 + "\n")
        f.write("MULTIPLIER BY ZIP CODE (First 50)\n")
        f.write("-" * 70 + "\n")
        for i, (zip_code, mult) in enumerate(sorted(multiplier_per_zip.items())[:50], 1):
            f.write(f"{i:3d}. Zip {zip_code}: {mult:.4f}x\n")
        
        f.write("\n" + "-" * 70 + "\n")
        f.write("ZIP CODE GROUPS BY MULTIPLIER\n")
        f.write("-" * 70 + "\n")
        for mult in sorted(grouped.keys()):
            zips = grouped[mult]
            zip_preview = ', '.join(zips[:10])
            if len(zips) > 10:
                zip_preview += f"... (+{len(zips)-10} more)"
            f.write(f"Multiplier {mult:.4f}x: {len(zips):,} zip codes\n")
            f.write(f"  {zip_preview}\n\n")
    
    log(f"✓ Results saved to {output_file}")


def main():
    """Main execution function"""
    log("=" * 70)
    log("ROBUST PRICING ANALYSIS")
    log("=" * 70)
    
    # Check database exists
    if not os.path.exists(DB_PATH):
        log(f"ERROR: Database not found at {DB_PATH}", "ERROR")
        return 1
    
    log(f"Database: {DB_PATH}")
    log(f"Size: {os.path.getsize(DB_PATH):,} bytes")
    print()
    
    # Connect to database
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    try:
        # Step 1: Validate schema
        if not validate_schema(cur):
            log("Schema validation failed. Aborting.", "ERROR")
            return 1
        print()
        
        # Step 2: Test example case
        if not test_example_case(cur):
            log("Example case test failed. Aborting.", "ERROR")
            return 1
        print()
        
        # Step 3: Analyze all pricing data
        zip_additions, zip_multipliers, processed_rows, skipped_rows = analyze_pricing(conn)
        print()
        
        # Step 4: Compute statistics
        floor_per_zip, multiplier_per_zip = compute_statistics(zip_additions, zip_multipliers)
        print()
        
        # Step 5: Group by multiplier
        grouped = group_by_multiplier(multiplier_per_zip)
        print()
        
        # Step 6: Save results
        save_results(floor_per_zip, multiplier_per_zip, grouped, processed_rows, skipped_rows)
        print()
        
        # Display summary
        log("=" * 70)
        log("ANALYSIS COMPLETE")
        log("=" * 70)
        log(f"✓ Processed {processed_rows:,} rows successfully")
        log(f"✓ Analyzed {len(floor_per_zip):,} zip codes")
        log(f"✓ Found {len(grouped):,} distinct multiplier groups")
        log(f"✓ Results saved to {os.path.join(RESULTS_DIR, 'analysis_summary.txt')}")
        
        # Show top multiplier groups
        print()
        log("Top 5 Multiplier Groups:")
        for i, mult in enumerate(sorted(grouped.keys(), key=lambda m: len(grouped[m]), reverse=True)[:5], 1):
            zips = grouped[mult]
            log(f"  {i}. {mult:.4f}x: {len(zips):,} zip codes ({zips[:3]}...)")
        
        return 0
        
    except Exception as e:
        log(f"ERROR: {e}", "ERROR")
        import traceback
        traceback.print_exc()
        return 1
    finally:
        conn.close()


if __name__ == "__main__":
    exit(main())
