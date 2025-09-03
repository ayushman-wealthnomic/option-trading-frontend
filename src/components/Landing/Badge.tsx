const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block font-bold text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800">
        {children}
    </span>
);

export default Badge;