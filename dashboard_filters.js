// Dashboard Filter Functionality
// Handles country selection and data filtering

let currentMarket = 'all';
let chartInstances = {};

// Initialize filters on page load
function initializeFilters() {
    createMarketFilterButtons();
    attachFilterListeners();
    updateDashboard('all');
}

// Create market filter buttons dynamically
function createMarketFilterButtons() {
    const filterContainer = document.getElementById('marketFilterButtons');
    if (!filterContainer) return;
    
    // Add "All Markets" button
    let buttonsHTML = `
        <button class="filter-btn active" data-market="all">
            <i class="fas fa-globe"></i> All Markets
        </button>`;
    
    // Add individual market buttons
    const markets = getMarketList();
    markets.forEach(market => {
        const marketData = getMarketData(market);
        const color = getColorByPerformance(marketData.roi, 'roi');
        buttonsHTML += `
            <button class="filter-btn" data-market="${market}" style="border-color: ${color}">
                <i class="fas fa-map-marker-alt"></i> ${market}
            </button>`;
    });
    
    filterContainer.innerHTML = buttonsHTML;
}

// Attach event listeners to filter buttons
function attachFilterListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const market = this.getAttribute('data-market');
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update dashboard
            updateDashboard(market);
            
            // Update URL without reload
            updateURL(market);
        });
    });
}

// Update dashboard based on selected market
function updateDashboard(market) {
    currentMarket = market;
    
    // Update metric cards
    updateMetricCards(market);
    
    // Update summary text
    updateSummaryText(market);
    
    // Update charts
    updateCharts(market);
    
    // Update detailed tables
    updateDetailedTables(market);
    
    // Show/hide market-specific sections
    toggleMarketSections(market);
}

// Update metric cards with filtered data
function updateMetricCards(market) {
    let data;
    
    if (market === 'all') {
        data = {
            totalBookings: criteoData.campaign_overview.total_bookings,
            totalRevenue: criteoData.campaign_overview.total_revenue,
            totalCost: criteoData.campaign_overview.total_investment,
            avgCPB: criteoData.campaign_overview.total_investment / criteoData.campaign_overview.total_bookings,
            roi: criteoData.campaign_overview.overall_roi,
            avgBasket: criteoData.campaign_overview.average_booking_value
        };
    } else {
        const marketData = getMarketData(market);
        if (!marketData) return;
        
        data = {
            totalBookings: marketData.total_bookings,
            totalRevenue: marketData.revenue,
            totalCost: marketData.total_cost,
            avgCPB: marketData.cpb,
            roi: marketData.roi,
            avgBasket: marketData.average_basket
        };
    }
    
    // Update card values
    updateCardValue('totalBookings', formatNumber(data.totalBookings));
    updateCardValue('totalRevenue', formatCurrency(data.totalRevenue));
    updateCardValue('totalCost', formatCurrency(data.totalCost));
    updateCardValue('avgCPB', formatCurrencyWithDecimals(data.avgCPB));
    updateCardValue('roi', data.roi + 'x');
    updateCardValue('avgBasket', formatCurrency(data.avgBasket));
}

// Helper function to update card values
function updateCardValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
        // Add animation effect
        element.classList.add('value-updated');
        setTimeout(() => element.classList.remove('value-updated'), 300);
    }
}

// Update summary text based on selection
function updateSummaryText(market) {
    const summaryElement = document.getElementById('marketSummary');
    if (!summaryElement) return;
    
    if (market === 'all') {
        summaryElement.innerHTML = `
            <h3>Campaign Overview</h3>
            <p>Project Pearl achieved <strong>7,390 bookings</strong> with a <strong>30x ROI</strong> across 5 markets.
            France leads with 55% market share and exceptional $10 CPB efficiency.</p>
        `;
    } else {
        const marketData = getMarketData(market);
        if (!marketData) return;
        
        const dubaiBkg = marketData.bookings_dubai || 0;
        const abuDhabiBkg = marketData.bookings_abu_dhabi || 0;
        const dubaiPct = ((dubaiBkg / marketData.total_bookings) * 100).toFixed(1);
        const abuDhabiPct = ((abuDhabiBkg / marketData.total_bookings) * 100).toFixed(1);
        
        summaryElement.innerHTML = `
            <h3>${market} Market Performance</h3>
            <p><strong>${formatNumber(marketData.total_bookings)} bookings</strong> with 
            <strong>${marketData.roi}x ROI</strong> and 
            <strong>${formatCurrencyWithDecimals(marketData.cpb)} CPB</strong>.<br>
            Destination split: Dubai (${dubaiPct}%) | Abu Dhabi (${abuDhabiPct}%)</p>
        `;
    }
}

// Update charts based on market selection
function updateCharts(market) {
    if (market === 'all') {
        // Destroy existing charts and reinitialize
        destroyAllCharts();
        setTimeout(() => initializeCharts(), 100);
    } else {
        updateMarketSpecificCharts(market);
    }
}

// Destroy all chart instances
function destroyAllCharts() {
    const chartIds = ['marketPerformanceChart', 'destinationChart', 'monthlyTrendChart', 
                     'travelVerticalChart', 'mediaPerformanceChart', 'roiComparisonChart'];
    
    chartIds.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas && canvas.chart) {
            canvas.chart.destroy();
        }
    });
}

// Update detailed tables with filtered data
function updateDetailedTables(market) {
    const tableBody = document.getElementById('marketDetailsTable');
    if (!tableBody) return;
    
    let tableHTML = '';
    
    if (market === 'all') {
        // Show all markets
        const markets = getMarketList();
        markets.forEach(m => {
            const data = getMarketData(m);
            tableHTML += generateTableRow(m, data);
        });
    } else {
        // Show only selected market
        const data = getMarketData(market);
        if (data) {
            tableHTML = generateTableRow(market, data);
        }
    }
    
    tableBody.innerHTML = tableHTML;
}

// Generate table row HTML
function generateTableRow(market, data) {
    const roiClass = data.roi >= 30 ? 'positive' : (data.roi >= 15 ? 'neutral' : 'negative');
    const cpbClass = data.cpb <= 50 ? 'positive' : (data.cpb <= 100 ? 'neutral' : 'negative');
    
    return `
        <tr>
            <td><strong>${market}</strong></td>
            <td>${formatNumber(data.total_bookings)}</td>
            <td>${formatCurrency(data.revenue)}</td>
            <td class="${cpbClass}">${formatCurrencyWithDecimals(data.cpb)}</td>
            <td class="${roiClass}">${data.roi}x</td>
            <td>${formatPercentage(data.market_share)}</td>
            <td>${formatCurrency(data.average_basket)}</td>
        </tr>
    `;
}

// Toggle market-specific sections visibility
function toggleMarketSections(market) {
    const allMarketsSection = document.getElementById('allMarketsSection');
    const marketSpecificSection = document.getElementById('marketSpecificSection');
    
    if (market === 'all') {
        if (allMarketsSection) allMarketsSection.style.display = 'block';
        if (marketSpecificSection) marketSpecificSection.style.display = 'none';
    } else {
        if (allMarketsSection) allMarketsSection.style.display = 'none';
        if (marketSpecificSection) {
            marketSpecificSection.style.display = 'block';
            updateMarketSpecificContent(market);
        }
    }
}

// Update market-specific content
function updateMarketSpecificContent(market) {
    const marketData = getMarketData(market);
    if (!marketData) return;
    
    // Update destination breakdown for specific market
    const destBreakdown = document.getElementById('marketDestinationBreakdown');
    if (destBreakdown) {
        const dubaiBookings = marketData.bookings_dubai || 0;
        const abuDhabiBookings = marketData.bookings_abu_dhabi || 0;
        
        destBreakdown.innerHTML = `
            <h4>${market} Destination Breakdown</h4>
            <div class="destination-stats">
                <div class="dest-stat">
                    <div class="dest-label">Dubai</div>
                    <div class="dest-value">${formatNumber(dubaiBookings)}</div>
                    <div class="dest-pct">${((dubaiBookings/marketData.total_bookings)*100).toFixed(1)}%</div>
                </div>
                <div class="dest-stat">
                    <div class="dest-label">Abu Dhabi</div>
                    <div class="dest-value">${formatNumber(abuDhabiBookings)}</div>
                    <div class="dest-pct">${((abuDhabiBookings/marketData.total_bookings)*100).toFixed(1)}%</div>
                </div>
            </div>
        `;
    }
}

// Update URL with market parameter
function updateURL(market) {
    const url = new URL(window.location);
    if (market === 'all') {
        url.searchParams.delete('market');
    } else {
        url.searchParams.set('market', market);
    }
    window.history.pushState({}, '', url);
}

// Load market from URL on page load
function loadMarketFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const market = urlParams.get('market') || 'all';
    
    // Trigger filter button click
    const btn = document.querySelector(`[data-market="${market}"]`);
    if (btn) {
        btn.click();
    }
}

// Export functions for use in main dashboard
if (typeof window !== 'undefined') {
    window.dashboardFilters = {
        init: initializeFilters,
        updateDashboard: updateDashboard,
        loadFromURL: loadMarketFromURL
    };
}
