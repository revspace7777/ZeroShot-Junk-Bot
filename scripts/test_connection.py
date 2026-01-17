import requests
import re
import sys

def test_connection():
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    })

    print("1. Fetching entry point...")
    try:
        response = session.get('https://order.goloadup.com/retail/entry_point')
        response.raise_for_status()
        print(f"   Status: {response.status_code}")
    except Exception as e:
        print(f"   Failed to connect: {e}")
        return

    print("2. Extracting CSRF Token...")
    # Look for <meta name="csrf-token" content="..." />
    csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', response.text)
    if csrf_match:
        csrf_token = csrf_match.group(1)
        print(f"   Success! Token: {csrf_token[:15]}...")
    else:
        print("   Failed to find CSRF token in HTML.")
        # print(response.text[:500]) # Debug
        return

    print("3. Attempting Introspection Query (Validation)...")
    
    # Simple Introspection Query
    query = """
    query IntrospectionQuery {
      __schema {
        types {
          name
        }
      }
    }
    """
    
    headers = {
        'x-csrf-token': csrf_token,
        'content-type': 'application/json'
    }
    
    try:
        api_url = 'https://order.goloadup.com/retail/graphql'
        resp = session.post(api_url, json={'query': query}, headers=headers)
        print(f"   Status: {resp.status_code}")
        if resp.status_code == 200:
            data = resp.json()
            if 'data' in data:
                print("   Success! GraphQL Introspection worked.")
                types = [t['name'] for t in data['data']['__schema']['types']]
                print(f"   Found {len(types)} types.")
                if 'ItemTypeRecord' in types:
                     print("   CONFIRMED: 'ItemTypeRecord' exists in schema.")
            else:
                 print("   Response 200 but no data:", data)
        else:
            print("   Failed:", resp.text[:200])

    except Exception as e:
        print(f"   Query failed: {e}")

if __name__ == "__main__":
    test_connection()
