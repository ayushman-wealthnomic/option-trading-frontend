import FeatureCard from "./FeatureCard";


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

const FeaturesSection = () => {
    const features = [
        {
            icon: "✓",
            title: "Portfolio Intelligence",
            description: "AI-powered monitoring that adapts to your holdings."
        },
        {
            icon: "✓",
            title: "Visual Stock Reports",
            description: "Data-rich insights with fundamentals decoded."
        },
        {
            icon: "✓",
            title: "AI-Driven Valuations",
            description: "Updated in real time with multiple models."
        },
        {
            icon: "✓",
            title: "Smart Insights & Alerts",
            description: "Weekly signals that truly matter."
        }
    ];

    return (
        <section id="features" className="py-4 bg-black">
            <div className="max-w-6xl mx-auto px-5 text-center">
                <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-4">
                    Zero Guesswork. <span style={{ color: theme.colors.brand }}>Only Intelligent Decisions.</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                    WEALTHNOMICS combines technical and fundamental analysis with AI models to deliver research,
                    valuation, and portfolio insights—all in one place.
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection