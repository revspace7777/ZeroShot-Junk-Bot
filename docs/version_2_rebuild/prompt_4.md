# Phase 4 Mega-Prompt: Production Deployment & Odoo Embedding

## CONTEXT
Phase 3 is complete. The backend engine, Vision API, and Postgres logging are highly robust. The user now wants to deploy the system to production. 

**The Goal:** The React UI must be embedded directly into the Odoo website at the specific route: `admin.revspace.net/junkbot`. The API will run on Cloudflare Workers using Hyperdrive.

## OBJECTIVES & TASKS

### Task 1: Odoo Controller Routing
We need to create the specific `/junkbot` route in Odoo that will serve our React Micro-Frontend.
* **File:** Modify `odoo_module/junk_pricing/controllers/main.py`.
* **Action:** Add a new `@http.route('/junkbot', type='http', auth='public', website=True)` controller method. This method should simply render a new XML template (e.g., `junk_pricing.react_widget_page`).

### Task 2: Odoo XML Template (The Widget Injector)
We need an Odoo view that loads the compiled Vite assets.
* **File:** Modify `odoo_module/junk_pricing/views/templates.xml` (or create a new one).
* **Action:** Define the `react_widget_page` template. 
  1. It should extend Odoo's base website layout (`website.layout`).
  2. Inside the `<t t-call="website.layout">`, create a container `div` with `id="root"` (where React will mount).
  3. Inject the `<script>` tag pointing to `/junk_pricing/static/src/pricing-widget.js` and the `<link>` tag for `/junk_pricing/static/src/pricing-widget.css`. 

### Task 3: Cloudflare Worker Deployment Prep
The user needs exact, step-by-step commands to push the worker live and set secrets.
* **Action:** Create a file named `DEPLOYMENT_GUIDE.md` containing the following exact CLI commands for the user:
  1. The command to deploy the worker (`npx wrangler deploy`).
  2. The command to set the OpenAI secret securely (`npx wrangler secret put OPENAI_API_KEY`).
  3. A checklist reminding the user to update `web-demo/frontend/.env` to point `VITE_API_BASE` to the new production `.workers.dev` URL, and to re-run the Vite build (`npm run build`) so the updated JS is copied into the Odoo static folder.

### Task 4: Database Whitelisting Reminder
If the Cloudflare Worker throws a "Connection Refused" error, it is because the Odoo VPS is blocking Cloudflare.
* **Action:** Add a section to `DEPLOYMENT_GUIDE.md` explaining how the user must update their Odoo VPS `pg_hba.conf` and `ufw`/iptables to allow external connections from Cloudflare's IP ranges to port `5432`.

## CONSTRAINTS
* Do NOT attempt to rewrite the React UI right now. We are strictly focusing on the deployment and routing pipeline.
* Ensure the Odoo XML template defers the script loading appropriately so it doesn't block the Odoo header/footer from rendering.