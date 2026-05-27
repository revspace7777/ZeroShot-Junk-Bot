/**
 * @module aliasLogger
 * @description Logs raw input strings that fail NLP extraction (unmapped aliases).
 *   This data is used to continuously improve the catalog's aliases and NLP rules.
 */

import pg from 'pg';

let _tableCreated = false;

/**
 * Ensures the unmapped_aliases table exists.
 * @param {pg.Client} client 
 */
async function ensureTableExists(client) {
  if (_tableCreated) return;
  await client.query(`
    CREATE TABLE IF NOT EXISTS unmapped_aliases (
      id SERIAL PRIMARY KEY,
      input TEXT NOT NULL,
      reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  _tableCreated = true;
}

/**
 * Logs a raw input string that failed to map to a catalog item.
 * @param {string} input - The raw natural language input.
 * @param {string} reason - The reason it failed (e.g., 'No confident match found').
 * @param {string} [connectionString] - Optional DB connection string.
 */
async function logUnmappedAlias(input, reason, connectionString) {
  if (!input || input.trim() === '') return;

  const connStr = connectionString || process.env.DATABASE_URL;
  
  if (!connStr) {
    // Graceful fallback if no DB connection string is available
    console.warn('UNMAPPED_ALIAS (No DB connection):', JSON.stringify({ input, reason }));
    return;
  }

  const client = new pg.Client(connStr);
  
  try {
    await client.connect();
    await ensureTableExists(client);
    await client.query(
      'INSERT INTO unmapped_aliases (input, reason, created_at) VALUES ($1, $2, NOW())',
      [input.trim(), reason]
    );
  } catch (err) {
    console.error('Failed to write to unmapped_aliases in Postgres:', err.message);
  } finally {
    try {
      await client.end();
    } catch(e) {}
  }
}

export { logUnmappedAlias };
