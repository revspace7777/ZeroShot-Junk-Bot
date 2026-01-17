import sqlite3

c = sqlite3.connect(r'data\goloadup_consolidated.db')
cur = c.cursor()

# Get column names
cur.execute('PRAGMA table_info(pricing)')
cols = cur.fetchall()

print("New columns added:")
for col in cols:
    if col[1] in ['price_addition', 'price_multiplier']:
        print(f"  ✓ {col[1]} ({col[2]})")

# Count populated rows
cur.execute('SELECT COUNT(*) FROM pricing WHERE price_addition IS NOT NULL')
count = cur.fetchone()[0]
print(f"\nRows populated: {count:,}")

# Show example
cur.execute('SELECT zip_code,item_id,price_regular,price,price_addition,price_multiplier FROM pricing WHERE zip_code="30081" AND item_id="7637"')
row = cur.fetchone()
print(f"\nExample (30081, 7637): Base=${row[2]:.2f}, Total=${float(row[3]):.2f}, Addition=${row[4]:.2f}, Multiplier={row[5]:.4f}x")

c.close()
print("\n✓ DONE")
