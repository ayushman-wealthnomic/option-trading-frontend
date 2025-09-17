// src/components/StockCard.tsx
import React from "react";
import type { Stock } from "../../../types";
import { useNavigate } from "react-router-dom";

interface StockCardProps {
    stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
    const navigate = useNavigate();
    const isPositive = stock.change >= 0;
    const colorClass = isPositive ? "text-green-500" : "text-red-500";
    const chartColor = isPositive ? "#22c55e" : "#ef4444"; // Tailwind green-500 / red-500
    const changeSign = isPositive ? "+" : "";

    /**
     * Generates an SVG sparkline with a dashed line for the previous day's close.
     */
    const generateSparkline = (
        data: number[],
        color: string,
        prevDayClose?: number
    ): string => {
        const width = 120;
        const height = 50;
        const padding = 5;

        // include prevDayClose so it's inside the Y-axis domain
        const allValues =
            prevDayClose !== undefined ? [...data, prevDayClose] : data;

        const maxVal = Math.max(...allValues);
        const minVal = Math.min(...allValues);
        const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

        // build points for the polyline
        const points = data
            .map((d, i) => {
                const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
                const y =
                    height -
                    padding -
                    ((d - minVal) / range) * (height - 2 * padding);
                return `${x},${y}`;
            })
            .join(" ");

        // dashed line for previous close
        let refLine = "";
        if (prevDayClose !== undefined) {
            const refY =
                height -
                padding -
                ((prevDayClose - minVal) / range) * (height - 2 * padding);
            refLine = `<line
          x1="${padding}"
          y1="${refY}"
          x2="${width - padding}"
          y2="${refY}"
          stroke="#9ca3af"
          stroke-width="1"
          stroke-dasharray="2,2"
        />`;
        }

        return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="w-full h-16 mt-auto">
        ${refLine}
        <polyline
          fill="none"
          stroke="${color}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          points="${points}"
        />
      </svg>`;
    };

    // take prev_day_close from data or compute from history
    const prevClose =
        (stock as any).prev_day_close ??
        (stock.history.length > 1
            ? stock.history[stock.history.length - 2]
            : undefined);

    return (
        <div className="bg-[#111111] p-5 flex flex-col shadow-lg hover:shadow-gray-500/20 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 rounded" onClick={() => { navigate(`/clone/${stock.symbol}`) }}>
            <div className="flex-grow">
                <h2 className="text-xl font-semibold text-white">{stock.symbol}</h2>
                <p className="text-md overflow-ellipsis truncate">{stock.companyName}</p>
                <p className="text-md text-white/50 overflow-ellipsis truncate">{stock.industry}</p>
            </div>

            {/* SVG sparkline with dashed reference line */}
            <div className="flex justify-center items-center gap-2">
                <div className="flex flex-col space-y-1 mb-2">
                    <p className={`text-3xl font-bold ${colorClass} mt-2`}>
                        {changeSign}
                        {stock.change.toFixed(2)}%
                    </p>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: generateSparkline(stock.history, chartColor, prevClose),
                    }}
                />
            </div>
        </div>
    );
};

export default StockCard;
