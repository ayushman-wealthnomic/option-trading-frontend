
import Badge from './Badge'
import Button from './Button'
import Skeleton from './Skeleton'

const AlertsSection = () => {
    return (
        <section id="alerts" className="py-16 bg-gradient-radial from-gray-900 to-indigo-900 text-blue-50">
            <div className="max-w-6xl mx-auto px-5 grid gap-6 lg:grid-cols-2">
                <div>
                    <Badge>Smart Alerts</Badge>
                    <h3 className="text-4xl font-bold leading-tight tracking-tight mt-4 mb-4">
                        Never Miss What Matters.
                    </h3>
                    <p className="text-blue-200 text-lg mb-6">
                        Stay ahead with AI-powered alerts. From earnings shifts to insider moves,
                        WEALTHNOMICS keeps you informed before it impacts your portfolio.
                    </p>
                    <Button>Enable AI Alerts</Button>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-indigo-900 rounded-2xl border border-white border-opacity-10 p-6">
                    <h4 className="text-blue-200 text-sm mb-3">Recent Signals</h4>
                    <Skeleton className="h-52 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
                </div>
            </div>
        </section>
    )
}

export default AlertsSection