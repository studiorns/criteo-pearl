// Funnel functionality for Criteo Dashboard
// Handles funnel view switching and dynamic population

// Function to show different funnel views
function showFunnelView(view) {
    // Get all funnel containers
    const overallFunnel = document.getElementById('overallFunnel');
    const marketsFunnel = document.getElementById('marketsFunnel');
    const mediaFunnel = document.getElementById('mediaFunnel');
    
    // Hide all funnels
    overallFunnel.style.display = 'none';
    marketsFunnel.style.display = 'none';
    mediaFunnel.style.display = 'none';
    
    // Update button states
    const buttons = document.querySelectorAll('.funnel-filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected funnel and activate button
    switch(view) {
        case 'overall':
            overallFunnel.style.display = 'block';
            buttons[0].classList.add('active');
            break;
        case 'markets':
            marketsFunnel.style.display = 'grid';
            buttons[1].classList.add('active');
            populateMarketFunnels();
            break;
        case 'media':
            mediaFunnel.style.display = 'grid';
            buttons[2].classList.add('active');
            break;
    }
}

// Function to populate market-specific funnels
function populateMarketFunnels() {
    const container = document.getElementById('marketsFunnel');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create funnel for each market
    const markets = ['France', 'UK', 'Germany', 'USA', 'UAE'];
    
    markets.forEach(market => {
        const marketData = criteoData.funnel_data.by_market[market];
        const marketInfo = criteoData.market_performance[market];
        
        if (marketData && marketInfo) {
            const miniFunnel = createMarketFunnel(market, marketData, marketInfo);
            container.appendChild(miniFunnel);
        }
    });
}

// Function to create individual market funnel
function createMarketFunnel(market, funnelData, marketInfo) {
    const funnel = document.createElement('div');
    funnel.className = 'mini-funnel';
    
    // Format numbers
    const impressions = formatLargeNumber(funnelData.impressions);
    const clicks = formatLargeNumber(funnelData.clicks);
    const bookings = formatNumber(funnelData.bookings);
    const revenue = formatCurrency(funnelData.revenue);
    
    // Calculate rates
    const ctr = ((funnelData.clicks / funnelData.impressions) * 100).toFixed(2);
    const convRate = ((funnelData.bookings / funnelData.clicks) * 100).toFixed(2);
    
    funnel.innerHTML = `
        <div class="mini-funnel-title">${market} - ROI: ${marketInfo.roi}x</div>
        <div class="mini-funnel-stages">
            <div class="mini-stage">
                <div class="mini-stage-value">${impressions}</div>
                <div class="mini-stage-label">Impressions</div>
            </div>
            <div class="mini-stage">
                <div class="mini-stage-value">${clicks}</div>
                <div class="mini-stage-label">Clicks (${ctr}%)</div>
            </div>
            <div class="mini-stage">
                <div class="mini-stage-value">${bookings}</div>
                <div class="mini-stage-label">Bookings (${convRate}%)</div>
            </div>
            <div class="mini-stage">
                <div class="mini-stage-value">${revenue}</div>
                <div class="mini-stage-label">Revenue</div>
            </div>
        </div>
    `;
    
    return funnel;
}

// Function to format large numbers (millions)
function formatLargeNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Update funnel when market filter changes
function updateFunnelForMarket(market) {
    const overallFunnel = document.getElementById('overallFunnel');
    
    if (market === 'All Markets') {
        // Show overall funnel data
        document.getElementById('funnel-impressions').textContent = '425M';
        document.getElementById('funnel-clicks').textContent = '1.05M';
        document.getElementById('funnel-bookings').textContent = '7,390';
        document.getElementById('funnel-revenue').textContent = '$9M';
        
        // Update conversion rates
        const stages = overallFunnel.querySelectorAll('.funnel-rate');
        stages[0].textContent = '100%';
        stages[1].textContent = 'CTR: 0.25%';
        stages[2].textContent = 'Conv: 0.70%';
        stages[3].textContent = 'Avg: $1,218';
        
    } else if (criteoData.funnel_data.by_market[market]) {
        // Show market-specific funnel data
        const marketData = criteoData.funnel_data.by_market[market];
        
        document.getElementById('funnel-impressions').textContent = formatLargeNumber(marketData.impressions);
        document.getElementById('funnel-clicks').textContent = formatLargeNumber(marketData.clicks);
        document.getElementById('funnel-bookings').textContent = formatNumber(marketData.bookings);
        document.getElementById('funnel-revenue').textContent = formatCurrency(marketData.revenue);
        
        // Update conversion rates for this market
        const ctr = ((marketData.clicks / marketData.impressions) * 100).toFixed(2);
        const convRate = ((marketData.bookings / marketData.clicks) * 100).toFixed(2);
        const avgBasket = marketData.revenue / marketData.bookings;
        
        const stages = overallFunnel.querySelectorAll('.funnel-rate');
        stages[0].textContent = '100%';
        stages[1].textContent = `CTR: ${ctr}%`;
        stages[2].textContent = `Conv: ${convRate}%`;
        stages[3].textContent = `Avg: ${formatCurrency(avgBasket)}`;
    }
}

// Initialize funnel interactions
document.addEventListener('DOMContentLoaded', function() {
    // Check if criteoData is available
    if (typeof criteoData !== 'undefined' && criteoData.funnel_data) {
        // Initialize with overall view
        showFunnelView('overall');
        
        // Listen for market filter changes
        const originalUpdateDashboard = window.updateDashboard;
        window.updateDashboard = function(market) {
            // Call original update function
            if (originalUpdateDashboard) {
                originalUpdateDashboard(market);
            }
            // Update funnel for selected market
            updateFunnelForMarket(market);
        };
    }
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showFunnelView, populateMarketFunnels, updateFunnelForMarket };
}
