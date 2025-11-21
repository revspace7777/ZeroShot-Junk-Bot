#!/usr/bin/env node
/**
 * ZeroShot Junk Bot - CSV/JSON Sync Script
 * 
 * Keeps items-catalog.json and items-catalog.csv in sync
 * Also syncs zip-codes-master.json and zip-codes-master.csv
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..');
const itemsJsonPath = path.join(dataDir, 'items-catalog.json');
const itemsCsvPath = path.join(dataDir, 'items-catalog.csv');
const zipJsonPath = path.join(dataDir, 'zip-codes-master.json');
const zipCsvPath = path.join(dataDir, 'zip-codes-master.csv');

/**
 * Sync items catalog JSON to CSV
 */
function syncItemsJsonToCsv() {
    try {
        const jsonData = JSON.parse(fs.readFileSync(itemsJsonPath, 'utf-8'));
        const items = jsonData.items || [];
        
        // CSV headers
        const headers = ['id', 'name', 'slug', 'category', 'pickupPrice', 'assemblyPrice', 'disassemblyPrice', 
                        'volume', 'price', 'priceZip', 'icon', 'aliases', 'attributes'];
        
        // Build CSV rows
        const rows = [headers.join(',')];
        
        items.forEach(item => {
            const row = [
                item.id || '',
                `"${(item.name || '').replace(/"/g, '""')}"`,
                item.slug || '',
                item.category || '',
                item.pickupPrice || 0,
                item.assemblyPrice || 0,
                item.disassemblyPrice || 0,
                item.volume || 0,
                item.price || 0,
                item.priceZip || '',
                item.icon || '',
                `"${(item.aliases || []).join(';')}"`,
                `"${(item.attributes || []).join(';')}"`
            ];
            rows.push(row.join(','));
        });
        
        fs.writeFileSync(itemsCsvPath, rows.join('\n'), 'utf-8');
        console.log(`✓ Synced ${items.length} items to CSV`);
        return true;
    } catch (error) {
        console.error(`✗ Error syncing items JSON to CSV: ${error.message}`);
        return false;
    }
}

/**
 * Sync zip codes JSON to CSV
 */
function syncZipJsonToCsv() {
    try {
        const jsonData = JSON.parse(fs.readFileSync(zipJsonPath, 'utf-8'));
        const rows = ['State,County,City,Neighborhood,ZipCode'];
        
        // Process GA
        if (jsonData.GA && jsonData.GA.counties) {
            Object.entries(jsonData.GA.counties).forEach(([county, countyData]) => {
                if (countyData.cities) {
                    Object.entries(countyData.cities).forEach(([city, cityData]) => {
                        const zipCodes = cityData.zipCodes || [];
                        zipCodes.forEach(zip => {
                            rows.push(`GA,"${county}","${city}",,"${zip}"`);
                        });
                    });
                }
            });
        }
        
        // Process FL
        if (jsonData.FL && jsonData.FL.counties) {
            Object.entries(jsonData.FL.counties).forEach(([county, countyData]) => {
                if (countyData.cities) {
                    Object.entries(countyData.cities).forEach(([city, cityData]) => {
                        const zipCodes = cityData.zipCodes || [];
                        zipCodes.forEach(zip => {
                            rows.push(`FL,"${county}","${city}",,"${zip}"`);
                        });
                    });
                }
            });
        }
        
        fs.writeFileSync(zipCsvPath, rows.join('\n'), 'utf-8');
        console.log(`✓ Synced zip codes to CSV`);
        return true;
    } catch (error) {
        console.error(`✗ Error syncing zip codes JSON to CSV: ${error.message}`);
        return false;
    }
}

// Main execution
console.log('ZeroShot Junk Bot - CSV/JSON Sync');
console.log('==================================\n');

const itemsSuccess = syncItemsJsonToCsv();
const zipSuccess = syncZipJsonToCsv();

if (itemsSuccess && zipSuccess) {
    console.log('\n✓ All syncs completed successfully');
    process.exit(0);
} else {
    console.log('\n✗ Some syncs failed');
    process.exit(1);
}

