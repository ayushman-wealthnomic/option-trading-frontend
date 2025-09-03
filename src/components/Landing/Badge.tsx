const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block font-medium text-md px-2 py-1 rounded-full bg-[#2A2A2A] text-white">
        {children}
    </span>
);

export default Badge;