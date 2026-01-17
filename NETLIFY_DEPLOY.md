# Netlify Deployment Configuration

This project is configured to deploy to Netlify with the following setup:

## Architecture

- **Frontend**: React + Vite (Static Site Generation)
- **Backend**: FastAPI (Serverless Functions via Netlify Functions)
- **Database**: SQLite (18.4 MB - included in deployment)

## Build Configuration

The `netlify.toml` file configures:
- Build directory: `web-demo/frontend`
- Publish directory: `dist`
- API redirects: `/api/*` → `/.netlify/functions/api`

## Environment Variables

For local development, copy `.env.example` to `.env` in `web-demo/frontend/`:

```bash
VITE_API_BASE=http://localhost:8000/api
```

In production (Netlify), the API automatically uses `/api` (no environment variable needed).

## Deployment Steps

### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will auto-detect the `netlify.toml` configuration
4. Deploy!

## Important Notes

- The SQLite database (`data/goloadup_consolidated.db`) is **read-only** in production
- For write operations, consider migrating to a cloud database (e.g., PlanetScale, Supabase)
- The database is ~18 MB and will be included in each serverless function cold start

## Local Development

```bash
# Terminal 1: Start backend
cd web-demo
python main.py

# Terminal 2: Start frontend
cd web-demo/frontend
npm run dev
```

## Production URL Structure

- **Frontend**: `https://your-site.netlify.app/`
- **API**: `https://your-site.netlify.app/api/validate-zip/30345`
