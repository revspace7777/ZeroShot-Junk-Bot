# State of the Union - Goloadup Data Extraction

## Overview
This project has successfully reverse-engineered the `goloadup.com` pricing and item catalog systems. We have moved entirely away from browser-based scraping to a **high-speed, terminal-based Python extraction system**.

## Achievements
1.  **Full Catalog Extracted**: `data/items-catalog-new.json` contains 397 distinct items with all 20+ GraphQL fields (including hidden prices, assembly costs, and categories).
2.  **Pricing Variance Verified**: We confirmed that pricing varies significantly by Zip Code (e.g., a Mattress ranges from \$89 to \$168).
3.  **Authentication Solved**: The API requires a dynamic `X-CSRF-Token` which we successfully extract from the entry point page without a browser.

## The Scripts (How to Run)
All scripts are located in `scripts/` and output data to `data/`.

### 1. Extract Items Catalog
Update the catalog of items (if they add new ones).
```bash
python scripts/extract_catalog.py
```
*   **Output**: `data/items-catalog-new.json`

### 2. Extract Pricing (The Main Job)
Iterate through zip codes to build the pricing grid.
```bash
python scripts/extract_pricing.py --resume
```
*   **Flags**: `--resume` (Picks up where it left off in `data/pricing_output.json`).
*   **Logic**:
    *   Loads zip codes from `data/zip-codes-master.json`.
    *   Extracts CSRF token automatically.
    *   Queries `pricingDetails` for a standard item (Mattress).
    *   Saves progress every 20 zips.
    *   Logs progress to terminal.

## Technical Details for Future Agents
*   **API Endpoint**: `https://order.goloadup.com/retail/graphql`
*   **Auth**: Session Cookie + `X-CSRF-Token` (extracted from `<meta>` tag on `/retail/entry_point`).
*   **Query Structure**: The API uses a tricky input structure where arguments must be inline for the `pricingDetails` query to work correctly (avoiding strict `InputObject` typing issues).
    *   *Correct*: `pricingDetails(inputs: {zip: "30301", ...})`
    *   *Incorrect*: `pricingDetails(inputs: $variable)` (caused type errors).
*   **Items Input**: Requires `id` (ItemTypeId) and `pickupCount` (Quantity).

## Data Logic
*   **Items**: We have the full list.
*   **Zips**: `data/zip-codes-master.json` determines the scope. Currently populated with GA and FL zips. **To scale**, populate this file with all US zip codes.

## Next Steps
1.  **Scale**: Populate `zip-codes-master.json` with the full US Zip List (40k+ zips).
2.  **Run**: Execute `python scripts/extract_pricing.py --resume` on a worker (will take a few hours).
3.  **Analyze**: Use the resulting `pricing_output.json` to reverse-engineer the exact formula (e.g., Base Rate + Zone Multiplier).
