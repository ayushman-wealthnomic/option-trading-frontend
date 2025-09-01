type KPIProps = {
    title: string;
    value: React.ReactNode;
    sub?: React.ReactNode;
};

const COLORS = {
    card: "bg-white/60 backdrop-blur border border-slate-200 shadow-sm",
    title: "text-slate-800",
    sub: "text-slate-500",
    chip: "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600",
};

export default function KPI({ title, value, sub }: KPIProps) {
    return (
        <div className={`p-4 rounded-2xl ${COLORS.card}`}>
            <div className="flex items-start justify-between">
                <div>
                    <div className={`text-xs ${COLORS.sub}`}>{title}</div>
                    <div className="text-2xl font-semibold mt-1">{value}</div>
                </div>
                <span className={COLORS.chip}>Key</span>
            </div>
            {sub && <div className="mt-2 text-xs text-slate-500">{sub}</div>}
        </div>
    );
}