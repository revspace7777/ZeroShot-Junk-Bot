import { calculateTotalPrice, setCatalog } from '../../src/pricing/pricingEngine.js';
import { processRequest } from '../../src/extraction/disambiguation.js';
import catalogData from '../../data/items-catalog-new.json';

// Initialize the catalog in the worker context since fs is unavailable
setCatalog(catalogData);

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Adjust for Odoo domain in production
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (request.method === 'POST' && url.pathname === '/api/quote') {
        const body = await request.json();
        const { text, zipCode } = body;

        if (!text || !zipCode) {
          return new Response(JSON.stringify({ error: 'Missing text or zipCode' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // 1. NLP Extraction
        const { resolvedItems, ambiguousItems } = processRequest(text, catalogData);

        const itemsToPrice = resolvedItems.map(i => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice
        }));

        // 2. Pricing via Hyperdrive Postgres Connection
        // env.HYPERDRIVE.connectionString is provided by the Cloudflare binding
        const connectionString = env.HYPERDRIVE.connectionString;
        const priceResult = await calculateTotalPrice(itemsToPrice, zipCode, catalogData, connectionString);

        // 3. Merge Ambiguous items
        const finalUnresolved = [
          ...ambiguousItems,
          ...(priceResult.unresolvedItems || [])
        ];

        return new Response(JSON.stringify({
          total: priceResult.total,
          basePrice: priceResult.basePrice,
          itemSubtotal: priceResult.itemSubtotal,
          minimumPriceApplied: priceResult.minimumPriceApplied,
          outOfServiceArea: priceResult.outOfServiceArea,
          items: priceResult.items,
          unresolvedItems: finalUnresolved
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (err) {
      console.error('Worker Error:', err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }
};
