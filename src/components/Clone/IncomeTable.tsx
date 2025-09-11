import { transformFinancialData } from '@/lib/chartDataTransform';
import React from 'react';

type StockFinancialData = {
    id: number;
    stock_ticker: string;
    report_date: string;
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

interface TableRow {
    category: string;
    values: (string | number | null)[];
}


interface TransformedFinancialData {
    years: string[];
    tableData: TableRow[];
}

interface TabularViewProps {
    chartData: StockFinancialData[] | undefined;
}

const IncomeTable: React.FC<TabularViewProps> = ({ chartData }) => {
    const transformedData = transformFinancialData(chartData) as TransformedFinancialData;
    if (!transformedData || !transformedData.years || !transformedData.tableData) {
        return (
            <div className="overflow-x-auto mt-10 border border-gray-700 rounded-lg p-8 text-center">
                <p className="text-gray-400">No financial data available</p>
            </div>
        );
    }

    const { years, tableData } = transformedData;

    const formatValue = (value: string | number | null | undefined): string => {
        if (value === null || value === undefined || value === '') {
            return '-';
        }
        return String(value);
    };

    return (
        <div className="overflow-x-auto mt-10 border border-gray-700 rounded-lg">
            <table className="min-w-max w-full text-lg table-auto border-collapse">
                <thead className="bg-muted">
                    <tr>
                        <th className="py-2 px-3 font-medium text-gray-300 border-r border-gray-700 text-left sticky left-0 bg-muted z-10 min-w-40">
                            Category
                        </th>
                        {years.map((year: string) => (
                            <th
                                key={year}
                                className="py-2 px-3 font-medium text-gray-300 border-r border-gray-700 text-right whitespace-nowrap min-w-24"
                            >
                                {year}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row: TableRow, index: number) => (
                        <tr
                            key={row.category}
                            className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-transparent'}
                        >
                            <td className="py-2 px-3 text-gray-300 border-r border-t border-gray-700 text-left sticky left-0 bg-muted z-10 font-medium">
                                {row.category}
                            </td>
                            {row.values.map((val: string | number | null, i: number) => (
                                <td
                                    key={i}
                                    className="py-2 px-3 font-mono text-gray-300 border-r border-t border-gray-700 text-right whitespace-nowrap"
                                >
                                    {formatValue(val)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IncomeTable;