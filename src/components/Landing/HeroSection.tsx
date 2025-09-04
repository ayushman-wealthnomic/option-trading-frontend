import React from 'react'
import Badge from './Badge';
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

const MockDashboard: React.FC = () => (
    <div className="border border-gray-600 rounded-md shadow-lg p-2">
        {/* <div className="h-8 rounded-lg bg-white bg-opacity-10 mb-3"></div> */}
        <img src="./chart_demo.png" alt="Chart" className='object-cover' />
        {/* <div
            className="h-72 rounded-lg opacity-90"
            style={{
                background: 'conic-gradient(from 270deg at 75% 35%, #2BD88F, #6C7CFF, #7C4DFF, #2BD88F)'
            }}
        ></div> */}
    </div>
);

const HeroSection = () => {
    // const icons = [
    //     {
    //         icon: "./image 2.png",
    //         title: "Portfolio Intelligence",
    //         url: "/"
    //     },
    //     {
    //         icon: "./image 3.png",
    //         title: "Charts",
    //         url: "/charts"
    //     },
    //     {
    //         icon: "./image 4.png",
    //         title: "Screener",
    //         url: "/technical"
    //     },
    //     {
    //         icon: "./image 5.png",
    //         title: "Smart Insights & Alerts",
    //         url: "/"
    //     },
    // ];
    return (
        <header className="pt-20 pb-6 bg-black">
            <div className="absolute inset-0 m-10 bg-white/10 opacity-50 rounded-xl"></div>
            <div className="mx-auto px-34 grid gap-8 lg:grid-cols-[1.2fr_0.9fr] items-center z-30">
                <div className='z-30'>
                    <Badge>AI-driven Fintech for Investors</Badge>
                    <div className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight mt-4 mb-4 flex flex-col space-y-2">
                        <span>Smarter</span><span>Investing Starts</span><span>with AI</span>
                    </div>
                    <p className="text-gray-300 text-2xl leading-relaxed pr-20">
                        At <strong>WEALTHNOMICS</strong>, we merge fintech innovation with AI-powered intelligence.
                        Accelerate research, optimize portfolios, and uncover winning stocks—without the noise.
                    </p>
                    {/* <div className="flex flex-wrap gap-4 mb-5">
                        <Button className='font-medium text-lg'>Life Time Free</Button>
                        <Button className='font-medium text-lg' variant="ghost">See How It Works</Button>
                    </div> */}
                    {/* <div className="text-sm text-gray-600">
                        ⭐️⭐️⭐️⭐️⭐️ Rated by global investors • Trusted worldwide • Built with AI
                    </div> */}
                </div>
                <MockDashboard />
            </div>
            <div className="mx-auto px-5 text-center mt-20">
                <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-4">
                    Zero Guesswork. <span style={{ color: theme.colors.brand }}>Only Intelligent Decisions.</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 px-96">
                    WEALTHNOMICS combines technical and fundamental analysis with AI models to deliver research,
                    valuation, and portfolio insights—all in one place.
                </p>
            </div>
            {/* <div className="flex justify-between items-center max-w-6xl mx-auto mt-20 z-30 space-x-20">
                {icons.map((item, index) => (
                    <a href={item.url} className='flex flex-col items-center justify-center z-30'>
                        <img key={index} src={item.icon} className="w-[80px] h-[80px] rounded-lg bg-transparent flex items-center justify-center font-extrabold">
                        </img>
                        <div className="font-medium text-white mt-4">{item.title}</div>
                    </a>
                ))}
            </div> */}
        </header>
    )
}

export default HeroSection;