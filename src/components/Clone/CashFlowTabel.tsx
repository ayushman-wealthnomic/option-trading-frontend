import { transformCashFlow } from '@/lib/trasnformCashflowData';
import React from 'react';

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


interface TabularViewProps {
    cashFlowData: CashFlowRow[] | undefined;
}

const CashFlowTabel: React.FC<TabularViewProps> = ({ cashFlowData }) => {
    const { years, datasets } = transformCashFlow(cashFlowData);
    console.log(years);
    console.log(datasets);



    const cashFlowLabels: Record<string, string> = {
        depreciation_amortization: "Depreciation & Amortization",
        share_based_compensation: "Share-Based Compensation",
        other_operating_activities: "Other Operating Activities",
        operating_cash_flow: "Operating Cash Flow",
        operating_cash_flow_growth: "Operating Cash Flow Growth",
        capital_expenditures: "Capital Expenditures",
        acquisitions: "Acquisitions",
        change_in_investments: "Change in Investments",
        other_investing_activities: "Other Investing Activities",
        investing_cash_flow: "Investing Cash Flow",
        dividends_paid: "Dividends Paid",
        other_financing_activities: "Other Financing Activities",
        financing_cash_flow: "Financing Cash Flow",
        net_cash_flow: "Net Cash Flow",
        free_cash_flow: "Free Cash Flow",
        free_cash_flow_growth: "Free Cash Flow Growth",
        unclassified_cashflow: "Unclassified Cash Flow",
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
                                {cashFlowLabels[label]}
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

export default CashFlowTabel;