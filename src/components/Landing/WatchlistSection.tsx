import React from 'react';

const WatchlistSection: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-black text-white p-8 lg:p-24">
            <div className="absolute inset-0 m-10 bg-white/10 opacity-50 rounded-xl"></div>
            <img
                src={"./watchlist 1.png"}
                alt={"Bearwire"}
                className="absolute right-0 -top-30 z-10 object-contain pointer-events-none opacity-70"
            />

            <div className="mx-auto px-5 relative z-10">
                {/* Main Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Column: Title and Subtitle */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-5xl lg:text-7xl font-medium mb-8">
                                The Intelligent<br />
                                Stock<br />
                                Watchlist & AI<br />
                                Portfolios
                            </h2>
                            <p className="text-gray-300 text-4xl leading-snug max-w-md">
                                Wealth Management<br />
                                for a New Generation &<br />
                                Your Personal AI Analyst
                            </p>
                        </div>
                        <a href="#" className="text-[#FFD050] font-light underline text-3xl pr-96s">
                            Stop tracking, and start analysing.
                        </a>
                    </div>

                    {/* Right Column: AI Features Grid */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
                        <div className="absolute inset-0 bg-white/10 opacity-50 rounded"></div>
                        {/* Column 1: Sophisticated AI Engine */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-medium">Sophisticated AI Engine</h3>
                                <p className="text-gray-300 text-md leading-relaxed">
                                    Our proprietary methodology is the core of our advantage. It analyses over 3,600 features per stock, using advanced AI.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-medium">Engineered for Consistent Outcomes</h3>
                                <p className="text-gray-300 text-md leading-relaxed">
                                    Our algorithms are specifically designed for low volatility and minimal drawdowns. We don't just aim for growth; we aim for consistent, stress-free growth.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-medium">Human Expertise at the Helm</h3>
                                <p className="text-gray-300 text-md leading-relaxed">
                                    The best technology is guided by deep experience. Our senior team brings over 150 years of combined industry experience, ensuring that our AI strategies are grounded in a real-world understanding of what makes investment portfolios work.
                                </p>
                            </div>
                        </div>

                        {/* Column 2: Alerts and Analysis */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-medium">Real-Time AI Score & Analysis</h3>
                                <p className="text-gray-300 text-md leading-relaxed">
                                    Every stock on your watchlist is given a live AI Score based on our legendary investor clones and specialist agents. Instantly see how it stacks up on Value, Growth, and Quality.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-medium">Opportunity & Risk Alerts</h3>
                                <p className="text-gray-300 text-md leading-relaxed">
                                    Never miss a critical moment. Our system will proactively alert you to key events for the stocks you're watching. Get notified when a stock enters the "undervalued" zone according to our Valuation Agent.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-medium">Automated Scuttlebutt</h3>
                                <p className="text-gray-300 text-md leading-relaxed">
                                    Our AI acts as your personal research assistant. It constantly scans news, filings, and market sentiment related to your watchlist stocks, delivering you a curated feed of the insights that truly matter, saving you hours of research time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-12 flex justify-end">
                    <a href="#" className="text-[#FFD050] flex font-light underline text-3xl">
                        <span>Create your first Intelligent<br /> Watchlist today</span>
                        <svg className="w-8 h-8 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WatchlistSection;