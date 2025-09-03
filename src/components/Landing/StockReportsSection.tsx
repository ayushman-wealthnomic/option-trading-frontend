const StockReportsSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-blue-600 font-semibold">AI Stock Reports</p>
                    <h2 className="mt-2 text-4xl font-bold text-gray-900">Deep-Dive with AI Stock Analysis.</h2>
                    <p className="mt-4 text-lg text-gray-600">Our AI performs comprehensive technical and fundamental analysis on any stock, presenting it in an unbiased, easy-to-digest visual format.</p>
                </div>
                <div className="mt-12">
                    <img
                        src="https://placehold.co/1100x500/1A202C/FFFFFF?text=In-depth+AI+Stock+Report"
                        alt="In-depth AI stock report visualization"
                        className="rounded-xl shadow-2xl mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}

export default StockReportsSection