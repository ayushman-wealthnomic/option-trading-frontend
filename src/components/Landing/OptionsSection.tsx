
const OptionsSection = () => {
    return (
        <div className="relative min-h-screen bg-black text-white p-4 sm:p-8 lg:p-24 overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 mx-4 sm:mx-6 md:mx-10 my-6 sm:my-8 md:my-10 bg-white/10 opacity-50 rounded-xl"></div>

            {/* Background Image - Responsive */}
            <img
                src={"./bearwire 1.png"}
                alt={"Bearwire"}
                className="absolute right-0 top-10 sm:right-10 sm:top-20 lg:right-20 lg:top-20 object-contain pointer-events-none opacity-70 w-48 sm:w-auto"
            />

            <div className="mx-auto z-30 relative px-4 sm:px-0">
                {/* Header */}
                <div className="mb-8 lg:mb-12 z-30 mt-8 sm:mt-0">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium mb-2 lg:mb-4">Options Platform</h2>
                    <h2 className="text-xl sm:text-2xl lg:text-4xl text-gray-400 mb-4 lg:mb-6 leading-tight">
                        Predictive Options Intelligence: Trade the<br className="hidden sm:inline" />
                        Catalyst, Not the Noise
                    </h2>
                    <p className="text-[#FF5D00] text-sm sm:text-lg max-w-3xl">
                        Stop guessing. Start quantifying. Our platform analyzes the historical win-rate and profit potential of every catalyst, allowing you to structure every options trade with a statistical edge.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-16 z-10">

                    {/* Step 1 & 2 Container */}
                    <div className='flex flex-col gap-8 sm:gap-10 z-10  border-[#FF5D00] pb-8 lg:border-r lg:border-[#FF5D00] lg:pb-0'>
                        <div className="space-y-4 col-span-1 h-[75%]">
                            <div className="text-[#FF5D00] text-4xl sm:text-5xl font-bold">1.</div>
                            <h3 className="text-lg sm:text-xl font-medium">Isolate Your Market Catalyst</h3>
                            <p className="text-gray-300 text-sm sm:text-base leading-8 max-w-md">
                                Select your signal from our 24 proprietary event trackers—from unexpected CEO transitions and activist investor stakes to S&P 500 inclusions and major buyback announcements.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-4 col-span-1 border-t border-[#FF5D00] pt-5 lg:border-t-1">
                            <div className="text-[#FF5D00] text-4xl sm:text-5xl font-bold pt-0 lg:pt-5">2.</div>
                            <h3 className="text-lg sm:text-xl font-medium">Deploy the AI Scanner</h3>
                            <p className="text-gray-300 text-sm sm:text-base leading-8 max-w-md">
                                Instantly, our AI scans the entire market to surface real-time opportunities that match your chosen catalyst. See which stocks triggered the event today, yesterday, or last week.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 & 5 Container */}
                    <div className='flex flex-col gap-8 sm:gap-10 border-b-1 sm:border-b-0 z-10 border-[#FF5D00] border-t-1 pt-5 sm:pt-5 sm:border-t-0 pb-8 lg:border-r lg:border-[#FF5D00] lg:pb-0 pl-0 '>
                        {/* Step 3 */}
                        <div className="space-y-4 col-span-1 md:pl-10 h-[60%]">
                            <div className="text-[#FF5D00] text-4xl sm:text-5xl font-bold">3.</div>
                            <h3 className="text-lg sm:text-xl font-medium">Apply Your Strategic Overlays</h3>
                            <p className="text-gray-300 text-sm sm:text-base leading-8 max-w-md">
                                Refine the AI's output with intelligent filters. Narrow the opportunity set by market cap, options liquidity, implied volatility, or your own custom trading parameters.
                            </p>
                        </div>

                        {/* Step 5 */}
                        <div className="space-y-4 col-span-1 border-t border-[#FF5D00] md:pl-10 pt-5 lg:border-t-1">
                            <div className="text-[#FF5D00] text-4xl sm:text-5xl font-bold pt-0 lg:pt-5">5.</div>
                            <h3 className="text-lg sm:text-xl font-medium">Activate AI Monitoring</h3>
                            <p className="text-gray-300 text-sm sm:text-base leading-8 max-w-md">
                                Deploy your custom AI agent. Set your catalyst and filter criteria and our system will monitor the market 24/7, alerting you the moment your next high-probability trade appears.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 - Spans two columns on tablet, one on mobile and desktop */}
                    <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1 z-10 pl-0 md:pl-10">
                        <div className="text-[#FF5D00] text-4xl sm:text-5xl font-bold">4.</div>
                        <h3 className="text-lg sm:text-xl font-medium">Receive Your AI-Generated Trade Blueprint</h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-8 max-w-md">
                            This is where data becomes your advantage. For each opportunity, our AI provides a complete analytical breakdown:
                        </p>
                        <ul className="text-gray-300 text-sm sm:text-base space-y-1 leading-8">
                            <li className="flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                <span><strong>Historical Precedent:</strong> See how similar events have impacted stock prices in the past.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                <span><strong>Predictive Price Move:</strong> Understand the typical magnitude and direction of the stock's movement.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                <span><strong>AI Confidence Score:</strong> Get our proprietary score on the probability of the event creating a significant impact.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                <span><strong>Optimal Strategy:</strong> Use our analytics to select the right strike price, expiration date, and profit-taking targets.</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Build Button */}
                <div className="flex justify-center md:justify-end mt-8 lg:mt-16">
                    <button className="text-[#FF5D00] underline font-light py-2 px-6 sm:py-3 sm:px-8 text-2xl sm:text-3xl lg:text-4xl flex items-center space-x-2 transition-colors duration-200">
                        <span>BUILD</span>
                        <img src="./_.png" alt="Image" className='ml-1 w-6 sm:w-auto' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OptionsSection;