/**
 * ZeroShot Junk Bot - Quote Calculator
 * 
 * Features:
 * - Browse/search 396 items from catalog
 * - Add items to quote with quantities
 * - Real-time price calculation (fully offline)
 * - Support for Marietta & Kennesaw, GA zip codes
 */

let itemCatalog = [];
let quoteItems = [];
let currentZipCode = window.ZipCodes ? window.ZipCodes.defaultZipCode : '30144';

// Initialize app
async function init() {
    await loadCatalog();
    if (window.ZipCodes) {
        await window.ZipCodes.loadZipCodeMaster();
    }
    setupEventListeners();
    renderItemList();
    updateZipStatus();
}

// Load item catalog
async function loadCatalog() {
    try {
        const response = await fetch('./data/items-catalog.json');
        const data = await response.json();
        itemCatalog = data.items;
        console.log(`Loaded ${itemCatalog.length} items from catalog`);
    } catch (error) {
        console.error('Failed to load catalog:', error);
        showError('Failed to load item catalog. Please refresh the page.');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Zip code update
    document.getElementById('updateZip').addEventListener('click', updateZipCode);
    document.getElementById('zipCode').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') updateZipCode();
    });

    // Item search
    document.getElementById('itemSearch').addEventListener('input', (e) => {
        renderItemList(e.target.value);
    });
}

// Update zip code
function updateZipCode() {
    const zipInput = document.getElementById('zipCode');
    const zip = zipInput.value.trim();
    
    if (!/^\d{5}$/.test(zip)) {
        showError('Please enter a valid 5-digit zip code');
        return;
    }
    
    // Validate zip code
    if (!window.ZipCodes || !window.ZipCodes.isValidZipCode(zip)) {
        showError('Invalid zip code. Please enter a valid zip code for Georgia or Florida.');
        return;
    }
    
    currentZipCode = zip;
    updateZipStatus();
    calculateQuote(); // Recalculate with new zip
}

// Update zip status indicator
function updateZipStatus() {
    const statusEl = document.getElementById('zipStatus');
    const cityEl = document.getElementById('cityName');
    
    // Get city name
    if (window.ZipCodes) {
        const city = window.ZipCodes.getCityForZip(currentZipCode);
        if (city) {
            cityEl.textContent = `(${city})`;
            cityEl.style.color = '#3498db';
            cityEl.style.fontWeight = '600';
        } else {
            cityEl.textContent = '';
        }
    }
    
    // All pricing is now offline
    statusEl.textContent = '✓ Offline pricing';
    statusEl.style.color = '#27ae60';
}

// Render item list with search filter
function renderItemList(searchTerm = '') {
    const itemListEl = document.getElementById('itemList');
    const searchLower = searchTerm.toLowerCase();
    
    // Filter items
    const filteredItems = itemCatalog.filter(item => {
        if (!searchTerm) return true;
        const name = (item.name || '').toLowerCase();
        const aliases = (item.aliases || []).join(' ').toLowerCase();
        return name.includes(searchLower) || aliases.includes(searchLower);
    });
    
    // Limit to 50 items for performance
    const displayItems = filteredItems.slice(0, 50);
    
    if (displayItems.length === 0) {
        itemListEl.innerHTML = '<p style="padding: 20px; text-align: center; color: #95a5a6;">No items found</p>';
        return;
    }
    
    itemListEl.innerHTML = displayItems.map(item => {
        const price = item.price || item.pickupPrice || 0;
        const priceDisplay = price > 0 ? `$${price.toFixed(2)}` : 'Price varies';
        return `
            <div class="item-item" onclick="addItemToQuote('${item.id}')">
                <div class="item-name">${escapeHtml(item.name)}</div>
                <div class="item-price">Price: <span class="price">${priceDisplay}</span></div>
            </div>
        `;
    }).join('');
}

// Add item to quote
function addItemToQuote(itemId) {
    const item = itemCatalog.find(i => i.id === itemId);
    if (!item) return;
    
    // Check if already in quote
    const existingIndex = quoteItems.findIndex(qi => qi.id === itemId);
    if (existingIndex >= 0) {
        quoteItems[existingIndex].quantity += 1;
    } else {
        quoteItems.push({
            id: itemId,
            name: item.name,
            unitPrice: item.price || item.pickupPrice || 0,
            quantity: 1
        });
    }
    
    renderQuoteItems();
    calculateQuote();
}

// Remove item from quote
function removeItemFromQuote(itemId) {
    quoteItems = quoteItems.filter(qi => qi.id !== itemId);
    renderQuoteItems();
    calculateQuote();
}

// Update item quantity
function updateQuantity(itemId, delta) {
    const item = quoteItems.find(qi => qi.id === itemId);
    if (!item) return;
    
    item.quantity = Math.max(1, item.quantity + delta);
    renderQuoteItems();
    calculateQuote();
}

// Set quantity directly
function setQuantity(itemId, quantity) {
    const item = quoteItems.find(qi => qi.id === itemId);
    if (!item) return;
    
    item.quantity = Math.max(1, parseInt(quantity) || 1);
    renderQuoteItems();
    calculateQuote();
}

// Render quote items
function renderQuoteItems() {
    const quoteItemsEl = document.getElementById('quoteItems');
    
    if (quoteItems.length === 0) {
        quoteItemsEl.innerHTML = '<p class="empty-message">No items added yet. Search and add items above.</p>';
        return;
    }
    
    quoteItemsEl.innerHTML = quoteItems.map(item => {
        const subtotal = item.unitPrice * item.quantity;
        return `
            <div class="quote-item">
                <div class="quote-item-info">
                    <div class="quote-item-name">${escapeHtml(item.name)}</div>
                    <div class="quote-item-price">$${item.unitPrice.toFixed(2)} × ${item.quantity} = $${subtotal.toFixed(2)}</div>
                </div>
                <div class="quote-item-controls">
                    <div class="quantity-control">
                        <button onclick="updateQuantity('${item.id}', -1)">−</button>
                        <input type="number" value="${item.quantity}" min="1" 
                               onchange="setQuantity('${item.id}', this.value)">
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeItemFromQuote('${item.id}')">Remove</button>
                </div>
            </div>
        `;
    }).join('');
}

// Calculate quote price (fully offline)
function calculateQuote() {
    if (quoteItems.length === 0) {
        document.getElementById('quoteSummary').style.display = 'none';
        return;
    }
    
    const loadingEl = document.getElementById('loadingIndicator');
    const summaryEl = document.getElementById('quoteSummary');
    const errorEl = document.getElementById('errorMessage');
    
    loadingEl.style.display = 'block';
    summaryEl.style.display = 'none';
    errorEl.style.display = 'none';
    
    try {
        // Prepare items for offline calculation
        const items = quoteItems.map(qi => ({
            id: qi.id,
            quantity: qi.quantity,
            name: qi.name
        }));
        
        let pricingResult;
        
        // Use offline pricing calculation for all zip codes
        if (typeof calculateTotalPrice === 'function') {
            pricingResult = calculateTotalPrice(items, currentZipCode, itemCatalog);
        } else {
            // Fallback to cached calculation
            pricingResult = calculateQuoteCached(items);
        }
        
        displayQuoteSummary(pricingResult);
        
    } catch (error) {
        console.error('Price calculation error:', error);
        showError(`Failed to calculate price: ${error.message}`);
    } finally {
        loadingEl.style.display = 'none';
    }
}

// Calculate quote using cached prices (for zip 30144)
function calculateQuoteCached(items) {
    let itemSubtotal = 0;
    
    items.forEach(item => {
        const catalogItem = itemCatalog.find(i => i.id === item.id);
        if (catalogItem) {
            const price = catalogItem.price || catalogItem.pickupPrice || 0;
            itemSubtotal += price * (item.quantity || 1);
        }
    });
    
    // Base price for 30144
    const basePrice = 59;
    const orderSubtotal = itemSubtotal + basePrice;
    const minimumPrice = 75;
    const minimumPriceApplied = orderSubtotal < minimumPrice;
    const total = Math.max(orderSubtotal, minimumPrice);
    
    return {
        itemSubtotal: itemSubtotal,
        basePrice: basePrice,
        orderSubtotal: orderSubtotal,
        minimumPrice: minimumPrice,
        minimumPriceApplied: minimumPriceApplied,
        total: total
    };
}

// Display quote summary
function displayQuoteSummary(result) {
    document.getElementById('itemSubtotal').textContent = `$${result.itemSubtotal.toFixed(2)}`;
    document.getElementById('basePrice').textContent = `$${result.basePrice.toFixed(2)}`;
    document.getElementById('orderSubtotal').textContent = `$${result.orderSubtotal.toFixed(2)}`;
    document.getElementById('totalPrice').innerHTML = `<strong>$${result.total.toFixed(2)}</strong>`;
    
    const minimumLine = document.getElementById('minimumLine');
    if (result.minimumPriceApplied) {
        minimumLine.style.display = 'flex';
        document.getElementById('minimumPrice').textContent = `$${result.minimumPrice.toFixed(2)}`;
    } else {
        minimumLine.style.display = 'none';
    }
    
    document.getElementById('quoteSummary').style.display = 'block';
}

// Show error message
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    
    setTimeout(() => {
        errorEl.style.display = 'none';
    }, 5000);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available
window.addItemToQuote = addItemToQuote;
window.removeItemFromQuote = removeItemFromQuote;
window.updateQuantity = updateQuantity;
window.setQuantity = setQuantity;

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

