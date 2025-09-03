import React from 'react'

interface ChecklistItem {
    text: string;
    description: string;
}

const ChecklistItem: React.FC<ChecklistItem> = ({ text, description }) => {
    return (
        <div className="flex items-start space-x-3">
            <span className="text-green-500 text-2xl font-bold">✓</span>
            <div>
                <h4 className="font-semibold">{text}</h4>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

const PortfolioSection = () => {
    const checklistItems: ChecklistItem[] = [
        {
            text: "Unified view of all your assets",
            description: "Track multiple accounts and get a holistic, AI-driven analysis."
        },
        {
            text: "Sync your broker in minutes",
            description: "Connect 2,000+ brokers and let our AI get to work instantly."
        },
        {
            text: "Hyper-Personalized Alerts",
            description: "Receive AI-driven alerts that cut through the noise and are relevant to you."
        }
    ];

    return (
        <section style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)' }} className="py-20">
            <div className="container mx-auto px-6 text-center">
                <p className="text-blue-600 font-semibold">AI Portfolio Management</p>
                <h2 className="mt-2 text-4xl font-bold text-gray-900">AI-Powered Portfolio Management. <br /> Effortlessly Simple.</h2>
                <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-left">
                    {checklistItems.map((item, index) => (
                        <ChecklistItem key={index} {...item} />
                    ))}
                </div>
                <div className="mt-12 flex justify-center space-x-4">
                    <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                        View demo portfolio
                    </button>
                    <button className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition duration-300">
                        Learn more
                    </button>
                </div>
                <div className="mt-16">
                    <img
                        src="https://placehold.co/900x450/1A202C/FFFFFF?text=AI+Portfolio+Visualization"
                        alt="AI Analysis of Portfolio Returns"
                        className="rounded-xl shadow-2xl mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}

export default PortfolioSection