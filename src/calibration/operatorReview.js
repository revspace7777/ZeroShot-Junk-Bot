/**
 * @module operatorReview
 * @description Interactive CLI tool for operator review of generated quotes.
 *   Reads unreviewed quotes from data/quote-log.jsonl, presents each one with
 *   a full price breakdown, and collects structured feedback that is appended
 *   to data/operator-feedback.jsonl.
 *
 *   Usage: node src/calibration/operatorReview.js
 *          npm run review
 *
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { createInterface } from 'readline';
import { appendFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getUnreviewedQuotes } from './quoteLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FEEDBACK_PATH = join(__dirname, '..', '..', 'data', 'operator-feedback.jsonl');

/**
 * Load all existing feedback entries.
 * @returns {Array<Object>}
 */
function loadFeedback() {
  if (!existsSync(FEEDBACK_PATH)) return [];
  const content = readFileSync(FEEDBACK_PATH, 'utf-8').trim();
  if (!content) return [];
  return content.split('\n').map(line => JSON.parse(line));
}

/**
 * Save a single feedback entry (append to JSONL).
 * @param {Object} entry
 */
function saveFeedback(entry) {
  appendFileSync(FEEDBACK_PATH, JSON.stringify(entry) + '\n', 'utf-8');
}

/**
 * Format a currency value.
 * @param {number} val
 * @returns {string}
 */
function fmt(val) {
  return `$${Number(val).toFixed(2)}`;
}

/**
 * Display a single quote with full breakdown.
 * @param {Object} quote
 * @param {number} index - Current position (1-based)
 * @param {number} total - Total unreviewed count
 */
function displayQuote(quote, index, total) {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`  QUOTE REVIEW  [${index} of ${total}]`);
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`  Quote ID:   ${quote.quoteId}`);
  console.log(`  Timestamp:  ${quote.timestamp}`);
  console.log(`  Zip Code:   ${quote.zipCode}`);

  if (quote.inputText) {
    console.log(`  Input:      "${quote.inputText}"`);
  }
  if (quote.scenarioId) {
    console.log(`  Scenario:   ${quote.scenarioId}`);
  }

  console.log('');
  console.log('  ─── ITEMS ──────────────────────────────────────────────────────');

  if (quote.extractedItems && quote.extractedItems.length > 0) {
    for (const item of quote.extractedItems) {
      const name = item.itemType?.name || item.name || 'Unknown';
      const price = item.pickupUnitPrice || item.unitPrice || 0;
      const qty = item.quantity || 1;
      const subtotal = item.pickupSubtotal || (price * qty);
      console.log(`  • ${name}`);
      console.log(`    ${fmt(price)} × ${qty} = ${fmt(subtotal)}`);
    }
  } else {
    console.log('  (no priced items)');
  }

  if (quote.unresolvedItems && quote.unresolvedItems.length > 0) {
    console.log('');
    console.log('  ─── UNRESOLVED ITEMS ───────────────────────────────────────────');
    for (const item of quote.unresolvedItems) {
      console.log(`  ⚠ ${item.name || item.id} — ${item.reason}`);
    }
  }

  console.log('');
  console.log('  ─── PRICE BREAKDOWN ────────────────────────────────────────────');
  console.log(`  Item Subtotal:  ${fmt(quote.itemSubtotal)}`);
  console.log(`  Base Price:     ${fmt(quote.basePrice)}`);
  console.log(`  Order Total:    ${fmt(quote.itemSubtotal + quote.basePrice)}`);
  if (quote.minimumPriceApplied) {
    console.log(`  Minimum Applied: YES`);
  }
  console.log(`  ─────────────────────`);
  console.log(`  TOTAL:          ${fmt(quote.total)}`);
  console.log('');
}

/**
 * Prompt the user for input via readline.
 * @param {import('readline').Interface} rl
 * @param {string} question
 * @returns {Promise<string>}
 */
function ask(rl, question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer.trim());
    });
  });
}

/**
 * Run the interactive operator review CLI.
 */
async function runReview() {
  const feedback = loadFeedback();
  const unreviewed = getUnreviewedQuotes(feedback);

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  OPERATOR REVIEW — Quote Feedback Collection');
  console.log('═══════════════════════════════════════════════════════════════════');

  if (unreviewed.length === 0) {
    console.log('');
    console.log('  ✓ No unreviewed quotes. Run "npm run scenarios" to generate some.');
    console.log('');
    return;
  }

  console.log(`  ${unreviewed.length} quote(s) awaiting review.`);
  console.log('  Type "quit" at any prompt to stop.');

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let reviewed = 0;

  for (let i = 0; i < unreviewed.length; i++) {
    const quote = unreviewed[i];
    displayQuote(quote, i + 1, unreviewed.length);

    // --- Accept/Reject ---
    let accepted = null;
    while (accepted === null) {
      const answer = await ask(rl, '  Would you accept this job at this price? (Y/N/quit): ');
      if (answer.toLowerCase() === 'quit') {
        console.log(`\n  Session ended. ${reviewed} quote(s) reviewed.\n`);
        rl.close();
        return;
      }
      if (answer.toUpperCase() === 'Y') accepted = true;
      else if (answer.toUpperCase() === 'N') accepted = false;
      else console.log('  Please enter Y, N, or quit.');
    }

    // --- Expected price ---
    let expectedPrice = quote.total;
    const priceAnswer = await ask(
      rl,
      `  What should the correct price be? (Enter to accept ${fmt(quote.total)}, or type a number): `
    );
    if (priceAnswer.toLowerCase() === 'quit') {
      console.log(`\n  Session ended. ${reviewed} quote(s) reviewed.\n`);
      rl.close();
      return;
    }
    if (priceAnswer !== '') {
      const parsed = parseFloat(priceAnswer.replace(/[$,]/g, ''));
      if (!isNaN(parsed) && parsed >= 0) {
        expectedPrice = parsed;
      } else {
        console.log(`  Could not parse "${priceAnswer}" as a price. Using quoted price.`);
      }
    }

    // --- Notes ---
    const notes = await ask(rl, '  Notes (optional, or Enter to skip): ');
    if (notes.toLowerCase() === 'quit') {
      console.log(`\n  Session ended. ${reviewed} quote(s) reviewed.\n`);
      rl.close();
      return;
    }

    // --- Save feedback ---
    const entry = {
      quoteId: quote.quoteId,
      reviewedAt: new Date().toISOString(),
      accepted,
      quotedPrice: quote.total,
      expectedPrice,
      priceDelta: expectedPrice - quote.total,
      notes: notes || '',
      operatorId: 'operator-1',
    };

    saveFeedback(entry);
    reviewed++;

    console.log('');
    console.log(`  ✓ Feedback saved. (${accepted ? 'ACCEPTED' : 'REJECTED'}, expected ${fmt(expectedPrice)}, Δ ${entry.priceDelta >= 0 ? '+' : ''}${fmt(entry.priceDelta)})`);
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(`  ✓ All ${reviewed} quote(s) reviewed!`);
  console.log('');
  console.log('  Next step: run "npm run calibrate" to analyze feedback.');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');

  rl.close();
}

// Run if executed directly
runReview();

export { runReview, loadFeedback, saveFeedback, FEEDBACK_PATH };
