import { CandlestickSeries, createChart, ColorType, HistogramSeries } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import type { IChartApi, ISeriesApi } from 'lightweight-charts';
// import { Button } from '@/components/ui/button';
import { baseURL } from '@/lib/baseURL';
import stocklist from '../../../data/stockList.json'
import StockSearchDropdown from './DropDown';

const colors = {
    white: "#f0f0f0",
    black: "#080F25",
    red: "#ff6b6b",
    blue100: "#0E43FB",
    blue200: "#101935",
    blue: "#AEB9E1",
    gray: "#7E89AC",
    gray100: "#343B4F",
    cyan: "#57C3FF",
    violet: "#8951FF",
    pink: "#cb3cff",
    green: "#28a49c",
    orange: "#FFB74D",
    orange100: "#CC5500",
} as const;


interface CandlestickChartProps {
    selectedStock: string;
    setSelectedStock: React.Dispatch<React.SetStateAction<string>>;
    colors?: {
        backgroundColor?: string;
        textColor?: string;
        upColor?: string;
        downColor?: string;
        borderUpColor?: string;
        borderDownColor?: string;
        wickUpColor?: string;
        wickDownColor?: string;
    };
}

const CandlestickChart = (props: CandlestickChartProps) => {
    const {
        selectedStock,
        setSelectedStock,
        colors: {
            backgroundColor = 'black',
            textColor = 'white',
            upColor = '#26a69a',
            downColor = '#ef5350',
            borderUpColor = '#26a69a',
            borderDownColor = '#ef5350',
            wickUpColor = '#26a69a',
            wickDownColor = '#ef5350',
        } = {},
    } = props;

    const [, setStocks] = useState<string[]>([]);
    const [, setLoading] = useState(false);

    const chartContainerRef = useRef<HTMLDivElement>(null);

    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

    useEffect(() => {
        setStocks(stocklist);
        if (stocklist.length > 0) {
            setSelectedStock(stocklist[0]);
        }
    }, []);

    useEffect(() => {
        if (!selectedStock || !seriesRef.current || !volumeSeriesRef.current) return;

        const fetchStockData = async () => {
            try {
                setLoading(true);


                // Fetch from API
                const response = await fetch(`${baseURL}/stocks/${selectedStock}`);
                const data = await response.json();

                const candlestickData = data
                    .map((d: any) => {
                        const date = new Date(d.date);
                        return {
                            time: {
                                year: date.getUTCFullYear(),
                                month: date.getUTCMonth() + 1,
                                day: date.getUTCDate(),
                            },
                            open: d.open_price,
                            high: d.high_price,
                            low: d.low_price,
                            close: d.close_price,
                        };
                    })
                    .sort(
                        (
                            a: { time: { year: number; month: number; day: number } },
                            b: { time: { year: number; month: number; day: number } }
                        ) =>
                            a.time.year - b.time.year ||
                            a.time.month - b.time.month ||
                            a.time.day - b.time.day
                    );

                // Generate random volume data for API data (since volume might not be in your API)
                const volumeData = data
                    .map((d: any) => {
                        const date = new Date(d.date);
                        // Generate volume between 20M and 80M
                        return {
                            time: {
                                year: date.getUTCFullYear(),
                                month: date.getUTCMonth() + 1,
                                day: date.getUTCDate(),
                            },
                            value: Number(d.volume),
                            color: d.close_price >= d.open_price ? colors.green : colors.red,
                        };
                    })
                    .sort(
                        (
                            a: { time: { year: number; month: number; day: number } },
                            b: { time: { year: number; month: number; day: number } }
                        ) =>
                            a.time.year - b.time.year ||
                            a.time.month - b.time.month ||
                            a.time.day - b.time.day
                    );
                console.log(volumeData);

                seriesRef.current?.setData(candlestickData);
                volumeSeriesRef.current?.setData(volumeData);

            } catch (err) {
                console.error("Error fetching stock data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, [selectedStock]);

    // Initialize combined chart with both candlestick and volume
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            grid: {
                vertLines: { color: 'rgba(42, 46, 57, 0.6)' },
                horzLines: { color: 'rgba(42, 46, 57, 0.6)' },
            },
            crosshair: {
                mode: 1,
            },
            rightPriceScale: {
                borderColor: 'rgba(197, 203, 206, 0.8)',
            },
            timeScale: {
                borderColor: 'rgba(197, 203, 206, 0.8)',
                timeVisible: true,
                secondsVisible: false,
            },
        });

        // Add candlestick series (main price data) - takes top 75% of chart
        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor,
            downColor,
            borderUpColor,
            borderDownColor,
            wickUpColor,
            wickDownColor,
            priceScaleId: 'right',
        });

        // Add volume series on a separate pane (bottom 25% of chart)
        const volumeSeries = chart.addSeries(HistogramSeries, {
            color: colors.blue,
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: 'volume',
        });

        // Configure main price scale (for candlesticks)
        chart.priceScale('right').applyOptions({
            scaleMargins: {
                top: 0.1,    // 10% margin from top
                bottom: 0.4, // 40% margin from bottom (leaves space for volume)
            },
        });

        // Configure volume price scale (for volume bars)
        chart.priceScale('volume').applyOptions({
            scaleMargins: {
                top: 0.8,    // 80% margin from top (volume in bottom 20%)
                bottom: 0.0, // No bottom margin
            },
        });

        chart.timeScale().fitContent();

        chartRef.current = chart;
        seriesRef.current = candlestickSeries;
        volumeSeriesRef.current = volumeSeries;

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, [backgroundColor, textColor]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Controls */}
            <div className="w-64 absolute right-20 top-4 z-10">
                <StockSearchDropdown selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
            </div>

            {/* Combined Chart Container - Single chart with both candlestick and volume */}
            <div
                ref={chartContainerRef}
                className='w-[100%] h-[100%]'
            />
        </div>
    );
};

export default CandlestickChart;