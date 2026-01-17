# Handoff: Database Migration for Netlify Deployment

## Current Situation

**Project**: Local Guys Junk Removal (formerly ZeroShot Junk Bot)
- **Live Site**: https://zeroshot-junk-bot.netlify.app (frontend deployed, backend failing)
- **Issue**: SQLite database (18MB) cannot be bundled with Netlify serverless functions
- **Error**: "Failed to connect to backend" on live site

## What's Working

✅ Frontend deployed successfully to Netlify
✅ Local development works perfectly (`localhost:5173` + `localhost:8000`)
✅ Rebranding to "Local Guys Junk Removal" complete
✅ Mobile-optimized UI with Chainlink Blue (#0846f6) theme

## What's Broken

❌ Backend API on Netlify (serverless functions can't access SQLite database)
❌ Database needs to be migrated to cloud-hosted solution

## Attempted Solutions

1. **Turso (libSQL)** - Attempted but complex:
   - Created database: `local-guys-junk-removal-revspace.aws-us-east-2.turso.io`
   - Auth token available in `web-demo/.env`
   - Problem: 21MB SQL dump too large for web interface import
   - Turso CLI installation failed on Windows

2. **Updated Code** (ready for cloud DB):
   - `web-demo/main.py` - Modified to use HTTP API for Turso
   - Environment variables configured in `web-demo/.env`
   - `netlify.toml` - Removed database bundling

## Recommended Next Steps

### Option 1: Cloudflare D1 (Recommended)
User has Cloudflare account. D1 is simpler:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create local-guys-junk-removal

# Import data (use the generated SQL dump)
wrangler d1 execute local-guys-junk-removal --file=data/turso_import.sql

# Get database ID and update code
```

### Option 2: Complete Turso Setup
Use Turso CLI to import the database:

```bash
# Install Turso CLI (try alternative method)
# Import database
turso db shell local-guys-junk-removal < data/turso_import.sql
```

## Key Files

- **Database**: `data/goloadup_consolidated.db` (18.4 MB, 109,874 rows)
- **SQL Dump**: `data/turso_import.sql` (21 MB - generated for import)
- **Backend**: `web-demo/main.py` (FastAPI, ready for cloud DB)
- **Frontend**: `web-demo/frontend/` (React + Vite)
- **Config**: `netlify.toml`, `web-demo/.env`

## Environment Variables Needed (Netlify)

Once database is migrated, add to Netlify:
```
TURSO_DATABASE_URL=<your-database-url>
TURSO_AUTH_TOKEN=<your-auth-token>
```
OR for D1:
```
D1_DATABASE_ID=<your-d1-id>
CLOUDFLARE_ACCOUNT_ID=<your-account-id>
CLOUDFLARE_API_TOKEN=<your-api-token>
```

## Goal

Get the backend API working on Netlify by migrating the SQLite database to a cloud-hosted solution (Cloudflare D1 or Turso), then update the code to connect to it.

## Repository

- **GitHub**: Connected to Netlify (auto-deploys on push to main)
- **Local**: `c:\Users\samso\_cursor_projects\ZeroShot Junk Bot\ZeroShot-Junk-Bot`
