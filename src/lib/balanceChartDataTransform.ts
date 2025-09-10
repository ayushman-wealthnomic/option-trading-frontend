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

// Example color generator (so each label gets a unique color)
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function transformBalanceChart(balanceChart: BalanceSheetRow[] | undefined): {
  labels: string[];
  datasets: Dataset[];
} {
  if (!balanceChart || balanceChart.length === 0) {
    return { labels: [], datasets: [] };
  }

  // Step 1: labels → from report_date
  const labels = balanceChart.map((row) => row.report_date);

  // Step 2: pick all keys except id, stock_ticker, report_date
  const keys = Object.keys(balanceChart[0]).filter(
    (key) => !["id", "stock_ticker", "report_date"].includes(key)
  );

  // Step 3: build datasets
  const datasets: Dataset[] = keys.map((key) => {
  const typedKey = key as keyof BalanceSheetRow;

  return {
    label: key,
    data: balanceChart.map((row) =>
      row[typedKey] !== null ? Number(row[typedKey]) : null
    ),
    color: getRandomColor(), // or use a fixed color map
  };
});

  return { labels, datasets };
}
