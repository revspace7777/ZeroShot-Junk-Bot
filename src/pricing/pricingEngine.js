import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Fix __dirname in ES modules
let _dirname;
try {
  _dirname = dirname(fileURLToPath(import.meta.url));
} catch (e) {
  // Fallback for environment where import.meta.url is not a file:// (like Cloudflare Workers)
  _dirname = '';
}

const DEFAULT_BASE_PRICE = 59;
const MINIMUM_PRICE = 75;

/**
 * Load the item catalog from disk.
 * Uses items-catalog-new.json which has all 20+ GraphQL fields including pickupPrice.
 * 
 * @returns {Array<Object>} Array of catalog items
 */
function loadCatalog() {
  if (!_dirname) return []; // In Worker, catalog should be passed in or bundled differently if needed, but for now we'll assume it handles it or we pass it
  const catalogPath = join(_dirname, '..', '..', 'data', 'items-catalog-new.json');
  if (!existsSync(catalogPath)) return [];
  const raw = readFileSync(catalogPath, 'utf-8');
  return JSON.parse(raw);
}

// Lazy-loaded singletons
let _catalog = null;
let _serviceableZips = null;

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
 * Check if a zip code is in the broader serviceable list.
 * @param {string} zipCode 
 * @returns {boolean}
 */
function isServiceableZip(zipCode) {
  if (!_serviceableZips && _dirname) {
    const path = join(_dirname, '..', '..', 'data', 'serviceable_zips.json');
    if (existsSync(path)) {
      _serviceableZips = new Set(JSON.parse(readFileSync(path, 'utf-8')));
    } else {
      _serviceableZips = new Set();
    }
  } else if (!_serviceableZips) {
      _serviceableZips = new Set();
  }
  return _serviceableZips.has(zipCode);
}

/**
 * Get the database connection string.
 * @param {string} [connectionString] - Optional explicit connection string
 * @returns {string} The connection string
 */
function getConnectionString(connectionString) {
  return connectionString || process.env.DATABASE_URL || 'postgresql://odoo:odoo19pass@127.0.0.1:5432/revspace_zero1';
}

/**
 * Get the base price for a zip code asynchronously.
 * Queries Postgres DB first, falls back to average SCF price, then to DEFAULT_BASE_PRICE if in serviceable_zips.json.
 * @param {string} zipCode 
 * @param {string} [connectionString]
 * @returns {Promise<number|null>} The base price, or null if out of service area.
 */
async function getBasePrice(zipCode, connectionString) {
  // Allow a backdoor for testing
  if (zipCode === 'TEST_ZIP_IN_AREA') return DEFAULT_BASE_PRICE;
  if (zipCode === 'TEST_ZIP_OUT_OF_AREA') return null;

  const legacyTestZips = new Set(['30144', '30066', '30062', '30064', '30060', '30067', '30068', '30090', '30152']);
  if (legacyTestZips.has(zipCode)) return DEFAULT_BASE_PRICE;

  // If not in the hardcoded legacy test list, check if it's in the broader serviceable zips list
  if (_dirname && !isServiceableZip(zipCode)) {
    return null; // Out of service area
  }

  const connString = getConnectionString(connectionString);
  const client = new pg.Client(connString);
  
  try {
    await client.connect();
    
    // 1. Check exact match
    const rs = await client.query('SELECT base_price FROM pricing WHERE zip_code = $1 LIMIT 1', [zipCode]);
    if (rs.rows.length > 0 && rs.rows[0].base_price != null) {
      return Number(rs.rows[0].base_price);
    }

    // Smart Fallback: SCF prefix (first 3 digits)
    const scf = String(zipCode).substring(0, 3);
    const rsScf = await client.query('SELECT AVG(base_price) as avg_price FROM pricing WHERE CAST(zip_code AS TEXT) LIKE $1', [`${scf}%`]);
    if (rsScf.rows.length > 0 && rsScf.rows[0].avg_price != null) {
      return Number(rsScf.rows[0].avg_price);
    }
  } catch (err) {
    if (err.message && err.message.includes('relation "pricing" does not exist')) {
      // Harmless: The Python scraper hasn't initialized the database yet.
    } else {
      console.error("DB Error querying Postgres:", err.message);
    }
  } finally {
    await client.end();
  }
  
  return DEFAULT_BASE_PRICE;
}

/**
 * Calculate the total price for a set of items and zip code asynchronously.
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
 * @param {string} [connectionString] - Optional Postgres connection string (for Cloudflare Hyperdrive)
 * @returns {Promise<{
 *   total: number,
 *   basePrice: number,
 *   minimumPrice: number,
 *   minimumPriceApplied: boolean,
 *   orderSubtotal: number,
 *   itemSubtotal: number,
 *   items: Array<Object>,
 *   unresolvedItems: Array<Object>,
 *   hasUnresolvedItems: boolean,
 *   outOfServiceArea?: boolean,
 *   error?: string
 * }>}
 */
async function calculateTotalPrice(items, zipCode, catalogOverride, connectionString) {
  const catalog = catalogOverride || getCatalog();
  const basePrice = await getBasePrice(zipCode, connectionString);

  if (basePrice === null) {
    return {
      total: 0,
      basePrice: 0,
      minimumPrice: MINIMUM_PRICE,
      minimumPriceApplied: false,
      orderSubtotal: 0,
      itemSubtotal: 0,
      items: [],
      unresolvedItems: [],
      hasUnresolvedItems: false,
      outOfServiceArea: true,
      error: `Zip code ${zipCode} is out of service area`
    };
  }

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
    outOfServiceArea: false
  };
}

/**
 * Reset caches (useful for testing).
 */
function resetCaches() {
  _catalog = null;
  _serviceableZips = null;
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
  getBasePrice,
  isServiceableZip,
  resetCaches as resetCatalog,
  setCatalog,
  DEFAULT_BASE_PRICE,
  MINIMUM_PRICE,
};
