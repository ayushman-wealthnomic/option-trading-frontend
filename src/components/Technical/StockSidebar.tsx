"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function StockSidebar() {
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: string | boolean }>({});

    const handleToggle = (id: string, value?: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: value ?? !prev[id], // if value provided (radio), set it, else toggle boolean (checkbox)
        }));
    };

    return (
        <aside className="w-96 h-screen bg-slate-900 border-l text-white p-4 overflow-y-auto">
            {/* Fundamental Section */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Fundamental</h2>
                {[
                    "PE",
                    "Earnings yield",
                    "Book value",
                    "ROC",
                    "ROCE",
                    "YOY Quarterly sales growth",
                    "YOY Quarterly profit growth",
                ].map((item) => (
                    <div key={item} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                            id={item}
                            checked={!!checkedItems[item]}
                            onCheckedChange={() => handleToggle(item)}
                        />
                        <Label htmlFor={item}>{item}</Label>
                    </div>
                ))}
            </div>

            <Separator className="my-4 bg-gray-600" />

            {/* Technical Section */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Technical</h2>

                {/* Super Trend */}
                <div className="mb-3">
                    <h3 className="font-medium mb-1">Super Trend</h3>
                    <div className="flex gap-4">
                        {["10 3", "9 3", "7 3"].map((item) => (
                            <div key={item} className="flex flex-row items-center space-x-2 mb-1">
                                <Checkbox
                                    id={`super-${item}`}
                                    checked={!!checkedItems[`super-${item}`]}
                                    onCheckedChange={() => handleToggle(`super-${item}`)}
                                />
                                <Label htmlFor={`super-${item}`}>{item}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Moving Average */}
                <div className="mb-3">
                    <h3 className="font-medium mb-1">Moving Average</h3>
                    <div className="flex flex-wrap space-x-4 space-y-2">
                        {["MA 8", "MA 20", "MA 34", "MA 50", "MA 100", "MA 200"].map((item) => (
                            <div key={item} className="flex items-center space-x-2 mb-1">
                                <Checkbox
                                    id={`ma-${item}`}
                                    checked={!!checkedItems[`ma-${item}`]}
                                    onCheckedChange={() => handleToggle(`ma-${item}`)}
                                />
                                <Label htmlFor={`ma-${item}`}>{item}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Exponential Moving Average */}
                <div className="mb-3">
                    <h3 className="font-medium mb-1">Exponential Moving Average</h3>
                    <div className="flex flex-wrap space-x-4 space-y-2">
                        {["EMA 8", "EMA 20", "EMA 34", "EMA 50", "EMA 100", "EMA 200"].map(
                            (item) => (
                                <div key={item} className="flex items-center space-x-2 mb-1">
                                    <Checkbox
                                        id={`ema-${item}`}
                                        checked={!!checkedItems[`ema-${item}`]}
                                        onCheckedChange={() => handleToggle(`ema-${item}`)}
                                    />
                                    <Label htmlFor={`ema-${item}`}>{item}</Label>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* RSI */}
                <div className="mb-3">
                    <h3 className="font-medium mb-1">RSI</h3>
                    <RadioGroup
                        value={(checkedItems.rsi as string) || ""}
                        onValueChange={(val) => handleToggle("rsi", val)}
                        className="flex"
                    >
                        {["Above", "Below"].map((pos) => (
                            <div key={pos} className="flex items-center space-x-2 mb-1">
                                <RadioGroupItem id={`rsi-${pos}`} value={pos} />
                                <Label htmlFor={`rsi-${pos}`}>{pos}</Label>
                            </div>
                        ))}
                    </RadioGroup>

                    <RadioGroup
                        value={(checkedItems.rsiValue as string) || ""}
                        onValueChange={(val) => handleToggle("rsiValue", val)}
                        className="flex flex-wrap gap-2 mt-2"
                    >
                        {["14", "30", "70", "80"].map((val) => (
                            <div key={val} className="flex items-center space-x-1">
                                <RadioGroupItem id={`rsi-${val}`} value={val} />
                                <Label htmlFor={`rsi-${val}`}>{val}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* PSAR */}
                <div className="mb-3">
                    <h3 className="font-medium mb-1">PSAR</h3>
                    <RadioGroup
                        value={(checkedItems.psar as string) || ""}
                        onValueChange={(val) => handleToggle("psar", val)}
                        className="flex"
                    >
                        {["Above", "Below"].map((pos) => (
                            <div key={pos} className="flex items-center space-x-2">
                                <RadioGroupItem id={`psar-${pos}`} value={pos} />
                                <Label htmlFor={`psar-${pos}`}>{pos}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        </aside>
    );
}
