import { transformChartData } from '@/lib/chartDataTransform';
import { useEffect, useRef, useState } from 'react';

// We'll use Chart.js from CDN since it's already loaded
declare global {
    interface Window {
        Chart: any;
    }
}

interface FinancialData {
    [key: string]: {
        [metric: string]: string | null;
    };
}

interface ChartData {
    labels: string[];
    datasets: { [key: string]: (number | null)[] };
    metrics: string[];
}

interface ColorSet {
    background: string;
    border: string;
}

type StockFinancialData = {
    id: number;
    stock_ticker: string;
    report_date: string; // ISO date string
    revenue: string;
    revenue_growth_yoy: string;
    cost_of_revenue: string;
    gross_profit: string;
    selling_general_admin: string;
    other_operating_expenses: string;
    operating_expenses: string;
    operating_income: string;
    interest_income: string;
    interest_expense: string;
    other_expense_income: string;
    pretax_income: string;
    income_tax: string;
    net_income: string;
    net_income_growth: string;
    shares_outstanding_basic: string;
    shares_outstanding_diluted: string;
    shares_change: string;
    eps_basic: string;
    eps_diluted: string;
    eps_growth: string;
    gross_margin: string;
    operating_margin: string;
    profit_margin: string;
    effective_tax_rate: string;
    ebitda: string;
    ebitda_margin: string;
    ebit: string;
    ebit_margin: string;
};

interface Params {
    chartData: StockFinancialData[] | undefined
}


const FinancialDashboard = ({ chartData }: Params) => {
    const chartsGridRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const chartInstancesRef = useRef<any[]>([]);
    // console.log(chartData);


    // Embedded financial data
    const financialData = transformChartData(chartData ?? []);
    console.log(financialData);

    // const financialData: FinancialData = {
    //     "2025-03-31": {
    //         "Revenue": "5621",
    //         "Revenue Growth (YoY)": "51.24%",
    //         "Cost of Revenue": "4341",
    //         "Gross Profit": "1280",
    //         "Selling, General & Admin": "220",
    //         "Research & Development": "0",
    //         "Other Operating Expenses": "-79",
    //         "Operating Expenses": "141",
    //         "Operating Income": "1139",
    //         "Interest Income": "0",
    //         "Interest Expense": "342",
    //         "Other Expense / Income": "-29",
    //         "Pretax Income": "825",
    //         "Income Tax": "262",
    //         "Net Income": "564",
    //         "Net Income Growth": "81.23%",
    //         "Shares Outstanding (Basic)": "303",
    //         "Shares Outstanding (Diluted)": "303",
    //         "Shares Change": "13.54%",
    //         "EPS (Basic)": "1.86",
    //         "EPS (Diluted)": "1.86",
    //         "EPS Growth": "60.35%",
    //         "Gross Margin": "22.77%",
    //         "Operating Margin": "20.26%",
    //         "Profit Margin": "10.03%",
    //         "Effective Tax Rate": "31.73%",
    //         "EBITDA": "1321",
    //         "EBITDA Margin": "23.50%",
    //         "EBIT": "1168",
    //         "EBIT Margin": "20.78%"
    //     },
    //     "2024-03-31": {
    //         "Revenue": "3716",
    //         "Revenue Growth (YoY)": "24.91%",
    //         "Cost of Revenue": "2832",
    //         "Gross Profit": "884",
    //         "Selling, General & Admin": "49",
    //         "Research & Development": "0",
    //         "Other Operating Expenses": "108",
    //         "Operating Expenses": "157",
    //         "Operating Income": "727",
    //         "Interest Income": "18",
    //         "Interest Expense": "303",
    //         "Other Expense / Income": "2",
    //         "Pretax Income": "441",
    //         "Income Tax": "130",
    //         "Net Income": "311",
    //         "Net Income Growth": "65.97%",
    //         "Shares Outstanding (Basic)": "251",
    //         "Shares Outstanding (Diluted)": "267",
    //         "Shares Change": "-12.87%",
    //         "EPS (Basic)": "1.24",
    //         "EPS (Diluted)": "1.16",
    //         "EPS Growth": "90.16%",
    //         "Gross Margin": "23.79%",
    //         "Operating Margin": "19.57%",
    //         "Profit Margin": "8.37%",
    //         "Effective Tax Rate": "29.45%",
    //         "EBITDA": "702",
    //         "EBITDA Margin": "18.90%",
    //         "EBIT": "726",
    //         "EBIT Margin": "19.53%"
    //     },
    //     "2023-03-31": {
    //         "Revenue": "2975",
    //         "Revenue Growth (YoY)": "22.34%",
    //         "Cost of Revenue": "2098",
    //         "Gross Profit": "877",
    //         "Selling, General & Admin": "137",
    //         "Research & Development": "266",
    //         "Other Operating Expenses": "-281",
    //         "Operating Expenses": "122",
    //         "Operating Income": "540",
    //         "Interest Income": "8",
    //         "Interest Expense": "224",
    //         "Other Expense / Income": "35",
    //         "Pretax Income": "290",
    //         "Income Tax": "102",
    //         "Net Income": "188",
    //         "Net Income Growth": "28.23%",
    //         "Shares Outstanding (Basic)": "208",
    //         "Shares Outstanding (Diluted)": "306",
    //         "Shares Change": "48.27%",
    //         "EPS (Basic)": "0.90",
    //         "EPS (Diluted)": "0.61",
    //         "EPS Growth": "-12.86%",
    //         "Gross Margin": "29.49%",
    //         "Operating Margin": "18.15%",
    //         "Profit Margin": "6.30%",
    //         "Effective Tax Rate": "35.29%",
    //         "EBITDA": "617",
    //         "EBITDA Margin": "20.74%",
    //         "EBIT": "505",
    //         "EBIT Margin": "16.98%"
    //     },
    //     "2022-03-31": {
    //         "Revenue": "2432",
    //         "Revenue Growth (YoY)": "19.76%",
    //         "Cost of Revenue": "1811",
    //         "Gross Profit": "621",
    //         "Selling, General & Admin": "13",
    //         "Research & Development": "1",
    //         "Other Operating Expenses": "87",
    //         "Operating Expenses": "101",
    //         "Operating Income": "367",
    //         "Interest Income": "7",
    //         "Interest Expense": "170",
    //         "Other Expense / Income": "1",
    //         "Pretax Income": "203",
    //         "Income Tax": "56",
    //         "Net Income": "146",
    //         "Net Income Growth": "42.60%",
    //         "Shares Outstanding (Basic)": "207",
    //         "Shares Outstanding (Diluted)": "207",
    //         "Shares Change": null,
    //         "EPS (Basic)": "0.70",
    //         "EPS (Diluted)": "0.70",
    //         "EPS Growth": "42.86%",
    //         "Gross Margin": "25.52%",
    //         "Operating Margin": "15.08%",
    //         "Profit Margin": "6.01%",
    //         "Effective Tax Rate": "27.83%",
    //         "EBITDA": "463",
    //         "EBITDA Margin": "19.03%",
    //         "EBIT": "366",
    //         "EBIT Margin": "15.05%"
    //     },
    //     "2021-03-31": {
    //         "Revenue": "2031",
    //         "Revenue Growth (YoY)": "-17.42%",
    //         "Cost of Revenue": "1508",
    //         "Gross Profit": "522",
    //         "Selling, General & Admin": "14",
    //         "Research & Development": "134",
    //         "Other Operating Expenses": "76",
    //         "Operating Expenses": "224",
    //         "Operating Income": "298",
    //         "Interest Income": "6",
    //         "Interest Expense": "159",
    //         "Other Expense / Income": "1",
    //         "Pretax Income": "145",
    //         "Income Tax": "42",
    //         "Net Income": "103",
    //         "Net Income Growth": "-26.82%",
    //         "Shares Outstanding (Basic)": "207",
    //         "Shares Outstanding (Diluted)": "207",
    //         "Shares Change": null,
    //         "EPS (Basic)": "0.49",
    //         "EPS (Diluted)": "0.49",
    //         "EPS Growth": "-92.74%",
    //         "Gross Margin": "25.72%",
    //         "Operating Margin": "14.69%",
    //         "Profit Margin": "5.05%",
    //         "Effective Tax Rate": "29.09%",
    //         "EBITDA": "390",
    //         "EBITDA Margin": "19.22%",
    //         "EBIT": "297",
    //         "EBIT Margin": "14.63%"
    //     },
    //     "2020-03-31": {
    //         "Revenue": "2459",
    //         "Revenue Growth (YoY)": "-6.49%",
    //         "Cost of Revenue": "1801",
    //         "Gross Profit": "658",
    //         "Selling, General & Admin": "14",
    //         "Research & Development": "10",
    //         "Other Operating Expenses": "246",
    //         "Operating Expenses": "270",
    //         "Operating Income": "388",
    //         "Interest Income": "16",
    //         "Interest Expense": "138",
    //         "Other Expense / Income": "14",
    //         "Pretax Income": "253",
    //         "Income Tax": "112",
    //         "Net Income": "140",
    //         "Net Income Growth": "-51.88%",
    //         "Shares Outstanding (Basic)": "207",
    //         "Shares Outstanding (Diluted)": "207",
    //         "Shares Change": "-0.44%",
    //         "EPS (Basic)": "6.75",
    //         "EPS (Diluted)": "6.75",
    //         "EPS Growth": "382.14%",
    //         "Gross Margin": "26.76%",
    //         "Operating Margin": "15.77%",
    //         "Profit Margin": "5.70%",
    //         "Effective Tax Rate": "44.53%",
    //         "EBITDA": "489",
    //         "EBITDA Margin": "19.89%",
    //         "EBIT": "374",
    //         "EBIT Margin": "15.22%"
    //     },
    //     "2019-03-31": {
    //         "Revenue": "2630",
    //         "Revenue Growth (YoY)": "19.28%",
    //         "Cost of Revenue": "1988",
    //         "Gross Profit": "642",
    //         "Selling, General & Admin": "23",
    //         "Research & Development": "5",
    //         "Other Operating Expenses": "192",
    //         "Operating Expenses": "220",
    //         "Operating Income": "422",
    //         "Interest Income": "24",
    //         "Interest Expense": "130",
    //         "Other Expense / Income": "-7",
    //         "Pretax Income": "322",
    //         "Income Tax": "31",
    //         "Net Income": "291",
    //         "Net Income Growth": "51.92%",
    //         "Shares Outstanding (Basic)": "208",
    //         "Shares Outstanding (Diluted)": "208",
    //         "Shares Change": "0.45%",
    //         "EPS (Basic)": "1.40",
    //         "EPS (Diluted)": "1.40",
    //         "EPS Growth": "15.70%",
    //         "Gross Margin": "24.42%",
    //         "Operating Margin": "16.06%",
    //         "Profit Margin": "11.07%",
    //         "Effective Tax Rate": "9.69%",
    //         "EBITDA": "519",
    //         "EBITDA Margin": "19.75%",
    //         "EBIT": "429",
    //         "EBIT Margin": "16.31%"
    //     },
    //     "2018-03-31": {
    //         "Revenue": "2205",
    //         "Revenue Growth (YoY)": "4.35%",
    //         "Cost of Revenue": "1602",
    //         "Gross Profit": "602",
    //         "Selling, General & Admin": "10",
    //         "Research & Development": "8",
    //         "Other Operating Expenses": "157",
    //         "Operating Expenses": "174",
    //         "Operating Income": "428",
    //         "Interest Income": "15",
    //         "Interest Expense": "122",
    //         "Other Expense / Income": "12",
    //         "Pretax Income": "310",
    //         "Income Tax": "118",
    //         "Net Income": "192",
    //         "Net Income Growth": "3.21%",
    //         "Shares Outstanding (Basic)": "207",
    //         "Shares Outstanding (Diluted)": "207",
    //         "Shares Change": null,
    //         "EPS (Basic)": "1.25",
    //         "EPS (Diluted)": "1.21",
    //         "EPS Growth": "-4.72%",
    //         "Gross Margin": "27.32%",
    //         "Operating Margin": "19.42%",
    //         "Profit Margin": "8.69%",
    //         "Effective Tax Rate": "38.09%",
    //         "EBITDA": "496",
    //         "EBITDA Margin": "22.51%",
    //         "EBIT": "416",
    //         "EBIT Margin": "18.87%"
    //     },
    //     "2017-03-31": {
    //         "Revenue": "2113",
    //         "Revenue Growth (YoY)": "32.84%",
    //         "Cost of Revenue": "1510",
    //         "Gross Profit": "603",
    //         "Selling, General & Admin": "5",
    //         "Research & Development": "129",
    //         "Other Operating Expenses": "230",
    //         "Operating Expenses": "235",
    //         "Operating Income": "368",
    //         "Interest Income": "5",
    //         "Interest Expense": "114",
    //         "Other Expense / Income": "-13",
    //         "Pretax Income": "271",
    //         "Income Tax": "85",
    //         "Net Income": "186",
    //         "Net Income Growth": "85.70%",
    //         "Shares Outstanding (Basic)": "207",
    //         "Shares Outstanding (Diluted)": "207",
    //         "Shares Change": null,
    //         "EPS (Basic)": "1.27",
    //         "EPS (Diluted)": "1.27",
    //         "EPS Growth": "84.06%",
    //         "Gross Margin": "28.54%",
    //         "Operating Margin": "17.40%",
    //         "Profit Margin": "8.79%",
    //         "Effective Tax Rate": "31.50%",
    //         "EBITDA": "425",
    //         "EBITDA Margin": "20.11%",
    //         "EBIT": "380",
    //         "EBIT Margin": "18.00%"
    //     },
    //     "2016-03-31": {
    //         "Revenue": "1590",
    //         "Revenue Growth (YoY)": "46.70%",
    //         "Cost of Revenue": "1162",
    //         "Gross Profit": "429",
    //         "Selling, General & Admin": "4",
    //         "Research & Development": "87",
    //         "Other Operating Expenses": "199",
    //         "Operating Expenses": "203",
    //         "Operating Income": "225",
    //         "Interest Income": "5",
    //         "Interest Expense": "81",
    //         "Other Expense / Income": "0",
    //         "Pretax Income": "148",
    //         "Income Tax": "48",
    //         "Net Income": "100",
    //         "Net Income Growth": "34.28%",
    //         "Shares Outstanding (Basic)": "207",
    //         "Shares Outstanding (Diluted)": "207",
    //         "Shares Change": null,
    //         "EPS (Basic)": "0.72",
    //         "EPS (Diluted)": "0.69",
    //         "EPS Growth": "35.29%",
    //         "Gross Margin": "26.94%",
    //         "Operating Margin": "14.16%",
    //         "Profit Margin": "6.29%",
    //         "Effective Tax Rate": "32.60%",
    //         "EBITDA": "257",
    //         "EBITDA Margin": "16.16%",
    //         "EBIT": "225",
    //         "EBIT Margin": "14.14%"
    //     },
    //     "2015-03-31": {
    //         "Revenue": "1339",
    //         "Cost of Revenue": "961",
    //         "Gross Profit": "378",
    //         "Operating Income": "183",
    //         "Net Income": "83"
    //     },
    //     "2014-03-31": {
    //         "Revenue": "725",
    //         "Cost of Revenue": "514",
    //         "Gross Profit": "211",
    //         "Operating Income": "98",
    //         "Net Income": "45"
    //     }
    // }

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

    const parseValue = (value: string | null): number | null => {
        if (value === null || typeof value === 'undefined') return null;
        const stringValue = String(value).replace(/,/g, '').replace(/%/g, '');
        const num = parseFloat(stringValue);
        return isNaN(num) ? null : num;
    };

    const processDataForCharts = (data: FinancialData): ChartData => {
        const sortedDates = Object.keys(data).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        const last10Years = sortedDates.slice(0, 10).reverse();
        const labels = last10Years.map(date => date.split('-')[0]);

        const datasets: { [key: string]: (number | null)[] } = {};
        const allMetrics = new Set<string>();

        last10Years.forEach(date => {
            if (data[date]) {
                Object.keys(data[date]).forEach(key => allMetrics.add(key));
            }
        });

        const metrics = Array.from(allMetrics);

        metrics.forEach(metric => {
            datasets[metric] = last10Years.map(date => {
                return data[date] ? parseValue(data[date][metric]) : null;
            });
        });

        return { labels, datasets, metrics };
    };

    const createChart = (
        ctx: CanvasRenderingContext2D,
        label: string,
        data: ChartData,
        colorSet: ColorSet,
        yAxisLabel: string,
        tooltipFormatter: (context: any) => string | null
    ): any => {
        if (!window.Chart) return null;

        return new window.Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: label,
                    data: data.datasets[label],
                    backgroundColor: colorSet.background,
                    borderColor: colorSet.border,
                    borderWidth: 2,
                    pointBackgroundColor: colorSet.border,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colorSet.border,
                    fill: true,
                    tension: 0.4,
                    spanGaps: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#1F2937',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 12,
                        cornerRadius: 6,
                        displayColors: false,
                        callbacks: {
                            label: tooltipFormatter
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Year' },
                        grid: { drawOnChartArea: false }
                    },
                    y: {
                        title: { display: true, text: yAxisLabel },
                        beginAtZero: false,
                        ticks: {
                            callback: function (value: any) {
                                const formatted = tooltipFormatter({ parsed: { y: value } });
                                return formatted ? formatted.split(': ')[1] : '';
                            }
                        }
                    }
                }
            }
        });
    };

    const renderCharts = (chartData: ChartData) => {
        if (!chartsGridRef.current) return;

        // Clean up existing charts
        chartInstancesRef.current.forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });
        chartInstancesRef.current = [];

        const chartsGrid = chartsGridRef.current;
        chartsGrid.innerHTML = '';

        const percentageKeywords = ['Growth', 'Margin', 'Rate', 'Change'];

        const metricsCategorized = {
            monetary: [] as string[],
            percentage: [] as string[],
            other: [] as string[]
        };

        chartData.metrics.forEach(metric => {
            if (chartData.datasets[metric].some(dp => dp !== null)) {
                const sampleValue = String(financialData[Object.keys(financialData)[0]][metric] || '');
                if (percentageKeywords.some(keyword => metric.includes(keyword)) || sampleValue.includes('%')) {
                    metricsCategorized.percentage.push(metric);
                } else if (metric.includes('EPS') || metric.includes('Shares')) {
                    metricsCategorized.other.push(metric);
                } else {
                    metricsCategorized.monetary.push(metric);
                }
            }
        });

        let colorIndex = 0;

        const addSectionHeader = (title: string) => {
            const header = document.createElement('div');
            header.className = 'col-span-full pb-2 border-b border-gray-700 mb-2';
            header.innerHTML = `<h2 class="text-xl font-bold text-gray-300">${title}</h2>`;
            chartsGrid.appendChild(header);
        };

        const createChartWrapper = (
            metric: string,
            yAxisLabel: string,
            tooltipFormatter: (context: any) => string | null
        ) => {
            const colorSet = chartColors[colorIndex % chartColors.length];
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'bg-black border border-gray-700 border-none p-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg';

            const chartTitle = document.createElement('h2');
            chartTitle.className = 'text-base font-semibold mb-2 text-center text-gray-200';
            chartTitle.textContent = metric;

            const canvas = document.createElement('canvas');
            chartWrapper.appendChild(chartTitle);
            chartWrapper.appendChild(canvas);
            chartsGrid.appendChild(chartWrapper);

            const ctx = canvas.getContext('2d');
            if (ctx && window.Chart) {
                const chartInstance = createChart(ctx, metric, chartData, colorSet, yAxisLabel, tooltipFormatter);
                if (chartInstance) {
                    chartInstancesRef.current.push(chartInstance);
                }
            }
            colorIndex++;
        };

        // addSectionHeader('Monetary Values');
        metricsCategorized.monetary.forEach(metric => {
            createChartWrapper(metric, 'Amount (in millions)', (context) => {
                if (context.parsed.y === null) return null;
                return `${metric}: ${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(context.parsed.y)}M`;
            });
        });

        addSectionHeader('Margins & Growth Rates');
        metricsCategorized.percentage.forEach(metric => {
            createChartWrapper(metric, 'Percentage (%)', (context) => {
                if (context.parsed.y === null) return null;
                return `${metric}: ${context.parsed.y.toFixed(2)}%`;
            });
        });

        addSectionHeader('Per Share & Other Metrics');
        metricsCategorized.other.forEach(metric => {
            const yLabel = metric.includes('Shares') ? 'Shares (in millions)' : 'Amount (USD)';
            createChartWrapper(metric, yLabel, (context) => {
                if (context.parsed.y === null) return null;
                const unit = metric.includes('Shares') ? 'M' : '';
                const style = metric.includes('Shares') ? 'decimal' : 'currency';
                const currency = style === 'currency' ? 'USD' : undefined;
                return `${metric}: ${new Intl.NumberFormat('en-US', {
                    style,
                    currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(context.parsed.y)}${unit}`;
            });
        });
    };

    useEffect(() => {
        const initializeCharts = () => {
            // Wait a bit longer for Chart.js to be fully loaded
            setTimeout(() => {
                try {
                    if (window.Chart) {
                        // Set Chart.js global defaults exactly like the HTML version
                        window.Chart.defaults.color = '#9CA3AF'; // gray-400, not black as in HTML
                        window.Chart.defaults.borderColor = '#374151'; // gray-700
                        if (window.Chart.defaults.font) {
                            window.Chart.defaults.font.family = 'Inter, sans-serif';
                        }

                        setIsLoading(false);
                        const chartData = processDataForCharts(financialData);
                        renderCharts(chartData);
                    } else {
                        // If Chart.js is still not available, load it
                        const script = document.createElement('script');
                        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                        script.onload = () => {
                            initializeCharts(); // Recursively try again after loading
                        };
                        script.onerror = () => {
                            setError('Failed to load Chart.js library');
                            setIsLoading(false);
                        };
                        document.head.appendChild(script);
                    }
                } catch (error) {
                    setError('Error processing data.');
                    setIsLoading(false);
                    console.error('Error processing or rendering data:', error);
                }
            }, 100);
        };

        initializeCharts();

        // Cleanup function
        return () => {
            chartInstancesRef.current.forEach(chart => {
                if (chart && chart.destroy) {
                    chart.destroy();
                }
            });
        };
    }, [chartData]);

    return (
        <>
            {/* Add CSS styles that match the HTML version exactly */}
            <style>
                {`
          .chart-container {
            background-color: #1f1f1f;
            border: 1px solid #5d5d5d;
            border-radius: 0.25rem;
            padding: 0.5rem;
            transition: all 0.3s ease-in-out;
          }
          .chart-container:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .section-header {
            grid-column: 1 / -1;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #374151;
            margin-bottom: 0.5rem;
          }
        `}
            </style>

            <div className="bg-black text-gray-50 min-h-screen font-['Inter',sans-serif] antialiased mt-4">
                <div className="container mx-auto p-1 sm:p-2">
                    {isLoading && (
                        <div className="text-center">
                            <p className="text-xl font-semibold">Loading Financial Data...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-red-500">Error processing data.</p>
                            <p className="text-gray-400 mt-2">There was an issue rendering the charts from the embedded data.</p>
                        </div>
                    )}

                    <div
                        ref={chartsGridRef}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2"
                    >
                        {/* Charts will be dynamically inserted here */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinancialDashboard;