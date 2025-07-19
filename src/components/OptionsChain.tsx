import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Loader } from "lucide-react";
import { Label } from "./ui/label";
import type { OptionSide, PositionRow } from "@/lib/PositionType";
import type { BulkData } from "@/lib/BulkDataType";
import clsx from "clsx";

interface OptionParams {
    date: Date,
    time: string,
    positions: PositionRow[],
    onAddPosition: (strike: number,
        side: OptionSide,
        type: 'call' | 'put',
        ltp: number,
        expiry: string) => void,
    selectedExpiry: string,
    bulkData: BulkData | undefined,
    theme?: 'light' | 'dark',
    setExpiry: Dispatch<SetStateAction<string | undefined>>,
}

export interface ChainRow {
    strike: number;
    call_ltp: number;
    put_ltp: number;
}

export interface SnapshotMeta {
    dayOpen: number;
    spot: number;
    atm_iv: number;
    fut_price: number;
}

const LOT_SIZE = 35;

export function OptionsChain({ date, time, onAddPosition, bulkData, selectedExpiry, setExpiry, theme, positions }: OptionParams) {
    const [loading,] = useState<boolean>(false);
    console.log(positions);

    const formatDateForAPI = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    let currentData = null, expiryDates = null;

    if (
        bulkData &&
        bulkData[formatDateForAPI(date)] &&
        bulkData[formatDateForAPI(date)][time]
    ) {
        const timeData = bulkData[formatDateForAPI(date)][time];
        expiryDates = Object.keys(timeData);
        expiryDates.sort();
        console.log(expiryDates);

        if (timeData[selectedExpiry]) {
            currentData = timeData[selectedExpiry];
        } else {
            currentData = null;
        }
        console.log(currentData);
    }

    useEffect(() => {
        const formattedDate = formatDateForAPI(date);
        const timeData = bulkData?.[formattedDate]?.[time];

        if (timeData) {
            const expiries = Object.keys(timeData).sort();

            if (!timeData[selectedExpiry] && expiries.length > 0) {
                setExpiry(expiries[0]);
            }
        }
    }, [bulkData, date, time]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card className={`h-full transition-colors duration-300 ${theme === 'dark'
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
            }`}>
            <CardHeader>
                <div className="flex w-full items-center justify-center gap-3">
                    {expiryDates && expiryDates.map(exp => {
                        const isActive = exp === selectedExpiry;
                        return (
                            <Button
                                key={exp}
                                variant={isActive ? 'default' : 'outline'}
                                className={`text-sm px-4 py-1 transition ${isActive
                                    ? theme === 'dark'
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    : theme === 'dark'
                                        ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:text-white'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setExpiry(exp)}
                            >
                                {formatDate(new Date(exp))}
                            </Button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="h-full overflow-hidden">
                <div className={`rounded-lg border h-full overflow-y-auto hide-scrollbar ${theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700'
                    : 'bg-muted/20 border-gray-200'
                    }`}>
                    <Table>
                        <TableHeader className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                            }`}>
                            <TableRow className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                                }`}>
                                <TableHead className={`text-center font-semibold w-1/5 ${theme === 'dark'
                                    ? 'bg-green-900/30 text-green-300'
                                    : 'bg-green-50 text-green-700'
                                    }`}>
                                    Call LTP (Δ)
                                </TableHead>
                                <TableHead className={`text-center w-1/5 ${theme === 'dark'
                                    ? 'bg-blue-900/30 text-blue-300'
                                    : 'bg-blue-50 text-blue-700'
                                    }`}>
                                    Call Actions
                                </TableHead>
                                <TableHead className={`text-center font-bold w-1/5 ${theme === 'dark'
                                    ? 'bg-gray-700 text-gray-100'
                                    : 'bg-slate-100 text-gray-900'
                                    }`}>
                                    Strike
                                </TableHead>
                                <TableHead className={`text-center w-1/5 ${theme === 'dark'
                                    ? 'bg-blue-900/30 text-blue-300'
                                    : 'bg-blue-50 text-blue-700'
                                    }`}>
                                    Put Actions
                                </TableHead>
                                <TableHead className={`text-center font-semibold w-1/5 ${theme === 'dark'
                                    ? 'bg-red-900/30 text-red-300'
                                    : 'bg-red-50 text-red-700'
                                    }`}>
                                    Put LTP (Δ)
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {loading ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="flex justify-center items-center h-full">
                                            <Loader className={`w-6 h-6 animate-spin ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                                }`} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : !currentData?.chain.length ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="flex justify-center items-center h-full">
                                            <Label className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                No Data Available
                                            </Label>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                {currentData.chain.map((row: ChainRow) => {

                                    const existingCallBuyPos = positions.find(
                                        pos => pos.strike === row.strike && pos.side === 'BUY' && pos.type === 'call' && pos.expiry === selectedExpiry
                                    );
                                    const callBuyLots = existingCallBuyPos ? (existingCallBuyPos.qty / LOT_SIZE) : null;

                                    const existingPutBuyPos = positions.find(
                                        pos => pos.strike === row.strike && pos.side === 'BUY' && pos.type === 'put' && pos.expiry === selectedExpiry
                                    );
                                    const putBuyLots = existingPutBuyPos ? (existingPutBuyPos.qty / LOT_SIZE) : null;

                                    const existingCallSellPos = positions.find(
                                        pos => pos.strike === row.strike && pos.side === 'SELL' && pos.type === 'call' && pos.expiry === selectedExpiry
                                    );
                                    const callSellLots = existingCallSellPos ? (existingCallSellPos.qty / LOT_SIZE) : null;

                                    const existingPutSellPos = positions.find(
                                        pos => pos.strike === row.strike && pos.side === 'SELL' && pos.type === 'put' && pos.expiry === selectedExpiry
                                    );
                                    const putSellLots = existingPutSellPos ? (existingPutSellPos.qty / LOT_SIZE) : null;

                                    return (
                                        <TableRow
                                            key={row.strike}
                                            className={`py-4 transition-colors ${row.strike === 56700 // This is a hardcoded strike, consider making it dynamic
                                                ? theme === 'dark'
                                                    ? 'bg-blue-900/20 border-blue-700'
                                                    : 'bg-blue-50/50 border-blue-200'
                                                : theme === 'dark'
                                                    ? 'hover:bg-gray-800/50'
                                                    : 'hover:bg-muted/50'
                                                }`}
                                        >
                                            <TableCell className={`text-center font-medium w-1/5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                                }`}>
                                                {row.call_ltp}
                                                {/* Add delta here if available in ChainRow, e.g., ({row.call_delta?.toFixed(2)}) */}
                                            </TableCell>
                                            <TableCell className="text-center w-1/5">
                                                <div className="flex gap-1 justify-center">
                                                    <div className="relative">
                                                        <Button
                                                            onClick={() => {
                                                                onAddPosition(row.strike, 'BUY', 'call', row.call_ltp, selectedExpiry!);
                                                            }}
                                                            size="sm"
                                                            variant="outline"
                                                            className={clsx(
                                                                'h-6 w-8 p-0', // Fixed size for base button
                                                                theme === 'dark'
                                                                    ? 'bg-green-900/30 hover:bg-green-900/50 text-green-300 border-green-700'
                                                                    : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                                                            )}
                                                        >
                                                            B
                                                        </Button>
                                                        {callBuyLots !== null && (
                                                            <span
                                                                className={clsx(
                                                                    "absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                                                                    "flex items-center justify-center",
                                                                    "w-4 h-4 text-[12px] font-bold rounded-full",
                                                                    theme === 'dark'
                                                                        ? 'border-green-600 text-green-300'
                                                                        : 'border-green-600 text-green-500'
                                                                )}
                                                            >
                                                                {callBuyLots}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="relative">
                                                        <Button
                                                            onClick={() => {
                                                                onAddPosition(row.strike, 'SELL', 'call', row.call_ltp, selectedExpiry!);
                                                            }}
                                                            size="sm"
                                                            variant="outline"
                                                            className={`h-6 w-auto px-2 ${theme === 'dark'
                                                                ? 'bg-red-900/30 hover:bg-red-900/50 text-red-300 border-red-700'
                                                                : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                                                                }`}
                                                        >
                                                            S
                                                        </Button>
                                                        {callSellLots !== null && (
                                                            <span
                                                                className={clsx(
                                                                    "absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                                                                    "flex items-center justify-center",
                                                                    "w-4 h-4 text-[12px] font-bold rounded-full",
                                                                    theme === 'dark'
                                                                        ? 'border-red-600 text-red-300'
                                                                        : 'border-red-600 text-red-500'
                                                                )}
                                                            >
                                                                {callSellLots}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className={`text-center font-bold w-1/5 ${theme === 'dark'
                                                ? 'bg-gray-800 text-gray-100'
                                                : 'bg-slate-50 text-gray-900'
                                                }`}>
                                                {row.strike.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-center w-1/5">
                                                <div className="flex gap-1 justify-center">
                                                    <div className="relative">
                                                        <Button
                                                            onClick={() => {
                                                                onAddPosition(row.strike, 'BUY', 'put', row.put_ltp, selectedExpiry!);
                                                            }}
                                                            size="sm"
                                                            variant="outline"
                                                            className={`h-6 w-auto px-2 ${theme === 'dark'
                                                                ? 'bg-green-900/30 hover:bg-green-900/50 text-green-300 border-green-700'
                                                                : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                                                                }`}
                                                        >
                                                            B
                                                        </Button>
                                                        {putBuyLots !== null && (
                                                            <span
                                                                className={clsx(
                                                                    "absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                                                                    "flex items-center justify-center",
                                                                    "w-4 h-4 text-[12px] font-bold rounded-full",
                                                                    theme === 'dark'
                                                                        ? 'border-green-600 text-green-300'
                                                                        : 'border-green-600 text-green-500'
                                                                )}
                                                            >
                                                                {putBuyLots}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="relative">
                                                        <Button
                                                            onClick={() => {
                                                                onAddPosition(row.strike, 'SELL', 'put', row.put_ltp, selectedExpiry!);
                                                            }}
                                                            size="sm"
                                                            variant="outline"
                                                            className={`h-6 w-auto px-2 ${theme === 'dark'
                                                                ? 'bg-red-900/30 hover:bg-red-900/50 text-red-300 border-red-700'
                                                                : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                                                                }`}
                                                        >
                                                            S
                                                        </Button>
                                                        {putSellLots !== null && (
                                                            <span
                                                                className={clsx(
                                                                    "absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                                                                    "flex items-center justify-center",
                                                                    "w-4 h-4 text-[12px] font-bold rounded-full",
                                                                    theme === 'dark'
                                                                        ? 'border-red-600 text-red-300'
                                                                        : 'border-red-600 text-red-500'
                                                                )}
                                                            >
                                                                {putSellLots}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className={`text-center font-medium w-1/5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                                }`}>
                                                {row.put_ltp}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        )}
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}