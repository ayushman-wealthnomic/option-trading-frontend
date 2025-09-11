import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import FinancialDashboard from '@/components/Clone/IncomeGraph';
import BalanceSheetAnalysis from '@/components/Clone/BalanceGraph';
import FinancialRatiosAnalysis from '@/components/Clone/RatiosGraph';
import CashFlowAnalysis from '@/components/Clone/CashFlowGraph';

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

type CashFlowRow = {
    id: number;
    stock_ticker: string;
    report_date: string; // YYYY-MM-DD
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
};

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

interface Params {
    chartData: StockFinancialData[] | undefined;
    balanceChart: BalanceSheetRow[] | undefined;
    cashFlowData: CashFlowRow[] | undefined;
    ratiosData: RatiosRow[] | undefined;
}

interface FinancialDataItem {
    category: string;
    values: number[];
    type: 'start' | 'delta' | 'total';
}

interface DeltaDataItem {
    category: string;
    value: number;
}

interface ProcessedDataItem {
    category: string;
    type: 'start' | 'delta' | 'total';
    value: number;
    start: number;
    end: number;
}



const CloneCharts = ({ chartData, balanceChart, cashFlowData, ratiosData }: Params) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<'GRAPH' | 'TABULAR'>('GRAPH');
    const [activeSection, setActiveSection] = useState<'Income Statement' | 'Balance Sheet' | 'Cash Flow' | 'Ratios'>('Income Statement');

    // Financial data
    const financialData: FinancialDataItem[] = [
        { category: 'Net sales', values: [234, 216, 229], type: 'start' },
        { category: 'Cost of sales', values: [-140, -131, -141], type: 'delta' },
        { category: 'Gross margin', values: [93.6, 84.3, 88.2], type: 'total' },
        { category: 'Research and development', values: [-8.1, -10.0, -11.6], type: 'delta' },
        { category: 'Selling, general and administrative', values: [-14.3, -14.2, -15.3], type: 'delta' },
        { category: 'Operating income', values: [71.2, 60.0, 61.3], type: 'total' },
        { category: 'Other income', values: [1.3, 1.3, 2.7], type: 'delta' },
        { category: 'Income before taxes', values: [72.5, 61.4, 64.1], type: 'total' },
        { category: 'Income taxes', values: [-19.1, -15.7, -15.7], type: 'delta' },
        { category: 'Net income', values: [53.4, 45.7, 48.4], type: 'total' }
    ];

    const delta2017Data: DeltaDataItem[] = [
        { category: 'Net sales', value: 13.6 },
        { category: 'Cost of sales', value: -9.7 },
        { category: 'Gross margin', value: 3.9 },
        { category: 'Research and development', value: -1.5 },
        { category: 'Selling, general and administrative', value: -1.1 },
        { category: 'Operating income', value: 1.3 },
        { category: 'Other income', value: 1.4 },
        { category: 'Income before taxes', value: 2.7 },
        { category: 'Income taxes', value: -0.1 },
        { category: 'Net income', value: 2.7 }
    ];

    const processYearData = (yearIndex: number): ProcessedDataItem[] => {
        let cumulative = 0;
        return financialData.map(d => {
            const value = d.values[yearIndex];
            let start = cumulative;

            if (d.type === 'total' || d.type === 'start') {
                start = 0;
                cumulative = value;
            } else {
                cumulative += value;
            }

            return {
                category: d.category,
                type: d.type,
                value: value,
                start: start,
                end: start + value
            };
        });
    };

    useEffect(() => {
        if (!chartRef.current || activeTab !== 'GRAPH') return;

        // Clear previous chart
        d3.select(chartRef.current).selectAll('*').remove();

        const years = ['2015', '2016', '2017'];

        // Chart dimensions to match the image
        const margin = { top: 30, right: 20, bottom: 10, left: 180 };
        const width = 500;
        const height = 500;
        const columnWidth = 100;
        const columnPadding = 24;

        // SVG setup
        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background', 'transparent')
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scales
        const y = d3.scaleBand()
            .domain(financialData.map(d => d.category))
            .range([0, height])
            .padding(0.15);

        const x = d3.scaleLinear()
            .domain([
                -20,
                ((d3.max(financialData, d => d3.max(d.values) ?? 0) ?? 0) + 20)
            ])
            .range([0, columnWidth]);


        const xDelta = d3.scaleLinear()
            .domain([-15, 15])
            .range([0, columnWidth]);

        // Draw category labels (Y-axis)
        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y).tickSize(0))
            .call(g => g.select('.domain').remove())
            .selectAll('text')
            .style('fill', '#9ca3af')
            .style('font-size', '11px')
            .style('font-family', 'system-ui, -apple-system, sans-serif')
            .style('font-weight', '400');

        // Draw charts for each year
        years.forEach((year, i) => {
            const yearData = processYearData(i);
            const yearGroup = svg.append('g')
                .attr('transform', `translate(${(columnWidth + columnPadding) * i}, 0)`);

            // Year header
            yearGroup.append('text')
                .attr('x', columnWidth / 2)
                .attr('y', -5)
                .attr('text-anchor', 'middle')
                .style('font-size', '11px')
                .style('font-weight', '500')
                .style('fill', '#d1d5db')
                .style('font-family', 'system-ui, -apple-system, sans-serif')
                .text(year);

            // Bars
            yearGroup.selectAll('rect')
                .data(yearData)
                .enter()
                .append('rect')
                .attr('y', d => y(d.category) || 0)
                .attr('height', y.bandwidth())
                .attr('x', d => x(Math.min(d.start, d.end)))
                .attr('width', d => Math.abs(x(d.end) - x(d.start)))
                .attr('fill', d => {
                    if (d.type === 'total' || d.type === 'start') return '#6b7280';
                    return d.value > 0 ? '#10b981' : '#f97316';
                })
                .attr('rx', 1);

            // Bar value labels
            yearGroup.selectAll('.bar-label')
                .data(yearData)
                .enter()
                .append('text')
                .attr('class', 'bar-label')
                .attr('x', d => {
                    if (d.type === 'total' || d.type === 'start') {
                        return x(d.end) - 2;
                    }
                    return d.value > 0 ? x(d.end) - 2 : x(d.end) + 2;
                })
                .attr('y', d => (y(d.category) || 0) + y.bandwidth() / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', d => {
                    if (d.type === 'total' || d.type === 'start') {
                        return 'end';
                    }
                    return d.value > 0 ? 'end' : 'start';
                })
                .style('font-size', '10px')
                .style('fill', '#ffffff')
                .style('font-family', 'system-ui, -apple-system, sans-serif')
                .style('font-weight', '500')
                .text(d => Math.abs(d.value) < 10 ? d.value.toFixed(1) : Math.round(d.value).toString());
        });

        // Draw Delta 2017 Chart
        const deltaGroup = svg.append('g')
            .attr('transform', `translate(${(columnWidth + columnPadding) * 3}, 0)`);

        // Delta header
        deltaGroup.append('text')
            .attr('x', columnWidth / 2)
            .attr('y', -5)
            .attr('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('font-weight', '500')
            .style('fill', '#d1d5db')
            .style('font-family', 'system-ui, -apple-system, sans-serif')
            .text('Δ 2017');

        // Center line for Delta chart
        deltaGroup.append('line')
            .attr('x1', xDelta(0))
            .attr('x2', xDelta(0))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', '#4b5563')
            .attr('stroke-width', 1);

        // Delta bars
        deltaGroup.selectAll('rect')
            .data(delta2017Data)
            .enter()
            .append('rect')
            .attr('y', d => y(d.category) || 0)
            .attr('height', y.bandwidth())
            .attr('x', d => xDelta(Math.min(0, d.value)))
            .attr('width', d => Math.abs(xDelta(d.value) - xDelta(0)))
            .attr('fill', d => d.value > 0 ? '#06b6d4' : '#ec4899')
            .attr('rx', 1);

        // Delta value labels
        deltaGroup.selectAll('.bar-label')
            .data(delta2017Data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', d => xDelta(d.value) + (d.value > 0 ? 2 : -2))
            .attr('y', d => (y(d.category) || 0) + y.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', d => d.value > 0 ? 'start' : 'end')
            .style('font-size', '10px')
            .style('fill', '#ffffff')
            .style('font-family', 'system-ui, -apple-system, sans-serif')
            .style('font-weight', '500')
            .text(d => d.value.toFixed(1));

    }, [activeTab, financialData, delta2017Data]);

    const renderTabularView = () => {
        const years = ['2015', '2016', '2017'];

        return (
            <div className="overflow-x-auto mt-10">
                <table className="w-full text-lg">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="text-left py-2 px-3 font-medium text-gray-300">Category</th>
                            {years.map(year => (
                                <th key={year} className="text-center py-2 px-3 font-medium text-gray-300">{year}</th>
                            ))}
                            <th className="text-center py-2 px-3 font-medium text-gray-300">Δ 2017</th>
                        </tr>
                    </thead>
                    <tbody>
                        {financialData.map((item, index) => (
                            <tr key={item.category} className={`border-b border-gray-800 ${item.type === 'total' ? 'bg-gray-800/30' : ''}`}>
                                <td className={`py-2 px-3 ${item.type === 'total' ? 'font-semibold text-gray-200' : 'text-gray-300'}`}>
                                    {item.category}
                                </td>
                                {item.values.map((value, yearIndex) => (
                                    <td key={yearIndex} className="text-center py-2 px-3 font-mono text-gray-300">
                                        {value.toFixed(1)}
                                    </td>
                                ))}
                                <td className="text-center py-2 px-3 font-mono text-gray-300">
                                    <span className={delta2017Data[index]?.value > 0 ? 'text-green-400' : 'text-pink-400'}>
                                        {delta2017Data[index]?.value.toFixed(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white flex mt-20">
            {/* Left side with chart */}
            <div className="flex-1 p-4">
                {/* Main Tabs */}
                <div className="flex mb-4">
                    <button
                        onClick={() => setActiveTab('GRAPH')}
                        className={`px-4 py-2 text-lg font-medium ${activeTab === 'GRAPH'
                            ? 'text-white border-b border-white'
                            : 'text-gray-400'
                            }`}
                    >
                        GRAPH
                    </button>
                    <button
                        onClick={() => setActiveTab('TABULAR')}
                        className={`px-4 py-2 text-lg font-medium ml-6 ${activeTab === 'TABULAR'
                            ? 'text-white border-b border-white'
                            : 'text-gray-400'
                            }`}
                    >
                        TABULAR
                    </button>
                </div>

                {/* Content Panel */}
                <div className="border border-gray-700 rounded w-full">
                    {/* Section Tabs */}
                    <div className="flex items-center justify-center w-full">
                        {[
                            { name: 'Income Statement', active: true },
                            { name: 'Balance Sheet', active: false },
                            { name: 'Cash Flow', active: false },
                            { name: 'Ratios', active: false }
                        ].map((section) => (
                            <button
                                key={section.name}
                                onClick={() => setActiveSection(section.name as any)}
                                className={`flex-1 px-3 py-2 text-lg font-medium border-r border-gray-700 last:border-r-0
        ${activeSection === section.name
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-[#090909] text-white'
                                    }`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>

                    {/* Chart Content */}
                    <div className="bg-black">
                        {activeTab === 'GRAPH' ? (
                            <>
                                {activeSection === 'Income Statement' && <FinancialDashboard chartData={chartData} />}
                                {activeSection === 'Balance Sheet' && <BalanceSheetAnalysis balanceChart={balanceChart} />}
                                {activeSection === 'Cash Flow' && <CashFlowAnalysis cashFlowData={cashFlowData} />}
                                {activeSection === 'Ratios' && <FinancialRatiosAnalysis ratiosData={ratiosData} />}
                            </>
                        ) : (
                            renderTabularView()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloneCharts;