# Phase 2.5 Mega-Prompt: Fortification, Database Migration, and UI Integration

## CONTEXT
We have successfully completed Phase 2. The deterministic pricing engine, NLP catalog extraction, and calibration loops are functional via CLI. 

However, we need to fortify the business logic against edge cases, migrate off local SQLite, and connect the core engine to the existing React frontend so we can validate the UX.

## OBJECTIVES & TASKS

### Task 1: Fortify NLP Extraction (The "Alias" Blindspot)
Currently, if a user inputs a term completely missing from our catalog aliases (e.g., "chesterfield" instead of "couch"), the system returns `needsClarification`. We need a way to learn from this.
* **Requirement:** Modify `itemMatcher.js` or `disambiguation.js` so that whenever an item falls into the `unresolvedItems` / `needsClarification` bucket, the raw input string is logged to a new file `data/unmapped_aliases.json` (or a database table). 
* **Goal:** This will allow operators to manually review failed extractions and map them to existing catalog IDs, continuously expanding the engine's vocabulary.

### Task 2: Smart Zip Code Fallback
Currently, if a serviceable zip code is missing from the database, the system defaults to a hardcoded `$59`. In high-cost areas, this causes margin loss.
* **Requirement:** Modify `pricingEngine.js`. If an exact 5-digit zip code is not found in the database but is in `serviceable_zips.json`, the system should query the database for other zip codes that share the same **first 3 digits** (the SCF prefix).
* **Goal:** Average the base prices of the matching SCF prefix group to create a dynamic, localized fallback price instead of a hardcoded national default.

### Task 3: Database Migration (Drop Local SQLite)
We cannot go to production with `better-sqlite3` accessing a local file.
* **Requirement:** Remove `better-sqlite3` dependency from the core runtime. 
* **Action:** Refactor `pricingEngine.js` to connect to our remote production database. *(Note to Agent: Review the repository for Postgres/Neon or Turso credentials/configs. Implement the remote connection logic natively using standard async database drivers like `pg` or `@libsql/client`)*.

### Task 4: UI & API Integration
We need to see this working visually.
* **Requirement:** Inspect the existing React frontend located in `web-demo/frontend/`.
* **Action:** Create a lightweight API layer (e.g., Express or a serverless function, depending on our existing deployment configs like `netlify/functions/`) that exposes the `pricingEngine.js` `calculateTotalPrice` method. 
* **Frontend Wiring:** Update the React app to send natural language text to this API, and render the itemized breakdown. Crucially, the UI must handle the `needsClarification` response by displaying a "Did you mean?" disambiguation prompt to the user when ambiguity is detected.

## CONSTRAINTS & SUCCESS CRITERIA
1. **No AI in the core loop:** Keep all extractions deterministic. 
2. **Backward Compatibility:** All existing unit tests and the `npm run review` CLI tool must continue to work with the new database connection and fallback logic.
3. **Execution:** Proceed sequentially. Fix the DB and Logic first, ensure tests pass, then wire the API and React frontend.