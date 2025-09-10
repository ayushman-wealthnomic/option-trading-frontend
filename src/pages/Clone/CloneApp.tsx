import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import stockList from '../../../data/in_tickers.json'
import { baseURL } from '@/lib/baseURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import Navigation from '@/components/Landing/Navigation';
import CloneCharts from './CloneChart';

interface StockMetrics {
    ticker: string;
    yearsused: string;
    window: string;
    totalscore: number;
    quality: number;
    consistency: number;
    conservatism: number;
    ownerearnings: number;
    roe_avg: number;
    roic_avg: number;
    netmargin_avg: number;
    pos_fcf_rate: number;
    pos_earnings_rate: number;
    currentratio: number;
    debt_equity_x: number;
    debt_earnings_x: number;
    debt_fcf_x: number;
    shares_cagr: number;
    fcf_cagr: number;
    fcf_margin_latest: number;
    payout_ratio_latest: number;
    company_name: string;
    industry: string;
    sector: string;
}

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


type StockFinancialData = {
    id: number;
    stock_ticker: string;
    report_date: string; // ISO date string
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

interface ApiResponse {
    data: StockMetrics[];
    chartData: StockFinancialData[],
    balanceChart: BalanceSheetRow[],
    cashFlowData: CashFlowRow[],
    ratiosData: RatiosRow[],
}


interface FinancialMetrics {
    roe: number;
    roic: number;
    positiveFcfYears: number;
    netMargin: number;
    positiveEarningsYears: number;
    currentRatio: number;
    debtEquity: number;
    debtEarnings: number;
    fcfCagr: number;
    sharesCagr: number;
    fcfMargin: number;
    payoutRatio: number;
    totalScore: number;
    quality: number;
    conservatism: number;
    ownerEarnings: number;
    consistency: number;
}

interface DashboardProps {
    data?: FinancialMetrics;
}


const CloneDashboard: React.FC<DashboardProps> = () => {
    const { urlTicker } = useParams();
    const [loading, setLoading] = useState(false);
    const [incomeStockData, setIncomeStockData] = useState<StockFinancialData[]>();
    const [balanceStockData, setBalanceStockData] = useState<BalanceSheetRow[]>();
    const [cashFlowData, setCashFlowData] = useState<CashFlowRow[]>();
    const [ratiosData, setRatiosData] = useState<RatiosRow[]>();
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState<StockMetrics[]>();
    const [selectedMethod, setSelectedMethod] = useState('Warren Buffet');
    const [selectedStock, setSelectedStock] = useState<string>("AEGISLOG");
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStocks, setFilteredStocks] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseURL}/clone-stock-data/${urlTicker}`);
                if (!res.ok) throw new Error("Failed to fetch data");
                const json: ApiResponse = await res.json();
                setIncomeStockData(json.chartData)
                setBalanceStockData(json.balanceChart);
                setCashFlowData(json.cashFlowData);
                setRatiosData(json.ratiosData);
                setMetrics(json.data);
            } catch (err: any) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        };

        fetchData()
    }, [urlTicker]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            // Show first 30 stocks when no search query
            const allStocks = Object.keys(stockList).slice(0, 50);
            setFilteredStocks(allStocks);
            return;
        }

        const q = searchQuery.toLowerCase();

        // Search by ticker OR full company name
        const matches = Object.entries(stockList)
            .filter(([ticker, fullName]) =>
                ticker.toLowerCase().includes(q) || fullName.toLowerCase().includes(q)
            )
            .map(([ticker]) => ticker) // only keep ticker for UI
            .slice(0, 50);

        setFilteredStocks(matches);
    }, [searchQuery]);

    const handleStockSelect = (ticker: string) => {
        navigate(`/clone/${ticker}`);
        setSearchQuery('');
        setSelectedStock(ticker)
        // setFilteredStocks([]);
        setOpen(false);
    };

    const formatValue = (value: number, suffix: string = '%', decimals: number = 2): string => {
        if (value == null) return "-";
        if (suffix === 'x') {
            return `${value.toFixed(decimals)}x`;
        }
        return `${value.toFixed(decimals)}${suffix}`;
    };

    return (
        <>
            <Navigation />
            <div className="bg-black text-white min-h-screen p-6 md:p-10 lg:px-30">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-6 mb-8">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={`justify-between`}
                            >
                                {selectedStock
                                    ? `${selectedStock}: ${stockList[selectedStock as keyof typeof stockList]}`
                                    : "Select stock..."}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-0 bg-black">
                            <div className="p-3">
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search stock..."
                                    className="w-full border-none shadow-none focus:border-none focus:shadow-none focus:ring-0"
                                />
                                {/* Dropdown with results */}
                                {filteredStocks.length > 0 && (
                                    <div className="mt-1 w-full bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
                                        {filteredStocks.map((ticker) => (
                                            <div
                                                key={ticker}
                                                className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                                                onClick={() => handleStockSelect(ticker)}
                                            >
                                                {ticker}: {stockList[ticker as keyof typeof stockList]}

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <span className="text-white text-lg">Select Methodology</span>
                        <select
                            value={selectedMethod}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="text-white border-2 border-gray-600 px-4 py-2 rounded bg-black"
                        >
                            <option>Warren Buffet</option>
                            <option>Peter Lynch</option>
                            <option>Benjamin Graham</option>
                        </select>
                    </div>
                </div>



                {/* Company Header */}
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Loader
                            className={`w-6 h-6 animate-spin`}
                        />
                    </div>
                ) : (
                    metrics && (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-light mb-4">{metrics ? metrics[0].company_name : "-"}</h1>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-md">
                                    <div>
                                        <span className="text-orange-500 mr-2">Industry</span>
                                        <span className="text-gray-300">{metrics ? metrics[0].industry : "-"}</span>
                                    </div>
                                    <div>
                                        <span className="text-orange-500 mr-2">Sector</span>
                                        <span className="text-gray-300">{metrics ? metrics[0].sector : "-"}</span>
                                    </div>
                                    <div>
                                        <span className="text-orange-500 mr-2">Symbol</span>
                                        <span className="text-gray-300">{metrics ? metrics[0].ticker : "-"}</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 mt-4 max-w-4xl text-sm md:text-md leading-relaxed">
                                    Dr. Lal PathLabs Limited operates laboratories for carrying out pathological investigations in India and internationally.
                                    The company provides pathological investigations of various branches of bio-chemistry, hematology, histopathology,
                                    microbiology, electrophoresis, immuno-chemistry, immunology, virology, cytology, and other pathological and radiological
                                    investigations. It also offers phlebotomist training programs. The company was founded in 1949 and is based in Gurugram, India.
                                </p>
                            </div>
                            {/* Top metrics grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-16">
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].roe_avg)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">ROE (avg)</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].roic_avg)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">ROIC (avg)</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].pos_fcf_rate, "%", 1)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">
                                        Positive FCF Years
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].netmargin_avg, "%", 1)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">
                                        Net Margin (avg)
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].pos_earnings_rate, "%", 1)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">
                                        Positive Earnings Years
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].currentratio, "x")}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">Current Ratio</div>
                                </div>
                                <div className="text-center bg-[#090909] py-5">
                                    <div className="text-4xl md:text-6xl font-medium text-white mb-1">
                                        {metrics[0].totalscore}
                                    </div>
                                    <div className="text-cyan-400 text-lg md:text-2xl">Total Score</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].debt_equity_x, "x")}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">Debt/Equity</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].debt_earnings_x, "x")}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">Debt/Earnings</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].fcf_cagr)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">FCF CAGR</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].shares_cagr, "%", 1)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">Shares CAGR</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].fcf_margin_latest)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">FCF Margin</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-medium mb-1">
                                        {formatValue(metrics[0].payout_ratio_latest)}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-md">Payout Ratio</div>
                                </div>
                                <div />
                            </div>

                            {/* Bottom metrics cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                <div className="flex items-start bg-[#090909] p-6">
                                    <div className="text-4xl md:text-6xl font-light mt-2 md:mt-6 mr-4 md:mr-6">
                                        {Math.round(metrics[0].quality)}
                                    </div>
                                    <div className="max-w-56">
                                        <h3 className="text-blue-400 text-lg md:text-2xl">Quality</h3>
                                        <p className="text-gray-400 text-sm md:text-md">
                                            How efficiently the company turns profits from its capital and
                                            operations.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start bg-[#090909] p-6">
                                    <div className="text-4xl md:text-6xl font-light mt-2 md:mt-6 mr-4 md:mr-6">
                                        {Math.round(metrics[0].conservatism)}
                                    </div>
                                    <div className="max-w-56">
                                        <h3 className="text-green-400 text-lg md:text-2xl mb-2">
                                            Conservatism
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-md">
                                            Shows how stable and predictable the company's earnings and cash
                                            flow are over time.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start bg-[#090909] p-6">
                                    <div className="text-4xl md:text-6xl font-light mt-2 md:mt-6 mr-4 md:mr-6">
                                        {Math.round(metrics[0].ownerearnings)}
                                    </div>
                                    <div className="max-w-56">
                                        <h3 className="text-orange-400 text-lg md:text-2xl mb-2">
                                            Owner Earnings
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-md">
                                            Checks balance sheet strength, debt levels, and shareholder-friendly practices.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start bg-[#090909] p-6">
                                    <div className="text-4xl md:text-6xl font-light mt-2 md:mt-6 mr-4 md:mr-6">
                                        {Math.round(metrics[0].consistency)}
                                    </div>
                                    <div className="max-w-56">
                                        <h3 className="text-red-400 text-lg md:text-2xl mb-2">Consistency</h3>
                                        <p className="text-gray-400 text-sm md:text-md">
                                            Estimates the real cash left for shareholders after expenses,
                                            debt, and reinvestments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                )}


                {incomeStockData && <CloneCharts chartData={incomeStockData} balanceChart={balanceStockData} cashFlowData={cashFlowData} ratiosData={ratiosData} />}


            </div>
        </>
    );
};

export default CloneDashboard;
