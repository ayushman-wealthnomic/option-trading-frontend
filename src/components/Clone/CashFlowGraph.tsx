import { transformCashFlowData } from '@/lib/cashFlowDataTransform';
import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        Chart: any;
    }
}

interface CashFlowData {
    [key: string]: {
        [metric: string]: number;
    };
}

type CashFlowRow = {
    id: number;
    stock_ticker: string;
    report_date: string;
    depreciation_amortization: string;
    share_based_compensation: string;
    other_operating_activities: string;
    operating_cash_flow: string;
    operating_cash_flow_growth: string;
    capital_expenditures: string;
    acquisitions: string;
    change_in_investments: string;
    other_investing_activities: string;
    investing_cash_flow: string;
    dividends_paid: string;
    other_financing_activities: string;
    financing_cash_flow: string;
    net_cash_flow: string;
    free_cash_flow: string;
    free_cash_flow_growth: string;
    unclassified_cashflow: string;
}

interface Param {
    cashFlowData: CashFlowRow[] | undefined;
}


const CashFlowAnalysis = ({ cashFlowData }: Param) => {
    const mainComponentsChartRef = useRef<HTMLCanvasElement>(null);
    const ocfVsFcfChartRef = useRef<HTMLCanvasElement>(null);
    const detailedChartsRef = useRef<HTMLDivElement>(null);
    const chartsRef = useRef<any[]>([]);

    const transformedData: CashFlowData = transformCashFlowData(cashFlowData);

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
    }, [cashFlowData]);

    const initializeCharts = () => {
        if (!window.Chart || !mainComponentsChartRef.current || !ocfVsFcfChartRef.current || !detailedChartsRef.current) return;

        // --- Data Preparation ---
        const labels = Object.keys(transformedData).sort();
        const allKeys = [...new Set(labels.flatMap(label => Object.keys(transformedData[label])))];

        const datasets = allKeys.map(key => {
            return {
                label: key,
                data: labels.map(label => transformedData[label][key] !== undefined ? transformedData[label][key] : null)
            };
        });

        // --- Chart 1: Main Components (Stacked Bar) ---
        const ocfData = datasets.find(d => d.label === 'operating_cash_flow')?.data || [];
        const icfData = datasets.find(d => d.label === 'investing_cash_flow')?.data || [];
        const fcfData = datasets.find(d => d.label === 'financing_cash_flow')?.data || [];

        const mainComponentsChart = new window.Chart(mainComponentsChartRef.current.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels.map(l => l.substring(0, 4)),
                datasets: [
                    { label: 'Operating', data: ocfData, backgroundColor: '#28a745' },
                    { label: 'Investing', data: icfData, backgroundColor: '#dc3545' },
                    { label: 'Financing', data: fcfData, backgroundColor: '#007bff' }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true, ticks: {
                            color: '#fff'
                        },
                    },
                    y: {
                        stacked: true, title: { display: true, text: 'Amount' }, ticks: {
                            color: '#fff'        // <-- X-axis tick labels white
                        },
                    }
                },
                plugins: { title: { display: false } }
            }
        });

        chartsRef.current.push(mainComponentsChart);

        // --- Chart 2: OCF vs FCF (Grouped Bar) ---
        const freeCashFlowData = datasets.find(d => d.label === 'free_cash_flow')?.data || [];
        const ocfVsFcfChart = new window.Chart(ocfVsFcfChartRef.current.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels.map(l => l.substring(0, 4)),
                datasets: [
                    { label: 'Operating Cash Flow', data: ocfData, backgroundColor: '#17a2b8', borderColor: '#17a2b8' },
                    { label: 'Free Cash Flow', data: freeCashFlowData, backgroundColor: '#6f42c1', borderColor: '#6f42c1' }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: '#fff'        // <-- X-axis tick labels white
                        },
                        title: {
                            display: true,
                            text: 'Year',
                            color: '#fff'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#fff'        // <-- Y-axis tick labels white
                        },
                        title: {
                            display: true,
                            text: 'Amount',
                            color: '#fff'
                        },
                    }
                },
                plugins: { title: { display: false } }
            }
        });

        chartsRef.current.push(ocfVsFcfChart);

        // --- Detailed Line Charts ---
        detailedChartsRef.current!.innerHTML = '';

        const chartColors: { background: string; border: string }[] = [
            { background: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 1)' },    // Cyan
            { background: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 1)' },    // Pink
            { background: 'rgba(163, 230, 53, 0.1)', border: 'rgba(163, 230, 53, 1)' },    // Lime
            { background: 'rgba(251, 146, 60, 0.1)', border: 'rgba(251, 146, 60, 1)' },    // Orange
            { background: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 1)' },    // Violet
            { background: 'rgba(244, 63, 94, 0.1)', border: 'rgba(244, 63, 94, 1)' },      // Rose
            { background: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 1)' },    // Emerald
            { background: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 1)' },    // Amber
            { background: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 1)' },    // Indigo
            { background: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 1)' },      // Red
        ];

        datasets.forEach((dataset, index) => {
            const color = chartColors[index % chartColors.length];

            const chartId = dataset.label + 'Chart';
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'chart';
            chartWrapper.style.backgroundColor = '#000000';
            chartWrapper.style.border = '0px solid #dee2e6';
            chartWrapper.style.padding = '20px';
            chartWrapper.style.borderRadius = '0.5rem';
            chartWrapper.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
            chartWrapper.innerHTML = `<canvas id="${chartId}"></canvas>`;

            detailedChartsRef.current!.appendChild(chartWrapper);
            const canvas = document.getElementById(chartId) as HTMLCanvasElement;

            const detailedChart = new window.Chart(canvas.getContext('2d')!, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: dataset.label,
                            data: dataset.data,
                            borderColor: color.border,
                            backgroundColor: color.background,
                            fill: true,             // so the area under the line is tinted
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: dataset.label
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, (l) => l.toUpperCase()),
                            font: { size: 16 },
                            color: '#fff',          // white title text
                        },
                    },
                    scales: {
                        x: {
                            title: { display: true, text: 'Year', color: '#fff' },
                            ticks: { color: '#808080' },
                        },
                        y: {
                            title: { display: true, text: 'Value', color: '#fff' },
                            ticks: { color: '#808080' },
                            grid: { drawOnChartArea: true, color: 'rgba(200,200,200,0.3)' },
                        },
                    },
                },
            });

            chartsRef.current.push(detailedChart);
        });
    };

    return (
        <>
            <style>{`
        body { 
          background-color: #000000; 
        }
        .main-charts-container {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 20px;
          gap: 20px;
        }
        .main-chart {
          background-color: #000000;
          border: 1px solid #dee2e6;
          padding: 20px;
          border-radius: 0.5rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
          flex: 1 1 48%;
          min-width: 400px;
        }
        .chart-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-top: 40px;
        }
        .chart {
          background-color: black;
          border: 1px solid #dee2e6;
          padding: 20px;
          border-radius: 0.5rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }
      `}</style>
            <div style={{
                margin: '20px',
                backgroundColor: '#000000',
                color: '#343a40'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    justifyContent: 'space-around',
                    marginTop: '20px',
                    gap: '20px'
                }}>
                    <div style={{
                        backgroundColor: '#000000',
                        border: '1px solid #dee2e6',
                        padding: '20px',
                        borderRadius: '0.0rem',
                        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                        flex: '1 1 48%',
                        minWidth: '400px',
                        width: '100%',
                        height: '650px'
                    }}>
                        <h3 style={{ color: '#ffffff', fontWeight: 'bold' }}>Operating, Investing & Financing Cash Flow</h3>
                        <p style={{ fontSize: '0.8em', textAlign: 'center', color: '#6c757d' }}>
                            This stacked bar chart shows how different activities contribute to the net change in cash each year.
                        </p>
                        <canvas ref={mainComponentsChartRef} id="mainComponentsChart"></canvas>
                    </div>
                    <div style={{
                        backgroundColor: '#000000',
                        border: '1px solid #dee2e6',
                        padding: '20px',
                        borderRadius: '0.0rem',
                        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                        flex: '1 1 48%',
                        minWidth: '400px',
                        height: '650px'
                    }}>
                        <h3 style={{ color: '#ffffff', fontWeight: 'bold' }}>Operating Cash Flow vs. Free Cash Flow</h3>
                        <p style={{ fontSize: '0.8em', textAlign: 'center', color: '#6c757d' }}>
                            This chart compares cash generated from operations with the cash left after paying for capital expenditures.
                        </p>
                        <canvas ref={ocfVsFcfChartRef} id="ocfVsFcfChart"></canvas>
                    </div>
                </div>

                <div
                    ref={detailedChartsRef}
                    id="detailed-charts"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '20px',
                        marginTop: '40px',
                        backgroundColor: 'black'
                    }}
                >
                    {/* Line charts will be generated here by script */}
                </div>
            </div>
        </>
    );
};

export default CashFlowAnalysis;