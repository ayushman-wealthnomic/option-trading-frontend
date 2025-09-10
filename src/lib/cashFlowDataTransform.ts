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
};

type CashFlowMap = Record<
    string,
    Record<string, number>
>;

// Mapping keys for the final object
const cashFlowMap: Record<string, keyof CashFlowRow> = {
    depreciation_amortization: "depreciation_amortization",
    share_based_compensation: "share_based_compensation",
    other_operating_activities: "other_operating_activities",
    operating_cash_flow: "operating_cash_flow",
    capital_expenditures: "capital_expenditures",
    acquisitions: "acquisitions",
    change_in_investments: "change_in_investments",
    other_investing_activities: "other_investing_activities",
    investing_cash_flow: "investing_cash_flow",
    dividends_paid: "dividends_paid",
    other_financing_activities: "other_financing_activities",
    financing_cash_flow: "financing_cash_flow",
    net_cash_flow: "net_cash_flow",
    free_cash_flow: "free_cash_flow"
};

export function transformCashFlowData(data: CashFlowRow[] | undefined): CashFlowMap {
    const result: CashFlowMap = {};

    data?.forEach((row) => {
        const dateKey = row.report_date;
        result[dateKey] = {};

        Object.entries(cashFlowMap).forEach(([key, rowKey]) => {
            // Convert string to number
            const rawValue = row[rowKey];        
const value = parseFloat(String(rawValue || "0"));
            result[dateKey][key] = isNaN(value) ? 0 : value;
        });
    });

    return result;
}
