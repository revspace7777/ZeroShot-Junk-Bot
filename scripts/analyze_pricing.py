import os
import sqlite3
import json
from collections import defaultdict

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "data", "goloadup_consolidated.db")

if not os.path.exists(DB_PATH):
    raise FileNotFoundError(f"Database not found at {DB_PATH}")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Identify the main pricing table (assume first table)
cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name LIMIT 1;")
table = cur.fetchone()[0]
print(f"Analyzing table: {table}")

# Get column names
cur.execute(f"PRAGMA table_info({table});")
cols = [row[1] for row in cur.fetchall()]
print("Columns:", cols)

# Determine likely column names for zip, item id, base price, total price
zip_col = next((c for c in cols if 'zip' in c.lower()), None)
item_id_col = next((c for c in cols if 'item' in c.lower() and 'id' in c.lower()), None)
price_col = next((c for c in cols if 'price' in c.lower() and 'base' in c.lower()), None)
total_price_col = next((c for c in cols if 'price' in c.lower() and 'total' in c.lower()), None)
# Fallbacks
if not price_col:
    price_col = next((c for c in cols if 'price' in c.lower()), None)
if not total_price_col:
    total_price_col = next((c for c in cols if 'price' in c.lower() and c != price_col), None)

print('Detected columns:', zip_col, item_id_col, price_col, total_price_col)

# Gather data for analysis
cur.execute(f"SELECT {zip_col}, {item_id_col}, {price_col}, {total_price_col} FROM {table} WHERE {price_col} IS NOT NULL AND {total_price_col} IS NOT NULL;")
rows = cur.fetchall()

# Compute floor (minimum addition) per zip and item
floor_additions = defaultdict(lambda: defaultdict(list))
for zip_code, item_id, base_price, total_price in rows:
    addition = total_price - base_price
    floor_additions[zip_code][item_id].append(addition)

# Determine minimum addition per zip (could be floor) and multiplier if addition is proportional
zip_floor = {}
zip_multiplier = {}
for zip_code, items in floor_additions.items():
    # Assume flat addition if all additions are similar across items
    all_additions = [min(vals) for vals in items.values()]
    # Check if additions are roughly constant
    if max(all_additions) - min(all_additions) < 0.01:
        zip_floor[zip_code] = round(all_additions[0], 2)
    else:
        # Compute multiplier as total/base average
        multipliers = []
        for item_id, vals in items.items():
            base = next((r[2] for r in rows if r[0]==zip_code and r[1]==item_id), None)
            total = next((r[3] for r in rows if r[0]==zip_code and r[1]==item_id), None)
            if base and base != 0:
                multipliers.append(total/base)
        if multipliers:
            zip_multiplier[zip_code] = round(sum(multipliers)/len(multipliers), 4)

print('Zip floors (flat addition):', zip_floor)
print('Zip multipliers:', zip_multiplier)

# Group zip codes by multiplier value
multiplier_groups = defaultdict(list)
for zip_code, mult in zip_multiplier.items():
    multiplier_groups[mult].append(zip_code)

print('Groups by multiplier:')
for mult, zips in multiplier_groups.items():
    print(f"Multiplier {mult}: {zips}")

conn.close()
