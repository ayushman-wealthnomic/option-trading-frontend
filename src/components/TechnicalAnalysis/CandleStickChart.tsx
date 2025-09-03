import {
    CandlestickSeries,
    LineSeries,
    AreaSeries,
    BarSeries,
    HistogramSeries,
    BaselineSeries,
    createChart,
    ColorType,
    LineStyle,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import { baseURL } from "@/lib/baseURL";
import stocklist from "../../../data/stockList.json";
import StockSearchDropdown from "./DropDown";
import { Button } from "../ui/button";
import stock_data from "../../../data/sd_data_by_symbol_processed.json";
import { Loader, Moon, Sun } from "lucide-react";

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
type Theme = 'dark' | 'light';

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
            upColor = "#26a69a",
            downColor = "#ef5350",
        } = {},
    } = props;

    const [loading, setLoading] = useState(false);
    const [activeChartType, setActiveChartType] = useState<ChartType>('Candles');
    const [theme, setTheme] = useState<Theme>('dark');

    console.log(theme);


    const chartContainerRef = useRef<HTMLDivElement>(null);

    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<any> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
    const legendRef = useRef<HTMLDivElement>(null);

    const [chartData, setChartData] = useState<any[]>([]);
    const [, setRawData] = useState<any[]>([]);

    // Theme configurations
    const themeConfig = {
        dark: {
            backgroundColor: "black",
            textColor: "white",
            gridColor: "rgba(42, 46, 57, 0.6)",
            borderColor: "rgba(197, 203, 206, 0.8)",
            upColor: "#26a69a",
            downColor: "#ef5350",
            lineColor: colors.blue100,
            areaTopColor: 'rgba(38, 166, 154, 0.56)',
            areaBottomColor: 'rgba(38, 166, 154, 0.04)',
            volumeColor: colors.blue,
            legendColor: "white",
        },
        light: {
            backgroundColor: "white",
            textColor: "#333333",
            gridColor: "rgba(197, 203, 206, 0.1)",
            borderColor: "rgba(42, 46, 57, 0.8)",
            upColor: "#089981",
            downColor: "#f23645",
            lineColor: "#2962FF",
            areaTopColor: 'rgba(41, 98, 255, 0.28)',
            areaBottomColor: 'rgba(41, 98, 255, 0.05)',
            volumeColor: "#26a69a",
            legendColor: "#333333",
        }
    };

    const currentTheme = themeConfig[theme];

    const chartTypes: ChartType[] = ['Candles', 'Line', 'Bar', 'Area', 'Baseline'];

    // Handle theme toggle
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

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
                background: { type: ColorType.Solid, color: currentTheme.backgroundColor },
                textColor: currentTheme.textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            grid: {
                vertLines: { color: currentTheme.gridColor },
                horzLines: { color: currentTheme.gridColor },
            },
            crosshair: {
                mode: 1,
            },
            rightPriceScale: {
                borderColor: currentTheme.borderColor,
            },
            timeScale: {
                borderColor: currentTheme.borderColor,
                timeVisible: true,
                secondsVisible: false,
            },
        });

        let mainSeries: ISeriesApi<any>;

        // Create series based on chart type
        switch (activeChartType) {
            case 'Candles':
                mainSeries = chart.addSeries(CandlestickSeries, {
                    upColor: currentTheme.upColor,
                    downColor: currentTheme.downColor,
                    borderUpColor: currentTheme.upColor,
                    borderDownColor: currentTheme.downColor,
                    wickUpColor: currentTheme.upColor,
                    wickDownColor: currentTheme.downColor,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Line':
                mainSeries = chart.addSeries(LineSeries, {
                    color: currentTheme.lineColor,
                    lineWidth: 2,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Area':
                mainSeries = chart.addSeries(AreaSeries, {
                    topColor: currentTheme.areaTopColor,
                    bottomColor: currentTheme.areaBottomColor,
                    lineColor: currentTheme.lineColor,
                    lineWidth: 2,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Bar':
                mainSeries = chart.addSeries(BarSeries, {
                    upColor: currentTheme.upColor,
                    downColor: currentTheme.downColor,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;

            case 'Histogram':
                mainSeries = chart.addSeries(HistogramSeries, {
                    color: currentTheme.volumeColor,
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
                    topFillColor1: theme === 'dark' ? 'rgba(38, 166, 154, 0.28)' : 'rgba(41, 98, 255, 0.28)',
                    topFillColor2: theme === 'dark' ? 'rgba(38, 166, 154, 0.05)' : 'rgba(41, 98, 255, 0.05)',
                    bottomFillColor1: theme === 'dark' ? 'rgba(239, 83, 80, 0.05)' : 'rgba(242, 54, 69, 0.05)',
                    bottomFillColor2: theme === 'dark' ? 'rgba(239, 83, 80, 0.28)' : 'rgba(242, 54, 69, 0.28)',
                    topLineColor: currentTheme.upColor,
                    bottomLineColor: currentTheme.downColor,
                    lineWidth: 2,
                    priceScaleId: "right",
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
                break;
            }

            default:
                mainSeries = chart.addSeries(CandlestickSeries, {});
        }

        // Add volume series only for non-histogram charts
        let volumeSeries: ISeriesApi<"Histogram"> | null = null;
        if (activeChartType !== 'Histogram') {
            volumeSeries = chart.addSeries(HistogramSeries, {
                color: currentTheme.volumeColor,
                priceFormat: { type: "volume" },
                priceScaleId: "volume",
            });

            const volumeData = chartData.map(d => ({
                time: d.time,
                value: d.volume,
                color: d.close >= d.open ? currentTheme.upColor : currentTheme.downColor,
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
            if (selectedStock && stock_data[selectedStock as keyof typeof stock_data]) {
                const { supply, demand } = stock_data[selectedStock as keyof typeof stock_data];

                // Loop over demand values
                demand.forEach((price,) => {
                    mainSeries.createPriceLine({
                        price,
                        color: '#1BE3D0',
                        lineStyle: LineStyle.Dashed,
                        lineWidth: 1,
                        axisLabelVisible: true,
                        title: `Demand`,
                    });
                });

                // Loop over supply values
                supply.forEach((price,) => {
                    mainSeries.createPriceLine({
                        price,
                        color: '#F50510',
                        lineStyle: LineStyle.Dashed,
                        lineWidth: 1,
                        axisLabelVisible: true,
                        title: `Supply`,
                    });
                });
            }
        }

        chart.priceScale("right").applyOptions({
            scaleMargins: { top: 0.1, bottom: activeChartType === 'Histogram' ? 0.1 : 0.4 },
        });

        if (chartData.length > 0) {
            // Show only the last 100 bars (adjust number as needed)
            const from = chartData[Math.max(0, chartData.length - 300)].time;
            const to = chartData[chartData.length - 1].time;

            chart.timeScale().setVisibleRange({ from, to });
        } else {
            chart.timeScale().fitContent(); // fallback if no data
        }

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
                <div style="font-size: 30px; font-weight: 600; color: ${currentTheme.legendColor};">${selectedStock ? stocklist[selectedStock as keyof typeof stocklist] : ""}</div>
                <div style="font-size: 24px; margin-top: 15px; color: ${currentTheme.legendColor};">${price?.toFixed(2)}</div>
                <div style="font-size: 10px; color: ${currentTheme.legendColor};">${dateStr}</div>
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
    }, [selectedStock, activeChartType, chartData, theme]);

    {
        return (loading ? (<div className="flex justify-center items-center h-full">
            <Loader className={`w-6 h-6 animate-spin ${theme === 'dark' ? 'text-white' : 'text-black'
                }`} />
        </div>) : (<div style={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: currentTheme.backgroundColor
        }}>
            {/* Chart Type Tabs */}
            <div className="absolute left-4 top-4 z-10 flex space-x-3">
                {chartTypes.map((type) => (
                    <Button
                        key={type}
                        onClick={() => handleChartTypeChange(type)}
                        disabled={loading}
                        className={`${theme === 'dark'
                            ? `bg-black text-white border-gray-800 hover:bg-gray-900 hover:scale-105 hover:shadow-lg  ${activeChartType === type ? 'bg-white text-black border-white' : ''}`
                            : `bg-white text-black border-gray-300 hover:scale-105 hover:shadow-lg ${activeChartType === type ? 'bg-black text-white border-black' : ''}`
                            }`}
                    >
                        {type}
                    </Button>
                ))}

                <button
                    onClick={toggleTheme}
                    className={`
                            hover:scale-105 hover:shadow-lg
                            relative inline-flex items-center justify-center
                            w-10 h-10 rounded-xl
                            transition-all duration-300 ease-in-out
                            ${theme === 'dark'
                            ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }
                            border shadow-lg hover:shadow-xl
                        `}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {/* Sun icon */}
                    <Sun
                        className={`
                                absolute w-4 h-4
                                transition-all duration-500 ease-in-out
                                ${theme === 'dark'
                                ? 'scale-0 rotate-90 opacity-0 text-gray-400'
                                : 'scale-100 rotate-0 opacity-100 text-gray-700'
                            }
                            `}
                    />

                    {/* Moon icon */}
                    <Moon
                        className={`
                                absolute w-4 h-4
                                transition-all duration-500 ease-in-out
                                ${theme === 'dark'
                                ? 'scale-100 rotate-0 opacity-100 text-gray-200'
                                : 'scale-0 -rotate-90 opacity-0 text-gray-400'
                            }
                            `}
                    />
                </button>

                {/* <Button
                    variant="default"
                    onClick={toggleTheme}
                    disabled={loading}
                    className={`hover:scale-105 hover:shadow-lg
                            relative inline-flex items-center justify-center
                            w-10 h-10 rounded-xl
                            transition-all duration-300 ease-in-out
                            ${theme === 'dark'
                            ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }
                            border shadow-lg hover:shadow-xl}`}
                    style={{
                        // backgroundColor: theme === 'dark' ? '#FFA726' : '#424242',
                        color: theme === 'dark' ? '#000' : '#fff',
                        border: 'none',
                        opacity: loading ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </Button> */}


            </div>

            {/* Theme Toggle Button */}

            {/* Stock Dropdown */}
            <div className="w-64 absolute right-20 top-4 z-10">
                <StockSearchDropdown
                    theme={theme}
                    selectedStock={selectedStock}
                    setSelectedStock={setSelectedStock}
                />
            </div>

            {/* Legend */}
            <div
                ref={legendRef}
                style={{
                    position: "absolute",
                    left: 80,
                    top: 70,
                    zIndex: 10,
                    fontFamily: "sans-serif",
                    lineHeight: "18px",
                    color: currentTheme.legendColor,
                }}
            />

            {/* Chart Container */}
            <div ref={chartContainerRef} className="w-full h-full" />
        </div>)
        )
    }
};

export default CandlestickChart;