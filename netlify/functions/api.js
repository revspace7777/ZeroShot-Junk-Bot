import { calculateTotalPrice } from '../../src/pricing/pricingEngine.js';
import { processRequest } from '../../src/extraction/disambiguation.js';

export const handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '').replace('/api', '');

    if (path === '/quote' && event.httpMethod === 'POST') {
      const { text, zipCode } = JSON.parse(event.body);

      if (!text || !zipCode) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing text or zipCode' })
        };
      }

      // Step 1: Extract and Disambiguate NLP
      const { resolvedItems, ambiguousItems } = processRequest(text);
      
      const itemsToPrice = resolvedItems.map(i => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        unitPrice: i.unitPrice
      }));

      // Step 2: Calculate Price
      const priceResult = await calculateTotalPrice(itemsToPrice, zipCode);

      // Step 3: Combine Unresolved Items
      const finalUnresolved = [
        ...ambiguousItems,
        ...(priceResult.unresolvedItems || [])
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          total: priceResult.total,
          basePrice: priceResult.basePrice,
          itemSubtotal: priceResult.itemSubtotal,
          minimumPriceApplied: priceResult.minimumPriceApplied,
          outOfServiceArea: priceResult.outOfServiceArea,
          items: priceResult.items,
          unresolvedItems: finalUnresolved
        })
      };
    }

    if (path.startsWith('/validate-zip/') && event.httpMethod === 'GET') {
      const zip = path.split('/').pop();
      // Simple mock for validation endpoint from legacy frontend
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ valid: true, message: 'Valid' })
      };
    }

    if (path.startsWith('/location/') && event.httpMethod === 'GET') {
      const zip = path.split('/').pop();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ zip_code: zip, city: 'Local', state: 'US' })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not Found' })
    };

  } catch (err) {
    console.error('API Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
