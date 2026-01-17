import json
import os
import argparse
import math

# Project paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
SHARD_DIR = os.path.join(DATA_DIR, 'shards_atlanta')
MASTER_FILE = os.path.join(DATA_DIR, 'zip-codes-master.json')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--shards', type=int, default=4, help='Number of shards')
    args = parser.parse_args()

    # Ensure output directory exists
    if not os.path.exists(SHARD_DIR):
        os.makedirs(SHARD_DIR)

    print(f"Loading master zip file: {MASTER_FILE}")
    with open(MASTER_FILE, 'r') as f:
        master_data = json.load(f)

    # Filter for GA & Atlanta Prefixes (300, 301, 302, 303)
    atlanta_zips = []
    
    # Check if GA exists
    if 'GA' in master_data:
        ga_zips = master_data['GA']['zipCodes']
        for z in ga_zips:
            # Check prefixes
            if z.startswith(('300', '301', '302', '303')):
                atlanta_zips.append(z)
    
    atlanta_zips = sorted(list(set(atlanta_zips)))
    total = len(atlanta_zips)
    print(f"Found {total} Greater Atlanta zip codes (300-303).")

    # Shard them
    chunk_size = math.ceil(total / args.shards)
    print(f"Splitting into {args.shards} shards of approx {chunk_size} zips each.")

    for i in range(args.shards):
        start = i * chunk_size
        end = start + chunk_size
        chunk = atlanta_zips[start:end]

        shard_filename = f"shard_atl_{i+1}.json"
        shard_path = os.path.join(SHARD_DIR, shard_filename)
        
        with open(shard_path, 'w') as f:
            json.dump(chunk, f, indent=2)
        
        print(f"Created {shard_filename}: {len(chunk)} zips")

if __name__ == '__main__':
    main()
