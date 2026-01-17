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

# Get list of tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cur.fetchall()]
print("Tables found:", tables)

# Choose the pricing table (prefer one containing 'zip' column)
pricing_table = None
for tbl in tables:
    cur.execute(f"PRAGMA table_info({tbl});")
    cols = [row[1] for row in cur.fetchall()]
    if any('zip' in c.lower() for c in cols) and any('price' in c.lower() for c in cols):
        pricing_table = tbl
        break
if not pricing_table:
    pricing_table = tables[0]
print("Using table:", pricing_table)

# Get column info for the chosen table
cur.execute(f"PRAGMA table_info({pricing_table});")
col_info = cur.fetchall()
col_names = [row[1] for row in col_info]
print("Columns:", col_names)

# Helper to find column by possible substrings
def find_column(substrings):
    for name in col_names:
        low = name.lower()
        for sub in substrings:
            if sub in low:
                return name
    return None

zip_col = find_column(['zip'])
item_id_col = find_column(['item', 'id'])
# Find price columns – there may be several; pick first as base, second as total if exists
price_cols = [c for c in col_names if 'price' in c.lower()]
if len(price_cols) >= 2:
    base_price_col, total_price_col = price_cols[0], price_cols[1]
elif len(price_cols) == 1:
    base_price_col = price_cols[0]
    total_price_col = None
else:
    base_price_col = total_price_col = None

print("Detected columns:", zip_col, item_id_col, base_price_col, total_price_col)

# Build query – only include rows where needed columns are not null
select_parts = [zip_col, item_id_col, base_price_col]
if total_price_col:
    select_parts.append(total_price_col)
query = f"SELECT {', '.join(select_parts)} FROM {pricing_table}"
cur.execute(query)
rows = cur.fetchall()
print(f"Fetched {len(rows)} rows for analysis")

# Compute floor addition (minimum addition per zip) and multiplier per zip
zip_additions = defaultdict(list)
zip_multipliers = defaultdict(list)
for row in rows:
    zip_code = row[0]
    base_price = row[2]
    total_price = row[3] if total_price_col else None
    if base_price is None:
        continue
    if total_price is not None:
        addition = total_price - base_price
        zip_additions[zip_code].append(addition)
        if base_price != 0:
            zip_multipliers[zip_code].append(total_price / base_price)
    else:
        # If only one price column, treat it as total and assume floor addition is zero
        zip_additions[zip_code].append(0)

# Determine floor (minimum addition) per zip
floor_per_zip = {z: round(min(vals), 2) for z, vals in zip_additions.items() if vals}
# Determine average multiplier per zip when variation is small
multiplier_per_zip = {}
for z, vals in zip_multipliers.items():
    if not vals:
        continue
    avg = sum(vals) / len(vals)
    if max(vals) - min(vals) < 0.01:  # treat as consistent
        multiplier_per_zip[z] = round(avg, 4)

print("\nMinimum floor addition per zip (GA):")
for z, val in sorted(floor_per_zip.items())[:20]:
    print(z, val)

print("\nMultiplier per zip (when consistent):")
for z, val in sorted(multiplier_per_zip.items())[:20]:
    print(z, val)

# Group zip codes by multiplier value
grouped = defaultdict(list)
for z, mult in multiplier_per_zip.items():
    grouped[mult].append(z)

print("\nGroups of zip codes sharing the same multiplier:")
for mult, zips in grouped.items():
    print(f"Multiplier {mult}: {len(zips)} zip codes")

conn.close()
