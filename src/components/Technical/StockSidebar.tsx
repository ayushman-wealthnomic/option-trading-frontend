"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StockSidebarProps {
    filters: { [key: string]: string | boolean };
    setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string | boolean }>>;
}

export default function StockSidebar({ filters, setFilters }: StockSidebarProps) {

    const handleToggle = (id: string, value?: string) => {
        setFilters((prev) => ({
            ...prev,
            [id]: value ?? !prev[id], // if value provided (radio), set it, else toggle boolean (checkbox)
        }));
    };

    console.log(filters);


    return (
        <aside className="w-96 h-screen bg-black border-l text-white p-4 overflow-y-auto">
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
                            checked={!!filters[item]}
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

                {/* Simple Trend */}
                <div className="mb-3">
                    <h3 className="font-medium mb-1">SIMPLE Moving Average</h3>
                    <div className="flex flex-col gap-2">
                        {["SMA 20", "SMA 50", "SMA 200"].map((sma) => (
                            <div key={sma} className="flex items-center space-x-2">
                                {/* SMA Checkbox */}
                                <Checkbox
                                    id={`sma-${sma}`}
                                    checked={!!filters[`sma-${sma}`]}
                                    onCheckedChange={() => handleToggle(`sma-${sma}`)}
                                />
                                <Label htmlFor={`sma-${sma}`}>{sma}</Label>
                                <RadioGroup
                                    value={(filters[`sma-${sma}-pos`] as string) || ""}
                                    onValueChange={(val) => handleToggle(`sma-${sma}-pos`, val)}
                                    className="flex space-x-2"
                                >
                                    {["Above", "Below"].map((pos) => (
                                        <div key={pos} className="flex items-center space-x-1">
                                            <RadioGroupItem id={`sma-${sma}-${pos}`} value={pos} />
                                            <Label htmlFor={`sma-${sma}-${pos}`}>{pos}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>

                            </div>
                        ))}
                    </div>

                </div>

                {/* Moving Average */}
                {/* <div className="mb-3">
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
                </div> */}

                {/* Exponential Moving Average */}
                <div className="mb-3">
                    <h3 className="font-medium mb-1">EXPONENTIAL Moving Average</h3>
                    <div className="flex flex-col gap-2">
                        {["EMA 20", "EMA 50", "EMA 200"].map((ema) => (
                            <div key={ema} className="flex items-center space-x-2">
                                {/* EMA Checkbox */}
                                <Checkbox
                                    id={`ema-${ema}`}
                                    checked={!!filters[`ema-${ema}`]}
                                    onCheckedChange={() => handleToggle(`ema-${ema}`)}
                                />
                                <Label htmlFor={`ema-${ema}`}>{ema}</Label>

                                {/* EMA RadioGroup */}

                                <RadioGroup
                                    value={(filters[`ema-${ema}-pos`] as string) || ""}
                                    onValueChange={(val) => handleToggle(`ema-${ema}-pos`, val)}
                                    className="flex space-x-2"
                                >
                                    {["Above", "Below"].map((pos) => (
                                        <div key={pos} className="flex items-center space-x-1">
                                            <RadioGroupItem id={`ema-${ema}-${pos}`} value={pos} />
                                            <Label htmlFor={`ema-${ema}-${pos}`}>{pos}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RSI */}
                <div className="flex items-center gap-4 mb-3">
                    <Checkbox
                        id="rsi-14"
                        checked={!!filters["rsi-14"]}
                        onCheckedChange={() => handleToggle("rsi-14")}
                    />
                    <h3 className="font-medium mb-1">RSI 14</h3>
                    <RadioGroup
                        value={(filters.rsi as string) || ""}
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

                    {/* <RadioGroup
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
                    </RadioGroup> */}
                </div>
                <div className="flex gap-4 mb-3 items-center">
                    {/* SuperTrend Checkbox */}
                    <Checkbox
                        id="supertrend-10-3"
                        checked={!!filters["supertrend-10-3"]}
                        onCheckedChange={() => handleToggle("supertrend-10-3")}
                    />
                    <Label htmlFor="supertrend-10-3" className="font-medium">
                        SuperTrend 10, 3
                    </Label>

                    {/* RadioGroup for Above/Below */}

                    <RadioGroup
                        value={(filters["supertrend-10-3-pos"] as string) || ""}
                        onValueChange={(val) => handleToggle("supertrend-10-3-pos", val)}
                        className="flex"
                    >
                        {["Above", "Below"].map((pos) => (
                            <div key={pos} className="flex items-center space-x-2 mb-1">
                                <RadioGroupItem id={`supertrend-10-3-${pos}`} value={pos} />
                                <Label htmlFor={`supertrend-10-3-${pos}`}>{pos}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>


                {/* PSAR */}
                {/* <div className="mb-3">
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
                </div> */}
            </div>
        </aside>
    );
}
