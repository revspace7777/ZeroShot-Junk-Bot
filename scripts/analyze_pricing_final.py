import os
import sqlite3
from collections import defaultdict

# Path to the consolidated DB
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    raise FileNotFoundError(f"Database not found at {DB_PATH}")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Get the pricing table (assume first table)
cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name LIMIT 1;")
pricing_table = cur.fetchone()[0]
print(f"Pricing table: {pricing_table}")

# Get column info
cur.execute(f"PRAGMA table_info({pricing_table});")
cols_info = cur.fetchall()
col_names = [c[1] for c in cols_info]
print("Columns:", col_names)

# Helper to find column by substrings
def find_col(subs):
    for name in col_names:
        low = name.lower()
        for sub in subs:
            if sub in low:
                return name
    return None

zip_col = find_col(["zip"])
item_id_col = find_col(["item", "id"])
price_cols = [c for c in col_names if "price" in c.lower()]
if price_cols:
    base_price_col = price_cols[0]
    total_price_col = price_cols[1] if len(price_cols) > 1 else None
else:
    raise ValueError("No price columns found in table")

print("Detected columns:")
print(f"  zip: {zip_col}\n  item_id: {item_id_col}\n  base_price: {base_price_col}\n  total_price: {total_price_col}")

# Query data
select_cols = [zip_col, item_id_col, base_price_col]
if total_price_col:
    select_cols.append(total_price_col)
query = f"SELECT {', '.join(select_cols)} FROM {pricing_table} WHERE {base_price_col} IS NOT NULL"
cur.execute(query)
rows = cur.fetchall()
print(f"Fetched {len(rows)} rows")

# Compute floor addition and multiplier per zip
zip_additions = defaultdict(list)
zip_multipliers = defaultdict(list)
for row in rows:
    zip_code = row[0]
    # Convert price values to float if possible
    try:
        base_price = float(row[2]) if row[2] is not None else None
    except (ValueError, TypeError):
        base_price = None
    total_price = None
    if total_price_col and row[3] is not None:
        try:
            total_price = float(row[3])
        except (ValueError, TypeError):
            total_price = None
    if base_price is None:
        continue  # skip rows without a valid base price
    if total_price is not None:
        addition = total_price - base_price
        zip_additions[zip_code].append(addition)
        if base_price != 0:
            zip_multipliers[zip_code].append(total_price / base_price)
    else:
        # No separate total column; treat addition as 0
        zip_additions[zip_code].append(0)

# Determine floor (minimum addition) per zip
floor_per_zip = {z: round(min(vals), 2) for z, vals in zip_additions.items() if vals}
# Determine average multiplier when consistent
multiplier_per_zip = {}
for z, vals in zip_multipliers.items():
    if not vals:
        continue
    avg = sum(vals) / len(vals)
    if max(vals) - min(vals) < 0.001:  # essentially constant
        multiplier_per_zip[z] = round(avg, 4)

print("\nFloor addition per zip (minimum observed):")
for z, val in sorted(floor_per_zip.items())[:20]:
    print(z, val)

print("\nMultiplier per zip (consistent):")
for z, val in sorted(multiplier_per_zip.items())[:20]:
    print(z, val)

# Group zip codes by multiplier
grouped = defaultdict(list)
for z, mult in multiplier_per_zip.items():
    grouped[mult].append(z)

print("\nGroups of zip codes sharing the same multiplier:")
for mult, zips in grouped.items():
    print(f"Multiplier {mult}: {len(zips)} zip codes -> {', '.join(zips[:10])}{'...' if len(zips)>10 else ''}")

conn.close()
