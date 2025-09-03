import { BarChart3, Bell, TrendingUp, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeaturesSection = () => {
    const features: Feature[] = [
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Portfolio Intelligence",
            description: "Let our AI analyze your portfolio, tracking true returns, valuation, and providing predictive insights."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Visual In-depth Stock Reports",
            description: "Go beyond the numbers with AI-generated reports that visualize complex fundamental and technical data."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Market Relevant Investing Ideas",
            description: "Discover new opportunities with AI agents that constantly scan the market for winning stocks in any cycle."
        },
        {
            icon: <Bell className="w-8 h-8" />,
            title: "Smart Updates & Weekly Insights",
            description: "Receive concise, timely updates and insights curated by our AI, focusing only on what truly matters."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-gray-900">Harness the Power of AI. <br /> Make Smarter Decisions.</h2>
                <p className="mt-4 text-lg text-gray-600">Our suite of AI-powered tools cuts through the noise, providing you with a clear, data-driven edge.</p>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection