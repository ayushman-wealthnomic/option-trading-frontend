import { transformBalanceChart } from '@/lib/balanceChartDataTransform';
import React, { useRef, useEffect } from 'react';

// Declare Chart.js global
declare global {
    interface Window {
        Chart: any;
    }
}



type BalanceSheetRow = {
    id: number;
    stock_ticker: string;
    report_date: string; // formatted as YYYY-MM-DD
    cash_and_equivalents: string;
    short_term_investments: string;
    cash_and_cash_equivalents: string;
    cash_growth: string;
    receivables: string;
    inventory: string;
    other_current_assets: string;
    total_current_assets: string;
    property_plant_equipment: string;
    long_term_investments: string;
    goodwill: string;
    intangible_assets: string;
    other_long_term_assets: string;
    total_long_term_assets: string;
    total_assets: string;
    accounts_payable: string;
    deferred_revenue: string;
    current_debt: string;
    total_current_liabilities: string;
    other_current_liabilities: string;
    long_term_debt: string;
    total_long_term_liabilities: string;
    other_long_term_liabilities: string;
    total_liabilities: string;
    total_debt: string;
    debt_growth: string;
    common_stock: string;
    retained_earnings: string;
    comprehensive_income: string;
    shareholders_equity: string;
    total_liabilities_and_equity: string;
    net_cash_debt: string;
};

interface Params {
    balanceChart: BalanceSheetRow[] | undefined
}

interface MetricChartProps {
    dataset: Dataset;
    labels: string[];
    height?: number;
}

type Dataset = {
    label: string;
    data: (number | null)[];
    color: string;
};

interface MetricChartProps {
    dataset: Dataset;
    labels: string[];
    height?: number;
}


const MetricChart: React.FC<MetricChartProps> = ({ dataset, labels, height = 250 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);

    const formatLabel = (label: string) =>
        label.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    useEffect(() => {
        const initChart = () => {
            if (!canvasRef.current || !window.Chart) return;

            // Destroy existing chart
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            chartInstanceRef.current = new window.Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: formatLabel(dataset.label),
                            data: dataset.data,
                            backgroundColor: dataset.color,
                            borderColor: dataset.color,
                            borderWidth: 2,
                            pointBackgroundColor: dataset.color,
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 3,
                            pointHoverRadius: 5,
                            fill: false,
                            tension: 0.4,
                            spanGaps: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: '#000',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#ccc',
                            borderWidth: 0,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                label: function (context: any) {
                                    const value = context.parsed.y;
                                    return value != null
                                        ? `${formatLabel(dataset.label)}: ${value.toLocaleString()}`
                                        : 'N/A';
                                },
                                title: function (tooltipItems: any) {
                                    return `Year: ${tooltipItems[0].label}`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: { color: '#808080', drawOnChartArea: false },
                            ticks: { color: '#808080', font: { size: 12 } },
                        },
                        y: {
                            grid: { color: '#808080' },
                            ticks: { color: '#808080', font: { size: 12 } },
                        },
                    },
                },
            });
        };

        const loadChartJS = () => {
            if (window.Chart) {
                initChart();
            } else {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
                script.onload = () => setTimeout(initChart, 50);
                document.head.appendChild(script);
            }
        };

        loadChartJS();

        return () => {
            if (chartInstanceRef.current) chartInstanceRef.current.destroy();
        };
    }, [dataset, labels]);

    return (
        <div className="bg-black rounded-xl shadow-lg p-6 border-none hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg text-white font-semibold mb-4 text-center">
                {formatLabel(dataset.label)}
            </h3>
            <div style={{ position: 'relative', height, width: '100%' }}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};



const BalanceSheetAnalysis = ({ balanceChart }: Params) => {
    const { labels, datasets } = React.useMemo(
        () => transformBalanceChart(balanceChart ?? []),
        [balanceChart]
    );

    console.log(labels);
    console.log(datasets);



    const latestValues = React.useMemo(() => {
        const values: Record<string, number> = {};
        datasets.forEach(ds => {
            values[ds.label] = ds.data?.[ds.data.length - 1] ?? 0;
        });
        return values;
    }, [datasets]);

    // Custom Pie Chart Component using Chart.js
    const PieChartComponent: React.FC<{ data: any[], title: string }> = ({ data, title }) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const chartInstanceRef = useRef<any>(null);

        useEffect(() => {
            const initChart = () => {
                if (!canvasRef.current || !window.Chart) return;

                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                chartInstanceRef.current = new window.Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: data.map(d => d.name),
                        datasets: [{
                            data: data.map(d => d.value),
                            backgroundColor: data.map(d => d.color),
                            borderWidth: 2,
                            borderColor: '#000'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#fff',
                                    padding: 20,
                                    usePointStyle: true
                                }
                            },
                            tooltip: {
                                backgroundColor: '#000',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                borderWidth: 0,
                                cornerRadius: 8,
                                callbacks: {
                                    label: function (context: any) {
                                        const value = context.parsed;
                                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
                                    }
                                }
                            }
                        }
                    }
                });
            };

            const loadChart = () => {
                if (window.Chart) {
                    initChart();
                } else {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
                    script.onload = () => {
                        setTimeout(initChart, 100);
                    };
                    document.head.appendChild(script);
                }
            };

            loadChart();

            return () => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }
            };
        }, [data]);

        return (
            <div className="bg-black rounded-xl shadow-lg p-6 border border-none hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                    {title}
                </h3>
                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                    <canvas ref={canvasRef} />
                </div>
            </div>
        );
    };

    // Custom Bar Chart Component using Chart.js
    const BarChartComponent: React.FC<{ data: any[], title: string }> = ({ data, title }) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const chartInstanceRef = useRef<any>(null);

        useEffect(() => {
            const initChart = () => {
                if (!canvasRef.current || !window.Chart) return;

                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                const colors = ['#17a2b8', '#6610f2', '#6f42c1'];

                chartInstanceRef.current = new window.Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: data.map(d => d.name),
                        datasets: [{
                            data: data.map(d => d.value),
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1,
                            borderRadius: 4,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: '#000',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                borderWidth: 0,
                                cornerRadius: 8,
                                callbacks: {
                                    label: function (context: any) {
                                        return `Amount: ${context.parsed.y.toLocaleString()}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: '#f0f0f0',
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    color: '#fff',
                                    font: {
                                        size: 12
                                    },
                                    maxRotation: 45,
                                    minRotation: 45
                                }
                            },
                            y: {
                                grid: {
                                    color: '#f0f0f0'
                                },
                                ticks: {
                                    color: '#fff',
                                    font: {
                                        size: 12
                                    },
                                    callback: function (value: any) {
                                        return value.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                });
            };

            const loadChart = () => {
                if (window.Chart) {
                    initChart();
                } else {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
                    script.onload = () => {
                        setTimeout(initChart, 100);
                    };
                    document.head.appendChild(script);
                }
            };

            loadChart();

            return () => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }
            };
        }, [data]);

        return (
            <div className="bg-black rounded-xl shadow-lg p-6 border border-none hover:shadow-xl transition-shadow duration-300 lg:col-span-2 xl:col-span-2">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                    {title}
                </h3>
                <div style={{ position: 'relative', height: '500px', width: '100%' }}>
                    <canvas ref={canvasRef} />
                </div>
            </div>
        );
    };

    const assetCompositionData = [
        {
            name: "Current Assets",
            value: latestValues["total_current_assets"],
            color: "#22D3EE",
        },
        {
            name: "Long-Term Assets",
            value: latestValues["total_long_term_assets"],
            color: "#EF4444",
        },
    ];

    const liabilityEquityData = [
        {
            name: "Shareholders' Equity",
            value: latestValues["shareholders_equity"],
            color: "#A3E635",
        },
        {
            name: "Total Liabilities",
            value: latestValues["total_liabilities"],
            color: "#6366F1",
        },
    ];

    const keyMetricsData = [
        {
            name: "Total Assets",
            value: latestValues["total_assets"],
        },
        {
            name: "Total Liabilities",
            value: latestValues["total_liabilities"],
        },
        {
            name: "Shareholders' Equity",
            value: latestValues["shareholders_equity"],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br bg-black py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Historical Trends Section */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                        {datasets.map((dataset) => (
                            <MetricChart key={dataset.label} dataset={dataset} labels={labels} />
                        ))}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">
                        Financial Snapshot for 2025
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                        <PieChartComponent data={assetCompositionData} title="Asset Composition" />
                        <PieChartComponent data={liabilityEquityData} title="Liabilities vs. Equity" />
                        <BarChartComponent data={keyMetricsData} title="Core Financials Breakdown" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceSheetAnalysis;