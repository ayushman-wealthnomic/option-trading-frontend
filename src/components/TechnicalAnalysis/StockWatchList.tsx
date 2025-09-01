import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import stockList from "../../../data/stockList.json";

interface WatchlistStock {
    id: string;
    ticker: string;
    adj_close?: number;
    change_percent?: number;
}

interface StockWatchlistProps {
    watchlists: WatchlistStock[];
    onStockSelect?: React.Dispatch<React.SetStateAction<string | null>>;
    onAddStock?: (symbol: string) => void;
    onRemoveStock: (stockId: string) => void;
}

const StockWatchlist = ({
    watchlists,
    onStockSelect,
    onAddStock,
    onRemoveStock,
}: StockWatchlistProps) => {
    // const [newStockSymbol, setNewStockSymbol] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStocks, setFilteredStocks] = useState<string[]>([]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredStocks([]);
            return;
        }

        const q = searchQuery.toLowerCase();

        // Search by ticker OR full company name
        const matches = Object.entries(stockList)
            .filter(([ticker, fullName]) =>
                ticker.toLowerCase().includes(q) || fullName.toLowerCase().includes(q)
            )
            .map(([ticker]) => ticker) // only keep ticker for UI
            .slice(0, 10);

        setFilteredStocks(matches);
    }, [searchQuery]);



    const handleStockClick = (stock: WatchlistStock) => {
        onStockSelect?.(stock.ticker);
    };

    const handleAddStock = (ticker: string) => {
        if (ticker.trim()) {
            onAddStock?.(ticker.trim().toUpperCase());
        }
        setSearchQuery('');
        setFilteredStocks([])
    };

    // const handleRemoveStock = (stockId: string) => {
    //     onRemoveStock?.(stockId);
    // };

    const formatPrice = (price: number) => price.toFixed(2);

    // const formatChange = (change: number) => {
    //     const sign = change >= 0 ? '+' : '';
    //     return `${sign}${change.toFixed(2)}`;
    // };

    // const formatChangePercent = (changePercent: number) => {
    //     const sign = changePercent >= 0 ? '+' : '';
    //     return `${sign}${changePercent.toFixed(2)}%`;
    // };

    // const getChangeVariant = (change: number) => {
    //     if (change > 0) return 'default';
    //     if (change < 0) return 'destructive';
    //     return 'secondary';
    // };

    const getChangeColor = (change: string | number) => {
        // Remove % sign and convert to number
        const numChange = parseFloat(String(change).replace('%', ''));
        if (isNaN(numChange)) return 'text-gray-500';
        if (numChange > 0) return 'text-green-500';
        if (numChange < 0) return 'text-red-500';
        return 'text-gray-500';
    };

    return (
        <Card className="h-screen rounded-none">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Watchlist</CardTitle>
                </div>

                {/* Search + Autocomplete */}
                <div className="mt-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search & add stock..."
                            className="pl-10"
                        />
                        {/* Dropdown with results */}
                        {filteredStocks.length > 0 && (
                            <div className="absolute mt-1 w-full bg-background border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                {filteredStocks.map((ticker) => (
                                    <div
                                        key={ticker}
                                        className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                                        onClick={() => handleAddStock(ticker)}
                                    >
                                        {ticker}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {/* Stock List Header */}
                <div className="px-6 py-2 border-y">
                    <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        <div className="col-span-4">Symbol</div>
                        <div className="col-span-3 text-right">Price</div>
                        <div className="col-span-3 text-right">Chg %</div>
                        <div className="col-span-2"></div>
                    </div>
                </div>

                {/* Stock List */}
                <div className="divide-y">
                    {watchlists.map((stock) => (
                        <div
                            key={stock.id}
                            className="px-6 py-1 hover:bg-muted/50 transition-colors cursor-pointer group"
                            onClick={() => handleStockClick(stock)}
                        >
                            <div className="grid grid-cols-12 gap-2 items-center">
                                {/* Symbol */}
                                <div className="col-span-4">
                                    <div className="font-medium text-foreground">{stock.ticker}</div>
                                    {/* {stock.name && (
                                        <div className="text-xs text-muted-foreground">{stock.name}</div>
                                    )} */}
                                </div>

                                {/* Price */}
                                <div className="col-span-3 text-right">
                                    <div className="font-medium text-md text-foreground">
                                        {formatPrice(Number((Math.random() * 100).toFixed(1)))}
                                    </div>
                                    {stock.adj_close && (
                                        <div className="text-xs text-muted-foreground">
                                            {formatPrice(stock.adj_close ?? 0)}
                                        </div>
                                    )}
                                </div>

                                {/* Change */}
                                {stock.change_percent !== undefined && (
                                    <div className="col-span-3 text-right">
                                        <div className="text-xs font-medium">
                                            <p className={getChangeColor(stock.change_percent)}>
                                                {stock.change_percent}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="col-span-2 text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRemoveStock(stock.id)
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default StockWatchlist;
