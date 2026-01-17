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
    
    query = """
    query {
      __type(name: "Query") {
        fields {
          name
          type {
            name
            kind
            fields {
              name
            }
            ofType {
              name
              kind
              fields {
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
        fields = data['data']['__type']['fields']
        target = next((f for f in fields if f['name'] == 'serviceAvailability'), None)
        
        if target:
            print(f"Query: {target['name']}")
            # Unwrap type 
            t = target['type']
            if t['kind'] == 'NON_NULL':
                t = t['ofType']
            
            print(f"Return Type: {t['name']}")
            if t['fields']:
                print("Return Fields:")
                for f in t['fields']:
                    print(f"- {f['name']}")
            else:
                 # If likely valid object but fields null in this view, query that type directly
                 type_name = t['name']
                 print(f"Fields hidden, querying type {type_name}...")
                 q2 = f"""
                 query {{
                   __type(name: "{type_name}") {{
                     fields {{
                       name
                       description
                     }}
                   }}
                 }}
                 """
                 r2 = session.post(url, json={'query': q2}, headers=headers)
                 if r2.status_code == 200:
                     print(json.dumps(r2.json()['data']['__type']['fields'], indent=2))


if __name__ == "__main__":
    main()
