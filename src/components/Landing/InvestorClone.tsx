import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"

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

const slides = [
    {
        image: "./warren 1.png",
        title: "Warren Buffett Agent",
        description:
            'The Oracle of Omaha: Seeks wonderful companies with durable competitive advantages ("Moats") at a fair price. The ultimate mentor for long-term, quality investing.',
        textPosition: { left: "70%", top: "60%", translateX: "-40%", translateY: "100%" },
    },
    {
        image: "./charly 1.png",
        title: "Elon Musk Visionary",
        description:
            "Innovator in technology and space exploration. Driven to push the boundaries of what is possible.",
        textPosition: { left: "65%", top: "55%", translateX: "-35%", translateY: "80%" },
    },
    {
        image: "./peterl 1.png",
        title: "Steve Jobs Legend",
        description:
            "Revolutionized personal computing and mobile technology with a focus on design and simplicity.",
        textPosition: { left: "60%", top: "50%", translateX: "-30%", translateY: "90%" },
    },
];

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

    const [current, setCurrent] = useState(0);

    // Cycle slides every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

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
            <div className="relative z-30 p-10">
                {/* Text content */}
                <div className="flex flex-col justify-between max-w-xl">
                    <div className="mb-20">
                        <h2 className="text-4xl lg:text-6xl font-medium text-[#EAFF00]">The AI Investor Clones</h2>
                        <div>
                            <p className="text-4xl font-light text-[#8E8E8E]">
                                Why settle for one opinion when you can consult a virtual hall of fame?
                            </p>
                        </div>
                    </div>
                    <p className="text-white text-2xl leading-relaxed">
                        Our groundbreaking Agentic AI goes beyond basic analysis. We have meticulously cloned the philosophies, strategies, and analytical frameworks of the world's most legendary investors and financial experts.
                    </p>

                    <div className="mt-24">
                        <button className="text-[#EAFF00] hover:text-yellow-300 text-3xl font-light underline flex items-center gap-2 transition-colors group z-30">
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
            <div className="absolute inset-0 w-full h-full">
                {slides.map((slide, index) => {
                    const isActive = index === current;
                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute right-0 top-0 object-contain pointer-events-none w-[929px] h-[929px] opacity-70"
                            />

                            {/* Positioned text, centered over the image */}
                            <div
                                className="absolute text-center"
                                style={{
                                    right: '464.5px', // Half of the image's width
                                    top: '70%',
                                    transform: 'translate(50%, -50%)',
                                }}
                            >
                                <p className="text-2xl lg:text-3xl font-bold text-white pointer-events-none">
                                    {slide.title}
                                </p>
                                <p className="text-gray-300 text-sm mt-2 leading-relaxed max-w-sm">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InvestorClone;