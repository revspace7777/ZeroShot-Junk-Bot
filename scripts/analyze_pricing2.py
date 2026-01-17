import os
import sqlite3
from collections import defaultdict

# Determine project root (one level up from this script's directory)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    raise FileNotFoundError(f"Database not found at {DB_PATH}")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# List tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cur.fetchall()]
print("Tables in DB:", tables)

# Assume the main pricing data is in the first table (or find one containing zip_code)
pricing_table = None
for t in tables:
    cur.execute(f"PRAGMA table_info({t});")
    cols = [row[1] for row in cur.fetchall()]
    if any('zip' in c.lower() for c in cols) and any('price' in c.lower() for c in cols):
        pricing_table = t
        break
if not pricing_table:
    pricing_table = tables[0]
print("Using pricing table:", pricing_table)

# Get column info for the chosen table
cur.execute(f"PRAGMA table_info({pricing_table});")
col_info = cur.fetchall()
col_names = [row[1] for row in col_info]
print("Columns:", col_names)

# Helper to find column by possible names
def find_column(possible):
    for name in col_names:
        low = name.lower()
        for p in possible:
            if p in low:
                return name
    return None

zip_col = find_column(['zip'])
item_id_col = find_column(['item', 'id'])
base_price_col = find_column(['base', 'price'])
# If there are multiple price columns, pick the one that sounds like base
if base_price_col and 'total' in base_price_col.lower():
    # try to find another price column
    other_price = [c for c in col_names if 'price' in c.lower() and c != base_price_col]
    if other_price:
        base_price_col = other_price[0]

total_price_col = find_column(['total', 'price'])
# Ensure total is not the same as base
if total_price_col == base_price_col:
    # pick another price column if exists
    others = [c for c in col_names if 'price' in c.lower() and c != base_price_col]
    total_price_col = others[0] if others else None

print("Detected columns:", zip_col, item_id_col, base_price_col, total_price_col)

# Gather data
query = f"SELECT {zip_col}, {item_id_col}, {base_price_col}, {total_price_col} FROM {pricing_table}"
cur.execute(query)
rows = cur.fetchall()
print(f"Fetched {len(rows)} rows for analysis")

# Compute floor addition per zip (minimum addition across items)
zip_floor = {}
zip_multiplier = {}
for zip_code, item_id, base_price, total_price in rows:
    if base_price is None or total_price is None:
        continue
    addition = total_price - base_price
    # Record addition per zip
    zip_floor.setdefault(zip_code, []).append(addition)
    # Record multiplier per zip
    if base_price != 0:
        zip_multiplier.setdefault(zip_code, []).append(total_price / base_price)

# Determine a single floor value per zip (minimum addition observed)
final_floor = {z: round(min(vals), 2) for z, vals in zip_floor.items() if vals}
# Determine average multiplier per zip (if consistent)
final_multiplier = {}
for z, mults in zip_multiplier.items():
    avg = sum(mults) / len(mults)
    # If variation is small, treat as a multiplier
    if max(mults) - min(mults) < 0.01:
        final_multiplier[z] = round(avg, 4)

print("Floor addition per zip (minimum observed):")
for z, val in sorted(final_floor.items())[:10]:
    print(z, val)

print("Multiplier per zip (average, when consistent):")
for z, val in sorted(final_multiplier.items())[:10]:
    print(z, val)

# Group zip codes by multiplier value
mult_groups = defaultdict(list)
for z, mult in final_multiplier.items():
    mult_groups[mult].append(z)

print("Groups of zip codes sharing the same multiplier:")
for mult, zips in mult_groups.items():
    print(f"Multiplier {mult}: {len(zips)} zip codes")

conn.close()
