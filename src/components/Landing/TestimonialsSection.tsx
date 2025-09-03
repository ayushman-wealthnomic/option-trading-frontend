import TestimonialCard from "./TestimonialCard";

interface Testimonial {
    rating: number;
    text: string;
    author: string;
}

const TestimonialsSection = () => {
    const testimonials: Testimonial[] = [
        {
            rating: 5,
            text: "WEALTHNOMICS' AI has completely transformed my research process. It's like having a team of analysts working for me 24/7. Invaluable for both new and experienced investors.",
            author: "Dave Saunders"
        },
        {
            rating: 5,
            text: "The AI agents are brilliant. They find opportunities I would have never seen. The depth of the fundamental and technical analysis is unparalleled. A true game-changer.",
            author: "Jacob"
        },
        {
            rating: 5,
            text: "Subscribed and couldn't be happier. The AI portfolio management has already helped me optimize my holdings and paid for the subscription tenfold. Plus, the support is fantastic.",
            author: "Ian K"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Trusted by thousands of forward-thinking investors worldwide</h2>
                    <p className="mt-4 text-lg text-gray-600">Excellent ★★★★☆ from 4,684 reviews on Trustpilot</p>
                </div>
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection