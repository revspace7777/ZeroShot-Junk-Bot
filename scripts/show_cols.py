import sqlite3
c = sqlite3.connect(r'data\goloadup_consolidated.db')
cols = c.execute('PRAGMA table_info(pricing)').fetchall()
print("Column count:", len(cols))
for col in cols:
    print(f"  {col[0]}: {col[1]} - {col[2]}")
c.close()
