import { transformCashFlow } from '@/lib/trasnformCashflowData';
import React from 'react';

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


interface TabularViewProps {
    ratiosData: RatiosRow[] | undefined;
}

const RatiosTable: React.FC<TabularViewProps> = ({ ratiosData }) => {
    const { years, datasets } = transformCashFlow(ratiosData);
    console.log(years);
    console.log(datasets);


    const ratiosLabels: Record<string, string> = {
        market_capitalization: "Market Capitalization",
        market_cap_growth: "Market Cap Growth",
        enterprise_value: "Enterprise Value",
        pe_ratio: "Price / Earnings (P/E) Ratio",
        pb_ratio: "Price / Book (P/B) Ratio",
        debt_equity_ratio: "Debt-to-Equity Ratio",
        interest_coverage: "Interest Coverage",
        quick_ratio: "Quick Ratio",
        current_ratio: "Current Ratio",
        asset_turnover: "Asset Turnover",
        earnings_yield: "Earnings Yield",
        fcf_yield: "Free Cash Flow Yield",
        dividend_yield: "Dividend Yield",
        payout_ratio: "Payout Ratio",
        total_shareholder_return: "Total Shareholder Return",
    };
    if (!years || !datasets) {
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
                        {years.reverse().map((year: string) => (
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
                                {ratiosLabels[label]}
                            </td>

                            {data.reverse().map((val, i) => (
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

export default RatiosTable;