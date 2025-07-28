type PlotButtonsProps = {
    onPlotCandles: (count: number) => void;
    plottedCandleIndex: number;
    fullDataLength: number;
};

const PlotButtons = ({ onPlotCandles, plottedCandleIndex, fullDataLength }: PlotButtonsProps) => {
    const isPlotDisabled = plottedCandleIndex >= fullDataLength;

    return (
        <div className="button-group mt-4">
            <button
                id="plotNextCandleBtn"
                className="btn btn-primary"
                onClick={() => onPlotCandles(1)}
                disabled={isPlotDisabled}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
                <span>{isPlotDisabled ? 'No More Data' : 'Plot Next Candle'}</span>
            </button>
            <button
                id="plotTwoCandlesBtn"
                className="btn btn-primary"
                onClick={() => onPlotCandles(2)}
                disabled={isPlotDisabled}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
                <span>Plot 2 Candles</span>
            </button>
            <button
                id="plotFiveCandlesBtn"
                className="btn btn-primary"
                onClick={() => onPlotCandles(5)}
                disabled={isPlotDisabled}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
                <span>Plot 5 Candles</span>
            </button>
        </div>
    );
};

export default PlotButtons;