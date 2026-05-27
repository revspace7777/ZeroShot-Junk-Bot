/**
 * @module calibrationEngine
 * @description Analyzes accumulated operator feedback to identify catalog items
 *   that are consistently mispriced. Generates adjustment suggestions and writes
 *   a markdown report to reports/pricing-adjustments.md.
 *
 *   STRICT RULES (from Master Plan):
 *   - ONLY adjust catalog item prices
 *   - DO NOT modify the pricing formula
 *   - DO NOT introduce volume logic or ML
 *
 *   Usage: node src/calibration/calibrationEngine.js
 *          npm run calibrate
 *
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readQuoteLog } from './quoteLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FEEDBACK_PATH = join(__dirname, '..', '..', 'data', 'operator-feedback.jsonl');
const REPORT_PATH = join(__dirname, '..', '..', 'reports', 'pricing-adjustments.md');

// --- Thresholds ---
const MIN_REVIEWS = 3;              // Minimum sample size before flagging
const ACCEPTANCE_THRESHOLD = 0.70;  // Flag if acceptance rate below this
const DELTA_THRESHOLD = 10;         // Flag if average |delta| exceeds this ($)

/**
 * Load all feedback entries from disk.
 * @returns {Array<Object>}
 */
function loadFeedback() {
  if (!existsSync(FEEDBACK_PATH)) return [];
  const content = readFileSync(FEEDBACK_PATH, 'utf-8').trim();
  if (!content) return [];
  return content.split('\n').map(line => JSON.parse(line));
}

/**
 * Build a lookup from quoteId to quote details.
 * @returns {Map<string, Object>}
 */
function buildQuoteIndex() {
  const quotes = readQuoteLog();
  const index = new Map();
  for (const q of quotes) {
    index.set(q.quoteId, q);
  }
  return index;
}

/**
 * Determine confidence level based on review count.
 * @param {number} count
 * @returns {'low'|'medium'|'high'}
 */
function confidenceLevel(count) {
  if (count >= 11) return 'high';
  if (count >= 6) return 'medium';
  return 'low';
}

/**
 * Calculate standard deviation of an array of numbers.
 * @param {number[]} arr
 * @returns {number}
 */
function stddev(arr) {
  if (arr.length < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

/**
 * Aggregate feedback data by catalog item.
 * Maps each item ID to its review statistics.
 *
 * @param {Array<Object>} feedback
 * @param {Map<string, Object>} quoteIndex
 * @returns {Map<string, Object>} item ID → aggregated stats
 */
function aggregateByItem(feedback, quoteIndex) {
  const itemStats = new Map();

  for (const fb of feedback) {
    const quote = quoteIndex.get(fb.quoteId);
    if (!quote || !quote.extractedItems) continue;

    // Distribute the delta proportionally across items in the quote
    const itemCount = quote.extractedItems.length;
    if (itemCount === 0) continue;

    // For single-item quotes, the delta attribution is direct.
    // For multi-item quotes, we track overall acceptance but note
    // that per-item delta is approximate.
    for (const item of quote.extractedItems) {
      const itemId = item.itemType?.id || item.id;
      const itemName = item.itemType?.name || item.name || `Item ${itemId}`;
      const unitPrice = item.pickupUnitPrice || item.unitPrice || 0;

      if (!itemStats.has(itemId)) {
        itemStats.set(itemId, {
          itemId,
          itemName,
          currentPrice: unitPrice,
          reviews: 0,
          accepted: 0,
          rejected: 0,
          deltas: [],
          singleItemQuotes: 0,
          directDeltas: [],
          notes: [],
        });
      }

      const stats = itemStats.get(itemId);
      stats.reviews++;
      if (fb.accepted) stats.accepted++;
      else stats.rejected++;

      // If this is a single-item quote, we can attribute the delta directly
      if (itemCount === 1) {
        stats.singleItemQuotes++;
        stats.directDeltas.push(fb.priceDelta);
      }

      stats.deltas.push(fb.priceDelta);

      if (fb.notes) {
        stats.notes.push(fb.notes);
      }
    }
  }

  return itemStats;
}

/**
 * Analyze item stats and identify items needing adjustment.
 *
 * @param {Map<string, Object>} itemStats
 * @returns {{ flagged: Array<Object>, unflagged: Array<Object> }}
 */
function analyzeItems(itemStats) {
  const flagged = [];
  const unflagged = [];

  for (const [, stats] of itemStats) {
    if (stats.reviews < MIN_REVIEWS) {
      unflagged.push({ ...stats, reason: 'insufficient data' });
      continue;
    }

    const acceptanceRate = stats.accepted / stats.reviews;

    // Prefer direct (single-item quote) deltas for accuracy
    const usableDeltas = stats.directDeltas.length >= MIN_REVIEWS
      ? stats.directDeltas
      : stats.deltas;

    const avgDelta = usableDeltas.reduce((a, b) => a + b, 0) / usableDeltas.length;
    const deltaStddev = stddev(usableDeltas);
    const confidence = confidenceLevel(stats.reviews);

    const suggestedPrice = Math.max(0, stats.currentPrice + avgDelta);

    const entry = {
      ...stats,
      acceptanceRate,
      avgDelta,
      deltaStddev,
      confidence,
      suggestedPrice,
      deltaSource: stats.directDeltas.length >= MIN_REVIEWS ? 'direct' : 'distributed',
    };

    const needsFlag =
      acceptanceRate < ACCEPTANCE_THRESHOLD ||
      Math.abs(avgDelta) > DELTA_THRESHOLD;

    if (needsFlag) {
      flagged.push(entry);
    } else {
      unflagged.push(entry);
    }
  }

  // Sort flagged by severity (lowest acceptance rate first, then largest delta)
  flagged.sort((a, b) => {
    if (a.acceptanceRate !== b.acceptanceRate) return a.acceptanceRate - b.acceptanceRate;
    return Math.abs(b.avgDelta) - Math.abs(a.avgDelta);
  });

  return { flagged, unflagged };
}

/**
 * Format a dollar amount.
 * @param {number} val
 * @returns {string}
 */
function fmt(val) {
  const sign = val >= 0 ? '' : '-';
  return `${sign}$${Math.abs(val).toFixed(2)}`;
}

/**
 * Generate the markdown pricing adjustments report.
 *
 * @param {{ flagged: Array<Object>, unflagged: Array<Object> }} analysis
 * @param {Array<Object>} feedback - All feedback entries
 * @returns {string} Markdown content
 */
function generateReport(analysis, feedback) {
  const now = new Date().toISOString();
  const { flagged, unflagged } = analysis;

  let md = `# Pricing Calibration Report\n\n`;
  md += `> Generated: ${now}\n\n`;

  // --- Summary ---
  md += `## Summary\n\n`;
  md += `| Metric | Value |\n`;
  md += `|--------|-------|\n`;
  md += `| Total feedback entries | ${feedback.length} |\n`;
  md += `| Unique items reviewed | ${flagged.length + unflagged.length} |\n`;
  md += `| Items flagged for adjustment | ${flagged.length} |\n`;
  md += `| Items within tolerance | ${unflagged.length} |\n`;
  md += `| Overall acceptance rate | ${feedback.length > 0 ? ((feedback.filter(f => f.accepted).length / feedback.length) * 100).toFixed(1) : 0}% |\n`;
  md += `\n`;

  // --- Flagged items ---
  if (flagged.length > 0) {
    md += `## Items Needing Adjustment\n\n`;
    md += `> [!WARNING]\n`;
    md += `> These items are consistently mispriced based on operator feedback.\n`;
    md += `> **Only catalog item prices should be adjusted** — do NOT change the pricing formula.\n\n`;

    md += `| Item | Current Price | Suggested Price | Δ | Reviews | Accept Rate | Confidence |\n`;
    md += `|------|--------------|-----------------|---|---------|-------------|------------|\n`;

    for (const item of flagged) {
      const delta = item.avgDelta >= 0 ? `+${fmt(item.avgDelta)}` : fmt(item.avgDelta);
      md += `| ${item.itemName} | ${fmt(item.currentPrice)} | ${fmt(item.suggestedPrice)} | ${delta} | ${item.reviews} | ${(item.acceptanceRate * 100).toFixed(0)}% | ${item.confidence} |\n`;
    }

    md += `\n`;

    // Detailed notes per flagged item
    md += `### Detailed Feedback\n\n`;
    for (const item of flagged) {
      if (item.notes.length === 0) continue;
      md += `**${item.itemName}** (${item.itemId})\n`;
      const uniqueNotes = [...new Set(item.notes.filter(n => n))];
      for (const note of uniqueNotes.slice(0, 5)) {
        md += `- "${note}"\n`;
      }
      md += `\n`;
    }
  } else {
    md += `## Items Needing Adjustment\n\n`;
    md += `> [!TIP]\n`;
    md += `> No items are currently flagged for adjustment. All reviewed items are within tolerance.\n\n`;
  }

  // --- Items within tolerance ---
  if (unflagged.length > 0) {
    md += `## Items Within Tolerance\n\n`;
    md += `| Item | Current Price | Reviews | Accept Rate | Avg Δ | Confidence |\n`;
    md += `|------|--------------|---------|-------------|-------|------------|\n`;

    for (const item of unflagged) {
      const acceptRate = item.acceptanceRate !== undefined
        ? `${(item.acceptanceRate * 100).toFixed(0)}%`
        : 'N/A';
      const delta = item.avgDelta !== undefined
        ? (item.avgDelta >= 0 ? `+${fmt(item.avgDelta)}` : fmt(item.avgDelta))
        : 'N/A';
      const confidence = item.confidence || item.reason || 'N/A';
      md += `| ${item.itemName} | ${fmt(item.currentPrice)} | ${item.reviews} | ${acceptRate} | ${delta} | ${confidence} |\n`;
    }
    md += `\n`;
  }

  // --- Recommended actions ---
  md += `## Recommended Actions\n\n`;

  if (flagged.length > 0) {
    md += `1. Review the flagged items above with the operations team\n`;
    md += `2. For high-confidence suggestions, update prices in \`data/items-catalog-new.json\`\n`;
    md += `3. Re-run scenarios and collect more feedback to validate changes\n`;
    md += `4. For low-confidence items, collect more operator reviews before adjusting\n`;
  } else {
    md += `- Continue collecting operator feedback to build confidence\n`;
    md += `- Re-run this analysis after more reviews are collected\n`;
  }

  md += `\n---\n\n`;
  md += `*Thresholds: min ${MIN_REVIEWS} reviews, acceptance < ${ACCEPTANCE_THRESHOLD * 100}% or |Δ| > $${DELTA_THRESHOLD}*\n`;

  return md;
}

/**
 * Run the calibration analysis and generate the report.
 */
function runCalibration() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  CALIBRATION ENGINE — Analyzing operator feedback');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');

  const feedback = loadFeedback();

  if (feedback.length === 0) {
    console.log('  ⚠ No feedback data found. Run "npm run review" first.');
    console.log('');
    return;
  }

  console.log(`  Loaded ${feedback.length} feedback entries.`);

  const quoteIndex = buildQuoteIndex();
  console.log(`  Loaded ${quoteIndex.size} quote records.`);

  const itemStats = aggregateByItem(feedback, quoteIndex);
  console.log(`  Found ${itemStats.size} unique items across reviews.`);

  const analysis = analyzeItems(itemStats);
  console.log(`  Flagged: ${analysis.flagged.length} items need adjustment.`);
  console.log(`  OK:      ${analysis.unflagged.length} items within tolerance.`);

  // Write report
  const reportsDir = join(__dirname, '..', '..', 'reports');
  if (!existsSync(reportsDir)) {
    mkdirSync(reportsDir, { recursive: true });
  }

  const report = generateReport(analysis, feedback);
  writeFileSync(REPORT_PATH, report, 'utf-8');

  console.log('');
  console.log(`  ✓ Report written to reports/pricing-adjustments.md`);

  // Print flagged items summary to console
  if (analysis.flagged.length > 0) {
    console.log('');
    console.log('  ─── FLAGGED ITEMS ──────────────────────────────────────────────');
    for (const item of analysis.flagged) {
      const delta = item.avgDelta >= 0 ? `+${fmt(item.avgDelta)}` : fmt(item.avgDelta);
      console.log(`  • ${item.itemName}: ${fmt(item.currentPrice)} → ${fmt(item.suggestedPrice)} (${delta}, ${(item.acceptanceRate * 100).toFixed(0)}% accepted, ${item.confidence})`);
    }
  }

  console.log('');

  return analysis;
}

// Run if executed directly
runCalibration();

export {
  runCalibration,
  loadFeedback,
  buildQuoteIndex,
  aggregateByItem,
  analyzeItems,
  generateReport,
  FEEDBACK_PATH,
  REPORT_PATH,
  MIN_REVIEWS,
  ACCEPTANCE_THRESHOLD,
  DELTA_THRESHOLD,
};
