import React from 'react';

type IndicatorPanelProps = {
    indicatorStates: {
        sma: Record<string, boolean>;
        ema: Record<string, boolean>;
        psar: boolean;
    };
    onToggleIndicator: (type: 'sma' | 'ema' | 'psar', period: string | null) => void;
    isHidden: boolean;
};

const IndicatorPanel: React.FC<IndicatorPanelProps> = ({ indicatorStates, onToggleIndicator, isHidden }) => {
    if (isHidden) {
        return null; // Don't render if hidden
    }

    return (
        <div id="indicatorPanel" className="indicator-panel">
            <div className="indicator-group-title">Simple Moving Averages (SMA)</div>
            <div className="indicator-group">
                {['9', '13', '21', '50', '200'].map(period => (
                    <label key={`sma-${period}`} className="indicator-checkbox-container">
                        <input
                            type="checkbox"
                            id={`toggleSma${period}Btn`}
                            checked={indicatorStates.sma[period]}
                            onChange={() => onToggleIndicator('sma', period)}
                        />
                        <label htmlFor={`toggleSma${period}Btn`}>{period} SMA</label>
                    </label>
                ))}
            </div>

            <div className="indicator-group-title mt-4">Exponential Moving Averages (EMA)</div>
            <div className="indicator-group">
                {['9', '13', '21', '50', '200'].map(period => (
                    <label key={`ema-${period}`} className="indicator-checkbox-container">
                        <input
                            type="checkbox"
                            id={`toggleEma${period}Btn`}
                            checked={indicatorStates.ema[period]}
                            onChange={() => onToggleIndicator('ema', period)}
                        />
                        <label htmlFor={`toggleEma${period}Btn`}>{period} EMA</label>
                    </label>
                ))}
            </div>
            <div className="indicator-group-title mt-4">Other Indicators</div>
            <div className="indicator-group">
                <label className="indicator-checkbox-container">
                    <input
                        type="checkbox"
                        id="togglePsarBtn"
                        checked={indicatorStates.psar}
                        onChange={() => onToggleIndicator('psar', null)}
                    />
                    <label htmlFor="togglePsarBtn">PSAR</label>
                </label>
            </div>
        </div>
    );
};

export default IndicatorPanel;