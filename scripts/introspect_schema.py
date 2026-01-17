
import requests
import json

def introspection_query():
    url = "https://order.goloadup.com/retail/graphql"
    query = """
    query {
        __type(name: "PricingDetails") {
            name
            fields {
                name
                type {
                    name
                    kind
                }
            }
        }
    }
    """
    
    # Needs CSRF? Let's try without first, as introspection might be public or fail.
    # If fail, we'll need to borrow the get_csrf logic.
    # Actually, let's just borrow the full logic from extract_pricing to be safe.
    
    # ... Simplified safe version reusing extract_pricing logic ...
    pass

# Re-implementing correctly with the extract_pricing logic
import re
import sys

def get_csrf(session):
    try:
        r = session.get('https://order.goloadup.com/retail/entry_point', timeout=10)
        csrf_match = re.search(r'<meta\s+name="csrf-token"\s+content="([^"]+)"', r.text)
        return csrf_match.group(1) if csrf_match else None
    except:
        return None

def run():
    s = requests.Session()
    s.headers.update({'User-Agent': 'Mozilla/5.0'})
    csrf = get_csrf(s)
    
    if not csrf:
        print("Failed to get CSRF")
        return

    headers = {
        'x-csrf-token': csrf,
        'content-type': 'application/json'
    }
    
    # 1. Check PricingDetails fields
    q1 = """
    query {
        __type(name: "PricingDetails") {
            name
            fields {
                name
            }
        }
    }
    """
    
    # 2. Check ItemType fields (the catalog item, to see if volume is hiding there)
    q2 = """
    query {
        __type(name: "ItemType") {
            name
            fields {
                name
            }
        }
    }
    """

    print("--- PricingDetails Fields ---")
    resp = s.post("https://order.goloadup.com/retail/graphql", json={'query': q1}, headers=headers)
    print(json.dumps(resp.json(), indent=2))

    print("\\n--- ItemType Fields ---")
    resp = s.post("https://order.goloadup.com/retail/graphql", json={'query': q2}, headers=headers)
    print(json.dumps(resp.json(), indent=2))

if __name__ == "__main__":
    run()
