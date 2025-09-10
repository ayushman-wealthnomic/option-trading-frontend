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
                    x: { stacked: true },
                    y: { stacked: true, title: { display: true, text: 'Amount' } }
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
                scales: { y: { title: { display: true, text: 'Amount' } } },
                plugins: { title: { display: false } }
            }
        });

        chartsRef.current.push(ocfVsFcfChart);

        // --- Detailed Line Charts ---
        detailedChartsRef.current!.innerHTML = '';

        datasets.forEach(dataset => {
            const color_hash = Math.abs(dataset.label.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0));
            const r = color_hash % 255;
            const g = (color_hash >> 8) % 255;
            const b = (color_hash >> 16) % 255;

            const chartId = dataset.label + 'Chart';
            const chartWrapper = document.createElement('div');
            chartWrapper.className = 'chart';
            chartWrapper.style.backgroundColor = '#000000';
            chartWrapper.style.border = '1px solid #dee2e6';
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
                    datasets: [{
                        label: dataset.label,
                        data: dataset.data,
                        borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: dataset.label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: { title: { display: true, text: 'Year' } },
                        y: { title: { display: true, text: 'Value' } }
                    }
                }
            });

            chartsRef.current.push(detailedChart);
        });
    };

    return (
        <>
            <style>{`
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
          margin: 20px; 
          background-color: #000000; 
          color: #343a40; 
        }
        h1, h2 { 
          text-align: center; 
          color: #28a745; 
        }
        h3 { 
          color: #495057; 
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
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                margin: '20px',
                backgroundColor: '#000000',
                color: '#343a40'
            }}>
                <h2 style={{ textAlign: 'center', color: '#28a745' }}>Cash Flow Summary</h2>
                <div style={{
                    display: 'grid',
                    justifyContent: 'space-around',
                    marginTop: '20px',
                    gap: '20px'
                }}>
                    <div style={{
                        backgroundColor: '#000000',
                        border: '1px solid #dee2e6',
                        padding: '20px',
                        borderRadius: '0.5rem',
                        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                        flex: '1 1 48%',
                        minWidth: '400px'
                    }}>
                        <h3 style={{ color: '#495057' }}>Operating, Investing & Financing Cash Flow</h3>
                        <p style={{ fontSize: '0.8em', textAlign: 'center', color: '#6c757d' }}>
                            This stacked bar chart shows how different activities contribute to the net change in cash each year.
                        </p>
                        <canvas ref={mainComponentsChartRef} id="mainComponentsChart"></canvas>
                    </div>
                    <div style={{
                        backgroundColor: '#000000',
                        border: '1px solid #dee2e6',
                        padding: '20px',
                        borderRadius: '0.5rem',
                        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                        flex: '1 1 48%',
                        minWidth: '400px'
                    }}>
                        <h3 style={{ color: '#495057' }}>Operating Cash Flow vs. Free Cash Flow</h3>
                        <p style={{ fontSize: '0.8em', textAlign: 'center', color: '#6c757d' }}>
                            This chart compares cash generated from operations with the cash left after paying for capital expenditures.
                        </p>
                        <canvas ref={ocfVsFcfChartRef} id="ocfVsFcfChart"></canvas>
                    </div>
                </div>

                <h2 style={{ textAlign: 'center', color: '#28a745' }}>Detailed Trend Analysis</h2>
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