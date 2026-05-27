/**
 * @module quoteLogger
 * @description Append-only quote logger. Every generated quote is logged to
 *   data/quote-log.jsonl in JSON Lines format (one JSON object per line).
 *   This creates the audit trail needed for operator review and calibration.
 * 
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { appendFileSync, existsSync, readFileSync } from 'fs';
import { randomUUID } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOG_PATH = join(__dirname, '..', '..', 'data', 'quote-log.jsonl');

/**
 * Log a quote to the JSONL log file.
 * 
 * @param {Object} params
 * @param {string} [params.inputText] - Original user description (if any)
 * @param {string} params.zipCode - Zip code used for pricing
 * @param {Array<Object>} params.extractedItems - Items that were priced
 * @param {Array<Object>} [params.unresolvedItems] - Items that couldn't be priced
 * @param {number} params.itemSubtotal - Sum of item prices
 * @param {number} params.basePrice - Zip-based base price
 * @param {number} params.total - Final total after minimum applied
 * @param {boolean} params.minimumPriceApplied - Whether minimum was applied
 * @param {string} [params.scenarioId] - ID of the test scenario (if from scenarioRunner)
 * @returns {{ quoteId: string, timestamp: string }} The generated quote ID and timestamp
 */
function logQuote({
  inputText = '',
  zipCode,
  extractedItems,
  unresolvedItems = [],
  itemSubtotal,
  basePrice,
  total,
  minimumPriceApplied,
  scenarioId = null,
}) {
  const quoteId = randomUUID();
  const timestamp = new Date().toISOString();

  const entry = {
    quoteId,
    timestamp,
    inputText,
    zipCode,
    extractedItems,
    unresolvedItems,
    itemSubtotal,
    basePrice,
    total,
    minimumPriceApplied,
    scenarioId,
  };

  appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n', 'utf-8');

  return { quoteId, timestamp };
}

/**
 * Read all logged quotes.
 * @returns {Array<Object>} All quote entries
 */
function readQuoteLog() {
  if (!existsSync(LOG_PATH)) return [];
  const content = readFileSync(LOG_PATH, 'utf-8').trim();
  if (!content) return [];
  return content.split('\n').map(line => JSON.parse(line));
}

/**
 * Get quotes that haven't been reviewed yet.
 * Requires the feedback log path to cross-reference.
 * 
 * @param {Array<Object>} feedbackEntries - Already-collected feedback entries
 * @returns {Array<Object>} Quotes without matching feedback
 */
function getUnreviewedQuotes(feedbackEntries) {
  const quotes = readQuoteLog();
  const reviewedIds = new Set(feedbackEntries.map(f => f.quoteId));
  return quotes.filter(q => !reviewedIds.has(q.quoteId));
}

/**
 * Get the log file path (for external tools).
 * @returns {string}
 */
function getLogPath() {
  return LOG_PATH;
}

export {
  logQuote,
  readQuoteLog,
  getUnreviewedQuotes,
  getLogPath,
  LOG_PATH,
};
