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

        // 2. Pricing via Hyperdrive Postgres Connection
        // env.HYPERDRIVE.connectionString is provided by the Cloudflare binding
        const connectionString = env.HYPERDRIVE.connectionString;

        // 1. NLP Extraction
        const { resolvedItems, ambiguousItems } = await processRequest(text, connectionString);

        const itemsToPrice = resolvedItems.map(i => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice
        }));

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

      if (request.method === 'POST' && url.pathname === '/api/vision') {
        const body = await request.json();
        const { imageBase64, zipCode } = body;

        if (!imageBase64 || !zipCode) {
          return new Response(JSON.stringify({ error: 'Missing imageBase64 or zipCode' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        if (!env.OPENAI_API_KEY) {
          return new Response(JSON.stringify({ error: 'Vision API not configured (Missing OPENAI_API_KEY)' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // 1. Call OpenAI Vision API
        const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: "You are an object detector for a junk removal company. List the bulky junk items you see in this image. Output ONLY a comma-separated list of items (e.g., 'refrigerator, 3 piece sectional couch, mattress'). Do not include conversational text, volume estimations, or prices."
              },
              {
                role: 'user',
                content: [
                  {
                    type: 'image_url',
                    image_url: {
                      url: imageBase64.startsWith('data:image') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                    }
                  }
                ]
              }
            ],
            max_tokens: 100
          })
        });

        if (!openAiResponse.ok) {
          const errorText = await openAiResponse.text();
          console.error("OpenAI Error:", errorText);
          return new Response(JSON.stringify({ error: 'Failed to process image with Vision AI' }), {
            status: 502,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const openAiData = await openAiResponse.json();
        const extractedText = openAiData.choices[0].message.content;

        // 2. Pricing via Hyperdrive Postgres Connection
        const connectionString = env.HYPERDRIVE.connectionString;

        // 3. NLP Extraction on the LLM output
        const { resolvedItems, ambiguousItems } = await processRequest(extractedText, connectionString);

        const itemsToPrice = resolvedItems.map(i => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice
        }));

        const priceResult = await calculateTotalPrice(itemsToPrice, zipCode, catalogData, connectionString);

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
          unresolvedItems: finalUnresolved,
          visionText: extractedText // Optional, useful for debugging/UI
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
