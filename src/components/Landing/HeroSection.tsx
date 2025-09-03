const HeroSection = () => {
    return (
        <section style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)' }} className="py-20">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                            AI-Powered Investing. <br /> Unleash Your Portfolio's Potential.
                        </h1>
                        <p className="mt-6 text-lg text-gray-600">
                            Leverage our advanced AI models and autonomous agents to perform deep technical and fundamental analysis, uncovering winning stocks effortlessly.
                        </p>
                        <div className="mt-8 flex justify-center md:justify-start items-center space-x-4">
                            <img
                                src="https://placehold.co/120x40/EFEFEF/333333?text=Investors"
                                alt="Investor avatars"
                                className="rounded-full"
                            />
                            <span className="text-gray-500">Join a global community of 7m+ investors</span>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
                                Start free
                            </button>
                            <button className="bg-white border border-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition duration-300">
                                Demo portfolio
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">No credit card required. Free forever.</p>
                    </div>
                    <div>
                        <img
                            src="https://placehold.co/600x400/1A202C/FFFFFF?text=Dashboard+Preview"
                            alt="AI Investing Dashboard Preview"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
                <div className="mt-16 text-center">
                    <div className="max-w-xl mx-auto">
                        <p className="text-yellow-500 text-2xl mb-2">★★★★★</p>
                        <p className="text-lg text-gray-600 italic">"The AI-driven insights are a game-changer. WEALTHNOMICS provides incredibly deep analysis that's both easy to understand and actionable. A must-have for any serious investor."</p>
                        <p className="mt-4 font-semibold text-gray-800">- Alex from New York</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection