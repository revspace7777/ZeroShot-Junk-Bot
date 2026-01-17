import requests
import json
import os

# Source: standard open dataset for US Zips
URL = "https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json"
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '../data/zip-codes-master.json')

def main():
    print(f"Downloading zips from {URL}...")
    try:
        resp = requests.get(URL)
        if resp.status_code != 200:
            print("Failed to download file.")
            return
        
        data = resp.json()
        # Structure of source: List of objects with "zip_code", "state", "city", etc.
        # We want to organize by State to be useful for filtering.
        
        organized = {}
        count = 0
        
        for entry in data:
            state = entry.get('state')
            # Some entries might handle leading zeros, ensure zip is 5 digits
            z = str(entry.get('zip_code')).zfill(5)
            
            if not state:
                continue
                
            if state not in organized:
                organized[state] = {"zipCodes": []}
            
            organized[state]["zipCodes"].append(z)
            count += 1
            
        # Dedupe
        for s in organized:
            organized[s]["zipCodes"] = sorted(list(set(organized[s]["zipCodes"])))
            
        print(f"Processed {count} zip codes across {len(organized)} states/territories.")
        
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(organized, f, indent=2)
            
        print(f"Saved to {OUTPUT_FILE}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
