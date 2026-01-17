import requests
import json
import re

def get_csrf(session):
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point', timeout=10)
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        token = csrf_match.group(1) if csrf_match else None
        return token
    except:
        return None

def main():
    session = requests.Session()
    csrf = get_csrf(session)
    
    url = 'https://order.goloadup.com/retail/graphql'
    headers = {
        'x-csrf-token': csrf,
        'content-type': 'application/json'
    }
    
    # Try known good zip
    zip_code = "30301" 
    
    query = f"""
    query {{
        serviceAvailability(inputs: {{zip: "{zip_code}"}})
    }}
    """
    
    print(f"Querying for {zip_code}...")
    resp = session.post(url, json={'query': query}, headers=headers)
    print(f"Status: {resp.status_code}")
    print("Response:")
    print(json.dumps(resp.json(), indent=2))

if __name__ == "__main__":
    main()
