/**
 * @module itemMatcher
 * @description Extracts and matches catalog items from natural language text.
 *   Uses tokenization, stop-word removal, and scoring to find the best catalog matches.
 *
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { getCatalog } from '../pricing/pricingEngine.js';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'some', 'any', 'my', 'our', 'old', 'broken', 'heavy',
  'large', 'small', 'big', 'and', 'with', 'of', 'in', 'on', 'for', 'to',
  'piece', 'pieces', 'set', 'bunch', 'lot', 'few', 'couple', 'trash', 'junk',
  'removal', 'pickup', 'take', 'away', 'need', 'want', 'please'
]);

/**
 * Tokenize and normalize a string.
 * @param {string} text
 * @returns {string[]}
 */
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 0 && !STOP_WORDS.has(token));
}

/**
 * Build a simple search index from the catalog.
 * @param {Array<Object>} catalog
 * @returns {Array<Object>}
 */
function buildIndex(catalog) {
  return catalog.map(item => {
    const nameTokens = tokenize(item.name);
    const aliasesTokens = (item.aliases || []).flatMap(alias => tokenize(alias));
    // Include slug tokens
    const slugTokens = item.slug ? item.slug.split('_') : [];
    
    // De-duplicate tokens
    const allTokens = [...new Set([...nameTokens, ...aliasesTokens, ...slugTokens])];
    
    return {
      item,
      tokens: allTokens,
      nameStr: item.name.toLowerCase()
    };
  });
}

// Lazy-loaded index singleton
let _index = null;

function getIndex() {
  if (!_index) {
    const catalog = getCatalog();
    _index = buildIndex(catalog);
  }
  return _index;
}

/**
 * Match an input string against the catalog.
 * @param {string} input - The natural language input (e.g., "old couch")
 * @param {number} [limit=5] - Max results to return
 * @returns {Array<{item: Object, score: number}>}
 */
function matchItems(input, limit = 5) {
  const inputTokens = tokenize(input);
  if (inputTokens.length === 0) return [];

  const index = getIndex();
  const inputStr = input.toLowerCase();

  const scored = index.map(entry => {
    let score = 0;
    
    // 1. Exact phrase match in name (highest weight)
    if (entry.nameStr === inputStr) {
      score += 100;
    } else if (entry.nameStr.includes(inputStr)) {
      score += 50;
    }

    // 2. Token overlap
    let matchedTokens = 0;
    for (const token of inputTokens) {
      if (entry.tokens.includes(token)) {
        matchedTokens++;
        score += 10;
      } else {
        // Partial token match (e.g., "refrigerat" matches "refrigerator")
        const partialMatch = entry.tokens.some(t => t.includes(token) || token.includes(t));
        if (partialMatch) {
          matchedTokens++;
          score += 5;
        }
      }
    }

    // Boost if all input tokens matched
    if (matchedTokens === inputTokens.length && inputTokens.length > 0) {
      score += 20;
    }
    
    // Penalty for overly generic matches (if item has many tokens but we only matched 1)
    const coverage = matchedTokens / entry.tokens.length;
    score += coverage * 10;

    return { item: entry.item, score };
  });

  return scored
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Split a multi-item request into individual item strings.
 * e.g., "a couch and a fridge" -> ["a couch", "a fridge"]
 * @param {string} text
 * @returns {string[]}
 */
function splitRequest(text) {
  // Split on "and", commas, plus signs
  return text
    .split(/\b(?:and|plus|with)\b|,|\+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Extract catalog items from a full user request.
 * Handles multi-item requests.
 * @param {string} text
 * @returns {Array<{input: string, matches: Array<{item: Object, score: number}>}>}
 */
function extractFromRequest(text) {
  const parts = splitRequest(text);
  return parts.map(part => {
    return {
      input: part,
      matches: matchItems(part)
    };
  });
}

export {
  matchItems,
  extractFromRequest,
  splitRequest,
  tokenize
};
