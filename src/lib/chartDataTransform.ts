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

