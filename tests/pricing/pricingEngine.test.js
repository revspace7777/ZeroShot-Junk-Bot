/**
 * @module pricingEngine.test
 * @description Unit tests for the deterministic pricing engine.
 *   Uses Node.js built-in test runner (node --test).
 *
 *   Validates:
 *   - No fallback pricing (legacy $30 bug is gone)
 *   - Formula: total = max(itemSubtotal + basePrice, minimumPrice)
 *   - Catalog lookup and unresolved item handling
 *   - Edge cases (empty input, unknown zip, unknown items)
 *
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTotalPrice,
  setCatalog,
  resetCatalog,
  DEFAULT_BASE_PRICE,
  MINIMUM_PRICE,
} from '../../src/pricing/pricingEngine.js';

// Mock catalog for deterministic testing
const MOCK_CATALOG = [
  { id: '7947', name: 'Mattress - Queen', pickupPrice: 35 },
  { id: '7948', name: 'Box Spring - Queen', pickupPrice: 25 },
  { id: '7908', name: 'Couch / Sofa', pickupPrice: 45 },
  { id: '7910', name: 'Dresser', pickupPrice: 30 },
  { id: '7920', name: 'Refrigerator', pickupPrice: 55 },
  { id: 'ZERO_PRICE', name: 'Free Item', pickupPrice: 0 },
  { id: 'NO_PRICE', name: 'Item Without Price' },
];

describe('Pricing Engine — Core Formula', () => {
  beforeEach(() => {
    setCatalog(MOCK_CATALOG);
  });

  it('calculates total = itemSubtotal + basePrice for normal items', () => {
    // Mattress ($35) + base ($59) = $94
    const result = calculateTotalPrice([{ id: '7947', quantity: 1 }], '30144');
    assert.equal(result.total, 94);
    assert.equal(result.itemSubtotal, 35);
    assert.equal(result.basePrice, 59);
    assert.equal(result.minimumPriceApplied, false);
  });

  it('applies minimum price when subtotal + base < minimum', () => {
    // Empty order: 0 + 59 = 59, which < 75, so total = 75
    const result = calculateTotalPrice([], '30144');
    assert.equal(result.total, MINIMUM_PRICE);
    assert.equal(result.minimumPriceApplied, true);
    assert.equal(result.items.length, 0);
  });

  it('handles multiple items with quantities', () => {
    // 2 mattresses ($70) + dresser ($30) = $100 items + $59 base = $159
    const result = calculateTotalPrice([
      { id: '7947', quantity: 2 },
      { id: '7910', quantity: 1 },
    ], '30144');
    assert.equal(result.itemSubtotal, 100);
    assert.equal(result.total, 159);
  });

  it('uses default base price for unknown zip codes', () => {
    const result = calculateTotalPrice([{ id: '7947', quantity: 1 }], '99999');
    assert.equal(result.basePrice, DEFAULT_BASE_PRICE);
  });

  it('uses provided unitPrice when explicitly set', () => {
    // Override with unitPrice = 50 instead of catalog's $35
    const result = calculateTotalPrice([{ id: '7947', quantity: 1, unitPrice: 50 }], '30144');
    assert.equal(result.itemSubtotal, 50);
    assert.equal(result.total, 109); // 50 + 59
  });
});

describe('Pricing Engine — No Fallback Pricing', () => {
  beforeEach(() => {
    setCatalog(MOCK_CATALOG);
  });

  it('flags unknown items as unresolved instead of using $30 fallback', () => {
    const result = calculateTotalPrice([{ id: 'FAKE_ITEM', quantity: 1 }], '30144');
    assert.equal(result.unresolvedItems.length, 1);
    assert.equal(result.unresolvedItems[0].needsClarification, true);
    assert.equal(result.hasUnresolvedItems, true);
    // Total should NOT include a $30 fallback — just base/minimum
    assert.equal(result.total, MINIMUM_PRICE);
  });

  it('flags items with pickupPrice = 0 as unresolved', () => {
    const result = calculateTotalPrice([{ id: 'ZERO_PRICE', quantity: 1 }], '30144');
    assert.equal(result.unresolvedItems.length, 1);
    assert.equal(result.unresolvedItems[0].needsClarification, true);
  });

  it('flags items with no pickupPrice field as unresolved', () => {
    const result = calculateTotalPrice([{ id: 'NO_PRICE', quantity: 1 }], '30144');
    assert.equal(result.unresolvedItems.length, 1);
  });

  it('separates resolved and unresolved in mixed orders', () => {
    const result = calculateTotalPrice([
      { id: '7947', quantity: 1 },       // resolved: $35
      { id: 'FAKE_ITEM', quantity: 1 },  // unresolved
      { id: '7908', quantity: 1 },       // resolved: $45
    ], '30144');

    assert.equal(result.items.length, 2);
    assert.equal(result.unresolvedItems.length, 1);
    assert.equal(result.itemSubtotal, 80); // 35 + 45, no fallback for FAKE_ITEM
    assert.equal(result.total, 139);       // 80 + 59
  });
});

describe('Pricing Engine — Data Integrity', () => {
  beforeEach(() => {
    setCatalog(MOCK_CATALOG);
  });

  it('returns all expected fields in result', () => {
    const result = calculateTotalPrice([{ id: '7947', quantity: 1 }], '30144');

    assert.ok('total' in result);
    assert.ok('basePrice' in result);
    assert.ok('minimumPrice' in result);
    assert.ok('minimumPriceApplied' in result);
    assert.ok('orderSubtotal' in result);
    assert.ok('itemSubtotal' in result);
    assert.ok('items' in result);
    assert.ok('unresolvedItems' in result);
    assert.ok('hasUnresolvedItems' in result);
  });

  it('item entries have correct structure', () => {
    const result = calculateTotalPrice([{ id: '7947', quantity: 1 }], '30144');
    const item = result.items[0];

    assert.ok(item.itemType);
    assert.equal(item.itemType.id, '7947');
    assert.equal(item.itemType.name, 'Mattress - Queen');
    assert.equal(item.pickupUnitPrice, 35);
    assert.equal(item.quantity, 1);
    assert.equal(item.pickupSubtotal, 35);
  });

  it('defaults quantity to 1 when not specified', () => {
    const result = calculateTotalPrice([{ id: '7947' }], '30144');
    assert.equal(result.items[0].quantity, 1);
    assert.equal(result.items[0].pickupSubtotal, 35);
  });

  it('unresolved items have reason field', () => {
    const result = calculateTotalPrice([{ id: 'FAKE_ITEM', quantity: 1 }], '30144');
    assert.ok(result.unresolvedItems[0].reason);
    assert.equal(result.unresolvedItems[0].reason, 'Item ID not found in catalog');
  });
});

describe('Pricing Engine — Formula Invariants', () => {
  beforeEach(() => {
    setCatalog(MOCK_CATALOG);
  });

  it('total is never less than minimum price', () => {
    const scenarios = [
      [],
      [{ id: '7947', quantity: 1 }],
      [{ id: 'FAKE', quantity: 1 }],
    ];

    for (const items of scenarios) {
      const result = calculateTotalPrice(items, '30144');
      assert.ok(result.total >= MINIMUM_PRICE, `total ${result.total} < minimum ${MINIMUM_PRICE}`);
    }
  });

  it('total = max(itemSubtotal + basePrice, minimumPrice) for 5 scenarios', () => {
    const cases = [
      { items: [], zip: '30144', expectMin: true },
      { items: [{ id: '7947', quantity: 1 }], zip: '30144', expectMin: false },
      { items: [{ id: '7920', quantity: 1 }], zip: '30066', expectMin: false },
      { items: [{ id: '7947', quantity: 2 }, { id: '7910', quantity: 1 }], zip: '30060', expectMin: false },
      { items: [{ id: '7908', quantity: 1 }, { id: '7920', quantity: 1 }], zip: '30152', expectMin: false },
    ];

    for (const c of cases) {
      const result = calculateTotalPrice(c.items, c.zip);
      const expected = Math.max(result.itemSubtotal + result.basePrice, MINIMUM_PRICE);
      assert.equal(result.total, expected, `Formula mismatch for scenario with ${c.items.length} items`);
    }
  });

  it('no NaN or negative values in results', () => {
    const result = calculateTotalPrice([{ id: '7947', quantity: 1 }], '30144');
    assert.ok(!isNaN(result.total));
    assert.ok(!isNaN(result.basePrice));
    assert.ok(!isNaN(result.itemSubtotal));
    assert.ok(result.total >= 0);
    assert.ok(result.basePrice >= 0);
    assert.ok(result.itemSubtotal >= 0);
  });
});
