import {
    CandlestickSeries,
    LineSeries,
    AreaSeries,
    BarSeries,
    HistogramSeries,
    BaselineSeries,
    createChart,
    ColorType,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import { baseURL } from "@/lib/baseURL";
import stocklist from "../../../data/stockList.json";
import StockSearchDropdown from "./DropDown";

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

type ChartType = 'Candles' | 'Line' | 'Bar' | 'Area' | 'Histogram' | 'Baseline';

interface CandlestickChartProps {
    selectedStock: string | null;
    setSelectedStock: React.Dispatch<React.SetStateAction<string | null>>;
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
            backgroundColor = "black",
            textColor = "white",
            upColor = "#26a69a",
            downColor = "#ef5350",
            borderUpColor = "#26a69a",
            borderDownColor = "#ef5350",
            wickUpColor = "#26a69a",
            wickDownColor = "#ef5350",
        } = {},
    } = props;

    const [loading, setLoading] = useState(false);
    const [activeChartType, setActiveChartType] = useState<ChartType>('Candles');

    const chartContainerRef = useRef<HTMLDivElement>(null);

    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<any> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
    const legendRef = useRef<HTMLDivElement>(null);

    const [chartData, setChartData] = useState<any[]>([]);
    const [, setRawData] = useState<any[]>([]);

    const chartTypes: ChartType[] = ['Candles', 'Line', 'Bar', 'Area', 'Histogram', 'Baseline'];

    // Handle chart type change with debouncing
    const handleChartTypeChange = (type: ChartType) => {
        if (loading || type === activeChartType) return;
        setActiveChartType(type);
    };

    // initialize first stock
    useEffect(() => {
        const tickers = Object.keys(stocklist);
        if (tickers.length > 0 && !selectedStock) {
            setSelectedStock(tickers[0]); // first ticker as default
        }
    }, []);

    // fetch stock data
    useEffect(() => {
        if (!selectedStock) return;

        const fetchStockData = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${baseURL}/stocks/${selectedStock}`);
                const data = await response.json();

                setRawData(data);

                const processedData = data
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
                            volume: Number(d.volume),
                        };
                    })
                    .sort((a: any, b: any) =>
                        a.time.year !== b.time.year
                            ? a.time.year - b.time.year
                            : a.time.month !== b.time.month
                                ? a.time.month - b.time.month
                                : a.time.day - b.time.day
                    );

                setChartData(processedData);
            } catch (err) {
                console.error("Error fetching stock data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, [selectedStock]);

    // Transform data based on chart type
    const getDataForChartType = (type: ChartType) => {
        if (!chartData.length) return [];

        switch (type) {
            case 'Candles':
                return chartData.map(d => ({
                    time: d.time,
                    open: d.open,
                    high: d.high,
                    low: d.low,
                    close: d.close,
                }));

            case 'Line':
                return chartData.map(d => ({
                    time: d.time,
                    value: d.close,
                }));

            case 'Area':
                return chartData.map(d => ({
                    time: d.time,
                    value: d.close,
                }));

            case 'Bar':
                return chartData.map(d => ({
                    time: d.time,
                    open: d.open,
                    high: d.high,
                    low: d.low,
                    close: d.close,
                }));

            case 'Histogram':
                return chartData.map(d => ({
                    time: d.time,
                    value: d.volume,
                    color: d.close >= d.open ? colors.green : colors.red,
                }));

            case 'Baseline': {
                const avgPrice = chartData.reduce((sum, d) => sum + d.close, 0) / chartData.length;
                return chartData.map(d => ({
                    time: d.time,
                    value: d.close,
                    topFillColor1: 'rgba(38, 166, 154, 0.28)',
                    topFillColor2: 'rgba(38, 166, 154, 0.05)',
                    bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
                    bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
                    topLineColor: upColor,
                    bottomLineColor: downColor,
                    baseValue: { type: 'price', price: avgPrice },
                }));
            }

            default:
                return [];
        }
    };

    // chart setup and update
    useEffect(() => {
        if (!chartContainerRef.current || !chartData.length) return;

        // Clear existing chart safely
        if (chartRef.current) {
            try {
                chartRef.current.remove();
            } catch (error) {
                console.warn('Chart removal error:', error);
            }
            chartRef.current = null;
            seriesRef.current = null;
            volumeSeriesRef.current = null;
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            grid: {
                vertLines: { color: "rgba(42, 46, 57, 0.6)" },
                horzLines: { color: "rgba(42, 46, 57, 0.6)" },
            },
            crosshair: {
                mode: 1,
            },
            rightPriceScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
            },
            timeScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
                timeVisible: true,
                secondsVisible: false,
            },
        });

        let mainSeries: ISeriesApi<any>;

        // Create series based on chart type
        switch (activeChartType) {
            case 'Candles':
                mainSeries = chart.addSeries(CandlestickSeries, {
                    upColor,
                    downColor,
                    borderUpColor,
                    borderDownColor,
                    wickUpColor,
                    wickDownColor,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Line':
                mainSeries = chart.addSeries(LineSeries, {
                    color: colors.blue100,
                    lineWidth: 2,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Area':
                mainSeries = chart.addSeries(AreaSeries, {
                    topColor: 'rgba(38, 166, 154, 0.56)',
                    bottomColor: 'rgba(38, 166, 154, 0.04)',
                    lineColor: 'rgba(38, 166, 154, 1)',
                    lineWidth: 2,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Bar':
                mainSeries = chart.addSeries(BarSeries, {
                    upColor,
                    downColor,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Histogram':
                mainSeries = chart.addSeries(HistogramSeries, {
                    color: colors.blue,
                    priceFormat: { type: "volume" },
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Baseline': {
                const avgPrice = chartData.reduce((sum, d) => sum + d.close, 0) / chartData.length;
                mainSeries = chart.addSeries(BaselineSeries, {
                    baseValue: { type: 'price', price: avgPrice },
                    topFillColor1: 'rgba(38, 166, 154, 0.28)',
                    topFillColor2: 'rgba(38, 166, 154, 0.05)',
                    bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
                    bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
                    topLineColor: upColor,
                    bottomLineColor: downColor,
                    lineWidth: 2,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
            }
                break;

            default:
                mainSeries = chart.addSeries(CandlestickSeries, {});
        }

        // Add volume series only for non-histogram charts
        let volumeSeries: ISeriesApi<"Histogram"> | null = null;
        if (activeChartType !== 'Histogram') {
            volumeSeries = chart.addSeries(HistogramSeries, {
                color: colors.blue,
                priceFormat: { type: "volume" },
                priceScaleId: "volume",
            });

            const volumeData = chartData.map(d => ({
                time: d.time,
                value: d.volume,
                color: d.close >= d.open ? colors.green : colors.red,
            }));

            volumeSeries.setData(volumeData);

            chart.priceScale("volume").applyOptions({
                scaleMargins: { top: 0.8, bottom: 0.0 },
            });
        }

        // Set data for main series
        const seriesData = getDataForChartType(activeChartType);
        mainSeries.setData(seriesData);

        // Calculate and add price/value lines based on chart type
        if (activeChartType === 'Histogram') {
            // For histogram (volume), show volume-based lines
            const volumes = chartData.map(d => d.volume);
            const minVolume = Math.min(...volumes);
            const maxVolume = Math.max(...volumes);
            const avgVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;

            const minVolumeLine = {
                price: minVolume,
                color: '#ef5350',
                lineStyle: 2,
                axisLabelVisible: true,
                title: 'Min Volume',
            };
            const avgVolumeLine = {
                price: avgVolume,
                color: '#FFB74D',
                lineStyle: 1,
                axisLabelVisible: true,
                title: 'Avg Volume',
            };
            const maxVolumeLine = {
                price: maxVolume,
                color: '#26a69a',
                lineStyle: 2,
                axisLabelVisible: true,
                title: 'Max Volume',
            };

            mainSeries.createPriceLine(minVolumeLine);
            mainSeries.createPriceLine(avgVolumeLine);
            mainSeries.createPriceLine(maxVolumeLine);
        } else {
            // For all other chart types (price-based), show price lines
            const prices = chartData.map(d => d.close);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

            const minPriceLine = {
                price: minPrice,
                color: '#ef5350',
                lineStyle: 2, // Dashed
                axisLabelVisible: true,
                title: 'Min Price',
            };
            const avgPriceLine = {
                price: avgPrice,
                color: '#FFB74D', // Orange color for better visibility
                lineStyle: 1, // Dotted
                axisLabelVisible: true,
                title: 'Avg Price',
            };
            const maxPriceLine = {
                price: maxPrice,
                color: '#26a69a',
                lineStyle: 2, // Dashed
                axisLabelVisible: true,
                title: 'Max Price',
            };

            mainSeries.createPriceLine(minPriceLine);
            mainSeries.createPriceLine(avgPriceLine);
            mainSeries.createPriceLine(maxPriceLine);
        }

        chart.priceScale("right").applyOptions({
            scaleMargins: { top: 0.1, bottom: activeChartType === 'Histogram' ? 0.1 : 0.4 },
        });

        chart.timeScale().fitContent();

        chartRef.current = chart;
        seriesRef.current = mainSeries;
        volumeSeriesRef.current = volumeSeries;

        chart.subscribeCrosshairMove((param) => {
            if (!legendRef.current || !param || !param.time) return;

            const bar = param.seriesData.get(mainSeries);
            if (!bar) return;

            const price = (bar as { close?: number }).close !== undefined
                ? (bar as { close: number }).close
                : (bar as { value?: number }).value;
            const dateStr =
                typeof param.time === "object"
                    ? `${param.time.year}-${param.time.month}-${param.time.day}`
                    : param.time;

            legendRef.current.innerHTML = `
                <div style="font-size: 30px; font-weight: 600;">${selectedStock ? stocklist[selectedStock as keyof typeof stocklist] : ""}</div>
                <div style="font-size: 24px; margin-top: 15px;">${price?.toFixed(2)}</div>
                <div style="font-size: 10px;">${dateStr}</div>
            `;
        });

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                try {
                    chartRef.current.applyOptions({
                        width: chartContainerRef.current.clientWidth,
                        height: chartContainerRef.current.clientHeight,
                    });
                } catch (error) {
                    console.warn('Chart resize error:', error);
                }
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (chartRef.current) {
                try {
                    chartRef.current.remove();
                } catch (error) {
                    console.warn('Chart cleanup error:', error);
                }
                chartRef.current = null;
                seriesRef.current = null;
                volumeSeriesRef.current = null;
            }
        };
    }, [backgroundColor, textColor, selectedStock, activeChartType, chartData]);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {/* Chart Type Tabs */}
            <div className="absolute left-4 top-4 z-10 flex space-x-1">
                {chartTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleChartTypeChange(type)}
                        disabled={loading}
                        className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${activeChartType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{
                            backgroundColor: activeChartType === type ? colors.blue100 : colors.gray100,
                            color: activeChartType === type ? colors.white : colors.gray,
                            border: 'none',
                            opacity: loading ? 0.5 : 1,
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Stock Dropdown */}
            <div className="w-64 absolute right-20 top-4 z-10">
                <StockSearchDropdown
                    selectedStock={selectedStock}
                    setSelectedStock={setSelectedStock}
                />
            </div>

            {/* Legend */}
            <div
                ref={legendRef}
                style={{
                    position: "absolute",
                    left: 50,
                    top: 100,
                    zIndex: 10,
                    fontFamily: "sans-serif",
                    lineHeight: "18px",
                    color: "white",
                }}
            />

            {/* Chart Container */}
            <div ref={chartContainerRef} className="w-full h-full" />
        </div>
    );
};

export default CandlestickChart;