# ZeroShot Junk Bot - Quote Calculator

## Overview
A functional MVP for calculating quotes based on item selection and zip code. Fully offline - no external API dependencies.

## Features
- ✅ Browse/search 396 items from catalog
- ✅ Add items to quote with quantities
- ✅ Real-time price calculation
- ✅ Support for all Marietta & Kennesaw, GA zip codes (offline pricing)
- ✅ Fully offline - no API calls required
- ✅ Price breakdown display

## How to Use

### Option 1: Open Directly
Simply open `index.html` in a modern web browser. Note: You may need to serve it via a local web server due to CORS restrictions when loading JSON files.

### Option 2: Local Web Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Then open: http://localhost:8000/loadup_quote_form/mvp/
```

## File Structure
```
mvp/
├── index.html      # Main HTML structure
├── styles.css      # Styling
├── app.js          # Application logic
└── README.md       # This file
```

## Dependencies
- `../../loadup-pricing-data/items-catalog.json` - Item catalog (396 items)
- `../../loadup-pricing-data/pricing-logic.js` - Pricing calculation functions

## Current Limitations
1. **Service Area**: Only Marietta & Kennesaw, GA zip codes (18 total)
2. **Fully Offline**: All pricing is calculated locally from catalog data
3. **No Quote Saving**: Quotes are not persisted
4. **No Export**: Cannot export quotes (can be added later)

## Valid Zip Codes
- **Marietta, GA:** 30006-30090 (14 zip codes)
- **Kennesaw, GA:** 30144, 30152, 30156, 30160 (4 zip codes)
- **Default:** 30144 (Kennesaw)

## Future Enhancements
- [ ] Quote export (PDF/CSV)
- [ ] Quote saving (localStorage)
- [ ] More zip code price caching
- [ ] Item images/icons
- [ ] Volume display
- [ ] Assembly/disassembly pricing

## Technical Notes
- Pure JavaScript (no frameworks)
- Fully offline - no external API calls
- All pricing calculated from local catalog data
- Prices for all supported zip codes are in local database

