/**
 * @module disambiguation
 * @description Analyzes extraction results to confidently select an item or 
 *   flag it for clarification when ambiguous (e.g., "table" matching multiple items).
 *
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { extractFromRequest } from './itemMatcher.js';
import { logUnmappedAlias } from './aliasLogger.js';

const CONFIDENCE_THRESHOLD = 25; // Minimum score to consider a match
const AMBIGUITY_THRESHOLD = 10;  // Score difference below which items are considered competing
const PRICE_VARIANCE_THRESHOLD = 15; // Max price difference allowed between competing matches before flagging as ambiguous

/**
 * Disambiguate a single extracted input part.
 * @param {Object} extraction - { input: string, matches: Array<{item, score}> }
 * @returns {Object} - The resolved item or an unresolved flag
 */
function resolveExtraction(extraction) {
  const { input, matches } = extraction;

  if (matches.length === 0 || matches[0].score < CONFIDENCE_THRESHOLD) {
    logUnmappedAlias(input, 'No confident match found');
    return {
      input,
      resolved: false,
      needsClarification: true,
      reason: 'No confident match found',
      options: matches.slice(0, 3).map(m => m.item)
    };
  }

  const topMatch = matches[0];
  
  // Check for competing matches
  const competingMatches = matches.filter(m => 
    m.item.id !== topMatch.item.id && 
    (topMatch.score - m.score) <= AMBIGUITY_THRESHOLD
  );

  if (competingMatches.length > 0) {
    // We have competing matches. Are their prices significantly different?
    const topPrice = topMatch.item.pickupPrice || 0;
    
    for (const comp of competingMatches) {
      const compPrice = comp.item.pickupPrice || 0;
      if (Math.abs(topPrice - compPrice) > PRICE_VARIANCE_THRESHOLD) {
        // Prices are too different to guess safely
        return {
          input,
          resolved: false,
          needsClarification: true,
          reason: 'Ambiguous item description',
          options: [topMatch.item, ...competingMatches.map(m => m.item)]
        };
      }
    }
  }

  // Confident match
  return {
    input,
    resolved: true,
    item: topMatch.item,
    quantity: 1 // Default quantity, can be extracted later if needed
  };
}

/**
 * Process a full user request into an array of parsed items ready for pricing.
 * @param {string} text 
 * @returns {{ resolvedItems: Array<Object>, ambiguousItems: Array<Object> }}
 */
function processRequest(text) {
  const extractions = extractFromRequest(text);
  
  const resolvedItems = [];
  const ambiguousItems = [];

  for (const ext of extractions) {
    const resolution = resolveExtraction(ext);
    if (resolution.resolved) {
      resolvedItems.push({
        id: resolution.item.id,
        name: resolution.item.name,
        quantity: resolution.quantity,
        unitPrice: resolution.item.pickupPrice
      });
    } else {
      ambiguousItems.push({
        id: `AMBIGUOUS_${Math.random().toString(36).substr(2, 9)}`,
        name: resolution.input,
        quantity: 1,
        needsClarification: true,
        reason: resolution.reason,
        options: resolution.options
      });
    }
  }

  return { resolvedItems, ambiguousItems };
}

export {
  resolveExtraction,
  processRequest
};
