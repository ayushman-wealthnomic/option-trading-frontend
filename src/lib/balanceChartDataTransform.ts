// Type for dataset
type Dataset = {
  label: string;
  data: (number | null)[];
  color: string;
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

const chartColors: { background: string; border: string }[] = [
  { background: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 1)' },   // Cyan
  { background: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 1)' },   // Pink
  { background: 'rgba(163, 230, 53, 0.1)', border: 'rgba(163, 230, 53, 1)' },   // Lime
  { background: 'rgba(251, 146, 60, 0.1)', border: 'rgba(251, 146, 60, 1)' },   // Orange
  { background: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 1)' },   // Violet
  { background: 'rgba(244, 63, 94, 0.1)', border: 'rgba(244, 63, 94, 1)' },     // Rose
  { background: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 1)' },   // Emerald
  { background: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 1)' },   // Amber
  { background: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 1)' },   // Indigo
  { background: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 1)' },     // Red
];

export function transformBalanceChart(
  balanceChart: BalanceSheetRow[] | undefined
): { labels: string[]; datasets: Dataset[] } {
  if (!balanceChart || balanceChart.length === 0) {
    return { labels: [], datasets: [] };
  }

  // Step 1: labels from report_date
  const labels = balanceChart.map((row) => row.report_date);

  // Step 2: all numeric keys except id, stock_ticker, report_date
  const keys = Object.keys(balanceChart[0]).filter(
    (key) => !["id", "stock_ticker", "report_date"].includes(key)
  );

  // Step 3: build datasets using palette colors
  const datasets: Dataset[] = keys.map((key, idx) => {
    const typedKey = key as keyof BalanceSheetRow;
    const colorObj = chartColors[idx % chartColors.length]; // cycle if needed

    return {
      label: key,
      data: balanceChart.map((row) =>
        row[typedKey] !== null ? Number(row[typedKey]) : null
      ),
      color: colorObj.border, // use the solid color for lines/bars
    };
  });

  return { labels, datasets };
}
