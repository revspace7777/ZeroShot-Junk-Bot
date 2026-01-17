/**
 * ZeroShot Junk Bot Pricing Logic - Fully Offline
 * 
 * This function calculates the total price for a quote based on items and zip code.
 * Completely offline - uses local pricing data only.
 * 
 * @param {Array} items - Array of items with {id: string, quantity: number, unitPrice?: number}
 * @param {string} zipCode - 5-digit zip code
 * @param {Object} itemCatalog - Optional item catalog for price lookup
 * @returns {Object} Pricing details including total, breakdown, etc.
 * 
 * @example
 * const items = [{id: "7947", quantity: 1}]; // Mattress - Queen
 * const result = calculateTotalPrice(items, "30144", itemCatalog);
 * console.log(result.total); // 94
 */
function calculateTotalPrice(items, zipCode, itemCatalog = null) {
  // Zip code base price modifiers (local database)
  // All prices are stored locally - no external API calls
  const zipBasePrices = {
    // Georgia - Marietta & Kennesaw area (all use $59 base price)
    "30006": 59, "30007": 59, "30008": 59,
    "30060": 59, "30061": 59, "30062": 59, "30063": 59, "30064": 59,
    "30065": 59, "30066": 59, "30067": 59, "30068": 59, "30069": 59,
    "30090": 59,
    "30144": 59, "30152": 59, "30156": 59, "30160": 59,
    // Florida - Default pricing ($59 base, can be customized per zip)
    // Will be expanded as FL zip codes are added to master list
  };

  // Default base price (use average if zip not found)
  const basePrice = zipBasePrices[zipCode] || 59;
  const minimumPrice = 75;

  // Calculate item subtotal using catalog data if available
  let itemSubtotal = 0;
  
  items.forEach(item => {
    let unitPrice = item.unitPrice;
    
    // If no unit price provided, try to get from catalog
    if (!unitPrice && itemCatalog) {
      const catalogItem = itemCatalog.find(i => i.id === item.id);
      if (catalogItem) {
        // Use price from catalog (zip-specific if available, else pickupPrice)
        unitPrice = catalogItem.price || catalogItem.pickupPrice || 0;
      }
    }
    
    // Fallback to default if still no price
    if (!unitPrice || unitPrice === 0) {
      unitPrice = 30; // Default $30 if unknown
    }
    
    itemSubtotal += unitPrice * (item.quantity || 1);
  });

  // Calculate order subtotal
  const orderSubtotal = itemSubtotal + basePrice;

  // Apply minimum price
  const minimumPriceApplied = orderSubtotal < minimumPrice;
  const total = Math.max(orderSubtotal, minimumPrice);

  return {
    total: total,
    basePrice: basePrice,
    minimumPrice: minimumPrice,
    minimumPriceApplied: minimumPriceApplied,
    orderSubtotal: orderSubtotal,
    itemSubtotal: itemSubtotal,
    items: items.map(item => {
      let unitPrice = item.unitPrice;
      if (!unitPrice && itemCatalog) {
        const catalogItem = itemCatalog.find(i => i.id === item.id);
        if (catalogItem) {
          unitPrice = catalogItem.price || catalogItem.pickupPrice || 0;
        }
      }
      if (!unitPrice || unitPrice === 0) {
        unitPrice = 30;
      }
      return {
        itemType: {
          id: item.id,
          name: item.name || `Item ${item.id}`
        },
        pickupSubtotal: unitPrice * (item.quantity || 1),
        pickupUnitPrice: unitPrice
      };
    })
  };
}

// Export for Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateTotalPrice
  };
}

// Export for ES6 modules
if (typeof window !== 'undefined') {
  window.ZeroShotPricing = {
    calculateTotalPrice
  };
}
