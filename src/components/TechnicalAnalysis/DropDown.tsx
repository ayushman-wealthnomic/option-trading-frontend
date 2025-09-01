"use client";
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import stockListJson from '../../../data/stockList.json';

const stockList: Record<string, string> = stockListJson;

interface StockSearchDropdownProps {
    theme?: 'light' | 'dark';
    selectedStock: string | null;
    setSelectedStock: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function StockSearchDropdown({ selectedStock, setSelectedStock, theme }: StockSearchDropdownProps) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStocks, setFilteredStocks] = useState<string[]>([]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            // Show first 30 stocks when no search query
            const allStocks = Object.keys(stockList).slice(0, 30);
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
        setSelectedStock(ticker);
        setSearchQuery('');
        setFilteredStocks([]);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-64 justify-between ${theme === 'light' ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black'}`}
                >
                    {selectedStock ? `${selectedStock}: ${stockList[selectedStock]}` : "Select stock..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <div className="p-3">
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search stock..."
                        className="w-full"
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
                                    {ticker}: {stockList[ticker]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}