import { transformBalanceChart } from '@/lib/balanceChartDataTransform';
import React from 'react';

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

interface TabularViewProps {
    balanceChart: BalanceSheetRow[] | undefined;
}

const BalnceSheetTable: React.FC<TabularViewProps> = ({ balanceChart }) => {
    const { labels, datasets } = transformBalanceChart(balanceChart);

    const balanceSheetLabels: Record<string, string> = {
        cash_and_equivalents: "Cash & Equivalents",
        short_term_investments: "Short-Term Investments",
        cash_and_cash_equivalents: "Cash & Cash Equivalents",
        cash_growth: "Cash Growth",
        receivables: "Receivables",
        inventory: "Inventory",
        other_current_assets: "Other Current Assets",
        total_current_assets: "Total Current Assets",
        property_plant_equipment: "Property, Plant & Equipment",
        long_term_investments: "Long-Term Investments",
        goodwill: "Goodwill",
        intangible_assets: "Intangible Assets",
        other_long_term_assets: "Other Long-Term Assets",
        total_long_term_assets: "Total Long-Term Assets",
        total_assets: "Total Assets",
        accounts_payable: "Accounts Payable",
        deferred_revenue: "Deferred Revenue",
        current_debt: "Current Debt",
        total_current_liabilities: "Total Current Liabilities",
        other_current_liabilities: "Other Current Liabilities",
        long_term_debt: "Long-Term Debt",
        total_long_term_liabilities: "Total Long-Term Liabilities",
        other_long_term_liabilities: "Other Long-Term Liabilities",
        total_liabilities: "Total Liabilities",
        total_debt: "Total Debt",
        debt_growth: "Debt Growth",
        common_stock: "Common Stock",
        retained_earnings: "Retained Earnings",
        comprehensive_income: "Comprehensive Income",
        shareholders_equity: "Shareholders’ Equity",
        total_liabilities_and_equity: "Total Liabilities & Equity",
        net_cash_debt: "Net Cash / Debt",
    };
    if (!labels || !datasets) {
        return (
            <div className="overflow-x-auto mt-10 border border-gray-700 rounded-lg p-8 text-center">
                <p className="text-gray-400">No financial data available</p>
            </div>
        );
    }



    const formatValue = (value: string | number | null | undefined): string => {
        if (value === null || value === undefined || value === '') {
            return '-';
        }
        return String(value);
    };

    return (
        <div className="overflow-x-auto mt-10 border border-gray-700 rounded-lg">
            <table className="min-w-max w-full text-sm table-auto border-collapse">
                <thead className="bg-muted">
                    <tr>
                        <th className="py-2 px-3 font-medium text-gray-300 border-r border-gray-700 text-left sticky left-0 bg-muted z-10 min-w-40">
                            Category
                        </th>
                        {labels.map((year: string) => (
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
                    {datasets.map(({ label, data }, index) => (
                        <tr
                            key={label}
                            className={index % 2 === 0 ? "bg-gray-800/30" : "bg-transparent"}
                        >
                            <td className="py-2 px-3 text-gray-300 border-r border-t border-gray-700 text-left sticky left-0 bg-muted z-10 font-medium">
                                {balanceSheetLabels[label]}
                            </td>

                            {data.map((val, i) => (
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

export default BalnceSheetTable;