import React, { useEffect, useState } from 'react';
import { ChevronDown, BarChart3, Grid3X3, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';
import StockSidebar from '../../components/Technical/StockSidebar';


// Single Stock type
type Stock = {
  id: number;
  symbol: string;
  company_name: string;
  market_cap: number | null;
  industry: string | null;
  rev_growth: number | null;
  mc_group: string | null;
  pe_ratio: number | null;
  pb_ratio: number | null;
  earnings_yield: number | null;
  rsi: number | null;
  ma_50: number | null;
  ma_20_chg_pct: number | null;
  ma_200: number | null;
  ma_20: number | null;
  sector: string | null;
  eps: number | null;
  return_1y: number | null;
  return_5y: number | null;
  return_10y: number | null;
  return_1m: number | null;
  return_1w: number | null;
  return_3m: number | null;
  return_6m: number | null;
  return_ytd: number | null;
  return_3y: number | null;
  stock_price: number | null;
  pct_change: number | null;
  avg_volume: number | null;
  volume: number | null;
  lynch_fv: number | null;
  graham_pct: number | null;
  graham_no: number | null;
  lynch_pct: number | null;
  z_score: number | null;
  f_score: number | null;
};

// API Response type
type StockResponse = {
  page: number;
  page_size: number;
  total: number;
  page_count: number;
  sort_by: string;
  sort_dir: "asc" | "desc";
  items: Stock[];
};



const marketCaps = {
  "Mega Cap": "Mega-Cap",
  "Large Cap": "Large-Cap",
  "Mid Cap": "Mid-Cap",
  "Small Cap": "Small-Cap",
  "Micro Cap": "Micro-Cap",
  "Below 1B": "Below 1B",
  "Over 1B": "Over 1B",
  "Over 300M": "Over 300M",
  "Over 100M": "Over 100M"
};


const StockMarketDashboard: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    marketCap: '',
    sector: '',
    industry: '',
  });
  const [filters, setFilters] = useState<{ [key: string]: string | boolean }>({});
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // loader function (unchanged except return type safety)

  console.log(filters);

  const loadPage = async ({
    page = 1,
    pageSize = 25,
    sortBy = "market_cap",
    sortDir = "desc",
    search = "",
  }: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
    search?: string;
  }): Promise<StockResponse> => {
    const params = new URLSearchParams({
      page: String(page),
      page_size: String(pageSize),
      sort_by: sortBy,
      sort_dir: sortDir,
    });
    if (search) params.append("search", search);

    const res = await fetch(`https://13.61.67.248:8001/stocks?${params.toString()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch stocks");
    }
    return res.json();
  };

  // react fetch call
  const fetchStocks = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await loadPage({ page: pageNum, pageSize: 25 });

      // unwrap "__root__" field
      const normalizedItems = data.items.map((item: any) => item.__root__);

      let filteredItems = normalizedItems;

      if (selectedFilters.marketCap) {
        filteredItems = normalizedItems.filter(
          (stock) => stock.mc_group === selectedFilters.marketCap
        );
      }

      if (filters["sma-SMA 20"]) {
        const pos = filters["sma-SMA 20-pos"]; // "Above" or "Below"
        filteredItems = filteredItems.filter((stock) => {
          if (stock.stock_price === null || stock.ma_20 === null) return false;

          if (pos === "Above") return stock.stock_price > stock.ma_20;
          if (pos === "Below") return stock.stock_price < stock.ma_20;

          return true; // fallback, shouldn't hit
        });
      }

      // if (selectedFilters.sma20.enabled) {
      //   filteredItems = filteredItems.filter(
      //     (stock) => {
      //       if (!stock.ma_20) return false;
      //       return stock.ma_20 < selectedFilters.sma20.position;
      //     }
      //   );
      // }
      console.log(filteredItems);

      setStocks(filteredItems);
      setTotalPages(data.page_count);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    } finally {
      setLoading(false);
    }
  };


  // initial + on page change
  useEffect(() => {
    fetchStocks(page);
  }, [page, selectedFilters.marketCap, filters]);

  // Pagination helpers
  const goToFirstPage = () => setPage(1);
  const goToLastPage = () => setPage(totalPages);
  const goToPreviousPage = () => page > 1 && setPage(page - 1);
  const goToNextPage = () => page < totalPages && setPage(page + 1);
  const goToPage = (pageNum: number) => setPage(pageNum);

  const getVisiblePageNumbers = (): (number | string)[] => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return [...new Set(rangeWithDots)];
  };

  const getReturnColor = (returnValue?: string): string => {
    if (!returnValue) return "text-gray-400"; // default when value missing

    if (returnValue.startsWith("-")) {
      return "text-red-500";
    } else if (returnValue === "0.0%") {
      return "text-gray-400";
    }
    return "text-green-500";
  };

  function formatMarketCap(value?: number | string): string {
    if (!value || isNaN(Number(value))) return "-";

    const num = Number(value);

    if (num >= 1_000_000_000_000) {
      return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    } else if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(2)}K`;
    }

    return `$${num}`;
  }

  const Select = ({ value, onChange, children, className }: any) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`appearance-none w-full ${className}`}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-700 bg-black">
        {/* Filter Tabs */}
        <div className="flex space-x-8 mb-6">
          <div>
            <label className="block text-sm text-gray-300 mb-3 font-medium">
              Market Cap
            </label>
            <Select
              value={selectedFilters.marketCap}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedFilters({
                  ...selectedFilters,
                  marketCap: e.target.value // store API string directly
                })
              }
              className="bg-gray-800 border text-center border-gray-600 rounded-md px-10 py-2 text-white w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Market Caps</option> {/* empty string = no filter */}
              {Object.entries(marketCaps).map(([label, value]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-3 font-medium">Sector</label>
            <Select
              value={selectedFilters.sector}
              onChange={(e: any) => setSelectedFilters({ ...selectedFilters, sector: e.target.value })}
              className="bg-gray-800 border border-gray-600 rounded-md px-10 py-2 text-white w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Sectors</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-3 font-medium">Industry</label>
            <Select
              value={selectedFilters.industry}
              onChange={(e: any) => setSelectedFilters({ ...selectedFilters, industry: e.target.value })}
              className="bg-gray-800 border border-gray-600 rounded-md px-10 py-2 text-white w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Industries</option>
            </Select>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="bg-black border-gray-700 px-6 py-4 flex-shrink-0">
              <div className="flex items-center justify-baseline">
                {/* <div className="text-sm text-gray-400">
                  Page {page} of {totalPages} • Showing {stocks.length} results
                </div> */}

                <div className="flex items-center space-x-2">
                  {/* First Page */}
                  <button
                    onClick={goToFirstPage}
                    disabled={page === 1}
                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-gray-800 text-white transition-colors"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={page === 1}
                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-gray-800 text-white transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {getVisiblePageNumbers().map((pageNum, index) => (
                      <React.Fragment key={index}>
                        {pageNum === '...' ? (
                          <span className="px-3 py-2 text-sm text-gray-400">...</span>
                        ) : (
                          <button
                            onClick={() => goToPage(pageNum as number)}
                            className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded-md transition-colors ${page === pageNum
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500'
                              }`}
                          >
                            {pageNum}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Page */}
                  <button
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-gray-800 text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-gray-800 text-white transition-colors"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <span>Market Cap</span>
              <ChevronDown className="w-4 h-4" />
              <span className="text-gray-400">High to Low</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-blue-400 hover:bg-gray-800 rounded">
                <BarChart3 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded">
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 bg-black">
        {/* Stock Table - Horizontally Scrollable */}
        <div className="flex-1 bg-black h-screen overflow-hidden">
          {/* Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto overflow-y-auto h-full">
            <div className="min-w-max">
              {/* Table Header - Fixed */}
              <div className="bg-black sticky top-0 z-10 border-b border-gray-700">
                <div className="flex text-sm text-gray-400 px-6 py-4">
                  <div className="w-64 flex items-center font-medium">Company</div>
                  <div className="w-28 flex items-center font-medium">Market Cap</div>
                  <div className="w-32 flex items-center font-medium">Sector</div>
                  <div className="w-40 flex items-center font-medium">Industry</div>
                  <div className="w-24 flex items-center font-medium">MC Group</div>
                  <div className="w-20 flex items-center font-medium">PE Ratio</div>
                  <div className="w-20 flex items-center font-medium">PB Ratio</div>
                  <div className="w-16 flex items-center font-medium">EPS</div>
                  <div className="w-24 flex items-center font-medium">Earnings Yield</div>
                  <div className="w-16 flex items-center font-medium">RSI</div>
                  <div className="w-20 flex items-center font-medium">50 MA</div>
                  <div className="w-20 flex items-center font-medium">20 MA</div>
                  <div className="w-20 flex items-center font-medium">200 MA</div>
                  <div className="w-20 flex items-center font-medium">20MA Chg</div>
                  <div className="w-24 flex items-center font-medium">Rev Growth</div>
                  <div className="w-20 flex items-center font-medium">1W Return</div>
                  <div className="w-20 flex items-center font-medium">1M Return</div>
                  <div className="w-20 flex items-center font-medium">3M Return</div>
                  <div className="w-20 flex items-center font-medium">6M Return</div>
                  <div className="w-20 flex items-center font-medium">YTD Return</div>
                  <div className="w-20 flex items-center font-medium">1Y Return</div>
                  <div className="w-20 flex items-center font-medium">3Y Return</div>
                  <div className="w-20 flex items-center font-medium">5Y Return</div>
                  <div className="w-20 flex items-center font-medium">10Y Return</div>
                  <div className="w-20 flex items-center font-medium">Stock Price</div>
                  <div className="w-20 flex items-center font-medium">% Change</div>
                  <div className="w-24 flex items-center font-medium">Avg Volume</div>
                  <div className="w-20 flex items-center font-medium">Volume</div>
                  <div className="w-20 flex items-center font-medium">Lynch FV</div>
                  <div className="w-20 flex items-center font-medium">Graham %</div>
                  <div className="w-20 flex items-center font-medium">Graham No</div>
                  <div className="w-20 flex items-center font-medium">Lynch %</div>
                  <div className="w-16 flex items-center font-medium">Z-Score</div>
                  <div className="w-16 flex items-center font-medium">F-Score</div>
                </div>
              </div>

              {/* Stock Rows */}
              <div className="bg-black flex-1 min-h-0">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-gray-400">Loading stocks...</div>
                  </div>
                ) : (
                  stocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex px-6 py-4 border-b border-gray-800 hover:bg-slate-800/50 transition-colors"
                    >
                      {/* Company */}
                      <div className="w-64 flex items-center space-x-3">
                        {/* <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-6 h-6 bg-white rounded opacity-90"></div>
                        </div> */}
                        <div className="min-w-0">
                          <div className="text-white font-semibold text-sm">{stock.symbol}</div>
                          <div className="text-xs text-gray-400 ">{stock.company_name}</div>
                        </div>
                      </div>

                      {/* Market Cap */}
                      <div className="w-28 flex items-center text-white text-sm">
                        {formatMarketCap(stock.market_cap ?? undefined)}
                      </div>

                      {/* Sector */}
                      <div className="w-32 flex items-center text-white text-sm pr-2">{stock.sector || '-'}</div>

                      {/* Industry */}
                      <div className="w-40 flex items-center text-white text-sm pr-2">{stock.industry || '-'}</div>

                      {/* MC Group */}
                      <div className="w-24 flex items-center text-white text-sm">{stock.mc_group || '-'}</div>

                      {/* PE Ratio */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.pe_ratio || '-'}</div>

                      {/* PB Ratio */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.pb_ratio || '-'}</div>

                      {/* EPS */}
                      <div className="w-16 flex items-center text-white text-sm">{stock.eps || '-'}</div>

                      {/* Earnings Yield */}
                      <div className="w-24 flex items-center text-white text-sm">{stock.earnings_yield || '-'}</div>

                      {/* RSI */}
                      <div className="w-16 flex items-center text-white text-sm">{stock.rsi || '-'}</div>

                      {/* 50 MA */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.ma_50 || '-'}</div>

                      {/* 20 MA */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.ma_20 || '-'}</div>

                      {/* 200 MA */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.ma_200 || '-'}</div>

                      {/* 20 MA Change */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.ma_20_chg_pct ? `${stock.ma_20_chg_pct}%` : '-'}</div>

                      {/* Revenue Growth */}
                      <div
                        className={`w-24 flex items-center font-medium text-sm ${getReturnColor(stock.rev_growth?.toString() ?? undefined)}`}
                      >
                        {stock.rev_growth || '-'}
                      </div>

                      {/* 1W Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_1w?.toString() ?? undefined)}`}
                      >
                        {stock.return_1w || '-'}
                      </div>

                      {/* 1M Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_1m?.toString() ?? undefined)}`}
                      >
                        {stock.return_1m || '-'}
                      </div>

                      {/* 3M Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_3m?.toString() ?? undefined)}`}
                      >
                        {stock.return_3m || '-'}
                      </div>

                      {/* 6M Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_6m?.toString() ?? undefined)}`}
                      >
                        {stock.return_6m || '-'}
                      </div>

                      {/* YTD Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_ytd?.toString() ?? undefined)}`}
                      >
                        {stock.return_ytd || '-'}
                      </div>

                      {/* 1Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_1y?.toString() ?? undefined)}`}
                      >
                        {stock.return_1y || '-'}
                      </div>

                      {/* 3Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_3y?.toString() ?? undefined)}`}
                      >
                        {stock.return_3y || '-'}
                      </div>

                      {/* 5Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_5y?.toString() ?? undefined)}`}
                      >
                        {stock.return_5y || '-'}
                      </div>

                      {/* 10Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_10y?.toString() ?? undefined)}`}
                      >
                        {stock.return_10y || '-'}
                      </div>
                      <div className="w-20 flex items-center text-white text-sm">{stock.stock_price ?? '-'}</div>

                      {/* % Change */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.pct_change ? `${stock.pct_change}%` : '-'}</div>

                      {/* Avg Volume */}
                      <div className="w-24 flex items-center text-white text-sm">{stock.avg_volume ?? '-'}</div>

                      {/* Volume */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.volume ?? '-'}</div>

                      {/* Lynch FV */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.lynch_fv ?? '-'}</div>

                      {/* Graham % */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.graham_pct ? `${stock.graham_pct}%` : '-'}</div>

                      {/* Graham Number */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.graham_no ?? '-'}</div>

                      {/* Lynch % */}
                      <div className="w-20 flex items-center text-white text-sm">{stock.lynch_pct ? `${stock.lynch_pct}%` : '-'}</div>

                      {/* Z-Score */}
                      <div className="w-16 flex items-center text-white text-sm">{stock.z_score ?? '-'}</div>

                      {/* F-Score */}
                      <div className="w-16 flex items-center text-white text-sm">{stock.f_score ?? '-'}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}

        </div>

        {/* Right Sidebar */}
        <StockSidebar filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default StockMarketDashboard;