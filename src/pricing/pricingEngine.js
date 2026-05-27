/**
 * @module pricingEngine
 * @description Deterministic catalog-driven pricing engine for ZeroShot Junk Bot.
 *   Implements the formula: total = max(itemSubtotal + basePrice, minimumPrice)
 *   
 *   CRITICAL: No fallback pricing. Items without catalog prices are flagged as
 *   unresolved and require explicit clarification. This replaces the legacy
 *   `unitPrice = 30` fallback that silently assigned fake prices.
 * 
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Zip code base price lookup.
 * All prices are stored locally — no external API calls.
 */
const ZIP_BASE_PRICES = {
  // Georgia - Marietta & Kennesaw area
  '30006': 59, '30007': 59, '30008': 59,
  '30060': 59, '30061': 59, '30062': 59, '30063': 59, '30064': 59,
  '30065': 59, '30066': 59, '30067': 59, '30068': 59, '30069': 59,
  '30090': 59,
  '30144': 59, '30152': 59, '30156': 59, '30160': 59,
};

const DEFAULT_BASE_PRICE = 59;
const MINIMUM_PRICE = 75;

/**
 * Load the item catalog from disk.
 * Uses items-catalog-new.json which has all 20+ GraphQL fields including pickupPrice.
 * 
 * @returns {Array<Object>} Array of catalog items
 */
function loadCatalog() {
  const catalogPath = join(__dirname, '..', '..', 'data', 'items-catalog-new.json');
  const raw = readFileSync(catalogPath, 'utf-8');
  return JSON.parse(raw);
}

// Lazy-loaded catalog singleton
let _catalog = null;

/**
 * Get the item catalog (loads once, caches in memory).
 * @returns {Array<Object>}
 */
function getCatalog() {
  if (!_catalog) {
    _catalog = loadCatalog();
  }
  return _catalog;
}

/**
 * Look up an item in the catalog by ID.
 * 
 * @param {string} itemId - The catalog item ID
 * @param {Array<Object>} [catalog] - Optional catalog override
 * @returns {Object|null} The catalog item or null
 */
function lookupItem(itemId, catalog) {
  const cat = catalog || getCatalog();
  return cat.find(i => i.id === itemId) || null;
}

/**
 * Calculate the total price for a set of items and zip code.
 * 
 * Formula: total = max(itemSubtotal + basePrice, minimumPrice)
 * 
 * Items without a catalog price are NOT assigned a fallback price.
 * Instead, they are returned in the `unresolvedItems` array with
 * `needsClarification: true`.
 * 
 * @param {Array<{id: string, quantity?: number, name?: string, unitPrice?: number}>} items
 * @param {string} zipCode - 5-digit zip code
 * @param {Array<Object>} [catalogOverride] - Optional catalog to use instead of default
 * @returns {{
 *   total: number,
 *   basePrice: number,
 *   minimumPrice: number,
 *   minimumPriceApplied: boolean,
 *   orderSubtotal: number,
 *   itemSubtotal: number,
 *   items: Array<Object>,
 *   unresolvedItems: Array<Object>,
 *   hasUnresolvedItems: boolean
 * }}
 */
function calculateTotalPrice(items, zipCode, catalogOverride) {
  const catalog = catalogOverride || getCatalog();
  const basePrice = ZIP_BASE_PRICES[zipCode] ?? DEFAULT_BASE_PRICE;

  const resolvedItems = [];
  const unresolvedItems = [];
  let itemSubtotal = 0;

  for (const item of items) {
    const quantity = item.quantity || 1;
    let unitPrice = item.unitPrice;
    let itemName = item.name;
    let catalogItem = null;

    // Look up from catalog if no explicit unitPrice
    if (unitPrice === undefined || unitPrice === null) {
      catalogItem = lookupItem(item.id, catalog);
      if (catalogItem) {
        unitPrice = catalogItem.pickupPrice || 0;
        itemName = itemName || catalogItem.name;
      }
    }

    // NO FALLBACK. If we still have no price, flag as unresolved.
    if (!unitPrice || unitPrice <= 0) {
      unresolvedItems.push({
        id: item.id,
        name: itemName || `Unknown Item (${item.id})`,
        quantity,
        needsClarification: true,
        reason: catalogItem
          ? 'Catalog item exists but has no pickupPrice'
          : 'Item ID not found in catalog',
      });
      continue;
    }

    const lineTotal = unitPrice * quantity;
    itemSubtotal += lineTotal;

    resolvedItems.push({
      itemType: {
        id: item.id,
        name: itemName || `Item ${item.id}`,
      },
      pickupUnitPrice: unitPrice,
      quantity,
      pickupSubtotal: lineTotal,
    });
  }

  const orderSubtotal = itemSubtotal + basePrice;
  const minimumPriceApplied = orderSubtotal < MINIMUM_PRICE;
  const total = Math.max(orderSubtotal, MINIMUM_PRICE);

  return {
    total,
    basePrice,
    minimumPrice: MINIMUM_PRICE,
    minimumPriceApplied,
    orderSubtotal,
    itemSubtotal,
    items: resolvedItems,
    unresolvedItems,
    hasUnresolvedItems: unresolvedItems.length > 0,
  };
}

/**
 * Reset the cached catalog (useful for testing).
 */
function resetCatalog() {
  _catalog = null;
}

/**
 * Set a custom catalog (useful for testing without disk I/O).
 * @param {Array<Object>} catalog
 */
function setCatalog(catalog) {
  _catalog = catalog;
}

export {
  calculateTotalPrice,
  loadCatalog,
  getCatalog,
  lookupItem,
  resetCatalog,
  setCatalog,
  ZIP_BASE_PRICES,
  DEFAULT_BASE_PRICE,
  MINIMUM_PRICE,
};
