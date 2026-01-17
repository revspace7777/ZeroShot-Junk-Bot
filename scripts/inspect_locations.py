import requests
import json
import re

def get_csrf(session):
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point', timeout=10)
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        token = csrf_match.group(1) if csrf_match else None
        return token
    except Exception as e:
        print(f"Error getting CSRF: {e}")
        return None

def main():
    session = requests.Session()
    csrf = get_csrf(session)
    
    url = 'https://order.goloadup.com/retail/graphql'
    headers = {
        'x-csrf-token': csrf,
        'content-type': 'application/json'
    }
    
    # Query to list all query names
    query = """
    query {
      __schema {
        types {
          name
          fields {
            name
            description
            args {
              name
              type {
                name
              }
            }
          }
        }
      }
    }
    """
    
    resp = session.post(url, json={'query': query}, headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        
        # Look for "Query" type usually
        schema_types = data['data']['__schema']['types']
        query_type = next((t for t in schema_types if t['name'] == 'Query'), None)
        
        if query_type:
            print("Available Queries:")
            for field in query_type['fields']:
                print(f"- {field['name']}")
                
                # Check for args that sound like zip
                for arg in field['args']:
                    print(f"  Arg: {arg['name']}")
                    
        # Also let's scan ALL types for 'Zip' or 'Location' in name
        print("\nTypes containing 'Zip' or 'Location':")
        for t in schema_types:
            if 'Zip' in t['name'] or 'Location' in t['name']:
                print(f"- {t['name']}")

if __name__ == "__main__":
    main()
