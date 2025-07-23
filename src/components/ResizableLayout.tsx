import {
    ResizableHandle, ResizablePanel, ResizablePanelGroup
} from '@/components/ui/resizable';
import { OptionsChain } from './OptionsChain';
import { PayoffChart } from './PayoffChart';
import { PositionsPanel } from './PositionsPanel';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { OptionSide, PositionRow } from '@/lib/PositionType';
import { nanoid } from 'nanoid';
import { baseURL } from '@/lib/baseURL';
import { Loader } from 'lucide-react';
import type { BulkData } from '@/lib/BulkDataType';
import { supabase } from '@/lib/supabase';

interface Meta {
    dayOpen: number;
    spot: number;
    atm_iv: number;
    fut_price: number;
}


interface LayoutParams {
    date: Date;
    time: string;
    meta: Meta;
    setMeta: Dispatch<SetStateAction<Meta>>;
    theme?: 'light' | 'dark';
    isDisable?: boolean;
    setIsDisable?: Dispatch<SetStateAction<boolean>>;
}



export function ResizableLayout({ date, time, setMeta, meta, theme, isDisable, setIsDisable }: LayoutParams) {
    const [positions, setPositions] = useState<PositionRow[]>([]);
    const [selectedExpiry, setExpiry] = useState<string | undefined>('2021-01-07');
    const [bulkData, setBulkData] = useState<BulkData | undefined>();
    const [loading, setLoading] = useState(false);


    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return (day === 0 || day === 6) ? true : false;
    };


    const formatDateForAPI = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const authToken = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token;
    }


    useEffect(() => {
        positions.map(pos => {
            console.log(formatDateForAPI(date));
            if (pos.expiry == formatDateForAPI(date)) {
                if (setIsDisable) setIsDisable(true);
            } else {
                if (setIsDisable) setIsDisable(false);
            }
        })

        if (positions.length === 0) {
            if (setIsDisable) setIsDisable(false);
        }
        console.log("isDisable changed:", isDisable);
    }, [date, positions]);


    useEffect(() => {
        console.log("Cached");
        if (isWeekend(date)) {
            return;
        }
        const selected = formatDateForAPI(date);
        if (bulkData && bulkData[selected]) return;

        const fetchAndStore = async () => {

            setLoading(true);
            console.log("Trigerred");
            try {
                const res = await fetch(`${baseURL}/bulk?date=${selected}`, {
                    headers: {
                        'Authorization': `Bearer ${await authToken()}`
                    }
                });
                const data = await res.json();
                setBulkData(prev => ({
                    ...prev,
                    ...data,
                }));

            } catch (err) {
                console.error(`Error fetching future date ${selected}`, err);
            } finally {
                setLoading(false);
            }
        };



        fetchAndStore();
        // if (bulkData) {
        //     const dayData = bulkData?.[formatDateForAPI(date)]?.[time]?.[selectedExpiry];
        //     console.log(dayData);
        //     setMeta(dayData?.meta?.spot ?? 0);
        // }

    }, [date]);

    useEffect(() => {
        const updatePositionsFromBulkData = () => {
            const formattedDate = formatDateForAPI(date);
            let dayData;
            if (selectedExpiry) {
                dayData = bulkData?.[formattedDate]?.[time]?.[selectedExpiry];
            }

            if (!dayData || !dayData.chain || !dayData.meta) {
                console.warn("No data found in bulkData for current date/time/expiry");
                return;
            }
            setMeta(dayData.meta);

            setPositions(prev =>
                prev.map(pos => {
                    const match = dayData.chain.find((opt: { strike: number, call_ltp: number, put_ltp: number }) => opt.strike === pos.strike);
                    if (!match) return pos;

                    const latestLTP = pos.type === 'call' ? match.call_ltp : match.put_ltp;
                    const optionSide = pos.side === 'BUY';

                    const entry = pos.entry;
                    const qty = pos.qty;

                    const pnlAbs = optionSide
                        ? (latestLTP - entry) * qty
                        : (entry - latestLTP) * qty;

                    const pnlPct = optionSide
                        ? ((latestLTP - entry) / entry) * 100
                        : ((entry - latestLTP) / entry) * 100;

                    return {
                        ...pos,
                        ltp: latestLTP,
                        pnlAbs: Number(pnlAbs.toFixed(2)),
                        pnlPct: Number(pnlPct.toFixed(2)),
                        delta: 0
                    };
                })
            );
        };

        updatePositionsFromBulkData();
    }, [date, time, selectedExpiry, bulkData]);




    const addPosition = (
        strike: number,
        side: OptionSide,
        type: 'call' | 'put',
        ltp: number,
        expiry: string
    ) => {
        setPositions(prev => {
            const LOT_SIZE = 35;
            const lotQty = LOT_SIZE;

            const index = prev.findIndex(
                r => r.strike === strike && r.side === side && r.expiry === expiry && r.type === type
            );

            if (index !== -1) {
                const updated = [...prev];
                const row = updated[index];

                row.qty += lotQty;
                row.lotsExit = Math.abs(row.qty / LOT_SIZE);
                row.ltp = ltp;
                return updated;
            }


            const newRow: PositionRow = {
                id: nanoid(),
                lotNo: prev.length + 1,
                qty: lotQty,
                strike,
                side,
                type: type,
                expiry,
                entry: ltp,
                ltp,
                delta: 0,
                pnlAbs: 0,
                pnlPct: 0,
                lotsExit: 1,
                selected: true
            };

            return [...prev, newRow];
        });
    };

    return (
        <div className="h-[calc(100vh-120px)] w-full">
            <ResizablePanelGroup direction="horizontal" className="h-full">
                <ResizablePanel defaultSize={45} minSize={35}>
                    <>
                        {isWeekend(date) && (
                            <div className="flex justify-center items-center h-full">
                                <span className="text-gray-500 dark:text-gray-400">No trading on weekends</span>
                            </div>
                        )}
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader className="w-6 h-6 animate-spin text-blue-600 dark:text-white" />
                            </div>
                        ) : (
                            <OptionsChain
                                meta={meta}
                                date={date}
                                time={time}
                                theme={theme}
                                positions={positions}
                                bulkData={bulkData}
                                onAddPosition={addPosition}
                                selectedExpiry={selectedExpiry!}
                                setExpiry={setExpiry}
                            />
                        )}
                    </>

                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={55} minSize={30}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={50} minSize={20}>
                            <PayoffChart positions={positions} spotPrice={meta.spot} />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={45} minSize={25}>
                            <PositionsPanel
                                date={date}
                                positions={positions}
                                setPositions={setPositions}
                            />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
