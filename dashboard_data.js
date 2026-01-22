// Criteo Campaign Data Layer - Project Pearl
// Data validated on January 21, 2026
// Source: cleaned_campaign_performance_corrected.json

const criteoData = {
    campaign_overview: {
        campaign_name: "Project Pearl",
        period: "October 1 - November 30, 2025",
        total_investment: 315792,
        total_bookings: 7390,
        overall_roi: 30,
        total_revenue: 9000000,
        average_booking_value: 1218
    },
    
    market_performance: {
        "France": {
            rank: 1,
            total_cost: 40723.23,
            total_bookings: 4055,
            cpb: 10.04,
            average_basket: 989,
            market_share: 0.5487,
            bookings_abu_dhabi: 1350,
            bookings_dubai: 2705,
            roi: 98.5,
            revenue: 4010395
        },
        "UK": {
            rank: 2,
            total_cost: 111220.83,
            total_bookings: 1558,
            cpb: 71.39,
            average_basket: 1706,
            market_share: 0.2108,
            bookings_abu_dhabi: 244,
            bookings_dubai: 1314,
            roi: 23.9,
            revenue: 2657948
        },
        "Germany": {
            rank: 3,
            total_cost: 71144.27,
            total_bookings: 980,
            cpb: 72.60,
            average_basket: 1551,
            market_share: 0.1326,
            bookings_abu_dhabi: 167,
            bookings_dubai: 813,
            roi: 21.4,
            revenue: 1519980
        },
        "USA": {
            rank: 4,
            total_cost: 69408.94,
            total_bookings: 504,
            cpb: 137.72,
            average_basket: 1386,
            market_share: 0.0682,
            bookings_abu_dhabi: 108,
            bookings_dubai: 396,
            roi: 10.1,
            revenue: 698544
        },
        "UAE": {
            rank: 5,
            total_cost: 23293.73,
            total_bookings: 293,
            cpb: 79.50,
            average_basket: 431,
            market_share: 0.0396,
            bookings_abu_dhabi: 293,
            bookings_dubai: 0,
            roi: 5.4,
            revenue: 126283
        }
    },
    
    destination_summary: {
        dubai: {
            total_bookings: 5228,
            percentage: 70.7,
            top_market: "France",
            top_market_bookings: 2705
        },
        abu_dhabi: {
            total_bookings: 2162,
            percentage: 29.3,
            top_market: "France",
            top_market_bookings: 1350
        }
    },
    
    monthly_performance: {
        october: {
            total_bookings: 1409,
            total_cost: 173130,
            average_cpb: 122.8
        },
        november: {
            total_bookings: 5981,
            total_cost: 142662,
            average_cpb: 23.9,
            mom_growth: 324.4
        }
    },
    
    top_travel_verticals: [
        {
            name: "ONLINE TRAVEL AGENTS",
            bookings: 1290,
            percentage: 17.45,
            abu_dhabi: 488,
            dubai: 802
        },
        {
            name: "TRAVEL SERVICES",
            bookings: 1219,
            percentage: 16.49,
            abu_dhabi: 366,
            dubai: 853
        },
        {
            name: "TRAVEL METASEARCH",
            bookings: 1062,
            percentage: 14.37,
            abu_dhabi: 162,
            dubai: 900
        },
        {
            name: "GROUND/CRUISE",
            bookings: 1022,
            percentage: 13.83,
            abu_dhabi: 119,
            dubai: 903
        },
        {
            name: "EXPERIENCE",
            bookings: 940,
            percentage: 12.72,
            abu_dhabi: 42,
            dubai: 898
        },
        {
            name: "AIRLINES",
            bookings: 713,
            percentage: 9.65,
            abu_dhabi: 135,
            dubai: 578
        },
        {
            name: "PRIVATE ACCOMMODATION",
            bookings: 641,
            percentage: 8.68,
            abu_dhabi: 335,
            dubai: 306
        },
        {
            name: "CAR RENTAL",
            bookings: 249,
            percentage: 3.37,
            abu_dhabi: 84,
            dubai: 165
        },
        {
            name: "TOUR OPERATORS",
            bookings: 199,
            percentage: 2.70,
            abu_dhabi: 24,
            dubai: 175
        },
        {
            name: "HOTELS/RESORTS",
            bookings: 55,
            percentage: 0.74,
            abu_dhabi: 21,
            dubai: 34
        }
    ],
    
    media_performance: {
        display: {
            cost: 170000,
            impressions: 340000000,
            clicks: 950000,
            ctr: 0.28
        },
        video: {
            cost: 145792,
            impressions: 85000000,
            clicks: 102000,
            ctr: 0.12,
            viewability: 85
        }
    },
    
    // Conversion Funnel Data
    funnel_data: {
        overall: {
            impressions: 425000000,  // 340M display + 85M video
            clicks: 1052000,  // 950K display + 102K video
            bookings: 7390,
            revenue: 9000000,
            // Conversion rates
            ctr: 0.25,  // clicks/impressions
            click_to_booking: 0.70,  // bookings/clicks
            booking_to_revenue: 1218  // avg revenue per booking
        },
        by_market: {
            "France": {
                impressions: 233000000,  // 54.8% of total
                clicks: 577000,
                bookings: 4055,
                revenue: 4010395
            },
            "UK": {
                impressions: 89600000,  // 21.1% of total
                clicks: 222000,
                bookings: 1558,
                revenue: 2657948
            },
            "Germany": {
                impressions: 56400000,  // 13.3% of total
                clicks: 140000,
                bookings: 980,
                revenue: 1519980
            },
            "USA": {
                impressions: 29000000,  // 6.8% of total
                clicks: 72000,
                bookings: 504,
                revenue: 698544
            },
            "UAE": {
                impressions: 17000000,  // 4% of total
                clicks: 41000,
                bookings: 293,
                revenue: 126283
            }
        },
        by_media_type: {
            display: {
                impressions: 340000000,
                clicks: 950000,
                bookings: 6331,  // 85.7% of bookings
                revenue: 7711200,
                ctr: 0.28,
                click_to_booking: 0.67
            },
            video: {
                impressions: 85000000,
                clicks: 102000,
                bookings: 1059,  // 14.3% of bookings
                revenue: 1288800,
                ctr: 0.12,
                click_to_booking: 1.04
            }
        }
    }
};

// Helper functions for data manipulation
function getMarketList() {
    return Object.keys(criteoData.market_performance);
}

function getMarketData(market) {
    return criteoData.market_performance[market] || null;
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

function calculateConversionRate(clicks, bookings) {
    if (clicks === 0) return 0;
    return ((bookings / clicks) * 100).toFixed(2);
}

function getColorByPerformance(value, type = 'roi') {
    if (type === 'roi') {
        if (value >= 50) return '#34a853';  // Green
        if (value >= 20) return '#4285f4';  // Blue
        if (value >= 10) return '#fbbc04';  // Yellow
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
    module.exports = { criteoData, formatCurrency, formatNumber, formatPercentage };
}
