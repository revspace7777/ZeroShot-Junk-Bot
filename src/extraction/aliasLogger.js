/**
 * @module aliasLogger
 * @description Logs raw input strings that fail NLP extraction (unmapped aliases).
 *   This data is used to continuously improve the catalog's aliases and NLP rules.
 */

import { appendFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOG_FILE = join(__dirname, '..', '..', 'data', 'unmapped_aliases.jsonl');

/**
 * Logs a raw input string that failed to map to a catalog item.
 * @param {string} input - The raw natural language input.
 * @param {string} reason - The reason it failed (e.g., 'No confident match found').
 */
function logUnmappedAlias(input, reason) {
  if (!input || input.trim() === '') return;

  const entry = {
    timestamp: new Date().toISOString(),
    input: input.trim(),
    reason: reason
  };

  try {
    appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n');
  } catch (err) {
    console.error('Failed to write to unmapped_aliases.jsonl:', err);
  }
}

export { logUnmappedAlias };
