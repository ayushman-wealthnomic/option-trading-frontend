import Testimonial from "./Testimonial";

const SocialProofSection = () => {
    const testimonials = [
        "WEALTHNOMICS cuts research time in half. AI shows me what truly matters.",
        "The AI portfolio tools give me confidence to rebalance with clarity.",
        "I've finally found insights that aren't noise—just smart signals."
    ];

    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-5">
                <h3 className="text-4xl font-bold leading-tight tracking-tight text-center mb-8">
                    Trusted by Forward-Thinking Investors Worldwide.
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((quote, index) => (
                        <Testimonial key={index} quote={quote} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SocialProofSection