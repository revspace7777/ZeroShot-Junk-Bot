import json
import os
import argparse
import math

DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')
SERVICEABLE_FILE = os.path.join(DATA_DIR, 'serviceable_zips.json')
SHARD_DIR = os.path.join(DATA_DIR, 'shards')

def load_ga_fl_serviceable():
    # Helper to get intersection of GA/FL and Serviceable used in main script
    # For now, let's just shard the input file passed to this script
    pass

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', type=str, default=SERVICEABLE_FILE, help='Input json file with list of zips')
    parser.add_argument('--shards', type=int, default=4, help='Number of shards to split into')
    parser.add_argument('--filter-states', type=str, default="GA,FL", help='States to filter master list by if input is master')
    args = parser.parse_args()
    
    # Ensure shard dir
    if not os.path.exists(SHARD_DIR):
        os.makedirs(SHARD_DIR)
        
    # Load logic
    zips = []
    
    # If input is serviceable (list), use it. If master (dict), filter it.
    with open(args.input) as f:
        data = json.load(f)
        
    if isinstance(data, list):
        # It's the serviceable list
        # We need to filter this by GA/FL because serviceable contains ALL states
        # We need the Master to know which zip belongs to which state
        with open(os.path.join(DATA_DIR, 'zip-codes-master.json')) as mf:
            master = json.load(mf)
            
        target_states = [s.strip().upper() for s in args.filter_states.split(',')]
        state_zips = set()
        for s in target_states:
            if s in master:
                state_zips.update(master[s]['zipCodes'])
        
        # Intersect
        zips = [z for z in data if z in state_zips]
        print(f"Filtered {len(data)} serviceable zips down to {len(zips)} for states {args.filter_states}")
        
    else:
        # It's master file probably
        pass # Handle if needed
        
    # Shard
    total = len(zips)
    chunk_size = math.ceil(total / args.shards)
    
    print(f"Splitting {total} zips into {args.shards} shards (~{chunk_size} each)...")
    
    for i in range(args.shards):
        start = i * chunk_size
        end = start + chunk_size
        chunk = zips[start:end]
        
        fname = os.path.join(SHARD_DIR, f"shard_{i+1:02d}.json")
        with open(fname, 'w') as f:
            json.dump(chunk, f)
        print(f"Created {fname} ({len(chunk)} zips)")

if __name__ == "__main__":
    main()
