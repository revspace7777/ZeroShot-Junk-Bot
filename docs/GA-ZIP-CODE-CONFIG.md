# Marietta & Kennesaw, GA Zip Code Configuration

## System Configuration
The ZeroShot Junk Bot Quote Calculator is now configured to work **exclusively** with zip codes in Marietta and Kennesaw, Georgia.

## Valid Zip Codes

### Marietta, GA (14 zip codes)
- 30006
- 30007
- 30008
- 30060
- 30061
- 30062
- 30063
- 30064
- 30065
- 30066
- 30067
- 30068
- 30069
- 30090

### Kennesaw, GA (4 zip codes)
- 30144 (Default - has cached prices)
- 30152
- 30156
- 30160

**Total: 18 zip codes**

## Current Price Data Status

### Zip Code 30144 (Kennesaw)
- ✅ **Full price data cached** in `items-catalog.json`
- ✅ 360 items with prices
- ✅ Instant price calculation
- ✅ Base price: $59

### Other Zip Codes (17 remaining)
- ⚠️ **Require API calls** for pricing
- ⚠️ Prices may vary by location
- ⚠️ Base prices estimated based on proximity to 30144

## Pricing Notes

### Base Prices (Estimated)
- **30144 (Kennesaw):** $59 (confirmed)
- **Other Kennesaw zips (30152, 30156, 30160):** ~$59 (estimated, same area)
- **Marietta zips (30006-30090):** ~$59-64 (estimated, nearby area)

*Note: Actual base prices may vary. System will use API calls to get accurate pricing for non-30144 zip codes.*

## System Behavior

1. **Zip Code Validation**
   - Only accepts zip codes from the 18 valid zip codes listed above
   - Shows error message if invalid zip code entered
   - Displays city name (Marietta or Kennesaw) for valid zip codes

2. **Price Calculation**
   - **30144:** Uses cached prices (fast, instant)
   - **Other zips:** Makes API calls to ZeroShot Junk Bot GraphQL API (may be slower)

3. **User Experience**
   - Default zip code: 30144 (Kennesaw)
   - City name displayed next to zip code
   - Clear error messages for invalid zip codes

## Future Enhancements

1. **Price Caching**
   - Build price cache for all 18 zip codes
   - Reduce API calls
   - Faster price calculation

2. **Base Price Database**
   - Test and document base prices for all 18 zip codes
   - Update pricing rules with accurate data

3. **Location Detection**
   - Auto-detect zip code from user location
   - Suggest nearest valid zip code

---

**Last Updated:** November 20, 2025  
**Status:** ✅ Configured for Marietta & Kennesaw, GA only

