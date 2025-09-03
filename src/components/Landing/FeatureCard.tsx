interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-4">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center font-extrabold text-blue-800 flex-shrink-0">
            {icon}
        </div>
        <div>
            <div className="font-semibold text-gray-900">{title}</div>
            <div className="text-gray-600 text-sm mt-1">{description}</div>
        </div>
    </div>
);

export default FeatureCard;