import { transformRatiosData } from '@/lib/ratiosDataTransform';
import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        Chart: any;
    }
}

interface ColorSet {
    background: string;
    border: string;
}

type RatiosRow = {
    id: number;
    stock_ticker: string;
    report_date: string; // formatted as YYYY-MM-DD
    market_capitalization: string;
    market_cap_growth: string;
    enterprise_value: string;
    pe_ratio: string;
    pb_ratio: string;
    debt_equity_ratio: string;
    interest_coverage: string;
    quick_ratio: string;
    current_ratio: string;
    asset_turnover: string;
    earnings_yield: string;
    fcf_yield: string;
    dividend_yield: string;
    payout_ratio: string;
    total_shareholder_return: string;
};

interface Param {
    ratiosData: RatiosRow[] | undefined;
}

const FinancialRatiosAnalysis = ({ ratiosData }: Param) => {
    const chartsContainerRef = useRef<HTMLDivElement>(null);
    const chartsRef = useRef<any[]>([]);

    const originalRatiosData = transformRatiosData(ratiosData)

    useEffect(() => {
        // Load Chart.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            initializeCharts();
        };
        document.head.appendChild(script);

        return () => {
            // Cleanup charts
            chartsRef.current.forEach(chart => {
                if (chart) chart.destroy();
            });
            chartsRef.current = [];
        };
    }, [ratiosData]);

    const initializeCharts = () => {
        if (!window.Chart || !chartsContainerRef.current) return;

        const keyMap: { [key: string]: string } = {
            "Market Capitalization": "market_capitalization",
            "Market Cap Growth": "market_cap_growth",
            "Enterprise Value": "enterprise_value",
            "PE Ratio": "pe_ratio",
            "PB Ratio": "pb_ratio",
            "Debt / Equity Ratio": "debt_equity_ratio",
            "Interest Coverage": "interest_coverage",
            "Quick Ratio": "quick_ratio",
            "Current Ratio": "current_ratio",
            "Asset Turnover": "asset_turnover",
            "Earnings Yield": "earnings_yield",
            "FCF Yield": "fcf_yield",
            "Dividend Yield": "dividend_yield",
            "Payout Ratio": "payout_ratio",
            "Total Shareholder Return": "total_shareholder_return",
        };

        const ratiosData: { [key: string]: { [key: string]: string } } = {};
        for (const date in originalRatiosData) {
            ratiosData[date] = {};
            for (const oldKey in originalRatiosData[date]) {
                const newKey = keyMap[oldKey];
                if (newKey) {
                    ratiosData[date][newKey] = originalRatiosData[date][oldKey];
                }
            }
        }

        const categories = {
            'Valuation': ['pe_ratio', 'pb_ratio', 'earnings_yield', 'fcf_yield', 'dividend_yield'],
            'Financial Health': ['debt_equity_ratio', 'interest_coverage', 'quick_ratio', 'current_ratio'],
            'Growth & Performance': ['market_cap_growth', 'asset_turnover', 'total_shareholder_return', 'payout_ratio']
        };

        const parseValue = (value: string): number | null => {
            if (typeof value !== 'string' || value === 'N/A') return null;
            return parseFloat(value.replace(/%|,/g, ''));
        };

        const labels = Object.keys(ratiosData).sort();

        // Clear container
        chartsContainerRef.current!.innerHTML = '';

        const chartColors: ColorSet[] = [
            { background: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 1)' },    // Cyan
            { background: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 1)' },    // Pink
            { background: 'rgba(163, 230, 53, 0.1)', border: 'rgba(163, 230, 53, 1)' },    // Lime
            { background: 'rgba(251, 146, 60, 0.1)', border: 'rgba(251, 146, 60, 1)' },    // Orange
            { background: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 1)' },    // Violet
            { background: 'rgba(244, 63, 94, 0.1)', border: 'rgba(244, 63, 94, 1)' },     // Rose
            { background: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 1)' },    // Emerald
            { background: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 1)' },    // Amber
            { background: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 1)' },     // Indigo
            { background: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 1)' },      // Red
        ];

        // Create charts
        Object.entries(categories).forEach(([categoryName, ratioKeys]) => {
            const categoryTitle = document.createElement('h2');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = categoryName;
            categoryTitle.style.marginTop = '40px';
            categoryTitle.style.paddingBottom = '10px';
            categoryTitle.style.borderBottom = '2px solid #000000';
            categoryTitle.style.color = '#FFFFFF';
            categoryTitle.style.fontWeight = 'semibold';
            categoryTitle.style.fontSize = '20px';
            chartsContainerRef.current!.appendChild(categoryTitle);

            const grid = document.createElement('div');
            grid.className = 'chart-grid';
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
            grid.style.gap = '20px';
            grid.style.marginTop = '20px';
            chartsContainerRef.current!.appendChild(grid);

            ratioKeys.forEach((ratioKey, index) => {
                const card = document.createElement('div');
                card.className = 'chart-card';
                card.style.backgroundColor = '#000000';
                card.style.border = '0px solid #dee2e6';
                card.style.padding = '20px';
                card.style.borderRadius = '0.5rem';
                card.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';

                const canvas = document.createElement('canvas');
                card.appendChild(canvas);
                grid.appendChild(card);

                const chartData = labels.map(year => parseValue(ratiosData[year][ratioKey]));
                const isPercentage = (typeof originalRatiosData[labels[0]][Object.keys(keyMap).find(key => keyMap[key] === ratioKey)!] === 'string'
                    && originalRatiosData[labels[0]][Object.keys(keyMap).find(key => keyMap[key] === ratioKey)!].includes('%'));

                // Pick color from chartColors array
                const color = chartColors[index % chartColors.length];

                const chart = new window.Chart(canvas.getContext('2d'), {
                    type: ratioKey.includes('growth') ? 'bar' : 'line',
                    data: {
                        labels: labels.map(l => l.substring(0, 4)),
                        datasets: [{
                            label: ratioKey,
                            data: chartData,
                            borderColor: color.border,
                            backgroundColor: ratioKey.includes('growth')
                                ? chartData.map(d => d && d >= 0 ? '#28a745' : '#dc3545')
                                : color.background,
                            fill: !ratioKey.includes('growth'),
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: ratioKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                                font: { size: 16 },
                                color: '#FFFFFF'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context: any) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                            label = label.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) + ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.parsed.y + (isPercentage ? '%' : '');
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: '#808080'
                                }
                            },
                            y: {
                                grid: {
                                    drawOnChartArea: true,
                                    color: 'rgba(200, 200, 200, 0.3)',
                                },
                                ticks: {
                                    callback: function (value: any) {
                                        return value + (isPercentage ? '%' : '');
                                    },
                                    color: '#808080'
                                },
                            },
                            // y: {
                            //     ticks: {
                            //         callback: function (value: any) {
                            //             return value + (isPercentage ? '%' : '');
                            //         }
                            //     }
                            // }
                        }
                    }
                });

                chartsRef.current.push(chart);
            });
        });
    };

    return (
        <>
            <style>{`
        body { 
          margin: 20px; 
          color: #343a40; 
        }
        .chart-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .chart-card {
          background-color: #ffffff;
          border: 1px solid #dee2e6;
          padding: 20px;
          border-radius: 0.5rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }
        .category-title {
          margin-top: 40px;
          padding-bottom: 10px;
          border-bottom: 2px solid #6f42c1;
        }
      `}</style>
            <div style={{
                margin: '20px',
                backgroundColor: '#000000',
                color: '#343a40'
            }}>
                <div ref={chartsContainerRef} id="charts-container"></div>
            </div>
        </>
    );
};

export default FinancialRatiosAnalysis;