# Pricing and Volume Source Explanation

## Overview

This document explains exactly where the `price` and `volume` fields in the catalog came from, and how they relate to the API data.

---

## 💰 PRICING SOURCE

### Two Price Fields in the Catalog

The catalog contains **two different price fields** that came from **two different API sources**:

#### 1. `pickupPrice` (Base Price)
- **Source**: `itemTypes` GraphQL query
- **API Field**: Directly returned in the `itemTypes` response
- **Zip Code Dependency**: **NO** - This is a base price, not location-specific
- **Description**: The base pickup price for the item, regardless of location

#### 2. `price` (Zip-Specific Price)
- **Source**: `pricingDetails` GraphQL query
- **API Field**: Calculated from `pricingDetails.itemPrices[].price`
- **Zip Code Dependency**: **YES** - This is calculated for a specific zip code (30144)
- **Description**: The actual price for the item in zip code 30144, which may include zip-specific modifiers

### How Prices Were Generated

Looking at the extraction script (`extract-complete-catalog.js`):

1. **Step 1**: Query `itemTypes` to get all items with `pickupPrice` (base price)
2. **Step 2**: For each item, query `pricingDetails` API with:
   - Item ID
   - Zip code: `30144`
   - Quantity: 1
3. **Step 3**: Extract the `price` from `pricingDetails.itemPrices[0].price`
4. **Step 4**: Store both `pickupPrice` (from itemTypes) and `price` (from pricingDetails) in the catalog

### Price Relationship

**For zip code 30144:**
- **100% match**: All 396 items have `price == pickupPrice`
- This means for Georgia (30144), the zip-specific price equals the base price

**For other zip codes (based on PRICING-ANALYSIS.md):**
- Prices **CAN vary** by zip code
- Example: Mattress-Queen
  - `pickupPrice` (base): $35
  - `price` in 30144 (Georgia): $35 ✅
  - `price` in 10001 (NYC): $45 ❌ (higher)
  - `price` in 90210 (Beverly Hills): $35 ✅

### Why Prices Don't Vary Much by Zip Code

1. **Most items have the same price across zips**: The base `pickupPrice` is used for most locations
2. **Only certain areas have price modifiers**: High-cost areas like NYC have higher prices
3. **Current catalog limitation**: Only zip code 30144 was extracted, so we only see one set of prices

### Summary: Pricing Source

```
pickupPrice → itemTypes API → Base price (zip-independent)
     ↓
price → pricingDetails API → Zip-specific price for 30144
     ↓
Result: For 30144, price == pickupPrice (100% match)
        For other zips, price may differ (especially NYC)
```

---

## 📏 VOLUME SOURCE

### Volume is **NOT from the API**

The `volume` field is **100% estimated** using pattern matching on item names. It does **NOT exist** in ZeroShot Junk Bot's GraphQL API.

### Volume Estimation Method

The volume is calculated by the `estimateVolume()` function in `extract-complete-catalog.js`:

```javascript
function estimateVolume(item) {
  const name = item.name.toLowerCase();
  const slug = item.slug.toLowerCase();
  
  // Large items (1.0)
  if (name.includes('mattress') || name.includes('couch') || 
      name.includes('sofa') || name.includes('treadmill') ||
      name.includes('refrigerator') || name.includes('washer') || 
      name.includes('dryer')) {
    return 1.0;
  }
  
  // Extra large appliances (1.5)
  if (name.includes('appliance') || name.includes('stove') || 
      name.includes('oven') || name.includes('dishwasher') ||
      (name.includes('microwave') && !name.includes('small'))) {
    return 1.5;
  }
  
  // Small items (0.25)
  if (name.includes('box') || name.includes('bag') || 
      name.includes('small') || name.includes('mini') ||
      name.includes('1/3') || name.includes('cubic yard')) {
    return 0.25;
  }
  
  // Cleanouts (2.0)
  if (name.includes('cleanout') || name.includes('garage') || 
      name.includes('room')) {
    return 2.0;
  }
  
  // Default (0.5)
  return 0.5;
}
```

### Volume Distribution

From the catalog:
- **0.25**: 38 items (small items, boxes, bags)
- **0.5**: 299 items (default - most items)
- **1.0**: 33 items (large items like mattresses, couches)
- **1.5**: 13 items (extra large appliances)
- **2.0**: 13 items (cleanouts)

### Why Volume is Estimated

According to `PRICING-ANALYSIS.md`:
> "The 'volume' property is **NOT directly available** in the GraphQL API response. It appears to be calculated server-side or stored in a database not exposed through the API."

The volume is likely used internally by ZeroShot Junk Bot for:
- Pricing calculations (volume-based pricing)
- Truck capacity planning
- Route optimization

But it's not exposed in the public API, so we had to estimate it.

### Summary: Volume Source

```
volume → ESTIMATED (NOT from API)
     ↓
Method: Pattern matching on item name/slug
     ↓
Values: 0.25, 0.5, 1.0, 1.5, 2.0
     ↓
Accuracy: Estimated based on item categories
          Actual volume may use dimensions/weight not in API
```

---

## 🔍 Key Findings

### Pricing
1. **Two price sources**: `pickupPrice` (base) and `price` (zip-specific)
2. **For 30144**: Prices match 100% (no zip modifier applied)
3. **For other zips**: Prices can vary (especially high-cost areas)
4. **Current limitation**: Only one zip code (30144) extracted

### Volume
1. **NOT in API**: Volume is completely estimated
2. **Estimation method**: Pattern matching on item names
3. **Accuracy**: Reasonable estimates, but actual volume may differ
4. **Distribution**: Most items (299) default to 0.5

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    EXTRACTION PROCESS                    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │  1. Query itemTypes API          │
        │     → Get all 20 fields          │
        │     → Includes pickupPrice        │
        └───────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │  2. For each item:                │
        │     Query pricingDetails API      │
        │     with zip=30144                │
        │     → Get zip-specific price     │
        └───────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │  3. Estimate volume               │
        │     → Pattern match item name     │
        │     → NOT from API                │
        └───────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │  4. Combine into catalog:         │
        │     - All 20 API fields           │
        │     - pickupPrice (from #1)       │
        │     - price (from #2)             │
        │     - volume (from #3, estimated) │
        └───────────────────────────────────┘
```

---

## 🎯 Conclusion

**Pricing:**
- `pickupPrice`: Base price from `itemTypes` API (zip-independent)
- `price`: Zip-specific price from `pricingDetails` API (for zip 30144)
- For 30144, they match 100%, but can differ for other zip codes
- Prices don't vary much by zip code (most items same price, some areas like NYC higher)

**Volume:**
- **NOT from API** - completely estimated
- Estimated using pattern matching on item names
- Values: 0.25, 0.5, 1.0, 1.5, 2.0 based on item category
- Actual volume may use dimensions/weight not exposed in API

