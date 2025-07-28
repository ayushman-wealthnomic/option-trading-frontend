import React from 'react';

interface ControlsProps {
    timeframes: string[];
    selectedTimeframe: string;
    onSelectTimeframe: (timeframe: string) => void;
    loadingMessage?: string;
    errorMessage?: string;
}

const Controls: React.FC<ControlsProps> = ({ timeframes, selectedTimeframe, onSelectTimeframe, loadingMessage, errorMessage }) => {
    return (
        <div className="top-controls">
            <div className="flex items-center space-x-4">
                <div className="select-wrapper">
                    <select id="timeframeSelect" value={selectedTimeframe} onChange={(e) => onSelectTimeframe(e.target.value)}>
                        <option value="">Select Timeframe</option>
                        {timeframes.map((file) => (
                            <option key={file} value={file}>
                                {file}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {loadingMessage && <p id="loadingMessage" className="text-blue-400">{loadingMessage}</p>}
            {errorMessage && <p id="errorMessage" className="text-red-400">{errorMessage}</p>}
        </div>
    );
};

export default Controls;