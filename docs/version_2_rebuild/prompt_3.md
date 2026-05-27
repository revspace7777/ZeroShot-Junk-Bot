# Phase 3 Mega-Prompt: Alias Logger Patch & Vision Integration

## CONTEXT
Phase 2.6 is complete. The Cloudflare Worker, Hyperdrive, and Odoo Postgres integrations are phenomenal. However, we need to patch the `aliasLogger` before we move on to Image Uploads.

## OBJECTIVES & TASKS

### Task 1: Patch `aliasLogger.js` for Postgres
The `fs` module was correctly removed for Cloudflare compatibility, but we cannot lose the unmapped alias data.
* **Action:** Refactor `src/extraction/aliasLogger.js`. Instead of writing to a file, it must execute a SQL `INSERT` into the Postgres database. 
* **SQL:** `INSERT INTO unmapped_aliases (input, reason, created_at) VALUES ($1, $2, NOW())`
* **Note:** Ensure a lightweight migration script (or a `CREATE TABLE IF NOT EXISTS` block in a setup file) exists to create the `unmapped_aliases` table in the Odoo Postgres database.

### Task 2: Vision API Endpoint (Cloudflare Worker)
We need a new endpoint to handle image uploads and pass them to a Vision LLM.
* **File:** Modify `cloudflare-worker/src/index.js` (or create a new route if using a router).
* **Requirements:**
  1. Accept a `POST /api/vision` request containing a base64 encoded image and a `zipCode`.
  2. Call OpenAI `gpt-4o` (or Claude 3.5 Sonnet) via standard `fetch` API (since official SDKs can sometimes be bulky in V8 isolates). Use a standard API key environment variable.
  3. **Strict System Prompt:** Instruct the LLM: *"You are an object detector for a junk removal company. List the bulky junk items you see in this image. Output ONLY a comma-separated list of items (e.g., 'refrigerator, 3 piece sectional couch, mattress'). Do not include conversational text, volume estimations, or prices."*
  4. Take the resulting text string from the LLM, pass it into our existing `processRequest(text)` and `await calculateTotalPrice(items, zipCode)` pipeline.
  5. Return the exact same JSON response format as our current `/api/quote` endpoint.

### Task 3: React UI Image Upload
Update the frontend to allow image uploads alongside the text input.
* **File:** Modify `web-demo/frontend/src/App.tsx`.
* **Requirements:**
  1. Add a visually appealing "Upload Image" icon/button next to the main text input field.
  2. Compress the image on the client side (using a canvas element or lightweight library) before converting to base64 to save bandwidth.
  3. Show a thumbnail preview in the UI when an image is selected.
  4. Post the base64 string to the new `/api/vision` worker endpoint.
  5. Display a loading state: "Analyzing image for bulky items..."
  6. The resulting quote should render seamlessly in the exact same UI component as the text-based quotes, triggering disambiguation prompts if the LLM's text output was ambiguous.

## CONSTRAINTS & SUCCESS CRITERIA
1. **Zero Hallucinated Prices:** The Vision LLM must NEVER be asked to calculate price. It only converts pixels to text.
2. **Postgres Logging:** Ensure `aliasLogger` gracefully fails without crashing the worker if the DB insert fails.