// Abu Dhabi Funnel Data
const abuDhabiFunnelData = {
    overall: {
        impressions: 453835059,  // Sum of all market impressions
        clicks: 1296932,         // Sum of all market clicks
        bookings: 2162,          // Abu Dhabi bookings (validated from market totals)
        cost: 316363             // Total media investment across all markets
    },
    markets: {
        france: {
            name: 'France',
            mediaInvestment: 40723.23,    // Display + Video total cost
            impressions: 100498794,       // Display + Video impressions
            clicks: 336014,               // Display + Video clicks
            bookings: 1350,               // Abu Dhabi bookings
            cpb: 30.17                    // Total investment ÷ Abu Dhabi bookings
        },
        usa: {
            name: 'United States', 
            mediaInvestment: 69408.94,    // Display + Video total cost
            impressions: 50941878,        // Display + Video impressions
            clicks: 230484,               // Display + Video clicks
            bookings: 108,                // Abu Dhabi bookings
            cpb: 642.68                   // Total investment ÷ Abu Dhabi bookings
        },
        uk: {
            name: 'United Kingdom',
            mediaInvestment: 111220.83,   // Display + Video total cost
            impressions: 116926792,       // Display + Video impressions
            clicks: 323281,               // Display + Video clicks
            bookings: 244,                // Abu Dhabi bookings
            cpb: 455.82                   // Total investment ÷ Abu Dhabi bookings
        },
        germany: {
            name: 'Germany',
            mediaInvestment: 71144.27,    // Display + Video total cost
            impressions: 151246689,       // Display + Video impressions
            clicks: 323245,               // Display + Video clicks
            bookings: 167,                // Abu Dhabi bookings
            cpb: 426.01                   // Total investment ÷ Abu Dhabi bookings
        },
        uae: {
            name: 'UAE',
            mediaInvestment: 23866.80,    // Display + Video total cost
            impressions: 34221006,        // Display + Video impressions
            clicks: 83908,                // Display + Video clicks
            bookings: 293,                // Abu Dhabi bookings
            cpb: 81.46                    // Total investment ÷ Abu Dhabi bookings
        }
    },
    verticals: {
        ota: {
            name: 'Online Travel Agents',
            bookings: 488,               // VALIDATED CSV DATA: 488 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 649                     // $316,363 ÷ 488 bookings (rounded)
        },
        services: {
            name: 'Travel Services',
            bookings: 366,               // VALIDATED CSV DATA: 366 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 864                     // $316,363 ÷ 366 bookings (rounded)
        },
        private: {
            name: 'Private Accommodation',
            bookings: 335,               // VALIDATED CSV DATA: 335 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 944                     // $316,363 ÷ 335 bookings (rounded)
        },
        metasearch: {
            name: 'Travel Metasearch',
            bookings: 162,               // VALIDATED CSV DATA: 162 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 1953                    // $316,363 ÷ 162 bookings (rounded)
        },
        airlines: {
            name: 'Airlines',
            bookings: 135,               // VALIDATED CSV DATA: 135 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 2343                    // $316,363 ÷ 135 bookings (rounded)
        },
        ground: {
            name: 'Ground/Cruise',
            bookings: 119,               // VALIDATED CSV DATA: 119 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 2659                    // $316,363 ÷ 119 bookings (rounded)
        },
        car: {
            name: 'Car Rental',
            bookings: 84,                // VALIDATED CSV DATA: 84 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 3766                    // $316,363 ÷ 84 bookings (rounded)
        },
        experience: {
            name: 'Experience',
            bookings: 42,                // VALIDATED CSV DATA: 42 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 7532                    // $316,363 ÷ 42 bookings (rounded)
        },
        tours: {
            name: 'Tour Operators',
            bookings: 24,                // VALIDATED CSV DATA: 24 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 13182                   // $316,363 ÷ 24 bookings (rounded)
        },
        hotels: {
            name: 'Hotels/Resorts',
            bookings: 21,                // VALIDATED CSV DATA: 21 Abu Dhabi bookings
            mediaInvestment: 316363,     // UNIFORM: Total campaign investment
            cpb: 15065                   // $316,363 ÷ 21 bookings (rounded)
        }
    }
};

// Current view state
let currentFunnelView = 'overall';

// Format numbers for display
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Format currency for costs
function formatCurrency(num) {
    if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return '$' + (num / 1000).toFixed(0) + 'K';
    }
    return '$' + num.toLocaleString();
}

// Calculate conversion rate
function calculateConversionRate(from, to) {
    if (from === 0) return '0%';
    return ((to / from) * 100).toFixed(2) + '%';
}

// Create overall funnel
function createOverallFunnel() {
    const data = abuDhabiFunnelData.overall;
    const avgCPB = 327.23; // Simple arithmetic average across markets (matches dashboard metric)
    
    return `
        <div class="funnel-wrapper">
            <div class="funnel-stage">
                <div class="funnel-stage-value">${formatNumber(data.impressions)}</div>
                <div class="funnel-stage-label">Impressions</div>
                <div class="funnel-stage-percent">Abu Dhabi Campaigns</div>
                <div class="funnel-arrow"></div>
                <div class="funnel-conversion">${calculateConversionRate(data.impressions, data.clicks)} CTR</div>
            </div>
            <div class="funnel-stage">
                <div class="funnel-stage-value">${formatNumber(data.clicks)}</div>
                <div class="funnel-stage-label">Clicks</div>
                <div class="funnel-stage-percent">0.28% CTR</div>
                <div class="funnel-arrow"></div>
                <div class="funnel-conversion">${calculateConversionRate(data.clicks, data.bookings)} CVR</div>
            </div>
            <div class="funnel-stage">
                <div class="funnel-stage-value">${formatNumber(data.bookings)}</div>
                <div class="funnel-stage-label">Bookings</div>
                <div class="funnel-stage-percent">Abu Dhabi Destination</div>
                <div class="funnel-arrow"></div>
                <div class="funnel-conversion">${formatCurrency(data.cost)} Total Spend</div>
            </div>
            <div class="funnel-stage">
                <div class="funnel-stage-value">$${avgCPB.toFixed(2)}</div>
                <div class="funnel-stage-label">Avg Cost Per Booking</div>
                <div class="funnel-stage-percent">Multi-market average</div>
            </div>
        </div>
    `;
}

// Create market funnels
function createMarketFunnels() {
    let html = '<div class="funnel-grid">';
    
    Object.keys(abuDhabiFunnelData.markets).forEach(key => {
        const market = abuDhabiFunnelData.markets[key];
        html += `
            <div class="mini-funnel">
                <div class="mini-funnel-title">${market.name}</div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">Total Media Investment</span>
                    <span class="mini-funnel-value">${formatCurrency(market.mediaInvestment)}</span>
                    <div class="mini-funnel-arrow"></div>
                </div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">Impressions</span>
                    <span class="mini-funnel-value">${formatNumber(market.impressions)}</span>
                    <div class="mini-funnel-arrow"></div>
                </div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">Clicks</span>
                    <span class="mini-funnel-value">${formatNumber(market.clicks)}</span>
                    <div class="mini-funnel-arrow"></div>
                </div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">Bookings</span>
                    <span class="mini-funnel-value">${formatNumber(market.bookings)}</span>
                    <div class="mini-funnel-arrow"></div>
                </div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">CPB</span>
                    <span class="mini-funnel-value">$${market.cpb.toFixed(2)}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Create vertical funnels (3-stage simplified view)
function createVerticalFunnels() {
    // Add data disclaimer
    let html = `
        <div style="background-color: #2d2d2d; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #fbbc04;">
            <div style="color: #fbbc04; font-weight: 600; margin-bottom: 8px;">📊 Data Quality Notice</div>
            <div style="color: #c0c0c0; font-size: 0.9rem; line-height: 1.5;">
                <strong>Bookings:</strong> Validated CSV data (1,776 total tracked in vertical breakdown)<br>
                <strong>Media Investment:</strong> Uniform $316,363 across all verticals (verticals = booking attribution)<br>
                <strong>Note:</strong> 386 bookings (18%) not categorized in travel vertical breakdown
            </div>
        </div>
        <div class="funnel-grid">`;
    
    Object.keys(abuDhabiFunnelData.verticals).forEach(key => {
        const vertical = abuDhabiFunnelData.verticals[key];
        html += `
            <div class="mini-funnel">
                <div class="mini-funnel-title">${vertical.name}</div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">Total Media Investment</span>
                    <span class="mini-funnel-value">${formatCurrency(vertical.mediaInvestment)}</span>
                    <div class="mini-funnel-arrow"></div>
                </div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">Bookings</span>
                    <span class="mini-funnel-value">${formatNumber(vertical.bookings)}</span>
                    <div class="mini-funnel-arrow"></div>
                </div>
                <div class="mini-funnel-stage">
                    <span class="mini-funnel-label">CPB</span>
                    <span class="mini-funnel-value">$${vertical.cpb.toLocaleString()}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Show funnel view
function showFunnelView(view) {
    currentFunnelView = view;
    
    // Update button states
    document.querySelectorAll('.funnel-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Update funnel content
    const funnelContainer = document.getElementById('funnelContainer');
    
    switch(view) {
        case 'overall':
            funnelContainer.innerHTML = createOverallFunnel();
            break;
        case 'markets':
            funnelContainer.innerHTML = createMarketFunnels();
            break;
        case 'verticals':
            funnelContainer.innerHTML = createVerticalFunnels();
            break;
    }
}

// Initialize funnel on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the Abu Dhabi dashboard
    const funnelContainer = document.getElementById('funnelContainer');
    if (funnelContainer) {
        // Initialize with overall view
        funnelContainer.innerHTML = createOverallFunnel();
    }
});
