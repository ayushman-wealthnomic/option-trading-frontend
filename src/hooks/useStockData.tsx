// src/hooks/useStockData.ts
import { useState, useEffect, useCallback } from "react";
import type { SortKey, SortState } from "../../types";
import rawStockData from "../../data/nifty500_data.json";
import rawIndicesList from "../../data/indices_stock_list.json";

/* ---------- Types ---------- */
export interface Stock {
    symbol: string;
    ltp: number;
    change: number;
    companyName: string;
    industry: string;
    history: number[];
    prev_day_close?: number;
}

type StockInfo = {
    LTP: number;
    "Change %": number;
    "Company Name": string;
    Industry: string;
    history?: number[];
};

type StockDataMap = Record<string, StockInfo>;
type IndicesMap = Record<string, string[]>;

/* ---------- Cast JSON to typed objects ---------- */
const stockData = rawStockData as StockDataMap;
const indicesStockList = rawIndicesList as IndicesMap;

/* ---------- Hook ---------- */
export function useStockData() {
    const [allFetchedStocks, setAllFetchedStocks] = useState<Stock[]>([]);
    const [displayedStocks, setDisplayedStocks] = useState<Stock[]>([]);
    const [indices, setIndices] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentSort, setCurrentSort] = useState<SortState>({
        key: "symbol",
        order: "asc",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    /** Load all stocks for the chosen index */
    const loadStockData = useCallback((indexName: string) => {
        const symbols = indicesStockList[indexName] ?? [];
        if (!symbols.length) {
            setAllFetchedStocks([]);
            setMessage("Unknown index.");
            return;
        }

        const stocks: Stock[] = symbols
            .map((sym: string) => {
                const info = stockData[sym];
                if (!info) return null;

                return {
                    symbol: sym,
                    ltp: info.LTP,
                    change: info["Change %"],
                    companyName: info["Company Name"],
                    industry: info.Industry,
                    history: Array.isArray(info.history) ? info.history : [],
                    prev_day_close: info.history?.[info.history.length - 2],
                };
            })
            .filter(Boolean) as Stock[];

        setAllFetchedStocks(stocks);
        setMessage("");
    }, []);

    /** Initialize dropdown (indices) and load default */
    useEffect(() => {
        const names = Object.keys(indicesStockList);
        setIndices(names);

        if (names.length) {
            const defaultIndex = names[0];
            setSelectedIndex(defaultIndex);
            setLoading(true);
            loadStockData(defaultIndex);
            setLoading(false);
        }
        // leave selectedIndex out so it only runs once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadStockData]);

    /** Reload data when user changes index */
    useEffect(() => {
        if (!selectedIndex) return;
        setLoading(true);
        loadStockData(selectedIndex);
        setLoading(false);
    }, [selectedIndex, loadStockData]);

    /** Refresh list whenever search/sort/index changes */
    useEffect(() => {
        const filtered = allFetchedStocks.filter((s) =>
            s.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            if (currentSort.key === "symbol") {
                return currentSort.order === "asc"
                    ? a.symbol.localeCompare(b.symbol)
                    : b.symbol.localeCompare(a.symbol);
            }
            if (currentSort.key === "change") {
                return currentSort.order === "asc"
                    ? a.change - b.change
                    : b.change - a.change;
            }
            return 0;
        });

        setDisplayedStocks(filtered);

        if (!loading && !message) {
            if (allFetchedStocks.length && !filtered.length) {
                setMessage("No stocks match your search.");
            }
        }
        if (filtered.length && message === "No stocks match your search.") {
            setMessage("");
        }
    }, [allFetchedStocks, searchTerm, currentSort, loading, message]);

    const handleSort = (key: SortKey) => {
        setCurrentSort((prev) =>
            prev.key === key
                ? { ...prev, order: prev.order === "asc" ? "desc" : "asc" }
                : { key, order: key === "change" ? "desc" : "asc" }
        );
    };

    return {
        displayedStocks,
        indices,           // for dropdown
        selectedIndex,     // currently selected index
        setSelectedIndex,  // use in dropdown onChange
        searchTerm,
        setSearchTerm,
        currentSort,
        handleSort,
        message,
        loading,
        reload: loadStockData,
    };
}
