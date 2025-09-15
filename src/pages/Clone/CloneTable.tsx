import Navigation from '@/components/Landing/Navigation';
import { baseURL } from '@/lib/baseURL';
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, Loader, Search, X } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface Stock {
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

interface APIResponse {
    data: Stock[];
}

const CloneTable: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages,] = useState(47);
    const [page, setPage] = useState(1);
    const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Stock; direction: "asc" | "desc" } | null>({ key: "totalscore", direction: "asc" });
    const navigate = useNavigate();

    const loadPage = async ({
        page = 1,
        sortBy,
        order,
    }: {
        page?: number;
        sortBy?: keyof Stock;
        order?: "asc" | "desc";
    }): Promise<APIResponse> => {
        const params = new URLSearchParams({ page: String(page) });
        if (sortBy) params.set("sortBy", sortBy);
        if (order) params.set("order", order);

        const res = await fetch(`${baseURL}/clone-stock-data?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch stocks");
        return res.json();
    };


    // react fetch call
    const fetchStocks = async (pageNum: number, config?: typeof sortConfig) => {
        setLoading(true);
        try {
            const data = await loadPage({
                page: pageNum,
                sortBy: config?.key,
                order: config?.direction,
            });
            setStocks(data.data);
        } catch (err) {
            console.error("Error fetching stocks:", err);
        } finally {
            setLoading(false);
        }
    };

    const filterStocks = useCallback(() => {
        if (!searchQuery.trim()) {
            setFilteredStocks(stocks);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        const filtered = stocks.filter(stock =>
            stock.ticker.toLowerCase().includes(query) ||
            stock.company_name.toLowerCase().includes(query) ||
            stock.sector.toLowerCase().includes(query) ||
            stock.industry.toLowerCase().includes(query)
        );
        setFilteredStocks(filtered);
    }, [stocks, searchQuery]);

    useEffect(() => {
        filterStocks();
    }, [filterStocks]);



    // initial + on page change
    useEffect(() => {
        fetchStocks(page, sortConfig);
    }, [page, sortConfig]);

    const handleSort = (key: keyof Stock) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };



    const formatNumber = (value: number | null | undefined, decimals: number = 1): string => {
        if (value == null) return "-";
        return value.toFixed(decimals);
    };


    const formatPercent = (value: number | null | undefined, decimals: number = 1): string => {
        if (value == null) return '-';
        return `${formatNumber(value, decimals)}%`;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };


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

    if (loading) {
        return <div className="flex justify-center items-center h-full">
            <Loader className={`w-6 h-6 animate-spin text-white`} />
        </div>;
    }

    console.log(sortConfig);


    return (
        <div className='bg-black'>
            <Navigation />
            <h2 className="text-7xl lg:text-8xl font-medium mb-4 text-center mt-20">STOCK Analysis</h2>
            <div className="flex justify-center px-6 mt-8 mb-6">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by ticker, company, sector, or industry..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-transparent"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <X className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col flex-1 bg-black px-30 mt-20">
                <div className="flex-1 bg-black h-screen overflow-hidden">
                    <div className="overflow-x-auto overflow-y-auto h-full border-r border-l border-gray-700">
                        <div className="min-w-max text-left">
                            <div className="bg-black sticky top-0 z-10 border border-gray-700">
                                <div className="flex text-sm text-white px-6 py-4">
                                    <div className="w-40 text-[#FF5D00] flex items-center justify-baseline font-medium">Company</div>
                                    <div className="w-24 text-[#FF5D00] flex items-center justify-center font-medium"></div>
                                    <div className="w-40 text-[#FF5D00] flex items-center justify-baseline font-medium">Sector</div>
                                    <div className="w-40 text-[#FF5D00] flex items-center justify-baseline font-medium">Industry</div>
                                    <div className="w-24 text-[#FF5D00] flex items-center justify-center font-medium">Years</div>
                                    <div className="w-24 text-[#FF5D00] flex items-center justify-center font-medium">Window</div>
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("totalscore")}
                                    >
                                        Total Score
                                        {sortConfig?.key === "totalscore" && (
                                            <span className="ml-1 text-white">{sortConfig.direction === "asc" ? <ChevronUp className='w-3 h-3' /> : <ChevronDown className='w-3 h-3' />}</span>
                                        )}
                                    </div>
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("quality")}
                                    >
                                        Quality
                                        {sortConfig?.key === "quality" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("consistency")}
                                    >
                                        Consistency
                                        {sortConfig?.key === "consistency" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none pl-5"
                                        onClick={() => handleSort("conservatism")}
                                    >
                                        Conservatism
                                        {sortConfig?.key === "conservatism" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("ownerearnings")}
                                    >
                                        OE
                                        {sortConfig?.key === "ownerearnings" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    {/* ROE Avg */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("roe_avg")}
                                    >
                                        ROE Avg
                                        {sortConfig?.key === "roe_avg" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* ROIC Avg */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("roic_avg")}
                                    >
                                        ROIC Avg
                                        {sortConfig?.key === "roic_avg" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* Net Margin */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("netmargin_avg")}
                                    >
                                        Net Margin
                                        {sortConfig?.key === "netmargin_avg" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* FCF Rate */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("pos_fcf_rate")}
                                    >
                                        FCF Rate
                                        {sortConfig?.key === "pos_fcf_rate" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* Earn Rate */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("pos_earnings_rate")}
                                    >
                                        Earn Rate
                                        {sortConfig?.key === "pos_earnings_rate" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* Current Ratio */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("currentratio")}
                                    >
                                        Current Ratio
                                        {sortConfig?.key === "currentratio" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* D/E */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("debt_equity_x")}
                                    >
                                        D/E
                                        {sortConfig?.key === "debt_equity_x" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* D/Earn */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("debt_earnings_x")}
                                    >
                                        D/Earn
                                        {sortConfig?.key === "debt_earnings_x" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* D/FCF */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("debt_fcf_x")}
                                    >
                                        D/FCF
                                        {sortConfig?.key === "debt_fcf_x" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* Shares CAGR */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("shares_cagr")}
                                    >
                                        Shares CAGR
                                        {sortConfig?.key === "shares_cagr" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* FCF CAGR */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("fcf_cagr")}
                                    >
                                        FCF CAGR
                                        {sortConfig?.key === "fcf_cagr" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* FCF Margin */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("fcf_margin_latest")}
                                    >
                                        FCF Margin
                                        {sortConfig?.key === "fcf_margin_latest" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    {/* Payout Ratio */}
                                    <div
                                        className="w-24 text-[#FF5D00] flex items-center justify-center font-medium cursor-pointer select-none"
                                        onClick={() => handleSort("payout_ratio_latest")}
                                    >
                                        Payout Ratio
                                        {sortConfig?.key === "payout_ratio_latest" && (
                                            <span className="ml-1">
                                                {sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="w-3 h-3" />
                                                ) : (
                                                    <ChevronDown className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            </div>

                            <div className="bg-black flex-1 min-h-0">
                                {loading ? (
                                    <div className="flex items-center justify-center h-screen">
                                        <div className="text-gray-400">Loading stocks...</div>
                                    </div>
                                ) : (
                                    filteredStocks.map((stock: Stock) => (
                                        <div
                                            key={stock.ticker}
                                            className="flex px-6 py-4 border border-gray-800 transition-colors"
                                        >
                                            <div className="w-40 flex items-center space-x-3">
                                                <div className="min-w-0">
                                                    <div className="text-white font-semibold text-sm">{stock.ticker}</div>
                                                    <div className="text-xs text-gray-400-">{stock.company_name}</div>
                                                </div>
                                            </div>
                                            <div className='w-24 pl-2 flex items-center justify-baseline'>
                                                <button className='bg-[#fc701f] p-1 rounded z-50 cursor-pointer hover:scale-105' onClick={() => navigate(`/clone/${stock.ticker}`)}><ArrowUpRight className='text-2xl' /></button>
                                            </div>
                                            <div className="w-40 flex items-center justify-baseline text-left text-white text-sm pr-2">
                                                {stock.sector || '-'}
                                            </div>

                                            <div className="w-40 flex items-center justify-baseline text-left text-white text-sm pr-2">
                                                {stock.industry || '-'}
                                            </div>
                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {stock.yearsused}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {stock.window}
                                            </div>
                                            <div className={`w-24 flex items-center justify-center font-medium text-sm`}>
                                                {formatNumber(stock.totalscore)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm`}>
                                                {formatNumber(stock.quality)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm`}>
                                                {formatNumber(stock.consistency)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm`}>
                                                {formatNumber(stock.conservatism)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm`}>
                                                {formatNumber(stock.ownerearnings)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatPercent(stock.roe_avg)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatPercent(stock.roic_avg)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatPercent(stock.netmargin_avg)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm}`}>
                                                {formatPercent(stock.pos_fcf_rate)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm}`}>
                                                {formatPercent(stock.pos_earnings_rate)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatNumber(stock.currentratio, 2)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatNumber(stock.debt_equity_x, 2)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatNumber(stock.debt_earnings_x, 1)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatNumber(stock.debt_fcf_x, 1)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm}`}>
                                                {formatPercent(stock.shares_cagr)}
                                            </div>

                                            <div className={`w-24 flex items-center justify-center font-medium text-sm}`}>
                                                {formatPercent(stock.fcf_cagr)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatPercent(stock.fcf_margin_latest)}
                                            </div>

                                            <div className="w-24 flex items-center justify-center text-white text-sm">
                                                {formatPercent(stock.payout_ratio_latest)}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                </div>
                <div className="flex items-center space-x-6">
                    <div className="bg-black border-gray-700 px-6 py-4 flex-shrink-0">
                        <div className="flex items-center justify-baseline">
                            <div className="flex items-center space-x-2">
                                {/* First Page */}
                                <button
                                    onClick={goToFirstPage}
                                    disabled={page === 1}
                                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-black text-white transition-colors"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </button>
                                {/* Previous Page */}
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={page === 1}
                                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-black text-white transition-colors"
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
                                                        ? 'bg-white border-white text-black'
                                                        : 'border-gray-600 bg-black text-white hover:bg-gray-800 hover:border-gray-500'
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
                                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-black text-white transition-colors"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                                {/* Last Page */}
                                <button
                                    onClick={goToLastPage}
                                    disabled={page === totalPages}
                                    className="inline-flex items-center justify-center w-8 h-8 text-sm border border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 hover:border-gray-500 bg-black text-white transition-colors"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloneTable;