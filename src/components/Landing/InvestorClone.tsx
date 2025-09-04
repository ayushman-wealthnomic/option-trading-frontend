import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect } from "react"

function AutoplayPlugin(ms: number) {
    return (slider: any) => {
        let timeout: any
        let mouseOver = false

        function clearNextTimeout() {
            clearTimeout(timeout)
        }
        function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
                slider.next()
            }, ms)
        }

        slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
                mouseOver = true
                clearNextTimeout()
            })
            slider.container.addEventListener("mouseout", () => {
                mouseOver = false
                nextTimeout()
            })
            nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
    }
}

const InvestorClone = () => {
    const [, headline] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
        },
        [AutoplayPlugin(2500)]
    )

    const [, icon] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
        }
    )

    useEffect(() => {
        if (!headline.current || !icon.current) return;

        const syncIcon = (s: any) => {
            icon.current?.moveToIdx(s.track.details.rel);
        };

        const unsubscribe = headline.current.on("slideChanged", syncIcon);

        // Clean up on unmount
        return unsubscribe;
    }, [headline, icon]);

    return (
        <div className="relative bg-black text-white p-8 lg:p-24">
            <div className="absolute inset-0 m-10 bg-white/10 opacity-50 rounded-xl"></div>

            {/* Main content container with text on the left */}
            <div className="relative z-10 p-10">
                {/* Text content */}
                <div className="flex flex-col justify-between max-w-lg">
                    <div>
                        <h2 className="text-5xl lg:text-7xl font-medium text-yellow-500 mb-4">The AI Investor Clones</h2>
                        <p className="text-gray-300 text-2xl leading-relaxed">
                            Our groundbreaking Agentic AI goes beyond basic analysis. We have meticulously cloned the philosophies, strategies, and analytical frameworks of the world's most legendary investors and financial experts.
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-300 text-3xl font-medium leading-relaxed mt-10">
                            Why settle for one opinion when you can consult a virtual hall of fame?
                        </p>
                    </div>
                    <div className="mt-24">
                        <button className="text-yellow-500 hover:text-green-300 text-4xl font-light underline flex items-center gap-2 transition-colors group">
                            Assemble Your Dream Team
                            <svg
                                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Absolute positioned image and text */}
            <div className="absolute right-0 top-0 h-full w-1/2">
                <img
                    src="./warren 1.png"
                    alt="Head Background"
                    className="w-full h-full object-contain pointer-events-none"
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[150%] text-center w-full">
                    <p className="text-2xl lg:text-3xl font-bold text-yellow-500 pointer-events-none">
                        Warren Buffett Agent
                    </p>
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed max-w-sm mx-auto">
                        The Oracle of Omaha: Seeks wonderful companies with durable competitive advantages ("Moats") at a fair price. The ultimate mentor for long-term, quality investing.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InvestorClone;