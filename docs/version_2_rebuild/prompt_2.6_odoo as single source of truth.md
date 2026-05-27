# Phase 2.6 Mega-Prompt: Cloudflare Hyperdrive API, PostgreSQL Migration & Odoo Micro-Frontend

## CONTEXT
We are advancing to Phase 2.6. Our architectural strategy is finalized: 
1. **Database:** Odoo VPS (PostgreSQL) is the single source of truth.
2. **API Layer:** Cloudflare Workers + Hyperdrive (for edge connection pooling to Postgres).
3. **Frontend:** React app acts as a Micro-Frontend Widget, compiled and embedded into an Odoo web page.

## OBJECTIVES & TASKS

### Task 1: Interactive Cloudflare & Hyperdrive Setup
The user prefers Cloudflare Workers + Hyperdrive. You must guide the user through authentication and setup using their specific account details.
* **Account Info:** Email: `revspace@protonmail.com` | Account ID: `90f782b335800e5d9bc94a95d579dbb1`.
* **Action (Interactive):** 1. Provide the exact CLI command for the user to authenticate (`npx wrangler login`).
  2. Provide the exact command to create the Hyperdrive configuration using the user's Account ID.
  3. If manual dashboard intervention is needed, provide the exact URL (e.g., `https://dash.cloudflare.com/90f782b335800e5d9bc94a95d579dbb1/workers/overview`) and tell the user exactly what to click to get the connection string.
  4. PAUSE and ask the user to provide the resulting Hyperdrive ID before proceeding to code.

### Task 2: Migrate Core Engine to Cloudflare Worker
We are dropping Netlify, local SQLite, Turso, and Firebase. 
* **Requirement:** Migrate the backend logic (`pricingEngine.js`, `itemMatcher.js`, etc.) into a Cloudflare Worker format. 
* **Action:** Refactor the engine to connect to PostgreSQL via Cloudflare Hyperdrive. Use a Cloudflare-compatible database driver (like `pg` or `@neondatabase/serverless` depending on Hyperdrive compatibility). Make `getBasePrice` and `calculateTotalPrice` async.
* **CORS:** Ensure the Worker responds with appropriate CORS headers to allow requests from the Odoo domain origin.

### Task 3: Smart Zip Code Fallback (PostgreSQL)
We must protect margins in unmapped high-cost zones.
* **Requirement:** Modify the new async `pricingEngine.js`. 
* **Action:** If an exact 5-digit zip code is missing, use Postgres SQL (`SELECT AVG(price_regular) FROM pricing WHERE CAST(zip_code AS TEXT) LIKE $1`) to average the base prices of zip codes sharing the same first 3 digits (the SCF prefix). Use this as the dynamic fallback.

### Task 4: Patch Python Extraction Scripts for Postgres
Our old scraping scripts write to local SQLite. They must target the new Odoo database.
* **Requirement:** Inspect `scripts/extract_pricing.py` (and relevant catalog extractors).
* **Action:** Swap the SQLite connection logic for `psycopg2` or `asyncpg`. Have the scripts accept a `DATABASE_URL` environment variable to write scraped data directly to the remote Odoo PostgreSQL database. 

### Task 5: Odoo Micro-Frontend Build Pipeline
The React app must be built to live inside Odoo.
* **Requirement:** Modify `web-demo/frontend/vite.config.ts`.
* **Action:** Configure Vite to output a single, predictable JS file and CSS file (disable hashing if possible). Change the output directory (`outDir`) so that Vite builds directly into `../../odoo_module/junk_pricing/static/src/` (or the appropriate structure for the existing Odoo module). Ensure API calls in the React app point to the new Cloudflare Worker URL.

## CONSTRAINTS & SUCCESS CRITERIA
1. **Execution Order:** Do NOT write the Cloudflare Worker code until you have completed Task 1 and received the user's Hyperdrive ID.
2. **Backward Compatibility:** Update `scenarioRunner.js` and tests to use `await calculateTotalPrice()`.
3. **Pure PostgreSQL:** Strictly use Postgres queries via Hyperdrive.