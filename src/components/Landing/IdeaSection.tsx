import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

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

const InvestmentPlatformSection = () => {
    const [headlineRef, headline] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
        },
        [AutoplayPlugin(2500)]
    )

    const [iconRef, icon] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
        }
    )

    useEffect(() => {
        if (!headline.current || !icon.current) return;

        const syncIcon = (s: any) => {
            icon.current?.moveToIdx(s.track.details.rel);
        };

        // Register the listener and get the unsubscribe function
        const unsubscribe = headline.current.on("slideChanged", syncIcon);

        // Clean up on unmount
        return unsubscribe;
    }, [headline, icon]);
    return (
        <div className="relative bg-black text-white p-8 lg:p-24">
            <div className="absolute inset-0 m-10 bg-white/10 opacity-50 rounded-xl"></div>
            <img
                src="./imageIdeas.png" // your background illustration
                alt="Head Background"
                className="absolute -right-60 top-0 h-full object-contain opacity-100 pointer-events-none"
            />
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10 p-10 z-30">

                {/* Column 1 - The Idea */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-light mb-4">The Idea:</h2>
                        <h3 className="text-3xl lg:text-5xl text-gray-400 mb-6 font-light flex flex-col space-y-3">
                            <span>From Broad </span><span>Themes to Hidden</span><span>Gems</span>
                        </h3>
                    </div>
                    <p className="text-gray-300 text-2xl leading-relaxed pr-20">
                        Move beyond generic stock screeners. Our AI-powered Idea Engine is
                        designed to systematically uncover high-potential investment
                        opportunities that others miss. We analyze millions of data points
                        to deliver ideas rooted in solid fundamentals and forward-looking
                        trends.
                    </p>
                </div>

                {/* Column 2 - Features */}
                <div className="space-y-10">
                    <div>
                        <h3 className="text-3xl font-light text-green-400 mb-3">
                            Deep Fundamental Screening
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            Our AI doesn’t just skim the surface. It performs a rigorous
                            analysis of financial health, scrutinizing everything from revenue
                            growth and profit margins to debt levels and cash flow. This
                            ensures every idea is built on a foundation of a strong,
                            financially sound business.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-light text-green-400 mb-3">
                            Intelligent Thematic Investing
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            Capitalize on the trends shaping tomorrow’s world. Our system
                            identifies and vets emerging industry themes, from renewable
                            energy and cybersecurity to biotechnology and the creator economy.
                            We pinpoint the key players poised to lead these transformative
                            shifts, giving you a strategic edge.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-light text-green-400 mb-3">
                            Discover Niche Opportunities
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            This is where our AI truly shines. It digs deeper to find niche
                            opportunities and companies with distinct strategic
                            advantages—be it a breakthrough technology, a dominant market
                            position, or an untapped consumer base. Find the hidden gems
                            before they become mainstream headlines. Ready to uncover your
                            next winning investment? Start Exploring Ideas.
                        </p>
                    </div>
                </div>

                {/* Column 3 - SVG + CTA */}
                <div className="flex flex-col justify-center items-center text-center z-10">
                    {/* <h2 className="text-4xl lg:text-5xl font-light leading-tight">
                        Ride the Wave <br />
                        of Innovation
                    </h2> */}
                    <div ref={headlineRef} className="keen-slider flex-1">
                        <div className="keen-slider__slide text-4xl lg:text-5xl font-light leading-tight">
                            Invest in Fortresses
                        </div>
                        <div className="keen-slider__slide text-4xl lg:text-5xl font-light leading-tight">
                            Stay Ahead of the Curve
                        </div>
                        <div className="keen-slider__slide text-4xl lg:text-5xl font-light leading-tight">
                            Uncover Hidden Gems
                        </div>
                        <div className="keen-slider__slide text-4xl lg:text-5xl font-light leading-tight">
                            Ride the Wave of Innovation
                        </div>
                    </div>

                    {/* Icon Slider */}
                    <div
                        ref={iconRef}
                        className="keen-slider w-32 h-32 lg:w-40 lg:h-40"
                    >
                        <img src="./mission 1.png" className="keen-slider__slide object-contain" />
                        <img src="./value 1.png" className="keen-slider__slide object-contain" />
                        <img src="./award-symbol 1.png" className="keen-slider__slide object-contain" />
                        <img src="./idea 1.png" className="keen-slider__slide object-contain" />
                    </div>

                    <div className="mt-6">
                        <Link to="/technical" className="text-green-400 hover:text-green-300 text-4xl font-light underline flex items-center gap-2 transition-colors group">
                            Explore Ideas
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
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InvestmentPlatformSection;