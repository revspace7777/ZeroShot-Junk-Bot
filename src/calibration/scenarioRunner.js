/**
 * @module scenarioRunner
 * @description Generates quotes from predefined test scenarios and logs them
 *   via quoteLogger. This bridges the gap between "we have a pricing engine"
 *   and "operators can review quotes" — no UI needed, just run this script.
 *
 *   Usage: node src/calibration/scenarioRunner.js
 *
 * @author ZeroShot Junk Bot v2 Rebuild
 * @version 2.0.0
 */

import { calculateTotalPrice } from '../pricing/pricingEngine.js';
import { logQuote } from './quoteLogger.js';

/**
 * Predefined test scenarios covering common jobs, edge cases, and multi-item orders.
 * Each scenario has a human-readable description, item list, and zip code.
 */
const scenarios = [
  // --- Single item removals ---
  {
    id: 'S01',
    description: 'Single mattress removal in Kennesaw',
    items: [{ id: '7947', quantity: 1 }],       // Mattress - Queen ($35)
    zip: '30144',
  },
  {
    id: 'S02',
    description: 'Single couch removal in Marietta',
    items: [{ id: '7412', quantity: 1 }],       // Couch / Loveseat ($30)
    zip: '30066',
  },
  {
    id: 'S03',
    description: 'Single refrigerator pickup',
    items: [{ id: '8002', quantity: 1 }],       // Refrigerator ($60)
    zip: '30062',
  },
  {
    id: 'S04',
    description: 'Single washer removal',
    items: [{ id: '8005', quantity: 1 }],       // Washer ($30)
    zip: '30064',
  },
  {
    id: 'S05',
    description: 'Single dryer removal',
    items: [{ id: '7884', quantity: 1 }],       // Dryer ($30)
    zip: '30064',
  },

  // --- Multi-item jobs ---
  {
    id: 'S06',
    description: 'Couch + dresser in Marietta',
    items: [
      { id: '7412', quantity: 1 },              // Couch / Loveseat ($30)
      { id: '7979', quantity: 1 },              // Dresser ($30)
    ],
    zip: '30066',
  },
  {
    id: 'S07',
    description: 'Washer + dryer combo',
    items: [
      { id: '8005', quantity: 1 },              // Washer ($30)
      { id: '7884', quantity: 1 },              // Dryer ($30)
    ],
    zip: '30144',
  },
  {
    id: 'S08',
    description: 'Full bedroom set (mattress + box spring + dresser)',
    items: [
      { id: '7947', quantity: 1 },              // Mattress - Queen ($35)
      { id: '7948', quantity: 1 },              // Bed Base/Foundation - Twin ($25)
      { id: '7979', quantity: 1 },              // Dresser ($30)
    ],
    zip: '30060',
  },
  {
    id: 'S09',
    description: 'Living room cleanout (couch + loveseat + coffee table + TV)',
    items: [
      { id: '7412', quantity: 1 },              // Couch / Loveseat ($30)
      { id: '7967', quantity: 1 },              // Loveseat - Reclining ($75)
      { id: '7563', quantity: 1 },              // Table - Coffee ($25)
      { id: '7590', quantity: 1 },              // Television ($50)
    ],
    zip: '30067',
  },
  {
    id: 'S10',
    description: 'Two mattresses and two box springs',
    items: [
      { id: '7947', quantity: 2 },              // Mattress - Queen ($35 × 2)
      { id: '7948', quantity: 2 },              // Bed Base/Foundation ($25 × 2)
    ],
    zip: '30144',
  },

  // --- Large / cleanout jobs ---
  {
    id: 'S11',
    description: '1 Car Garage Cleanout',
    items: [{ id: '7833', quantity: 1 }],       // 1 Car Garage Cleanout ($500)
    zip: '30144',
  },
  {
    id: 'S12',
    description: '1/3 Cubic Yard of Loose Items',
    items: [{ id: '7892', quantity: 1 }],       // 1/3 Cubic Yard ($45)
    zip: '30068',
  },
  {
    id: 'S13',
    description: 'Multiple cubic yards of loose items (3 units)',
    items: [{ id: '7892', quantity: 3 }],       // 1/3 Cubic Yard ($45 × 3)
    zip: '30090',
  },

  // --- Appliance cluster ---
  {
    id: 'S14',
    description: 'Kitchen appliance removal (fridge + stove + dishwasher)',
    items: [
      { id: '8002', quantity: 1 },              // Refrigerator ($60)
      { id: '7998', quantity: 1 },              // Stove ($40)
      { id: '7350', quantity: 1 },              // Dishwasher ($40)
    ],
    zip: '30152',
  },

  // --- Edge case: unknown item (should be unresolved) ---
  {
    id: 'S15',
    description: 'Unknown item — should flag as unresolved',
    items: [{ id: 'FAKE_ITEM_999', quantity: 1 }],
    zip: '30144',
  },
  {
    id: 'S16',
    description: 'Mix of known and unknown items',
    items: [
      { id: '7947', quantity: 1 },              // Mattress - Queen ($35)
      { id: 'NONEXISTENT_XYZ', quantity: 2 },   // Unknown → unresolved
    ],
    zip: '30066',
  },

  // --- Edge case: minimum price trigger ---
  {
    id: 'S17',
    description: 'Very cheap item — minimum price should apply',
    items: [{ id: '7892', quantity: 1, unitPrice: 5 }],
    zip: '30144',
  },

  // --- Edge case: empty items ---
  {
    id: 'S18',
    description: 'No items — just base price and minimum',
    items: [],
    zip: '30144',
  },

  // --- Edge case: unknown zip ---
  {
    id: 'S19',
    description: 'Unknown zip code — should use default base price',
    items: [{ id: '7947', quantity: 1 }],       // Mattress - Queen ($35)
    zip: '99999',
  },

  // --- High-value job ---
  {
    id: 'S20',
    description: 'Large multi-item job (5+ items)',
    items: [
      { id: '7412', quantity: 1 },              // Couch / Loveseat ($30)
      { id: '7979', quantity: 2 },              // Dresser ($30 × 2)
      { id: '7947', quantity: 2 },              // Mattress - Queen ($35 × 2)
      { id: '8002', quantity: 1 },              // Refrigerator ($60)
      { id: '7590', quantity: 1 },              // Television ($50)
    ],
    zip: '30144',
  },

  // --- Quantity stress ---
  {
    id: 'S21',
    description: 'Bulk pickup — 10 of the same item',
    items: [{ id: '7947', quantity: 10 }],      // Mattress - Queen ($35 × 10)
    zip: '30060',
  },
];

/**
 * Run all scenarios through the pricing engine, log each quote,
 * and print a summary table to stdout.
 */
function runScenarios() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('  SCENARIO RUNNER — Generating test quotes for operator review');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('');

  const results = [];

  for (const scenario of scenarios) {
    const priceResult = calculateTotalPrice(scenario.items, scenario.zip);

    const { quoteId } = logQuote({
      inputText: scenario.description,
      zipCode: scenario.zip,
      extractedItems: priceResult.items,
      unresolvedItems: priceResult.unresolvedItems,
      itemSubtotal: priceResult.itemSubtotal,
      basePrice: priceResult.basePrice,
      total: priceResult.total,
      minimumPriceApplied: priceResult.minimumPriceApplied,
      scenarioId: scenario.id,
    });

    results.push({
      id: scenario.id,
      description: scenario.description,
      total: priceResult.total,
      itemCount: priceResult.items.length,
      unresolvedCount: priceResult.unresolvedItems.length,
      minimumApplied: priceResult.minimumPriceApplied,
      quoteId: quoteId.slice(0, 8), // short ID for display
    });
  }

  // Print summary table
  console.log('  ID   │ Total    │ Items │ Unresolved │ Min? │ Description');
  console.log('  ─────┼──────────┼───────┼────────────┼──────┼──────────────────────────────────────');

  for (const r of results) {
    const total = `$${r.total.toFixed(2)}`.padEnd(8);
    const items = String(r.itemCount).padEnd(5);
    const unresolved = String(r.unresolvedCount).padEnd(10);
    const minApplied = r.minimumApplied ? 'YES ' : 'NO  ';
    const desc = r.description.length > 38 ? r.description.slice(0, 35) + '...' : r.description;

    console.log(`  ${r.id}  │ ${total} │ ${items} │ ${unresolved} │ ${minApplied} │ ${desc}`);
  }

  console.log('');
  console.log(`  ✓ ${results.length} scenarios executed and logged to data/quote-log.jsonl`);

  const unresolvedTotal = results.filter(r => r.unresolvedCount > 0).length;
  if (unresolvedTotal > 0) {
    console.log(`  ⚠ ${unresolvedTotal} scenario(s) had unresolved items (expected for edge cases)`);
  }

  console.log('');
  console.log('  Next step: run "npm run review" to start operator review.');
  console.log('');

  return results;
}

// Run if executed directly
runScenarios();

export { scenarios, runScenarios };
