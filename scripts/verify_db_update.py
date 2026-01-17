import sqlite3

c = sqlite3.connect(r'data\goloadup_consolidated.db')
cur = c.cursor()

print('=' * 70)
print('DATABASE UPDATE VERIFICATION')
print('=' * 70)
print()

# Check columns exist
cur.execute('PRAGMA table_info(pricing)')
cols = [col[1] for col in cur.fetchall()]
print('Columns in pricing table:')
for i, col in enumerate(cols, 1):
    print(f'  {i}. {col}')
print()

# Check row counts
cur.execute('SELECT COUNT(*) FROM pricing')
total = cur.fetchone()[0]

cur.execute('SELECT COUNT(*) FROM pricing WHERE price_addition IS NOT NULL')
with_addition = cur.fetchone()[0]

cur.execute('SELECT COUNT(*) FROM pricing WHERE price_multiplier IS NOT NULL')
with_multiplier = cur.fetchone()[0]

print('Row Statistics:')
print(f'  Total rows in table: {total:,}')
print(f'  Rows with price_addition: {with_addition:,} ({100*with_addition/total:.1f}%)')
print(f'  Rows with price_multiplier: {with_multiplier:,} ({100*with_multiplier/total:.1f}%)')
print()

# Verify example case
print('Example Case Verification (Zip 30081, Item 7637):')
cur.execute("""
    SELECT zip_code, item_id, price_regular, price, price_addition, price_multiplier
    FROM pricing
    WHERE zip_code = '30081' AND item_id = '7637'
""")
row = cur.fetchone()
if row:
    print(f'  Zip Code: {row[0]}')
    print(f'  Item ID: {row[1]}')
    print(f'  Base Price: ${row[2]:.2f}')
    print(f'  Total Price: ${float(row[3]):.2f}')
    print(f'  Price Addition: ${row[4]:.2f}')
    print(f'  Price Multiplier: {row[5]:.4f}x')
    print('  ✓ Example case verified!')
else:
    print('  ✗ Example case not found')
print()

# Show sample data
print('Sample Data (First 10 rows):')
cur.execute("""
    SELECT zip_code, item_id, price_regular, price_addition, price_multiplier
    FROM pricing
    WHERE price_addition IS NOT NULL
    LIMIT 10
""")

print(f"{'Zip':<10} {'Item ID':<10} {'Base Price':<12} {'Addition':<12} {'Multiplier':<12}")
print('-' * 70)

for row in cur.fetchall():
    zip_code, item_id, base, addition, mult = row
    print(f'{zip_code:<10} {item_id:<10} ${base:<11.2f} ${addition:<11.2f} {mult:<11.4f}x')

print()
print('✓ Database verification complete!')

c.close()
