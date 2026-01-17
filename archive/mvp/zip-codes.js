/**
 * ZeroShot Junk Bot - Zip Codes Master
 * Loads zip code data from master list
 */

let zipCodeMaster = null;
let validZipCodes = [];
let defaultZipCode = '30144';

/**
 * Load zip code master data
 */
async function loadZipCodeMaster() {
    try {
        const response = await fetch('./data/zip-codes-master.json');
        zipCodeMaster = await response.json();
        
        // Build flat list of valid zip codes
        validZipCodes = [];
        
        // Process GA
        if (zipCodeMaster.GA && zipCodeMaster.GA.counties) {
            Object.values(zipCodeMaster.GA.counties).forEach(county => {
                if (county.cities) {
                    Object.values(county.cities).forEach(city => {
                        if (city.zipCodes) {
                            validZipCodes.push(...city.zipCodes);
                        }
                    });
                }
            });
        }
        
        // Process FL
        if (zipCodeMaster.FL && zipCodeMaster.FL.counties) {
            Object.values(zipCodeMaster.FL.counties).forEach(county => {
                if (county.cities) {
                    Object.values(county.cities).forEach(city => {
                        if (city.zipCodes) {
                            validZipCodes.push(...city.zipCodes);
                        }
                    });
                }
            });
        }
        
        return true;
    } catch (error) {
        console.error('Failed to load zip code master:', error);
        // Fallback to hardcoded list
        validZipCodes = [
            // Marietta, GA
            '30006', '30007', '30008', '30060', '30061', '30062', '30063', '30064',
            '30065', '30066', '30067', '30068', '30069', '30090',
            // Kennesaw, GA
            '30144', '30152', '30156', '30160'
        ];
        return false;
    }
}

/**
 * Check if zip code is valid
 */
function isValidZipCode(zipCode) {
    return validZipCodes.includes(zipCode);
}

/**
 * Get city name for zip code
 */
function getCityForZip(zipCode) {
    if (!zipCodeMaster) return null;
    
    // Check GA
    if (zipCodeMaster.GA && zipCodeMaster.GA.counties) {
        for (const [county, countyData] of Object.entries(zipCodeMaster.GA.counties)) {
            if (countyData.cities) {
                for (const [city, cityData] of Object.entries(countyData.cities)) {
                    if (cityData.zipCodes && cityData.zipCodes.includes(zipCode)) {
                        return `${city}, GA`;
                    }
                }
            }
        }
    }
    
    // Check FL
    if (zipCodeMaster.FL && zipCodeMaster.FL.counties) {
        for (const [county, countyData] of Object.entries(zipCodeMaster.FL.counties)) {
            if (countyData.cities) {
                for (const [city, cityData] of Object.entries(countyData.cities)) {
                    if (cityData.zipCodes && cityData.zipCodes.includes(zipCode)) {
                        return `${city}, FL`;
                    }
                }
            }
        }
    }
    
    return null;
}

/**
 * Get state for zip code
 */
function getStateForZip(zipCode) {
    if (!zipCodeMaster) return null;
    
    // Check GA
    if (zipCodeMaster.GA && zipCodeMaster.GA.counties) {
        for (const countyData of Object.values(zipCodeMaster.GA.counties)) {
            if (countyData.cities) {
                for (const cityData of Object.values(countyData.cities)) {
                    if (cityData.zipCodes && cityData.zipCodes.includes(zipCode)) {
                        return 'GA';
                    }
                }
            }
        }
    }
    
    // Check FL
    if (zipCodeMaster.FL && zipCodeMaster.FL.counties) {
        for (const countyData of Object.values(zipCodeMaster.FL.counties)) {
            if (countyData.cities) {
                for (const cityData of Object.values(countyData.cities)) {
                    if (cityData.zipCodes && cityData.zipCodes.includes(zipCode)) {
                        return 'FL';
                    }
                }
            }
        }
    }
    
    return null;
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.ZipCodes = {
        loadZipCodeMaster,
        isValidZipCode,
        getCityForZip,
        getStateForZip,
        validZipCodes: () => validZipCodes,
        defaultZipCode
    };
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadZipCodeMaster,
        isValidZipCode,
        getCityForZip,
        getStateForZip,
        validZipCodes: () => validZipCodes,
        defaultZipCode
    };
}

