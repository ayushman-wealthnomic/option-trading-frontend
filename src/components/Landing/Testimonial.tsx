

interface TestimonialProps {
    quote: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-700">"{quote}"</p>
    </div>
);

export default Testimonial;