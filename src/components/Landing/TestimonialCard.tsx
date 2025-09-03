interface Testimonial {
    rating: number;
    text: string;
    author: string;
}

const TestimonialCard = ({ rating, text, author }: Testimonial) => {
    return (
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
            <p className="text-yellow-500 text-xl">{'★'.repeat(rating)}</p>
            <p className="mt-4 text-gray-600">"{text}"</p>
            <p className="mt-6 font-bold text-gray-800">{author}</p>
        </div>
    );
}

export default TestimonialCard