import React from 'react'
import Badge from './Badge';
import Button from './Button';

const MockDashboard: React.FC = () => (
    <div className="border border-gray-200  rounded-2xl shadow-lg p-4">
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
    const icons = [
        {
            icon: "./image 2.png",
            title: "Portfolio Intelligence",
            url: "/"
        },
        {
            icon: "./image 3.png",
            title: "Charts",
            url: "/charts"
        },
        {
            icon: "./image 4.png",
            title: "Screener",
            url: "/technical"
        },
        {
            icon: "./image 5.png",
            title: "Smart Insights & Alerts",
            url: "/"
        },
        {
            icon: "./image 7.png",
            title: "Smart Insights & Alerts",
            url: "/"
        }
    ];
    return (
        <header className="pt-20 pb-6 bg-black">
            <div className="max-w-6xl mx-auto px-5 grid gap-8 lg:grid-cols-[1.2fr_0.9fr] items-center">
                <div>
                    <Badge>AI-driven Fintech for Investors</Badge>
                    <div className="text-4xl lg:text-5xl font-light leading-tight tracking-tight mt-4 mb-4 flex flex-col space-y-2">
                        <span>Smarter</span><span>Investing Starts</span><span>with AI</span>
                    </div>
                    <p className="text-gray-400 text-lg mb-6">
                        At <strong>WEALTHNOMICS</strong>, we merge fintech innovation with AI-powered intelligence.
                        Accelerate research, optimize portfolios, and uncover winning stocks—without the noise.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-5">
                        <Button className='font-medium text-lg'>Life Time Free</Button>
                        <Button className='font-medium text-lg' variant="ghost">See How It Works</Button>
                    </div>
                    {/* <div className="text-sm text-gray-600">
                        ⭐️⭐️⭐️⭐️⭐️ Rated by global investors • Trusted worldwide • Built with AI
                    </div> */}
                </div>
                <MockDashboard />
            </div>
            <div className="flex justify-between items-center max-w-6xl mx-auto mt-10">
                {icons.map((item, index) => (
                    <a href={item.url} className='flex flex-col items-center justify-center'>
                        <img key={index} src={item.icon} className="w-[80px] h-[80px] rounded-lg bg-transparent flex items-center justify-center font-extrabold">
                        </img>
                        <div className="font-medium text-white mt-4">{item.title}</div>
                    </a>
                ))}
            </div>
        </header>
    )
}

export default HeroSection;