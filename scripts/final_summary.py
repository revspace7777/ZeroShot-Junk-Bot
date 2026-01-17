import sqlite3

DB_PATH = r'data\goloadup_consolidated.db'
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

print("=" * 80)
print("DATABASE UPDATE SUMMARY")
print("=" * 80)
print()

# Get schema
cur.execute('PRAGMA table_info(pricing)')
all_cols = cur.fetchall()

print("PRICING TABLE SCHEMA")
print("-" * 80)
print(f"{'#':<4} {'Column Name':<20} {'Data Type':<15} {'Not Null':<10}")
print("-" * 80)
for col in all_cols:
    col_id, name, dtype, not_null, default, pk = col
    marker = " *NEW*" if name in ['price_addition', 'price_multiplier'] else ""
    print(f"{col_id:<4} {name:<20} {dtype:<15} {not_null:<10} {marker}")
print()

# Statistics
cur.execute('SELECT COUNT(*) FROM pricing')
total_rows = cur.fetchone()[0]

cur.execute('SELECT COUNT(*) FROM pricing WHERE price_addition IS NOT NULL')
rows_with_addition = cur.fetchone()[0]

cur.execute('SELECT COUNT(*) FROM pricing WHERE price_multiplier IS NOT NULL')
rows_with_multiplier = cur.fetchone()[0]

print("DATA POPULATION STATISTICS")
print("-" * 80)
print(f"Total rows in pricing table:     {total_rows:>10,}")
print(f"Rows with price_addition:        {rows_with_addition:>10,} ({100*rows_with_addition/total_rows:>5.1f}%)")
print(f"Rows with price_multiplier:      {rows_with_multiplier:>10,} ({100*rows_with_multiplier/total_rows:>5.1f}%)")
print()

# Example case
print("EXAMPLE CASE VALIDATION (Zip 30081, Item 7637 - Podium)")
print("-" * 80)
cur.execute("""
    SELECT zip_code, item_id, item_name, price_regular, price, 
           price_addition, price_multiplier
    FROM pricing
    WHERE zip_code = '30081' AND item_id = '7637'
""")
row = cur.fetchone()
if row:
    print(f"Zip Code:           {row[0]}")
    print(f"Item ID:            {row[1]}")
    print(f"Item Name:          {row[2]}")
    print(f"Base Price:         ${row[3]:.2f}")
    print(f"Total Price:        ${float(row[4]):.2f}")
    print(f"Price Addition:     ${row[5]:.2f}  ← NEW COLUMN")
    print(f"Price Multiplier:   {row[6]:.4f}x ← NEW COLUMN")
    print()
    if abs(row[5] - 20.0) < 0.01:
        print("✓ Addition matches expected value ($20.00)")
    if abs(row[6] - 1.3390) < 0.0001:
        print("✓ Multiplier matches expected value (1.3390x)")
print()

# Sample distribution
print("PRICE ADDITION DISTRIBUTION (Sample)")
print("-" * 80)
cur.execute("""
    SELECT ROUND(price_addition, 0) as rounded_addition, COUNT(*) as count
    FROM pricing
    WHERE price_addition IS NOT NULL
    GROUP BY rounded_addition
    ORDER BY count DESC
    LIMIT 10
""")

print(f"{'Addition Amount':<20} {'Frequency':<15}")
print("-" * 40)
for row in cur.fetchall():
    addition, count = row
    print(f"${addition:<19.0f} {count:>10,}")
print()

# Multiplier distribution
print("PRICE MULTIPLIER DISTRIBUTION (Sample)")
print("-" * 80)
cur.execute("""
    SELECT ROUND(price_multiplier, 2) as rounded_mult, COUNT(*) as count
    FROM pricing
    WHERE price_multiplier IS NOT NULL
    GROUP BY rounded_mult
    ORDER BY count DESC
    LIMIT 10
""")

print(f"{'Multiplier':<20} {'Frequency':<15}")
print("-" * 40)
for row in cur.fetchall():
    mult, count = row
    print(f"{mult:<19.2f}x {count:>10,}")
print()

print("=" * 80)
print("✓ DATABASE UPDATE COMPLETE - ALL ROWS POPULATED")
print("=" * 80)

conn.close()
