import Navigation from '@/components/Landing/Navigation';
import { baseURL } from '@/lib/baseURL';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    const loadPage = async ({
        page = 1,
    }: {
        page?: number;
    }): Promise<APIResponse> => {
        const params = new URLSearchParams({
            page: String(page),
        });
        const res = await fetch(`${baseURL}/clone-stock-data?${params.toString()}`);
        if (!res.ok) {
            throw new Error("Failed to fetch stocks");
        }
        return res.json();
    };

    // react fetch call
    const fetchStocks = async (pageNum: number) => {
        setLoading(true);
        try {
            const data = await loadPage({ page: pageNum });

            setStocks(data.data);
        } catch (err) {
            console.error("Error fetching stocks:", err);
        } finally {
            setLoading(false);
        }
    };


    // initial + on page change
    useEffect(() => {
        fetchStocks(page);
        console.log(stocks);

    }, [page]);


    const formatNumber = (value: number | null | undefined, decimals: number = 1): string => {
        if (value == null) return "-";
        return value.toFixed(decimals);
    };


    const formatPercent = (value: number | null | undefined, decimals: number = 1): string => {
        if (value == null) return '-';
        return `${formatNumber(value, decimals)}%`;
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

    return (
        <div className='bg-black'>
            <Navigation />
            <div className="flex flex-col flex-1 bg-black">
                <div className="flex-1 bg-black h-screen overflow-hidden">
                    <div className="overflow-x-auto overflow-y-auto h-full">
                        <div className="min-w-max text-left">
                            <div className="bg-black sticky top-0 z-10 border-b border-gray-700">
                                <div className="flex text-sm text-white px-6 py-4">
                                    <div className="w-64 flex items-center font-medium">Company</div>
                                    <div className="w-32 flex items-center font-medium">Sector</div>
                                    <div className="w-40 flex items-center font-medium">Industry</div>
                                    <div className="w-20 flex items-center font-medium">Years</div>
                                    <div className="w-20 flex items-center font-medium">Window</div>
                                    <div className="w-24 flex items-center font-medium">Total Score</div>
                                    <div className="w-20 flex items-center font-medium">Quality</div>
                                    <div className="w-24 flex items-center font-medium">Consistency</div>
                                    <div className="w-24 flex items-center font-medium">Conservatism</div>
                                    <div className="w-24 flex items-center font-medium">Owner Earn</div>
                                    <div className="w-20 flex items-center font-medium">ROE Avg</div>
                                    <div className="w-20 flex items-center font-medium">ROIC Avg</div>
                                    <div className="w-24 flex items-center font-medium">Net Margin</div>
                                    <div className="w-24 flex items-center font-medium">FCF Rate</div>
                                    <div className="w-24 flex items-center font-medium">Earn Rate</div>
                                    <div className="w-24 flex items-center font-medium">Current Ratio</div>
                                    <div className="w-20 flex items-center font-medium">D/E</div>
                                    <div className="w-20 flex items-center font-medium">D/Earn</div>
                                    <div className="w-20 flex items-center font-medium">D/FCF</div>
                                    <div className="w-24 flex items-center font-medium">Shares CAGR</div>
                                    <div className="w-20 flex items-center font-medium">FCF CAGR</div>
                                    <div className="w-24 flex items-center font-medium">FCF Margin</div>
                                    <div className="w-24 flex items-center font-medium">Payout Ratio</div>
                                </div>
                            </div>

                            <div className="bg-black flex-1 min-h-0">
                                {loading ? (
                                    <div className="flex items-center justify-center h-screen">
                                        <div className="text-gray-400">Loading stocks...</div>
                                    </div>
                                ) : (
                                    stocks.map((stock: Stock) => (
                                        <Link to={`/clone/${stock.ticker}`}
                                            key={stock.ticker}
                                            className="flex px-6 py-4 border-b border-gray-800 hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className="w-64 flex items-center space-x-3">
                                                <div className="min-w-0">
                                                    <div className="text-white font-semibold text-sm">{stock.ticker}</div>
                                                    <div className="text-xs text-gray-400 truncate">{stock.company_name}</div>
                                                </div>
                                            </div>
                                            <div className="w-32 flex items-center text-white text-sm pr-2">
                                                {stock.sector || '-'}
                                            </div>

                                            <div className="w-40 flex items-center text-white text-sm pr-2">
                                                {stock.industry || '-'}
                                            </div>
                                            <div className="w-20 flex items-center text-white text-sm">
                                                {stock.yearsused}
                                            </div>

                                            <div className="w-20 flex items-center text-white text-sm">
                                                {stock.window}
                                            </div>

                                            <div className={`w-24 flex items-center font-medium text-sm`}>
                                                {formatNumber(stock.totalscore)}
                                            </div>

                                            <div className={`w-20 flex items-center font-medium text-sm`}>
                                                {formatNumber(stock.quality)}
                                            </div>

                                            <div className={`w-24 flex items-center font-medium text-sm`}>
                                                {formatNumber(stock.consistency)}
                                            </div>

                                            <div className={`w-24 flex items-center font-medium text-sm`}>
                                                {formatNumber(stock.conservatism)}
                                            </div>

                                            <div className={`w-24 flex items-center font-medium text-sm`}>
                                                {formatNumber(stock.ownerearnings)}
                                            </div>

                                            <div className="w-20 flex items-center text-white text-sm">
                                                {formatPercent(stock.roe_avg)}
                                            </div>

                                            <div className="w-20 flex items-center text-white text-sm">
                                                {formatPercent(stock.roic_avg)}
                                            </div>

                                            <div className="w-24 flex items-center text-white text-sm">
                                                {formatPercent(stock.netmargin_avg)}
                                            </div>

                                            <div className={`w-24 flex items-center font-medium text-sm}`}>
                                                {formatPercent(stock.pos_fcf_rate)}
                                            </div>

                                            <div className={`w-24 flex items-center font-medium text-sm}`}>
                                                {formatPercent(stock.pos_earnings_rate)}
                                            </div>

                                            <div className="w-24 flex items-center text-white text-sm">
                                                {formatNumber(stock.currentratio, 2)}
                                            </div>

                                            <div className="w-20 flex items-center text-white text-sm">
                                                {formatNumber(stock.debt_equity_x, 2)}
                                            </div>

                                            <div className="w-20 flex items-center text-white text-sm">
                                                {formatNumber(stock.debt_earnings_x, 1)}
                                            </div>

                                            <div className="w-20 flex items-center text-white text-sm">
                                                {formatNumber(stock.debt_fcf_x, 1)}
                                            </div>

                                            <div className={`w-24 flex items-center font-medium text-sm}`}>
                                                {formatPercent(stock.shares_cagr)}
                                            </div>

                                            <div className={`w-20 flex items-center font-medium text-sm}`}>
                                                {formatPercent(stock.fcf_cagr)}
                                            </div>

                                            <div className="w-24 flex items-center text-white text-sm">
                                                {formatPercent(stock.fcf_margin_latest)}
                                            </div>

                                            <div className="w-24 flex items-center text-white text-sm">
                                                {formatPercent(stock.payout_ratio_latest)}
                                            </div>
                                        </Link>
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