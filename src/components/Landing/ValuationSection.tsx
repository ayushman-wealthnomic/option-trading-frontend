import Badge from "./Badge"
import Button from "./Button"
import Skeleton from "./Skeleton"

const ValuationSection = () => {
    return (
        <section id="valuation" className="py-16 bg-gradient-radial from-gray-900 to-indigo-900 text-blue-50">
            <div className="max-w-6xl mx-auto px-5 grid gap-6 lg:grid-cols-2">
                <div>
                    <Badge>Valuation AI</Badge>
                    <h3 className="text-4xl font-bold leading-tight tracking-tight mt-4 mb-4">
                        Know What a Company is Worth—Today.
                    </h3>
                    <p className="text-blue-200 text-lg mb-6">
                        Our AI valuation engine blends discounted cash flow, peer multiples, and predictive modeling.
                        The result? A true fair price, updated automatically as markets move.
                    </p>
                    <Button href="#">Run an AI Valuation</Button>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-indigo-900 rounded-2xl border border-white border-opacity-10 p-6">
                    <h4 className="text-blue-200 text-sm mb-3">Fair Value Waterfall</h4>
                    <Skeleton className="h-72 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
                </div>
            </div>
        </section>
    )
}

export default ValuationSection