# ZeroShot Junk Bot Item Catalog - Field Comparison

## Summary

**ZeroShot Junk Bot's GraphQL API has 20 fields available on `ItemTypeRecord`**, but I only extracted 5 of them. Additionally, I added 3 fields that don't exist in the API.

---

## Fields Available in ZeroShot Junk Bot's API (20 total)

### ✅ Fields I Extracted (5):
1. `id` - Item ID
2. `name` - Item name
3. `slug` - URL slug
4. `detail` - Item description/details
5. `icon` - Icon identifier

### ❌ Fields I MISSED (15):
1. **`pickupPrice`** - ⚠️ **ACTUAL PRICE FROM API** (I queried this separately from PricingDetails instead!)
2. `category` - Item category (RetailDrilldownCategoryEnum)
3. `assemblyPrice` - Price for assembly service
4. `disassemblyPrice` - Price for disassembly service
5. `assemblyAllowed` - Boolean if assembly is allowed
6. `disassemblyAllowed` - Boolean if disassembly is allowed
7. `pickupAllowed` - Boolean if pickup is allowed
8. `priority` - Display priority (integer)
9. `marquee` - Boolean for featured items
10. `subtext` - Additional descriptive text (e.g., "Fits in a 64 Gallon Trash Can with a weight between 75 - 150 lbs.")
11. `auxillaryText` - Auxiliary text field
12. `aliases` - Array of search aliases (e.g., ["junk", "trash"])
13. `attributes` - Array of item attributes
14. `nonCatalogAvailable` - Boolean flag
15. `customerScheduleRequestVisible` - Boolean flag

---

## Fields in Our JSON Catalog

### From ZeroShot Junk Bot API (5):
- ✅ `id` - From API
- ✅ `name` - From API
- ✅ `slug` - From API
- ✅ `detail` - From API
- ✅ `icon` - From API

### Added/Estimated by Me (3):
- ❌ **`volume`** - **ESTIMATED** (does NOT exist in ZeroShot Junk Bot's API)
- ⚠️ **`price`** - Queried separately from `PricingDetails` API (but `pickupPrice` exists in itemTypes!)
- ❌ **`priceZip`** - Added metadata to track which zip code the price is for

---

## Critical Findings

### 1. Volume Does NOT Exist
**There is NO `volume` field in ZeroShot Junk Bot's GraphQL API.** The volume values (1, 0.5, 2, 0.25, etc.) are **100% estimated** based on item name patterns.

### 2. Price Field Redundancy
- ZeroShot Junk Bot's API has `pickupPrice` directly in the `itemTypes` response
- I queried prices separately from `PricingDetails` API instead
- Both should give the same price, but `pickupPrice` is more direct

### 3. Missing Valuable Data
I missed 15 fields including:
- **`pickupPrice`** - The actual price (should use this instead of separate query)
- **`category`** - Item categorization
- **`subtext`** - Additional item descriptions
- **`aliases`** - Search terms (e.g., ["junk", "trash"])
- **`attributes`** - Item attributes array
- Pricing fields: `assemblyPrice`, `disassemblyPrice`
- Boolean flags: `assemblyAllowed`, `disassemblyAllowed`, `pickupAllowed`, etc.

---

## Sample Item with ALL Fields

```json
{
  "id": "7892",
  "name": "1/3 Cubic Yard of Loose Items",
  "slug": "13_cubic_yard_of_loose_items",
  "detail": "",
  "icon": "GENERIC",
  "category": null,
  "pickupPrice": 45,
  "assemblyPrice": 0,
  "disassemblyPrice": 0,
  "assemblyAllowed": false,
  "disassemblyAllowed": false,
  "pickupAllowed": true,
  "priority": -1,
  "marquee": false,
  "subtext": "Fits in a 64 Gallon Trash Can with a weight between 75 - 150 lbs.",
  "auxillaryText": "",
  "aliases": ["junk", "trash"],
  "attributes": [],
  "nonCatalogAvailable": false,
  "customerScheduleRequestVisible": true
}
```

---

## Recommendation

**Re-extract the catalog with ALL 20 fields** to get the complete ZeroShot Junk Bot item library with all available data.

