type RatiosRow = {
    id: number;
    stock_ticker: string;
    report_date: string;
    market_capitalization: string | null;
    market_cap_growth: string | null;
    enterprise_value: string | null;
    pe_ratio: string | null;
    pb_ratio: string | null;
    debt_equity_ratio: string | null;
    interest_coverage: string | null;
    quick_ratio: string | null;
    current_ratio: string | null;
    asset_turnover: string | null;
    earnings_yield: string | null;
    fcf_yield: string | null;
    dividend_yield: string | null;
    payout_ratio: string | null;
    total_shareholder_return: string | null;
};

// Mapping from display name → API key
const marketMetricsMap: Record<string, keyof RatiosRow> = {
    "Market Capitalization": "market_capitalization",
    "Market Cap Growth": "market_cap_growth",
    "Enterprise Value": "enterprise_value",
    "PE Ratio": "pe_ratio",
    "PB Ratio": "pb_ratio",
    "Debt / Equity Ratio": "debt_equity_ratio",
    "Interest Coverage": "interest_coverage",
    "Quick Ratio": "quick_ratio",
    "Current Ratio": "current_ratio",
    "Asset Turnover": "asset_turnover",
    "Earnings Yield": "earnings_yield",
    "FCF Yield": "fcf_yield",
    "Dividend Yield": "dividend_yield",
    "Payout Ratio": "payout_ratio",
    "Total Shareholder Return": "total_shareholder_return",
};

export function transformRatiosData(
    data: RatiosRow[] | undefined
): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};

    data?.forEach((metrics) => {
        const dateKey = metrics.report_date;
        result[dateKey] = {};

        Object.entries(marketMetricsMap).forEach(([displayName, key]) => {
            const value = metrics[key];
            // Convert number to string safely
            let strValue = value !== null && value !== undefined ? String(value) : "N/A";

            // Add "%" for growth/yield fields if they exist
            if (
                strValue !== "N/A" &&
                ["market_cap_growth", "earnings_yield", "fcf_yield", "dividend_yield", "total_shareholder_return"].includes(key)
            ) {
                if (!strValue.endsWith("%")) strValue += "%";
            }

            result[dateKey][displayName] = strValue;
        });
    });

    return result;
}

