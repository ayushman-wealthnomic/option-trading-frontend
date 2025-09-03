
interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<Feature> = ({ icon, title, description }) => {
    return (
        <div className="p-8 rounded-xl">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                {icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-gray-500">{description}</p>
        </div>
    );
};

export default FeatureCard;