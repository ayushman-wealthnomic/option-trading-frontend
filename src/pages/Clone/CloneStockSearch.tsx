import { useState, useEffect } from "react";
import stockList from "../../../data/in_tickers.json";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Landing/Navigation";
import { useNavigate } from "react-router-dom";
import CountryDropdown from "@/components/Clone/CountryDropdown";

const CloneStockSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStocks, setFilteredStocks] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredStocks([]);
            return;
        }

        const q = searchQuery.toLowerCase();
        const matches = Object.entries(stockList)
            .filter(
                ([ticker, fullName]) =>
                    ticker.toLowerCase().includes(q) ||
                    fullName.toLowerCase().includes(q)
            )
            .map(([ticker]) => ticker)
            .slice(0, 50);

        setFilteredStocks(matches);
    }, [searchQuery]);

    return (
        <div className="overflow-hidden">
            <Navigation />
            <div className="min-h-screen bg-black flex items-center justify-center">

                <div className="w-full max-w-2xl">
                    <div className="flex items-baseline justify-center gap-2">
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search stock..."
                            className="
                            w-full mb-4
                            text-xl placeholder:text-xl
                            leading-tight
                            py-5
                            text-white placeholder-gray-400
                            bg-gray-900
                            border-none shadow-none focus:border-none focus:shadow-none focus:ring-0
                            "
                        />
                        <div><CountryDropdown /></div>
                    </div>

                    <div className="
        absolute w-full max-w-2xl
        bg-black rounded-md shadow-lg
        h-64 overflow-y-auto
        mt-2
        z-50
      ">
                        {filteredStocks.length > 0 ? (
                            <div className="bg-black border border-gray-700 rounded-md shadow-lg h-64 overflow-y-auto">
                                {filteredStocks.map((ticker) => (
                                    <div
                                        key={ticker}
                                        className="px-4 py-2 hover:bg-muted cursor-pointer text-lg text-white transition-colors"
                                        onClick={() => navigate(`/clone/${ticker}`)}
                                    >
                                        <span className="font-medium">{ticker}</span>:{" "}
                                        {stockList[ticker as keyof typeof stockList]}
                                    </div>
                                ))}
                            </div>
                        ) : searchQuery.trim() ? (
                            <div className="text-gray-400 text-sm text-center py-4">
                                No stocks found matching "{searchQuery}"
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloneStockSearch;
