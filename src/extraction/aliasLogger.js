/**
 * @module aliasLogger
 * @description Logs raw input strings that fail NLP extraction (unmapped aliases).
 *   This data is used to continuously improve the catalog's aliases and NLP rules.
 */

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

let _logFile = null;

try {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  _logFile = path.join(__dirname, '..', '..', 'data', 'unmapped_aliases.jsonl');
} catch (e) {
  // Not in a standard Node.js file:// environment (e.g., Cloudflare Workers)
}

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

  if (_logFile && fs && fs.appendFileSync) {
    try {
      fs.appendFileSync(_logFile, JSON.stringify(entry) + '\n');
    } catch (err) {
      console.error('Failed to write to unmapped_aliases.jsonl:', err);
    }
  } else {
    // In Cloudflare Workers, we log to stdout (which is captured by Cloudflare Logs)
    console.warn('UNMAPPED_ALIAS:', JSON.stringify(entry));
  }
}

export { logUnmappedAlias };
