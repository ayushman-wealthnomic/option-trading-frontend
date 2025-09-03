import AnalysisCard from './AnalysisCard';

const AnalysisSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-8">
                    <AnalysisCard
                        title="AI Performance Benchmark"
                        description="Benchmark your performance with AI-driven comparisons and predictive analytics."
                        imageSrc="https://placehold.co/500x300/2D3748/FFFFFF?text=Performance+Graph"
                        imageAlt="Performance Graph"
                    />
                    <AnalysisCard
                        title="AI-Assisted Dividend Analysis"
                        description="Leverage AI to assess dividend reliability and get accurate monthly income forecasts."
                        imageSrc="https://placehold.co/500x300/2D3748/FFFFFF?text=Dividend+Chart"
                        imageAlt="Dividend Chart"
                    />
                </div>
                <div className="mt-8 bg-gray-800 text-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold">AI-Driven Composition Analysis</h3>
                    <p className="mt-2 text-gray-400">Our AI visualizes your portfolio's distribution, highlighting risks and opportunities across sectors.</p>
                    <img
                        src="https://placehold.co/1000x300/2D3748/FFFFFF?text=Composition+Analysis+Diagram"
                        className="mt-6 rounded-lg"
                        alt="Composition Analysis"
                    />
                </div>
            </div>
        </section>
    );
}

export default AnalysisSection