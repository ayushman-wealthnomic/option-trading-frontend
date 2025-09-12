import Badge from "./Badge";


const theme = {
    colors: {
        bgTop: '#EAF0FF',
        bgMid: '#F6ECF3',
        bgBottom: '#FFF5EC',
        ink: '#0E1320',
        inkSoft: '#30364A',
        muted: '#6E778A',
        brand: '#6C7CFF',
        brand2: '#7C4DFF',
        cta: '#1E88E5',
        card: '#ffffff',
        cardDark: '#0B0E19',
        accent: '#11C786',
        warn: '#F59E0B',
        danger: '#EF4444',
        ring: 'rgba(108,124,255,.35)',
    },
};

const MockDashboard = () => (
    <div className="border border-gray-600 rounded-md shadow-lg p-2">
        <img src="./chart_demo.png" alt="Chart" className="w-full h-auto object-cover rounded" />
    </div>
);

const HeroSection = () => {
    return (
        <header className="relative min-h-screen bg-black text-white overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 mx-4 sm:mx-6 md:mx-10 my-6 sm:my-8 md:my-10 bg-white/10 opacity-50 rounded-xl"></div>

            {/* Main content container */}
            <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-38">
                <div className="mx-auto">
                    {/* Hero grid */}
                    <div className="grid gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-[1.2fr_0.9fr] items-center">
                        {/* Left content */}
                        <div className="text-center lg:text-left">
                            <Badge>AI-driven Fintech for Investors</Badge>

                            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mt-4 mb-6">
                                <div className="flex flex-col space-y-1 sm:space-y-2">
                                    <span>Smarter</span>
                                    <span>Investing Starts</span>
                                    <span>with AI</span>
                                </div>
                            </h2>

                            <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed sm:max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
                                At <strong className="text-white">WEALTHNOMICS</strong>, we merge fintech innovation with AI-powered intelligence.
                                Accelerate research, optimize portfolios, and uncover winning stocks—without the noise.
                            </p>
                        </div>

                        {/* Right content - Dashboard */}
                        <div>
                            <MockDashboard />
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="text-center mt-16 sm:mt-20 lg:mt-24">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-2">
                            Zero Guesswork.{' '}
                            <span style={{ color: theme.colors.brand }} className="block sm:inline">
                                Only Intelligent Decisions.
                            </span>
                        </h2>

                        <p className="text-gray-400 text-base sm:text-lg lg:text-xls max-w-4xl mx-auto px-4">
                            WEALTHNOMICS combines technical and fundamental analysis with AI models to deliver research,
                            valuation, and portfolio insights—all in one place.
                        </p>
                    </div>
                </div>
            </div>

            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none"></div>
        </header>
    )
}

export default HeroSection;