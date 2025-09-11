import { transformBalanceChart } from '@/lib/balanceChartDataTransform';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface DataPoint {
    year: string;
    [key: string]: number | string | null;
}

interface Dataset {
    label: string;
    data: (number | null)[];
    color: string;
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

const BalanceSheetAnalysis = ({ balanceChart }: Params) => {
    const { labels, datasets } = React.useMemo(
        () => transformBalanceChart(balanceChart ?? []),
        [balanceChart]
    );


    const latestValues = React.useMemo(() => {
        const values: Record<string, number> = {};
        datasets.forEach(ds => {
            values[ds.label] = ds.data?.[ds.data.length - 1] ?? 0;
        });
        return values;
    }, [datasets]);

    const formatLabel = (label: string): string => {
        return label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const createChartData = (dataset: Dataset): DataPoint[] => {
        return labels.map((year, index) => ({
            year: year.split('-')[0], // Just show the year
            value: dataset.data[index]
        }));
    };



    const assetCompositionData = [
        {
            name: "Current Assets",
            value: latestValues["total_current_assets"],
            color: "#22D3EE", // cyan
        },
        {
            name: "Long-Term Assets",
            value: latestValues["total_long_term_assets"],
            color: "#EF4444", // red
        },
    ];

    const liabilityEquityData = [
        {
            name: "Shareholders' Equity",
            value: latestValues["shareholders_equity"],
            color: "#A3E635", // lime
        },
        {
            name: "Total Liabilities",
            value: latestValues["total_liabilities"],
            color: "#6366F1", // indigo
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


    const MetricChart: React.FC<{ dataset: Dataset }> = ({ dataset }) => {
        const data = createChartData(dataset);

        return (
            <div className="bg-black rounded-xl shadow-lg p-6 border-none border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg text-white font-semibold mb-4 text-center">
                    {formatLabel(dataset.label)}
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#808080" horizontal={true}
                            vertical={false} />
                        <XAxis
                            dataKey="year"
                            tick={{ fontSize: 12 }}
                            stroke="#808080"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            stroke="#808080"
                        />
                        <Tooltip
                            formatter={(value: number) => [value?.toLocaleString() || 'N/A', formatLabel(dataset.label)]}
                            labelFormatter={(label) => `Year: ${label}`}
                            contentStyle={{
                                backgroundColor: '#000',
                                border: '0px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={dataset.color}
                            strokeWidth={2}
                            dot={{ r: 3, fill: dataset.color }}
                            connectNulls={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br bg-black py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}

                {/* Historical Trends Section */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                        {datasets.map((dataset) => (
                            <MetricChart key={dataset.label} dataset={dataset} />
                        ))}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">
                        Financial Snapshot for 2025
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                        {/* Asset Composition */}
                        <div className="bg-black rounded-xl shadow-lg p-6 border border-none hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">
                                Asset Composition
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart
                                    style={{// optional dark bg
                                        borderRadius: 8,
                                        padding: 8,
                                    }}
                                >
                                    <Pie
                                        data={assetCompositionData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) =>
                                            `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`
                                        }
                                    // labelStyle={{ fill: "#fff", fontSize: 12 }}
                                    >
                                        {assetCompositionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#000",
                                            border: "none",
                                            color: "#fff",
                                        }}
                                        formatter={(value: number) => value.toLocaleString()}
                                        itemStyle={{ color: "#fff" }}
                                        labelStyle={{ color: "#fff" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Liabilities vs Equity */}
                        <div className="bg-black rounded-xl shadow-lg p-6 border border-none hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">
                                Liabilities vs. Equity
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={liabilityEquityData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent ?? 0 * 100).toFixed(1)}%`}
                                    >
                                        {liabilityEquityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => value.toLocaleString()} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Key Metrics Bar Chart */}
                        <div className="bg-black rounded-xl shadow-lg p-6 border border-none hover:shadow-xl transition-shadow duration-300 lg:col-span-2 xl:col-span-2">
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">
                                Core Financials Breakdown
                            </h3>
                            <ResponsiveContainer width="100%" height={500}>
                                <BarChart data={keyMetricsData}>
                                    <CartesianGrid stroke="#f0f0f0" horizontal={true} vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fontSize: 12 }}
                                        stroke="#fff"
                                        angle={-45}
                                        textAnchor="end"
                                        height={100}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        stroke="#fff"
                                    />
                                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Amount']} contentStyle={{
                                        backgroundColor: "#000",
                                        border: "none",
                                        color: "#fff",
                                    }} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        <Cell fill="#17a2b8" />
                                        <Cell fill="#6610f2" />
                                        <Cell fill="#6f42c1" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceSheetAnalysis;