# Turso Database Import Script
# This script will dump your local SQLite database and import it to Turso

# Step 1: Install Turso CLI
# Run this in PowerShell:
# iwr -useb https://turso.tech/install.ps1 | iex

# Step 2: Login to Turso
# turso auth login

# Step 3: Import the database
# Run from the project root:

# Export your local SQLite to SQL dump
sqlite3 data/goloadup_consolidated.db .dump > data/dump.sql

# Import to Turso
turso db shell local-guys-junk-removal < data/dump.sql

# Alternative: Use the Turso CLI to create and populate
# turso db create local-guys-junk-removal --from-file data/goloadup_consolidated.db

# Verify the import
turso db shell local-guys-junk-removal "SELECT COUNT(*) FROM pricing;"
