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
import { processRequest } from '../extraction/disambiguation.js';
import { logQuote } from './quoteLogger.js';

/**
 * Predefined test scenarios covering common jobs, edge cases, and multi-item orders.
 * Each scenario has a human-readable description, item list or natural text, and zip code.
 */
const scenarios = [
  // --- Original 21 Scenarios (Explicit Item IDs) ---
  { id: 'S01', description: 'Single mattress removal in Kennesaw', items: [{ id: '7947', quantity: 1 }], zip: '30144' },
  { id: 'S02', description: 'Single couch removal in Marietta', items: [{ id: '7412', quantity: 1 }], zip: '30066' },
  { id: 'S03', description: 'Single refrigerator pickup', items: [{ id: '8002', quantity: 1 }], zip: '30062' },
  { id: 'S04', description: 'Single washer removal', items: [{ id: '8005', quantity: 1 }], zip: '30064' },
  { id: 'S05', description: 'Single dryer removal', items: [{ id: '7884', quantity: 1 }], zip: '30064' },
  { id: 'S06', description: 'Couch + dresser in Marietta', items: [{ id: '7412', quantity: 1 }, { id: '7979', quantity: 1 }], zip: '30066' },
  { id: 'S07', description: 'Washer + dryer combo', items: [{ id: '8005', quantity: 1 }, { id: '7884', quantity: 1 }], zip: '30144' },
  { id: 'S08', description: 'Full bedroom set (mattress + box spring + dresser)', items: [{ id: '7947', quantity: 1 }, { id: '7948', quantity: 1 }, { id: '7979', quantity: 1 }], zip: '30060' },
  { id: 'S09', description: 'Living room cleanout (couch + loveseat + coffee table + TV)', items: [{ id: '7412', quantity: 1 }, { id: '7967', quantity: 1 }, { id: '7563', quantity: 1 }, { id: '7590', quantity: 1 }], zip: '30067' },
  { id: 'S10', description: 'Two mattresses and two box springs', items: [{ id: '7947', quantity: 2 }, { id: '7948', quantity: 2 }], zip: '30144' },
  { id: 'S11', description: '1 Car Garage Cleanout', items: [{ id: '7833', quantity: 1 }], zip: '30144' },
  { id: 'S12', description: '1/3 Cubic Yard of Loose Items', items: [{ id: '7892', quantity: 1 }], zip: '30068' },
  { id: 'S13', description: 'Multiple cubic yards of loose items (3 units)', items: [{ id: '7892', quantity: 3 }], zip: '30090' },
  { id: 'S14', description: 'Kitchen appliance removal (fridge + stove + dishwasher)', items: [{ id: '8002', quantity: 1 }, { id: '7998', quantity: 1 }, { id: '7350', quantity: 1 }], zip: '30152' },
  { id: 'S15', description: 'Unknown item — should flag as unresolved', items: [{ id: 'FAKE_ITEM_999', quantity: 1 }], zip: '30144' },
  { id: 'S16', description: 'Mix of known and unknown items', items: [{ id: '7947', quantity: 1 }, { id: 'NONEXISTENT_XYZ', quantity: 2 }], zip: '30066' },
  { id: 'S17', description: 'Very cheap item — minimum price should apply', items: [{ id: '7892', quantity: 1, unitPrice: 5 }], zip: '30144' },
  { id: 'S18', description: 'No items — just base price and minimum', items: [], zip: '30144' },
  { id: 'S19', description: 'Unknown zip code — should use default base price', items: [{ id: '7947', quantity: 1 }], zip: '99999' },
  { id: 'S20', description: 'Large multi-item job (5+ items)', items: [{ id: '7412', quantity: 1 }, { id: '7979', quantity: 2 }, { id: '7947', quantity: 2 }, { id: '8002', quantity: 1 }, { id: '7590', quantity: 1 }], zip: '30144' },
  { id: 'S21', description: 'Bulk pickup — 10 of the same item', items: [{ id: '7947', quantity: 10 }], zip: '30060' },

  // --- NLP & Extraction Scenarios (Raw Text) ---
  { id: 'S22', inputText: 'old couch', zip: '30144' },
  { id: 'S23', inputText: 'refrigerator', zip: '30062' },
  { id: 'S24', inputText: 'a couch and a fridge', zip: '30066' },
  { id: 'S25', inputText: 'pool table', zip: '30152' }, // Specific match
  { id: 'S26', inputText: 'table', zip: '30060' }, // Ambiguous! Should flag for clarification
  { id: 'S27', inputText: 'broken washing machine and dryer', zip: '30067' },
  { id: 'S28', inputText: 'some old bags of trash', zip: '30144' },
  { id: 'S29', inputText: 'heavy sectional', zip: '30068' },
  { id: 'S30', inputText: 'dining room set', zip: '30090' },
  { id: 'S31', inputText: 'treadmill and elliptical', zip: '30144' },
  { id: 'S32', inputText: 'riding lawnmower', zip: '30066' },
  { id: 'S33', inputText: 'hot tub removal', zip: '30152' },
  { id: 'S34', inputText: 'a bunch of boxes and some junk', zip: '30144' },
  { id: 'S35', inputText: 'king mattress and box spring', zip: '30060' },
  { id: 'S36', inputText: 'tube tv', zip: '30062' },
  { id: 'S37', inputText: 'patio furniture set', zip: '30064' },
  { id: 'S38', inputText: 'old grill', zip: '30067' },
  { id: 'S39', inputText: 'piano', zip: '30144' },
  { id: 'S40', inputText: 'upright piano', zip: '30068' },
  { id: 'S41', inputText: 'water heater', zip: '30090' },
  { id: 'S42', inputText: 'shed removal', zip: '30152' },
  { id: 'S43', inputText: 'carpet removal', zip: '30144' },
  { id: 'S44', inputText: 'a couch, a chair, and a desk', zip: '30066' },
  { id: 'S45', inputText: 'old computer and monitor', zip: '30060' },
  { id: 'S46', inputText: 'tires', zip: '30062' },
  { id: 'S47', inputText: '4 tires', zip: '30064' },
  { id: 'S48', inputText: 'paint cans', zip: '30067' },
  { id: 'S49', inputText: 'bag of trash', zip: '30144' },
  { id: 'S50', inputText: 'bag of clothes', zip: '30068' },
  { id: 'S51', inputText: 'something completely unrecognized like a spaceship', zip: '30090' }, // Unresolved
];

/**
 * Run all scenarios through the pricing engine, log each quote,
 * and print a summary table to stdout.
 */
async function runScenarios() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('  SCENARIO RUNNER — Generating test quotes for operator review');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('');

  const results = [];

  for (const scenario of scenarios) {
    let itemsToPrice = scenario.items || [];
    let extractionUnresolved = [];

    // Run NLP extraction if no hardcoded items exist
    if (scenario.inputText && (!scenario.items || scenario.items.length === 0)) {
      const { resolvedItems, ambiguousItems } = await processRequest(scenario.inputText);
      itemsToPrice = resolvedItems.map(i => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        unitPrice: i.unitPrice
      }));
      extractionUnresolved = ambiguousItems;
    }

    const priceResult = await calculateTotalPrice(itemsToPrice, scenario.zip);
    const finalUnresolved = [...extractionUnresolved, ...(priceResult.unresolvedItems || [])];

    // Combine descriptions
    const description = scenario.inputText || scenario.description || 'Unknown Scenario';

    let totalStr = `$${(priceResult.total || 0).toFixed(2)}`.padEnd(8);
    if (priceResult.outOfServiceArea) {
      totalStr = 'OOSA    ';
    }

    const { quoteId } = logQuote({
      inputText: description,
      zipCode: scenario.zip,
      extractedItems: priceResult.items || [],
      unresolvedItems: finalUnresolved,
      itemSubtotal: priceResult.itemSubtotal || 0,
      basePrice: priceResult.basePrice || 0,
      total: priceResult.total || 0,
      minimumPriceApplied: priceResult.minimumPriceApplied || false,
      outOfServiceArea: priceResult.outOfServiceArea || false,
      scenarioId: scenario.id,
    });

    results.push({
      id: scenario.id,
      description: description,
      totalStr: totalStr,
      itemCount: (priceResult.items || []).length,
      unresolvedCount: finalUnresolved.length,
      minimumApplied: priceResult.minimumPriceApplied,
      outOfServiceArea: priceResult.outOfServiceArea,
      quoteId: quoteId.slice(0, 8),
    });
  }

  // Print summary table
  console.log('  ID   │ Total    │ Items │ Unresolved │ Min? │ Description');
  console.log('  ─────┼──────────┼───────┼────────────┼──────┼──────────────────────────────────────');

  for (const r of results) {
    const items = String(r.itemCount).padEnd(5);
    const unresolved = String(r.unresolvedCount).padEnd(10);
    const minApplied = r.minimumApplied ? 'YES ' : 'NO  ';
    const desc = r.description.length > 38 ? r.description.slice(0, 35) + '...' : r.description;

    console.log(`  ${r.id}  │ ${r.totalStr} │ ${items} │ ${unresolved} │ ${minApplied} │ ${desc}`);
  }

  console.log('');
  console.log(`  ✓ ${results.length} scenarios executed and logged to data/quote-log.jsonl`);

  const unresolvedTotal = results.filter(r => r.unresolvedCount > 0).length;
  if (unresolvedTotal > 0) {
    console.log(`  ⚠ ${unresolvedTotal} scenario(s) had unresolved/ambiguous items (expected for NLP edge cases)`);
  }

  const oosaTotal = results.filter(r => r.outOfServiceArea).length;
  if (oosaTotal > 0) {
    console.log(`  ⚠ ${oosaTotal} scenario(s) were Out of Service Area`);
  }

  console.log('');
  console.log('  Next step: run "npm run review" to start operator review.');
  console.log('');

  return results;
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runScenarios();
}

export { scenarios, runScenarios };
