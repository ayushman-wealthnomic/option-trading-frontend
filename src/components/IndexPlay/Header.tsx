import React from 'react';

interface LastPriceInfo {
    currentPrice: string;
    previousPrice: string;
    timestamp?: string | null;
}

interface HeaderProps {
    lastPriceInfo: LastPriceInfo;
    onToggleIndicatorPanel: () => void;
}

const Header: React.FC<HeaderProps> = ({ lastPriceInfo, onToggleIndicatorPanel }) => {
    const { currentPrice, previousPrice, timestamp } = lastPriceInfo;

    const priceClass =
        currentPrice === 'N/A'
            ? 'text-gray-300'
            : parseFloat(currentPrice) >= parseFloat(previousPrice)
                ? 'text-green-500'
                : 'text-red-500';

    const formattedDate = timestamp ? new Date(timestamp).toLocaleDateString() : 'N/A';

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">NIFTY 50 - Live Simulation</h1>
                <p className="text-sm text-gray-400">Real Historical Data</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button id="toggleIndicatorPanelBtn" className="btn btn-secondary" onClick={onToggleIndicatorPanel}>
                    Hide Indicators
                </button>
                <div id="last-price-info" className="text-right min-w-[100px]">
                    <p className="text-lg font-semibold text-gray-300">Last Close:</p>
                    <p id="last-close" className={`text-2xl font-bold ${priceClass}`}>
                        {parseFloat(currentPrice).toFixed(2) || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-400">Date: <span id="last-date">{formattedDate}</span></p>
                </div>
            </div>
        </div>
    );
};

export default Header;