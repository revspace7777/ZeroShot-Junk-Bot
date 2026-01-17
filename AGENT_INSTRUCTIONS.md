# Agent Instructions: Atlanta Sharded Extraction (FULL CATALOG)

We are running a distributed extraction for "Greater Atlanta" zip codes (300-303) across 4 separate instances.
**UPDATE**: We are now running the **FULL CATALOG** (approx 400 items per zip).

### Assignment
*   **Agent 1 (Local)**: Run `scripts/extract_pricing_atl.py --zip-file data/shards_atlanta/shard_atl_1.json`
*   **Agent 2 (ProtonVPN)**: Run `scripts/extract_pricing_atl.py --zip-file data/shards_atlanta/shard_atl_2.json`
*   **Agent 3 (VPS 1)**: Run `scripts/extract_pricing_atl.py --zip-file data/shards_atlanta/shard_atl_3.json`
*   **Agent 4 (VPS 2)**: Run `scripts/extract_pricing_atl.py --zip-file data/shards_atlanta/shard_atl_4.json`

### Execution Command
Run the following command in your terminal (ensure `requirements.txt` is installed):
```bash
python scripts/extract_pricing_atl.py --zip-file data/shards_atlanta/shard_atl_X.json --items ALL --workers 20
```
*(Replace `X` with your assigned shard number. Note: `--workers 20` is safe for this load.)*
