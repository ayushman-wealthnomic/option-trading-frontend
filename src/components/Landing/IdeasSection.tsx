
import Button from './Button'
import Skeleton from './Skeleton'

const IdeasSection = () => {
    return (
        <section id="ideas" className="py-16">
            <div className="max-w-6xl mx-auto px-5 grid gap-6 lg:grid-cols-2">
                <div>
                    <h3 className="text-4xl font-bold leading-tight tracking-tight mb-4">
                        Fresh Investing Ideas for Any Market Cycle.
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                        From growth to dividends, discover AI-curated opportunities built around your strategy.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3 mb-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-gray-600 text-sm mb-3">Undervalued bargains</div>
                            <Skeleton />
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-gray-600 text-sm mb-3">AI-verified compounders</div>
                            <Skeleton />
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-gray-600 text-sm mb-3">Sustainable income picks</div>
                            <Skeleton />
                        </div>
                    </div>
                    <Button>Explore Ideas</Button>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h4 className="text-gray-600 text-sm mb-3">AI Portfolio Snapshot</h4>
                    <Skeleton className="h-48 w-48 mx-auto mb-4" isCircle />
                    <ul className="space-y-2 text-gray-700">
                        <li>• Quality score powered by AI</li>
                        <li>• Valuation gap instantly visible</li>
                        <li>• Earnings growth forecast</li>
                        <li>• Risk radar with proactive alerts</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default IdeasSection