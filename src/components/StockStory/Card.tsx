type CardProps = {
    title: string;
    children: React.ReactNode;
};

const COLORS = {
    card: "bg-white/60 backdrop-blur border border-slate-200 shadow-sm",
    title: "text-slate-800",
    sub: "text-slate-500",
    chip: "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600",
};

export default function Card({ title, children }: CardProps) {
    return (
        <div className={`p-4 rounded-2xl ${COLORS.card}`}>
            <h3 className="text-base font-semibold mb-2">{title}</h3>
            {children}
        </div>
    );
}