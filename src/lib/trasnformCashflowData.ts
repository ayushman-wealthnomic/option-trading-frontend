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

interface Dataset {
  label: string;
  data: (number | null)[];
}

interface CashFlowResult {
  years: string[];
  datasets: Dataset[];
}

export function transformCashFlow(rows: CashFlowRow[] | undefined | RatiosRow[]): CashFlowResult {
  if (!rows?.length) return { years: [], datasets: [] };

  // 1️⃣ Sort rows by report_date ASC
  const sorted = [...rows].sort(
    (a, b) => new Date(a.report_date).getTime() - new Date(b.report_date).getTime()
  );

  // 2️⃣ Extract years
  const years = sorted.map((r) => r.report_date);

  // 3️⃣ Pick all metric keys (exclude id, stock_ticker, report_date)
  const exclude = ["id", "stock_ticker", "report_date"];
  const metricKeys = Object.keys(sorted[0]).filter((k) => !exclude.includes(k));

  // 4️⃣ Build datasets
  const datasets: Dataset[] = metricKeys.map((metric) => ({
    label: metric,
    data: sorted.map((row) => {
      const raw = (row as any)[metric];
      if (raw === "" || raw == null) return null;
      const num = Number(raw);
      return Number.isFinite(num) ? num : null;
    }),
  }));

  return { years, datasets };
}
