type RawChartRow = {
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

type TransformedChartData = Record<string, Record<string, string>>;

export function transformChartData(rows: RawChartRow[]): TransformedChartData {
  const formatted: TransformedChartData = {};

  rows.forEach((row) => {
    const displayDate = row.report_date;

    formatted[displayDate] = {
      "Revenue": row.revenue,
      "Revenue Growth (YoY)": row.revenue_growth_yoy + "%",
      "Cost of Revenue": row.cost_of_revenue,
      "Gross Profit": row.gross_profit,
      "Selling, General & Admin": row.selling_general_admin,
      "Other Operating Expenses": row.other_operating_expenses,
      "Operating Expenses": row.operating_expenses,
      "Operating Income": row.operating_income,
      "Interest Income": row.interest_income,
      "Interest Expense": row.interest_expense,
      "Other Expense / Income": row.other_expense_income,
      "Pretax Income": row.pretax_income,
      "Income Tax": row.income_tax,
      "Net Income": row.net_income,
      "Net Income Growth": row.net_income_growth + "%",
      "Shares Outstanding (Basic)": row.shares_outstanding_basic,
      "Shares Outstanding (Diluted)": row.shares_outstanding_diluted,
      "Shares Change": row.shares_change + "%",
      "EPS (Basic)": row.eps_basic,
      "EPS (Diluted)": row.eps_diluted,
      "EPS Growth": row.eps_growth + "%",
      "Gross Margin": row.gross_margin + "%",
      "Operating Margin": row.operating_margin + "%",
      "Profit Margin": row.profit_margin + "%",
      "Effective Tax Rate": row.effective_tax_rate + "%",
      "EBITDA": row.ebitda,
      "EBITDA Margin": row.ebitda_margin + "%",
      "EBIT": row.ebit,
      "EBIT Margin": row.ebit_margin + "%"
    };
  });

  return formatted;
}

export function transformFinancialData(rawData: RawChartRow[] | undefined) {
  if (!rawData || rawData.length === 0) return [];

  // 1️⃣ Extract years from `report_date`
  const years = rawData.map(item =>
    item.report_date
  );

  // 2️⃣ Metrics mapping — all fields you listed
  const metrics = [
    { key: "revenue", label: "Revenue" },
    { key: "revenue_growth_yoy", label: "Revenue Growth YoY (%)" },
    { key: "cost_of_revenue", label: "Cost of Revenue" },
    { key: "gross_profit", label: "Gross Profit" },
    { key: "selling_general_admin", label: "Selling, General & Admin" },
    { key: "other_operating_expenses", label: "Other Operating Expenses" },
    { key: "operating_expenses", label: "Operating Expenses" },
    { key: "operating_income", label: "Operating Income" },
    { key: "interest_income", label: "Interest Income" },
    { key: "interest_expense", label: "Interest Expense" },
    { key: "other_expense_income", label: "Other Expense / Income" },
    { key: "pretax_income", label: "Pre-Tax Income" },
    { key: "income_tax", label: "Income Tax" },
    { key: "net_income", label: "Net Income" },
    { key: "net_income_growth", label: "Net Income Growth (%)" },
    { key: "shares_outstanding_basic", label: "Shares Outstanding (Basic)" },
    { key: "shares_outstanding_diluted", label: "Shares Outstanding (Diluted)" },
    { key: "shares_change", label: "Shares Change (%)" },
    { key: "eps_basic", label: "EPS (Basic)" },
    { key: "eps_diluted", label: "EPS (Diluted)" },
    { key: "eps_growth", label: "EPS Growth (%)" },
    { key: "gross_margin", label: "Gross Margin (%)" },
    { key: "operating_margin", label: "Operating Margin (%)" },
    { key: "profit_margin", label: "Profit Margin (%)" },
    { key: "effective_tax_rate", label: "Effective Tax Rate (%)" },
    { key: "ebitda", label: "EBITDA" },
    { key: "ebitda_margin", label: "EBITDA Margin (%)" },
    { key: "ebit", label: "EBIT" },
    { key: "ebit_margin", label: "EBIT Margin (%)" },
  ];

  // 3️⃣ Build rows
  const tableData = metrics.map(m => ({
  category: m.label,
  values: rawData.map(r =>
    r[m.key as keyof RawChartRow] !== undefined && r[m.key as keyof RawChartRow] !== null
      ? Number(r[m.key as keyof RawChartRow])
      : null
  ),
}));

  return { years, tableData };
}


