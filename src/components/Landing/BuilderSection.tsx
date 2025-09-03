import Skeleton from './Skeleton'

const BuilderSection = () => {
    return (
        <section id="builder" className="py-16">
            <div className="max-w-6xl mx-auto px-5 grid gap-6 lg:grid-cols-2">
                <div>
                    <h3 className="text-4xl font-bold leading-tight tracking-tight mb-4">
                        Build, Evolve, and Perfect Your Portfolio.
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                        Refine strategies, spot diversification gaps, and explore AI-driven rebalancing ideas tailored to your goals.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-gray-600 text-sm mb-3">Allocation and exposure at a glance</div>
                            <Skeleton />
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-gray-600 text-sm mb-3">Dividend flows visualized</div>
                            <Skeleton />
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-gray-600 text-sm mb-3">Risk contributions tracked</div>
                            <Skeleton />
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-gray-600 text-sm mb-3">Sector & region mix insights</div>
                            <Skeleton />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h4 className="text-gray-600 text-sm mb-3">Flow of Funds</h4>
                    <Skeleton className="h-80" />
                    <p className="text-gray-600 text-sm mt-3">
                        Discover what's driving returns and where to rebalance with AI-powered clarity.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default BuilderSection