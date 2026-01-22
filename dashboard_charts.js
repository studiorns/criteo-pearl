// Criteo Dashboard Charts - Using Chart.js
// Handles all chart visualizations

// Chart.js default configuration
Chart.defaults.color = '#ffffff';
Chart.defaults.borderColor = '#3d3d3d';
Chart.defaults.font.family = 'Inter, sans-serif';

// Color scheme
const chartColors = {
    primary: '#4285f4',
    secondary: '#34a853',
    warning: '#fbbc04',
    danger: '#ea4335',
    gray: '#777777',
    lightGray: '#a0a0a0'
};

// Initialize all charts
function initializeCharts() {
    createMarketPerformanceChart();
    createDestinationChart();
    createMonthlyTrendChart();
    createTravelVerticalChart();
    createMediaPerformanceChart();
    createROIComparisonChart();
}

// 1. Market Performance Bar Chart
function createMarketPerformanceChart() {
    const ctx = document.getElementById('marketPerformanceChart');
    if (!ctx) return;
    
    const markets = Object.keys(criteoData.market_performance);
    const bookings = markets.map(m => criteoData.market_performance[m].total_bookings);
    const roi = markets.map(m => criteoData.market_performance[m].roi);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: markets,
            datasets: [{
                label: 'Bookings',
                data: bookings,
                backgroundColor: chartColors.primary,
                yAxisID: 'y'
            }, {
                label: 'ROI (x)',
                data: roi,
                type: 'line',
                borderColor: chartColors.secondary,
                backgroundColor: 'transparent',
                borderWidth: 3,
                pointBackgroundColor: chartColors.secondary,
                pointRadius: 5,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Market Performance Overview',
                    font: { size: 16, weight: 'bold' },
                    color: chartColors.primary
                },
                legend: {
                    display: true,
                    labels: { color: '#ffffff' }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Bookings',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' },
                    grid: { color: '#3d3d3d' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'ROI (x)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' },
                    grid: { drawOnChartArea: false }
                },
                x: {
                    ticks: { color: '#ffffff' },
                    grid: { color: '#3d3d3d' }
                }
            }
        }
    });
}

// 2. Destination Split Donut Chart
function createDestinationChart() {
    const ctx = document.getElementById('destinationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dubai', 'Abu Dhabi'],
            datasets: [{
                data: [
                    criteoData.destination_summary.dubai.total_bookings,
                    criteoData.destination_summary.abu_dhabi.total_bookings
                ],
                backgroundColor: [chartColors.primary, chartColors.secondary],
                borderColor: '#1e1e1e',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Destination Distribution',
                    font: { size: 16, weight: 'bold' },
                    color: chartColors.primary
                },
                legend: {
                    position: 'bottom',
                    labels: { 
                        color: '#ffffff',
                        padding: 20,
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${formatNumber(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 3. Monthly Trend Chart
function createMonthlyTrendChart() {
    const ctx = document.getElementById('monthlyTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['October', 'November'],
            datasets: [{
                label: 'Bookings',
                data: [
                    criteoData.monthly_performance.october.total_bookings,
                    criteoData.monthly_performance.november.total_bookings
                ],
                borderColor: chartColors.primary,
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: chartColors.primary
            }, {
                label: 'CPB ($)',
                data: [
                    criteoData.monthly_performance.october.average_cpb,
                    criteoData.monthly_performance.november.average_cpb
                ],
                borderColor: chartColors.warning,
                backgroundColor: 'transparent',
                borderWidth: 3,
                tension: 0.4,
                yAxisID: 'y1',
                pointRadius: 6,
                pointBackgroundColor: chartColors.warning
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Performance Trend',
                    font: { size: 16, weight: 'bold' },
                    color: chartColors.primary
                },
                legend: {
                    display: true,
                    labels: { color: '#ffffff' }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Bookings',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' },
                    grid: { color: '#3d3d3d' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'CPB ($)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' },
                    grid: { drawOnChartArea: false }
                },
                x: {
                    ticks: { color: '#ffffff' },
                    grid: { color: '#3d3d3d' }
                }
            }
        }
    });
}

// 4. Travel Vertical Chart (Horizontal Bar)
function createTravelVerticalChart() {
    const ctx = document.getElementById('travelVerticalChart');
    if (!ctx) return;
    
    const topVerticals = criteoData.top_travel_verticals.slice(0, 5);
    const labels = topVerticals.map(v => v.name.split(' ').slice(0, 2).join(' '));
    const bookings = topVerticals.map(v => v.bookings);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Bookings',
                data: bookings,
                backgroundColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.warning,
                    chartColors.danger,
                    chartColors.gray
                ],
                borderColor: '#1e1e1e',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top 5 Travel Verticals',
                    font: { size: 16, weight: 'bold' },
                    color: chartColors.primary
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.x || 0;
                            const vertical = criteoData.top_travel_verticals[context.dataIndex];
                            return `Bookings: ${formatNumber(value)} (${vertical.percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#ffffff' },
                    grid: { color: '#3d3d3d' },
                    title: {
                        display: true,
                        text: 'Number of Bookings',
                        color: '#ffffff'
                    }
                },
                y: {
                    ticks: { 
                        color: '#ffffff',
                        font: { size: 11 }
                    },
                    grid: { color: '#3d3d3d' }
                }
            }
        }
    });
}

// 5. Media Performance Comparison
function createMediaPerformanceChart() {
    const ctx = document.getElementById('mediaPerformanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Cost Efficiency', 'Impressions', 'Clicks', 'CTR', 'Reach'],
            datasets: [{
                label: 'Display',
                data: [
                    70,  // Cost efficiency (lower cost per click)
                    100, // Impressions (340M vs 85M)
                    100, // Clicks (950K vs 102K)
                    90,  // CTR (0.28% vs 0.12%)
                    100  // Reach
                ],
                borderColor: chartColors.primary,
                backgroundColor: 'rgba(66, 133, 244, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: chartColors.primary
            }, {
                label: 'Video',
                data: [
                    50,  // Cost efficiency
                    25,  // Impressions
                    11,  // Clicks
                    43,  // CTR
                    85   // Viewability
                ],
                borderColor: chartColors.secondary,
                backgroundColor: 'rgba(52, 168, 83, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: chartColors.secondary
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Media Performance Comparison',
                    font: { size: 16, weight: 'bold' },
                    color: chartColors.primary
                },
                legend: {
                    position: 'bottom',
                    labels: { color: '#ffffff' }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#ffffff',
                        backdropColor: 'transparent',
                        stepSize: 20
                    },
                    grid: { color: '#3d3d3d' },
                    pointLabels: {
                        color: '#ffffff',
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

// 6. ROI Comparison Chart
function createROIComparisonChart() {
    const ctx = document.getElementById('roiComparisonChart');
    if (!ctx) return;
    
    const markets = Object.keys(criteoData.market_performance);
    const data = markets.map(m => {
        const marketData = criteoData.market_performance[m];
        return {
            x: marketData.cpb,
            y: marketData.roi,
            label: m,
            bookings: marketData.total_bookings
        };
    });
    
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Markets',
                data: data.map(d => ({
                    x: d.x,
                    y: d.y,
                    r: Math.sqrt(d.bookings) / 4 // Bubble size based on bookings
                })),
                backgroundColor: [
                    'rgba(66, 133, 244, 0.6)',
                    'rgba(52, 168, 83, 0.6)',
                    'rgba(251, 188, 4, 0.6)',
                    'rgba(234, 67, 53, 0.6)',
                    'rgba(119, 119, 119, 0.6)'
                ],
                borderColor: [
                    chartColors.primary,
                    chartColors.secondary,
                    chartColors.warning,
                    chartColors.danger,
                    chartColors.gray
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'ROI vs CPB Analysis (Bubble size = Bookings)',
                    font: { size: 16, weight: 'bold' },
                    color: chartColors.primary
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const market = markets[context.dataIndex];
                            const marketData = criteoData.market_performance[market];
                            return [
                                `Market: ${market}`,
                                `CPB: $${marketData.cpb.toFixed(2)}`,
                                `ROI: ${marketData.roi}x`,
                                `Bookings: ${formatNumber(marketData.total_bookings)}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Cost Per Booking ($)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' },
                    grid: { color: '#3d3d3d' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'ROI (x)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' },
                    grid: { color: '#3d3d3d' }
                }
            }
        }
    });
}

// Update chart when market filter changes
function updateChartsForMarket(market) {
    if (market === 'all') {
        // Reset to show all markets
        initializeCharts();
    } else {
        // Update specific market data
        updateMarketSpecificCharts(market);
    }
}

// Update charts for specific market
function updateMarketSpecificCharts(market) {
    const marketData = criteoData.market_performance[market];
    if (!marketData) return;
    
    // Update destination chart for specific market
    const destCtx = document.getElementById('destinationChart');
    if (destCtx && destCtx.chart) {
        destCtx.chart.data.datasets[0].data = [
            marketData.bookings_dubai,
            marketData.bookings_abu_dhabi
        ];
        destCtx.chart.update();
    }
}
