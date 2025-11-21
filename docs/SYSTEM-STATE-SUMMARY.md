# ZeroShot Junk Bot Pricing System - Current State Summary

**Last Updated:** November 20, 2025  
**Status:** ✅ Data Collection Complete | 🚧 MVP Development Phase

---

## 📊 Current System State

### Data Catalog
- **Total Items:** 396 items
- **Items with Prices:** 360 (91%)
- **Items with Null/Zero Prices:** 36 (9%)
- **Items with Templates:** 396 (100%)
- **Total Fields per Item:** 24 fields

### Zip Code Configuration
- **Service Area:** Marietta & Kennesaw, GA **ONLY**
- **Total Valid Zip Codes:** 18 zip codes
  - **Marietta, GA:** 14 zip codes (30006-30090)
  - **Kennesaw, GA:** 4 zip codes (30144, 30152, 30156, 30160)
- **Default Zip Code:** `30144` (Kennesaw)
- **Primary Zip Code:** `30144` (Kennesaw - Default)
- **All Items Configured For:** `30144` only (cached prices)
- **Other Zip Codes:** 17 additional zip codes (require API calls)

**⚠️ CRITICAL LIMITATION:** The catalog only has prices for zip code `30144`. Prices for other zip codes must be fetched via API.

### Pricing Analysis
- **Price Range:** $3.00 - $1,500.00
- **Average Price:** $111.21
- **Minimum Charge:** $75 (applied when orderSubtotal < $75)

### Data Structure
Each item contains 24 fields:
- Core: `id`, `name`, `slug`, `detail`, `icon`, `category`
- Pricing: `pickupPrice`, `assemblyPrice`, `disassemblyPrice`, `price`, `priceZip`
- Services: `pickupAllowed`, `assemblyAllowed`, `disassemblyAllowed`
- Metadata: `priority`, `marquee`, `subtext`, `auxillaryText`
- Search: `aliases`, `attributes`
- Flags: `nonCatalogAvailable`, `customerScheduleRequestVisible`
- Estimated: `volume` (not in API, estimated)
- **NEW:** `template` (template structure for data collection)

### Template Structure
All 396 items now include a `template` object with:
- `template_fields`: Array of column objects (following lead email pattern)
- `template_version`: "1.0"
- `template_type`: "item_data_collection"

---

## 🔧 Available Components

### 1. Item Catalog (`items-catalog.json`)
- Complete catalog with 396 items
- All 20 API fields extracted
- Estimated volume property
- Template structure added
- **Limitation:** Prices only for zip `30144`

### 2. Pricing Logic (`pricing-logic.js`)
- `calculateTotalPrice(items, zipCode, options)` - Real API call
- `calculateTotalPriceEstimated(items, zipCode)` - Fallback estimation
- Supports: stairs, placement, timeslot options

### 3. Pricing Rules (`pricing-rules.json`)
- Documented pricing formula
- Zip code modifiers (5 tested zips)
- Volume tier estimates
- Test results

### 4. Documentation
- `PRICING-ANALYSIS.md` - Comprehensive analysis
- `FIELD-COMPARISON.md` - Field mapping
- `ZeroShot Junk Bot-API-REFERENCE.md` - API documentation

---

## ⚠️ Current Limitations

### 1. Zip Code Coverage
- **Only 1 zip code has full price data:** `30144`
- Other zip codes require API calls for pricing
- Base prices known for 5 zip codes, but item prices vary

### 2. Volume Property
- **Not in API** - estimated based on item categories
- Actual volume calculation may use dimensions/weight (server-side)

### 3. Item Price Lookup
- Item prices not in `itemTypes` query
- Must query `PricingDetails` for each item/zip combination
- No comprehensive price lookup table

### 4. Tax Calculation
- Tax rules not fully understood
- Some locations apply tax (NYC, Dallas), others don't
- Tax percentage varies

---

## 🎯 Recommendations

### Immediate (MVP Phase)
1. **Build Functional MVP**
   - Simple quote calculator interface
   - Item selection from catalog
   - Real-time price calculation via API
   - Support for zip code `30144` (with cached prices)
   - Support for other zip codes (via API calls)

2. **Price Caching Strategy**
   - Cache prices for `30144` (already have)
   - Implement API fallback for other zip codes
   - Consider building price lookup table for common zips

3. **Error Handling**
   - Handle API failures gracefully
   - Fallback to estimated pricing
   - User-friendly error messages

### Short-term (Post-MVP)
1. **Expand Zip Code Coverage**
   - Build price lookup table for top 20-50 zip codes
   - Cache prices for common locations
   - Implement zip code detection/validation

2. **Volume Calculation**
   - If needed, implement client-side volume estimation
   - Or accept that volume is server-side only

3. **Tax Calculation**
   - Research tax rules per location
   - Implement tax calculation logic

### Long-term
1. **Price Database**
   - Build comprehensive price lookup table
   - Regular price updates/sync
   - Multi-zip price caching

2. **Advanced Features**
   - Stairs calculation
   - Placement options (indoor/outdoor)
   - Timeslot pricing
   - Assembly/disassembly pricing

---

## 🚀 MVP Requirements (Functional Only)

### Core Features
1. **Item Selection**
   - Browse/search 396 items from catalog
   - Add items to quote with quantities
   - Remove items from quote

2. **Price Calculation**
   - Real-time price calculation
   - Support zip code `30144` (cached prices)
   - Support other zip codes (API calls)
   - Show price breakdown (items + base + minimum)

3. **Quote Display**
   - Total price
   - Itemized breakdown
   - Minimum charge indicator
   - Zip code display

### Technical Stack (Recommended)
- **Frontend:** Simple HTML/CSS/JavaScript (no framework needed for MVP)
- **Backend:** None required (direct API calls from browser)
- **Data:** Use existing `items-catalog.json` and `pricing-logic.js`

### MVP Scope
- ✅ Functional quote calculator
- ✅ Item catalog integration
- ✅ Real-time pricing
- ❌ No fancy UI (keep it simple)
- ❌ No user accounts
- ❌ No quote saving
- ❌ No email/export (can add later)

---

## 📁 File Structure

```
ZeroShot Junk Bot-pricing-data/
├── items-catalog.json          # Complete catalog (396 items)
├── pricing-logic.js            # Pricing calculation functions
├── pricing-rules.json          # Pricing rules documentation
├── items-catalog.csv           # CSV export
├── PRICING-ANALYSIS.md         # Comprehensive analysis
├── FIELD-COMPARISON.md         # Field mapping
├── ZeroShot Junk Bot-API-REFERENCE.md     # API docs
└── SYSTEM-STATE-SUMMARY.md     # This file

loadup_quote_form/
├── mission_objective.md        # Mission objectives
├── agent_1_mission.md         # Agent 1 tasks
└── agent_2_mission.md         # Agent 2 tasks
```

---

## 🎬 Next Steps

1. **Build MVP** - Functional quote calculator
2. **Test MVP** - Verify with real scenarios
3. **Iterate** - Add features based on feedback
4. **Expand** - Add more zip codes, features

---

**Status:** Ready for MVP development ✅

