
const AnalysisCard = ({ title, description, imageSrc, imageAlt }: { title: string; description: string; imageSrc: string; imageAlt: string }) => {
    return (
        <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-2 text-gray-400">{description}</p>
            <img src={imageSrc} className="mt-6 rounded-lg" alt={imageAlt} />
        </div>
    );
}

export default AnalysisCard