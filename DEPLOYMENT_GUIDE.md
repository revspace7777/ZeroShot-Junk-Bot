# Junkbot Phase 4 Deployment Guide

This guide walks you through deploying the Junkbot pricing engine to production, hooking up the React Micro-Frontend into the Odoo website, and configuring necessary security allowlists.

## Section 1: Cloudflare Worker Deployment

The core API is powered by a Cloudflare Worker using Hyperdrive for database connections.

1. **Deploy the Worker**
   Navigate to the `cloudflare-worker` directory (if separate) or the root, and deploy the worker to your Cloudflare account:
   ```bash
   npx wrangler deploy
   ```

2. **Set the OpenAI API Key**
   For the Vision API to work, the worker needs your OpenAI API key. Do **not** put this in a `.env` file that is checked into git. Instead, upload it securely as a Cloudflare Worker secret:
   ```bash
   npx wrangler secret put OPENAI_API_KEY
   ```
   *You will be prompted to paste your secret key.*

## Section 2: React Frontend Build Checklist

The React UI needs to know the production URL of the deployed Cloudflare Worker API.

1. **Update Environment Variables**
   Open `web-demo/frontend/.env` (or `.env.production`) and update the `VITE_API_BASE` to point to the newly deployed `.workers.dev` URL.
   ```env
   VITE_API_BASE="https://<your-worker-name>.<your-subdomain>.workers.dev"
   ```

2. **Build the Assets for Odoo**
   Re-run the Vite build script to compile the Javascript and CSS. Ensure Vite is configured to output `pricing-widget.js` and `pricing-widget.css` directly into the `odoo_module/junk_pricing/static/src/` folder.
   ```bash
   cd web-demo/frontend
   npm run build
   ```

## Section 3: Database Whitelisting (Crucial)

If you see "Connection Refused" errors when the Cloudflare Worker tries to access the PostgreSQL database, it means your Odoo VPS is blocking external requests. Cloudflare uses dynamic IP ranges.

You must allow Cloudflare's IP ranges to hit port `5432` on your VPS.

1. **Update `pg_hba.conf`**
   Add entries for Cloudflare's IPv4 and IPv6 ranges.
   ```text
   # Allow Cloudflare IPv4 ranges
   host    all             all             173.245.48.0/20         md5
   host    all             all             103.21.244.0/22         md5
   host    all             all             103.22.200.0/22         md5
   host    all             all             103.31.4.0/22           md5
   host    all             all             141.101.64.0/18         md5
   host    all             all             108.162.192.0/18        md5
   host    all             all             190.93.240.0/20         md5
   host    all             all             188.114.96.0/20         md5
   host    all             all             197.234.240.0/22        md5
   host    all             all             198.41.128.0/17         md5
   host    all             all             162.158.0.0/15          md5
   host    all             all             104.16.0.0/13           md5
   host    all             all             104.24.0.0/14           md5
   host    all             all             172.64.0.0/13           md5
   host    all             all             131.0.72.0/22           md5
   ```
   *Restart PostgreSQL after editing this file: `sudo systemctl restart postgresql`*

2. **Update Firewall (`ufw`)**
   You also need to open the UFW firewall. You can script this or run them manually:
   ```bash
   sudo ufw allow from 173.245.48.0/20 to any port 5432
   sudo ufw allow from 103.21.244.0/22 to any port 5432
   sudo ufw allow from 103.22.200.0/22 to any port 5432
   sudo ufw allow from 103.31.4.0/22 to any port 5432
   sudo ufw allow from 141.101.64.0/18 to any port 5432
   sudo ufw allow from 108.162.192.0/18 to any port 5432
   sudo ufw allow from 190.93.240.0/20 to any port 5432
   sudo ufw allow from 188.114.96.0/20 to any port 5432
   sudo ufw allow from 197.234.240.0/22 to any port 5432
   sudo ufw allow from 198.41.128.0/17 to any port 5432
   sudo ufw allow from 162.158.0.0/15 to any port 5432
   sudo ufw allow from 104.16.0.0/13 to any port 5432
   sudo ufw allow from 104.24.0.0/14 to any port 5432
   sudo ufw allow from 172.64.0.0/13 to any port 5432
   sudo ufw allow from 131.0.72.0/22 to any port 5432
   sudo ufw reload
   ```

*Note: For the most up-to-date Cloudflare IP ranges, visit https://www.cloudflare.com/ips/*
