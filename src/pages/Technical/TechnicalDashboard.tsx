import React, { useEffect, useState } from 'react';
import { ChevronDown, BarChart3, Grid3X3, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';
import StockSidebar from '../../components/Technical/StockSidebar';
import { baseURL } from '@/lib/baseURL';
import { supabase } from '@/lib/supabase';

type Stock = {
  symbol: string;
  company_name: string;
  market_cap: number | null;
  industry: string | null;
  rev_growth?: string | null;       // e.g. "4.48%" (string since it has %)
  mc_group?: string | null;         // e.g. "Large-Cap"
  pe_ratio?: number | null;
  pb_ratio?: number | null;
  earnings_yield?: string | null;   // e.g. "3.43%"
  rsi?: number | null;
  "50_ma"?: number | null;
  "20ma_chg"?: string | null;       // e.g. "5.46%"
  "200_ma"?: number | null;
  "20_ma"?: number | null;
  sector?: string | null;
  eps?: number | null;

  // Returns (all percentages → keep string, since they contain %)
  return_1y?: string | null;
  return_5y?: string | null;
  return_10y?: string | null;
  return_1m?: string | null;
  return_1w?: string | null;
  return_3m?: string | null;
  return_6m?: string | null;
  return_ytd?: string | null;
  return_3y?: string | null;
};

const StockMarketDashboard: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    marketCap: 'Don\'t Show',
    sector: 'Don\'t Show',
    industry: 'Don\'t Show'
  });
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination constants
  const totalResults = 19702; // This should come from API response
  const resultsPerPage = 50; // Adjust based on your API
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const fetchStocks = async (pageNum: number) => {
    setLoading(true);
    const authToken = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token;
    };
    const res = await fetch(`${baseURL}/filterapp-data?page=${pageNum}`, {
      headers: {
        Authorization: `Bearer ${await authToken()}`,
        "Content-Type": "application/json",
      },
    });
    const data: Stock[] = await res.json();
    setStocks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStocks(page); // load initial page
  }, [page]);

  console.log(stocks);

  // Pagination functions
  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPage = (pageNum: number) => {
    setPage(pageNum);
  };

  const getVisiblePageNumbers = (): (number | string)[] => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots.filter((page, index, array) => array.indexOf(page) === index);
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
            <label className="block text-sm text-gray-300 mb-3 font-medium">Market Cap</label>
            <Select
              value={selectedFilters.marketCap}
              onChange={(e: any) => setSelectedFilters({ ...selectedFilters, marketCap: e.target.value })}
              className="bg-gray-800 border text-center border-gray-600 rounded-md px-10 py-2 text-white w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Market Caps</option>
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
                          <div className="text-blue-400 font-semibold text-sm">{stock.symbol}</div>
                          <div className="text-xs text-gray-400 truncate">{stock.company_name}</div>
                        </div>
                      </div>

                      {/* Market Cap */}
                      <div className="w-28 flex items-center text-white text-sm">
                        {formatMarketCap(stock.market_cap ?? undefined)}
                      </div>

                      {/* Sector */}
                      <div className="w-32 flex items-center text-white text-sm truncate pr-2">{stock.sector || '-'}</div>

                      {/* Industry */}
                      <div className="w-40 flex items-center text-white text-sm truncate pr-2">{stock.industry || '-'}</div>

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
                      <div className="w-20 flex items-center text-white text-sm">{stock["50_ma"] || '-'}</div>

                      {/* 20 MA */}
                      <div className="w-20 flex items-center text-white text-sm">{stock["20_ma"] || '-'}</div>

                      {/* 200 MA */}
                      <div className="w-20 flex items-center text-white text-sm">{stock["200_ma"] || '-'}</div>

                      {/* 20 MA Change */}
                      <div className="w-20 flex items-center text-white text-sm">{stock["20ma_chg"] || '-'}</div>

                      {/* Revenue Growth */}
                      <div
                        className={`w-24 flex items-center font-medium text-sm ${getReturnColor(stock.rev_growth ?? undefined)}`}
                      >
                        {stock.rev_growth || '-'}
                      </div>

                      {/* 1W Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_1w ?? undefined)}`}
                      >
                        {stock.return_1w || '-'}
                      </div>

                      {/* 1M Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_1m ?? undefined)}`}
                      >
                        {stock.return_1m || '-'}
                      </div>

                      {/* 3M Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_3m ?? undefined)}`}
                      >
                        {stock.return_3m || '-'}
                      </div>

                      {/* 6M Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_6m ?? undefined)}`}
                      >
                        {stock.return_6m || '-'}
                      </div>

                      {/* YTD Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_ytd ?? undefined)}`}
                      >
                        {stock.return_ytd || '-'}
                      </div>

                      {/* 1Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_1y ?? undefined)}`}
                      >
                        {stock.return_1y || '-'}
                      </div>

                      {/* 3Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_3y ?? undefined)}`}
                      >
                        {stock.return_3y || '-'}
                      </div>

                      {/* 5Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_5y ?? undefined)}`}
                      >
                        {stock.return_5y || '-'}
                      </div>

                      {/* 10Y Return */}
                      <div
                        className={`w-20 flex items-center font-medium text-sm ${getReturnColor(stock.return_10y ?? undefined)}`}
                      >
                        {stock.return_10y || '-'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}

        </div>

        {/* Right Sidebar */}
        <StockSidebar />
      </div>
    </div>
  );
};

export default StockMarketDashboard;