# Turso Database Migration Guide

## Step 1: Create Turso Account & Database

1. Go to https://turso.tech and sign in with GitHub
2. Click "Create Database"
3. Name it: `local-guys-junk-removal`
4. Select region closest to you
5. Click "Create"

## Step 2: Upload Your SQLite Database

```bash
# Install Turso CLI (alternative method)
# Download from: https://github.com/tursodatabase/turso-cli/releases

# Or use the web interface:
# 1. In Turso dashboard, click on your database
# 2. Click "Import Data"
# 3. Upload: data/goloadup_consolidated.db
```

## Step 3: Get Connection Credentials

In the Turso dashboard for your database, you'll see:
- **Database URL**: `libsql://[your-db].turso.io`
- **Auth Token**: Click "Create Token" → Copy the token

## Step 4: Add to Netlify Environment Variables

Go to Netlify → Site Settings → Environment Variables:

```
TURSO_DATABASE_URL=libsql://local-guys-junk-removal-[your-org].turso.io
TURSO_AUTH_TOKEN=[your-auth-token]
```

## Step 5: I'll Update the Code

Once you provide the credentials, I'll:
1. Install `libsql-client` Python package
2. Update `main.py` to use Turso instead of local SQLite
3. Test locally with your credentials
4. Deploy to Netlify

---

**Ready?** Please:
1. Create the Turso database
2. Upload the SQLite file
3. Share the Database URL and Auth Token with me
