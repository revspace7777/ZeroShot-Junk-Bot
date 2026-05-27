# Prompt 2: Item Extraction & Ambiguity Handling Engine

## CONTEXT

You are working inside the ZeroShot-Junk-Bot repository. 
In Prompt 1, we successfully built the pricing calibration loop and locked the deterministic pricing engine (`total = max(itemSubtotal + basePrice, minimumPrice)`). 

However, we are missing the core intelligence of the system (per Master Plan §7 and §9.1): **Mapping messy user input to correct catalog items.**
Currently, quotes can only be generated if the exact catalog item ID is known. We need a robust extraction layer to interpret natural language. Furthermore, the zip code logic is currently hardcoded to 18 Georgia zips, whereas our actual service area spans 40,000+ zips.

## OBJECTIVE

Design and implement a conservative, highly reliable item extraction and disambiguation layer. 

1. **Item Extraction:** Map natural language input (e.g., "old couch and a fridge") to specific catalog items (e.g., `7412` and `8002`).
2. **Ambiguity Handling:** Detect when user input is too broad (e.g., "table") and request clarification rather than guessing.
3. **Zip Code Expansion:** Connect the pricing engine to the full `serviceable_zips.json` dataset to provide accurate base prices.

## REQUIREMENTS

### 1. Item Extraction Layer
Create `/src/extraction/itemMatcher.js`.
- Must leverage the existing catalog's `aliases`, `slug`, and `name` fields to match inputs.
- You may use a fuzzy matching algorithm (e.g., Levenshtein distance, token overlap) or a simple rule-based NLP approach.
- **Rule:** Do NOT use external LLM APIs (like OpenAI) if a deterministic matching algorithm can achieve 80%+ accuracy on standard items. If an LLM is strictly necessary, it must output *only* catalog IDs, and the pricing engine must still handle the pricing math.

### 2. Disambiguation Engine
Create `/src/extraction/disambiguation.js`.
- When an input term matches multiple distinct catalog items with varying prices (e.g., "table" matches "Coffee Table" $25, "Dining Table" $75, "Pool Table" $300), the system must flag the item as `needsClarification` and provide the list of possible matches.
- This integrates directly with the `unresolvedItems` logic built in Prompt 1.

### 3. Zip Code Integration
Update `/src/pricing/pricingEngine.js`.
- Remove the hardcoded 18 Georgia zip codes.
- Load base pricing logic from the SQLite database (`goloadup.db`) or `serviceable_zips.json`. 
- Ensure that an unrecognized zip code gracefully falls back to an "Out of Service Area" error rather than a silent default price.

### 4. Expanded Test Scenarios
Update `/src/calibration/scenarioRunner.js`.
- Add 30+ new scenarios representing messy, ambiguous, and edge-case natural language inputs (e.g., "a bunch of trash", "pool table", "heavy fridge").
- Ensure the extraction layer successfully processes these scenarios and that the ambiguity engine correctly flags vague requests.

## STRICT CONSTRAINTS
- **No changes to pricing math.** The pricing formula is locked.
- **No volume estimation.** Do not attempt to price "half a truckload" based on items.
- Keep the system modular, testable, and deterministic where possible.

## SUCCESS CONDITION
Running `npm run scenarios` with messy natural language strings correctly extracts items, flags ambiguities, assigns accurate regional base prices, and successfully logs the quotes for operator review.
