import requests
import re
import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')

def extract_all():
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0'
    })

    # 1. CSRF
    print("Fetching CSRF...")
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point')
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        csrf_token = csrf_match.group(1) if csrf_match else None
    except:
        csrf_token = None
    
    if not csrf_token:
        print("No CSRF")
        return

    headers = {'x-csrf-token': csrf_token, 'content-type': 'application/json'}
    api_url = 'https://order.goloadup.com/retail/graphql'

    # 2. Introspect ItemTypeRecord Fields
    print("Introspecting ItemTypeRecord...")
    query = """
    query IntrospectionQuery {
      __schema {
        types {
          name
          fields { name }
        }
      }
    }
    """
    resp = session.post(api_url, json={'query': query}, headers=headers)
    schema = resp.json()['data']['__schema']['types']
    
    item_record_type = next((t for t in schema if t['name'] == 'ItemTypeRecord'), None)
    if not item_record_type:
        print("ItemTypeRecord not found")
        return
    
    fields = [f['name'] for f in item_record_type['fields']]
    print(f"Found {len(fields)} fields.")

    # 3. Extract Function
    print("Extracting Full Catalog...")
    # hardcoded structure based on findings: itemTypes -> itemTypes
    fs = "\n".join(fields)
    full_query = f"""
    query GetAllItems {{
        itemTypes {{
            itemTypes {{
                {fs}
            }}
        }}
    }}
    """
    
    resp = session.post(api_url, json={'query': full_query}, headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        if 'data' in data and 'itemTypes' in data['data']:
            items = data['data']['itemTypes']['itemTypes']
            print(f"Successfully extracted {len(items)} items.")
            
            # Save
            out_path = os.path.join(DATA_DIR, 'items-catalog-new.json')
            with open(out_path, 'w') as f:
                json.dump(items, f, indent=2)
            print(f"Saved to {out_path}")
        else:
            print("Execute failed. Data:", json.dumps(data)[:200])
    else:
        print(f"Failed to extract: {resp.status_code} {resp.text[:200]}")

if __name__ == "__main__":
    extract_all()
