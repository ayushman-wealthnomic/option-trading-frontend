

interface TestimonialProps {
    quote: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote }) => (
    <div className="bg-white/10 rounded-2xl shadow-lg p-6">
        <p className="text-white">"{quote}"</p>
    </div>
);

export default Testimonial;