// Abu Dhabi Tourism Campaign Data - Project Pearl
// Department of Culture and Tourism - Abu Dhabi
// Data validated on January 21, 2026

const abuDhabiData = {
    campaign_overview: {
        campaign_name: "Project Pearl - Abu Dhabi Focus",
        period: "October 1 - November 30, 2025",
        total_bookings: 2162,
        percentage_of_total: 29.3,
        total_campaign_cost: 315792,
        abu_dhabi_allocated_cost: 92547, // Proportional allocation based on bookings
        average_cpb: 42.8,
        average_basket: 1218
    },
    
    market_performance: {
        "France": {
            rank: 1,
            abu_dhabi_bookings: 1350,
            market_share: 0.624, // 62.4% of Abu Dhabi bookings
            estimated_cost: 13551, // Proportional from France's $40,723
            cpb: 10.04,
            average_basket: 989,
            growth_potential: "High"
        },
        "UAE": {
            rank: 2,
            abu_dhabi_bookings: 293,
            market_share: 0.135, // 13.5% of Abu Dhabi bookings
            estimated_cost: 23294, // 100% of UAE cost goes to Abu Dhabi
            cpb: 79.50,
            average_basket: 431,
            growth_potential: "Medium"
        },
        "UK": {
            rank: 3,
            abu_dhabi_bookings: 244,
            market_share: 0.113, // 11.3% of Abu Dhabi bookings
            estimated_cost: 17424, // Proportional from UK's $111,221
            cpb: 71.39,
            average_basket: 1706,
            growth_potential: "High"
        },
        "Germany": {
            rank: 4,
            abu_dhabi_bookings: 167,
            market_share: 0.077, // 7.7% of Abu Dhabi bookings
            estimated_cost: 12128, // Proportional from Germany's $71,144
            cpb: 72.60,
            average_basket: 1551,
            growth_potential: "Medium"
        },
        "USA": {
            rank: 5,
            abu_dhabi_bookings: 108,
            market_share: 0.050, // 5.0% of Abu Dhabi bookings
            estimated_cost: 14876, // Proportional from USA's $69,409
            cpb: 137.72,
            average_basket: 1386,
            growth_potential: "High"
        }
    },
    
    monthly_performance: {
        october: {
            abu_dhabi_bookings: 399, // Estimated based on overall ratio
            estimated_cost: 50706
        },
        november: {
            abu_dhabi_bookings: 1763, // Estimated based on overall ratio
            estimated_cost: 41841,
            mom_growth: 342
        }
    },
    
    travel_verticals_abu_dhabi: [
        {
            name: "ONLINE TRAVEL AGENTS",
            bookings: 488,
            percentage: 22.57,
            rank: 1
        },
        {
            name: "TRAVEL SERVICES",
            bookings: 366,
            percentage: 16.93,
            rank: 2
        },
        {
            name: "PRIVATE ACCOMMODATION",
            bookings: 335,
            percentage: 15.49,
            rank: 3
        },
        {
            name: "TRAVEL METASEARCH",
            bookings: 162,
            percentage: 7.49,
            rank: 4
        },
        {
            name: "AIRLINES",
            bookings: 135,
            percentage: 6.24,
            rank: 5
        },
        {
            name: "GROUND/CRUISE",
            bookings: 119,
            percentage: 5.50,
            rank: 6
        },
        {
            name: "CAR RENTAL",
            bookings: 84,
            percentage: 3.89,
            rank: 7
        },
        {
            name: "EXPERIENCE",
            bookings: 42,
            percentage: 1.94,
            rank: 8
        },
        {
            name: "TOUR OPERATORS",
            bookings: 24,
            percentage: 1.11,
            rank: 9
        },
        {
            name: "HOTELS/RESORTS",
            bookings: 21,
            percentage: 0.97,
            rank: 10
        }
    ],
    
    key_insights: {
        top_market: "France",
        top_market_share: 62.4,
        top_vertical: "Online Travel Agents",
        top_vertical_share: 22.57,
        growth_rate: 342, // October to November
        unique_strengths: [
            "100% of UAE resident bookings",
            "Strong OTA partnerships",
            "High French market penetration",
            "Private accommodation appeal"
        ],
        challenges: [
            "Only 29.3% of total campaign bookings",
            "Low USA market penetration (5%)",
            "Minimal hotel/resort bookings (0.97%)",
            "Higher CPB than competitor destination"
        ]
    }
};

// Helper functions for data manipulation
function getMarketList() {
    return Object.keys(abuDhabiData.market_performance);
}

function getMarketData(market) {
    return abuDhabiData.market_performance[market] || null;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function formatCurrencyWithDecimals(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
}

function formatPercentage(value) {
    if (value > 1) {
        return value.toFixed(1) + '%';
    }
    return (value * 100).toFixed(1) + '%';
}

function getColorByPerformance(value, type = 'share') {
    if (type === 'share') {
        if (value >= 0.5) return '#34a853';  // Green
        if (value >= 0.2) return '#4285f4';  // Blue
        if (value >= 0.1) return '#fbbc04';  // Yellow
        return '#ea4335';  // Red
    }
    if (type === 'cpb') {
        if (value <= 50) return '#34a853';  // Green - Lower is better
        if (value <= 100) return '#4285f4'; // Blue
        if (value <= 150) return '#fbbc04'; // Yellow
        return '#ea4335';  // Red
    }
    return '#777777'; // Gray default
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { abuDhabiData, formatCurrency, formatNumber, formatPercentage };
}
