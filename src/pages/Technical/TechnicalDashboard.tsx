import React, { useState } from 'react';
import { Star, Info, ChevronDown, BarChart3, Grid3X3 } from 'lucide-react';
import StockSidebar from '../../components/Technical/StockSidebar';

interface StockData {
    symbol: string;
    company: string;
    logoColor: string;
    lastPrice: string;
    return7D: string;
    return1Y: string;
    marketCap: string;
    analystTarget: string;
    valuation: string;
    growth: string;
    divYield: string;
    isFavorite?: boolean;
}

const StockMarketDashboard: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        marketCap: 'Don\'t Show',
        sector: 'Don\'t Show',
        industry: 'Don\'t Show'
    });

    const stockData: StockData[] = [
        {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        }, {
            symbol: 'KAP',
            company: 'National Atomic Compan...',
            logoColor: 'bg-green-500',
            lastPrice: 'US$46.00',
            return7D: '4.1%',
            return1Y: '24.5%',
            marketCap: 'US$6.5t',
            analystTarget: 'US$52.85',
            valuation: 'PE 10.8x',
            growth: 'E 10.2%',
            divYield: '5.0%'
        },
        {
            symbol: 'NVDA',
            company: 'NVIDIA',
            logoColor: 'bg-green-500',
            lastPrice: 'US$174.18',
            return7D: '-4.2%',
            return1Y: '61.3%',
            marketCap: 'US$4.2t',
            analystTarget: 'US$206.03',
            valuation: 'PE 48.9x',
            growth: 'E 21.9%',
            divYield: '0.02%'
        },
        {
            symbol: 'MSFT',
            company: 'Microsoft',
            logoColor: 'bg-yellow-500',
            lastPrice: 'US$506.69',
            return7D: '0.0%',
            return1Y: '28.8%',
            marketCap: 'US$3.8t',
            analystTarget: 'US$613.89',
            valuation: 'PE 37x',
            growth: 'E 12.7%',
            divYield: '0.7%'
        },
        {
            symbol: 'AAPL',
            company: 'Apple',
            logoColor: 'bg-red-500',
            lastPrice: 'US$232.14',
            return7D: '1.2%',
            return1Y: '4.2%',
            marketCap: 'US$3.4t',
            analystTarget: 'US$235.00',
            valuation: 'PE 34.7x',
            growth: 'E 8.5%',
            divYield: '0.4%',
            isFavorite: true
        },
        {
            symbol: 'GOOGL',
            company: 'Alphabet',
            logoColor: 'bg-green-500',
            lastPrice: 'US$212.91',
            return7D: '2.8%',
            return1Y: '36.3%',
            marketCap: 'US$2.6t',
            analystTarget: 'US$217.20',
            valuation: 'PE 22.3x',
            growth: 'E 8.4%',
            divYield: '0.4%'
        },
        {
            symbol: 'AMZN',
            company: 'Amazon.com',
            logoColor: 'bg-yellow-500',
            lastPrice: 'US$229.00',
            return7D: '0.1%',
            return1Y: '20.9%',
            marketCap: 'US$2.4t',
            analystTarget: 'US$263.18',
            valuation: 'PE 34.6x',
            growth: 'E 15.3%',
            divYield: 'n/a'
        },
        {
            symbol: 'META',
            company: 'Meta Platforms',
            logoColor: 'bg-blue-500',
            lastPrice: 'US$738.70',
            return7D: '-2.0%',
            return1Y: '44.3%',
            marketCap: 'US$1.9t',
            analystTarget: 'US$863.20',
            valuation: 'PE 26x',
            growth: 'E 9.1%',
            divYield: '0.3%'
        },
        {
            symbol: '2222',
            company: 'Saudi Arabian Oil',
            logoColor: 'bg-yellow-500',
            lastPrice: '23.63 ر.س',
            return7D: '-0.6%',
            return1Y: '-15.3%',
            marketCap: '5.7 ر.س',
            analystTarget: '28.65 ر.س',
            valuation: 'PE 15.6x',
            growth: 'E 2.5%',
            divYield: '7.7%'
        },
        {
            symbol: 'BRK-A',
            company: 'Berkshire Hathaway',
            logoColor: 'bg-orange-500',
            lastPrice: 'US$755,280.00',
            return7D: '2.5%',
            return1Y: '5.5%',
            marketCap: 'US$1.1t',
            analystTarget: 'US$770,936.75',
            valuation: 'PE 17.3x',
            growth: 'E -5.3%',
            divYield: 'n/a'
        },
        {
            symbol: '2330',
            company: 'Taiwan Semiconductor M...',
            logoColor: 'bg-green-500',
            lastPrice: 'NT$1,155.00',
            return7D: '-1.7%',
            return1Y: '22.9%',
            marketCap: 'NT$30.2t',
            analystTarget: 'NT$1,369.92',
            valuation: 'PE 20.7x',
            growth: 'E 12.6%',
            divYield: '1.7%'
        }
    ];

    const getReturnColor = (returnValue: string): string => {
        if (returnValue.startsWith('-')) {
            return 'text-red-500';
        } else if (returnValue === '0.0%') {
            return 'text-gray-400';
        }
        return 'text-green-500';
    };

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
        <div className="w-full min-h-screen bg-blue-950 text-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-700 bg-slate-900">
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
                        <div className="text-xl font-semibold">19,702 results</div>
                        {/* <div className="flex items-center text-sm text-gray-400">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-blue-400">0</span> new • Filter under 350 results to activate
                        </div> */}
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
            <div className="flex flex-1">
                {/* Stock Table */}
                <div className="flex-1 overflow-hidden bg-slate-900 h-screen">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm text-gray-400 border-b border-gray-700 bg-slate-800">
                        <div className="col-span-2 flex items-center">Company</div>
                        <div className="flex items-center">Last Price</div>
                        <div className="flex items-center">7D Return</div>
                        <div className="flex items-center">1Y Return</div>
                        <div className="flex items-center">
                            Market Cap <Info className="w-3 h-3 ml-1" />
                        </div>
                        <div className="flex items-center">
                            Analysts Target <Info className="w-3 h-3 ml-1" />
                        </div>
                        <div className="flex items-center">
                            Valuation <Info className="w-3 h-3 ml-1" />
                        </div>
                        <div className="flex items-center">
                            Growth <Info className="w-3 h-3 ml-1" />
                        </div>
                        <div className="flex items-center">Div Yield</div>
                        <div></div>
                    </div>

                    {/* Stock Rows */}
                    <div className="overflow-y-auto bg-slate-900 h-full">
                        {stockData.map((stock,) => (
                            <div key={stock.symbol} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-800 hover:bg-slate-800/50 transition-colors">
                                {/* Company */}
                                <div className="col-span-2 flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full ${stock.logoColor} flex items-center justify-center flex-shrink-0`}>
                                        <div className="w-6 h-6 bg-white rounded opacity-90"></div>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-blue-400 font-semibold text-sm">{stock.symbol}</div>
                                        <div className="text-xs text-gray-400 truncate">{stock.company}</div>
                                    </div>
                                </div>

                                {/* Last Price */}
                                <div className="flex items-center text-white font-medium text-sm">
                                    {stock.lastPrice}
                                </div>

                                {/* 7D Return */}
                                <div className={`flex items-center font-medium text-sm ${getReturnColor(stock.return7D)}`}>
                                    {stock.return7D}
                                </div>

                                {/* 1Y Return */}
                                <div className={`flex items-center font-medium text-sm ${getReturnColor(stock.return1Y)}`}>
                                    {stock.return1Y}
                                </div>

                                {/* Market Cap */}
                                <div className="flex items-center text-white text-sm">
                                    {stock.marketCap}
                                </div>

                                {/* Analyst Target */}
                                <div className="flex items-center text-white text-sm">
                                    {stock.analystTarget}
                                </div>

                                {/* Valuation */}
                                <div className="flex items-center text-white text-sm">
                                    {stock.valuation}
                                </div>

                                {/* Growth */}
                                <div className="flex items-center text-white text-sm">
                                    {stock.growth}
                                </div>

                                {/* Div Yield */}
                                <div className="flex items-center text-white text-sm">
                                    {stock.divYield}
                                </div>

                                {/* Favorite Star */}
                                <div className="flex items-center justify-center">
                                    <Star
                                        className={`w-5 h-5 cursor-pointer transition-colors ${stock.isFavorite
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-500 hover:text-gray-300'
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <StockSidebar />
            </div>
        </div>
    );
};

export default StockMarketDashboard;