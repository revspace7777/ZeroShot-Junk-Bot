# Handoff: Neon (Postgres) Migration Complete

## Status
- **Backend**: Migrated to Neon (PostgreSQL). Code pushed to `main`.
- **Deployment**: Netlify build triggered.
- **Data**: Migration script running locally (filling the remote DB).
  - **Progress**: ~12,000 / 109,874 rows (11%) as of last check.
  - **ETA**: ~30 mins to complete.

## Configuration
- **Database**: Neon (Postgres)
- **Repo**: `web-demo/main.py` updated to use `psycopg2`.
- **Environment**:
  - `DATABASE_URL` set in Netlify Site Configuration.
  - `requirements.txt` includes `psycopg2-binary`.

## Changes Made
1.  **Dependencies**: Added `psycopg2-binary` to `requirements.txt`.
2.  **Code**: Refactored `main.py` to use `psycopg2` for DB connections and adapted SQL queries/parsing.
3.  **Migration**: Created `scripts/migrate_to_neon.py` to upload local SQLite data to Neon.

## Next Session
- Verify the full data set has been uploaded (check for 109874 rows).
- Verify the live Netlify site APIs are responding correctly.

## Credentials
- **Neon URL**: `postgresql://neondb_owner:...@ep-little-firefly-ahl7q0i5-pooler.c-3.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require` (Set in Netlify).
