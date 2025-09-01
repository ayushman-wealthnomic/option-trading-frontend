"use client";

import React, { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import stockList from '../../../data/stockList.json';

interface StockSearchDropdownProps {
    selectedStock: string | null;
    setSelectedStock: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function
    StockSearchDropdown({ selectedStock, setSelectedStock }: StockSearchDropdownProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-64 justify-between"
                >
                    {selectedStock || "Select stock..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <Command>
                    <CommandInput placeholder="Search stock..." />
                    <CommandList>
                        <CommandEmpty>No stock found.</CommandEmpty>
                        <CommandGroup>
                            {Object.entries(stockList).map(([ticker, fullName]) => (
                                <CommandItem
                                    key={ticker}
                                    value={`${fullName} ${ticker}`}
                                    onSelect={() => {
                                        setSelectedStock(ticker);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedStock === ticker ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {ticker} {/* Only ticker visible */}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
