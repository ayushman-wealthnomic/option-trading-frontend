import React, { useMemo, useState } from 'react'
import Card from "@/components/StockStory/Card";
import KPI from "@/components/StockStory/KPI";
import SelfTests from "@/components/StockStory/SelfTest";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    ComposedChart,
    ReferenceLine,
} from "recharts";

const RAW = [
    { Year: "TTM", Revenue: 670038, RevYoY: 10.87, CoGS: 363631, GrossProfit: 306407, SGnA: 56081, RnD: 95976, OtherOpEx: 78160, OpEx: 230217, OpInc: 76190, IntInc: 4655, IntExp: 2230, OtherInc: -4270, Pretax: 82902, Tax: 12262, NetInc: 70623, NetIncYoY: 58.99, ShOutBasic: 10637, ShOutDil: 10806, ShChange: 0.92, EPSBasic: 6.69, EPSDil: 6.56, EPSYoY: 56.94, GrossMargin: 45.73, OpMargin: 11.37, ProfitMargin: 10.54, EffTax: 14.79, EBITDA: 128487, EbitdaMargin: 19.18, EBIT: 80460, EBITMargin: 12.01 },
    { Year: "31/12/24", Revenue: 637959, RevYoY: 10.99, CoGS: 326288, GrossProfit: 311671, SGnA: 55266, RnD: 88544, OtherOpEx: 99268, OpEx: 243078, OpInc: 68593, IntInc: 4677, IntExp: 2406, OtherInc: 2351, Pretax: 68513, Tax: 9265, NetInc: 59248, NetIncYoY: 94.74, ShOutBasic: 10473, ShOutDil: 10721, ShChange: 2.18, EPSBasic: 5.66, EPSDil: 5.53, EPSYoY: 90.69, GrossMargin: 48.85, OpMargin: 10.75, ProfitMargin: 9.29, EffTax: 13.52, EBITDA: 123815, EbitdaMargin: 19.41, EBIT: 66242, EBITMargin: 10.38 },
    { Year: "31/12/23", Revenue: 574785, RevYoY: 11.83, CoGS: 304739, GrossProfit: 270046, SGnA: 56186, RnD: 85622, OtherOpEx: 91386, OpEx: 233194, OpInc: 36852, IntInc: 2949, IntExp: 3182, OtherInc: -926, Pretax: 37557, Tax: 7120, NetInc: 30425, NetIncYoY: null, ShOutBasic: 10304, ShOutDil: 10492, ShChange: 2.97, EPSBasic: 2.95, EPSDil: 2.9, EPSYoY: null, GrossMargin: 46.98, OpMargin: 6.41, ProfitMargin: 5.29, EffTax: 18.96, EBITDA: 89402, EbitdaMargin: 15.55, EBIT: 37778, EBITMargin: 6.57 },
    { Year: "31/12/22", Revenue: 513983, RevYoY: 9.4, CoGS: 288831, GrossProfit: 225152, SGnA: 54129, RnD: 73213, OtherOpEx: 85562, OpEx: 212904, OpInc: 12248, IntInc: 989, IntExp: 2367, OtherInc: 16809, Pretax: -5936, Tax: -3217, NetInc: -2722, NetIncYoY: null, ShOutBasic: 10189, ShOutDil: 10189, ShChange: -1.08, EPSBasic: -0.27, EPSDil: -0.27, EPSYoY: null, GrossMargin: 43.81, OpMargin: 2.38, ProfitMargin: -0.53, EffTax: null, EBITDA: 38352, EbitdaMargin: 7.46, EBIT: -4561, EBITMargin: -0.89 },
    { Year: "31/12/21", Revenue: 469822, RevYoY: 21.7, CoGS: 272344, GrossProfit: 197478, SGnA: 41374, RnD: 56052, OtherOpEx: 75173, OpEx: 172599, OpInc: 24879, IntInc: 448, IntExp: 1809, OtherInc: -14637, Pretax: 38151, Tax: 4791, NetInc: 33364, NetIncYoY: 56.41, ShOutBasic: 10120, ShOutDil: 10300, ShChange: 0.98, EPSBasic: 3.3, EPSDil: 3.24, EPSYoY: 55.02, GrossMargin: 42.03, OpMargin: 5.3, ProfitMargin: 7.1, EffTax: 12.56, EBITDA: 74393, EbitdaMargin: 15.83, EBIT: 39516, EBITMargin: 8.41 },
    { Year: "31/12/20", Revenue: 386064, RevYoY: 37.62, CoGS: 233307, GrossProfit: 152757, SGnA: 28676, RnD: 42740, OtherOpEx: 58442, OpEx: 129858, OpInc: 22899, IntInc: 555, IntExp: 1647, OtherInc: -2387, Pretax: 24194, Tax: 2863, NetInc: 21331, NetIncYoY: 84.08, ShOutBasic: 10000, ShOutDil: 10200, ShChange: 1.19, EPSBasic: 2.13, EPSDil: 2.09, EPSYoY: 81.74, GrossMargin: 39.57, OpMargin: 5.93, ProfitMargin: 5.53, EffTax: 11.83, EBITDA: 51005, EbitdaMargin: 13.21, EBIT: 25286, EBITMargin: 6.55 },
    { Year: "31/12/19", Revenue: 280522, RevYoY: 20.45, CoGS: 165536, GrossProfit: 114986, SGnA: 24081, RnD: 35931, OtherOpEx: 40433, OpEx: 100445, OpInc: 14541, IntInc: 832, IntExp: 1600, OtherInc: -189, Pretax: 13962, Tax: 2374, NetInc: 11588, NetIncYoY: 15.04, ShOutBasic: 9880, ShOutDil: 10080, ShChange: 0.8, EPSBasic: 1.17, EPSDil: 1.15, EPSYoY: 13.86, GrossMargin: 40.99, OpMargin: 5.18, ProfitMargin: 4.13, EffTax: 17.0, EBITDA: 37365, EbitdaMargin: 13.32, EBIT: 14730, EBITMargin: 5.25 },
    { Year: "31/12/18", Revenue: 232887, RevYoY: 30.93, CoGS: 139156, GrossProfit: 93731, SGnA: 18150, RnD: 28837, OtherOpEx: 34323, OpEx: 81310, OpInc: 12421, IntInc: 440, IntExp: 1417, OtherInc: 174, Pretax: 11270, Tax: 1197, NetInc: 10073, NetIncYoY: 232.11, ShOutBasic: 9740, ShOutDil: 10000, ShChange: 1.42, EPSBasic: 1.03, EPSDil: 1.01, EPSYoY: 225.81, GrossMargin: 40.25, OpMargin: 5.33, ProfitMargin: 4.32, EffTax: 10.62, EBITDA: 28019, EbitdaMargin: 12.03, EBIT: 12247, EBITMargin: 5.26 },
];

const isNum = (v: any) => typeof v === "number" && Number.isFinite(v);
const nz = (v: any, fallback = null) => (isNum(v) ? v : fallback);

const niceNum = (v: any, digits = 0) =>
    v === null || v === undefined || Number.isNaN(v)
        ? "NA"
        : Number(v).toLocaleString(undefined, {
            maximumFractionDigits: digits,
            minimumFractionDigits: digits,
        });

const pct = (v: any, digits = 2) =>
    v === null || v === undefined || Number.isNaN(v) ? "NA" : `${Number(v).toFixed(digits)}%`;

function cagr(start: number, end: number, years: number) {
    if (!isNum(start) || !isNum(end) || years <= 0 || start <= 0) return null;
    return (Math.pow(end / start, 1 / years) - 1) * 100;
}

function bpsDelta(pctStart: number, pctEnd: number) {
    if (!isNum(pctStart) || !isNum(pctEnd)) return null;
    return (pctEnd - pctStart) * 100; // percentage points * 100 => basis points
}

const COLORS = {
    card: "bg-white/60 backdrop-blur border border-slate-200 shadow-sm",
    title: "text-slate-800",
    sub: "text-slate-500",
    chip: "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600",
};


class ChartBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message: string }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, message: "" };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, message: error?.message || "Chart error" };
    }
    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error("Chart render error:", error, info);
    }
    render() {
        if (this.state.hasError) {
            const m = this.state.message;
            return (
                <div className="h-80 w-full grid place-items-center text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                    <div>
                        <div className="font-semibold">Chart failed to render</div>
                        <div className="opacity-80">{m}</div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const IncomeComponent = () => {
    const [includeTTM,] = useState(true);
    const [focusMetric, setFocusMetric] = useState("Revenue"); // "Revenue" | "Margins" | "Income" | "R&D" | "EPS"

    // Build data safely
    const data = useMemo(() => {
        const rows = includeTTM ? RAW : RAW.filter((r) => r.Year !== "TTM");
        const ordered = [...rows].reverse();
        return ordered;
    }, [includeTTM]);

    const hasData = Array.isArray(data) && data.length > 0;
    const first = hasData ? data[0] : null;
    const last = hasData ? data[data.length - 1] : null;

    const revCAGR = useMemo(
        () => (hasData ? cagr(nz(first?.Revenue), nz(last?.Revenue), Math.max(1, data.length - 1)) : null),
        [hasData, data, first, last]
    );
    const epsCAGR = useMemo(
        () => (hasData ? cagr(Math.max(0.01, nz(first?.EPSDil)), Math.max(0.01, nz(last?.EPSDil)), Math.max(1, data.length - 1)) : null),
        [hasData, data, first, last]
    );
    const gmBps = useMemo(() => (hasData ? bpsDelta(nz(first?.GrossMargin), nz(last?.GrossMargin)) : null), [hasData, first, last]);
    const opmBps = useMemo(() => (hasData ? bpsDelta(nz(first?.OpMargin), nz(last?.OpMargin)) : null), [hasData, first, last]);
    const pmBps = useMemo(() => (hasData ? bpsDelta(nz(first?.ProfitMargin), nz(last?.ProfitMargin)) : null), [hasData, first, last]);
    const rndPctNow = hasData && last && isNum(last.RnD) && isNum(last.Revenue) && last.Revenue > 0 ? (last.RnD / last.Revenue) * 100 : null;

    const storyline = useMemo(() => {
        if (!hasData) return ["No data available to build a storyline."];
        const sYear = first?.Year ?? "Start";
        const eYear = last?.Year ?? "End";
        const notes = [];
        if (isNum(revCAGR)) notes.push(`Revenue grew at a CAGR of ${pct(revCAGR, 2)} from ${sYear} to ${eYear}.`);
        const hadLoss = data.some((d) => (d.NetInc ?? 0) < 0);
        if (hadLoss) notes.push("Profitability briefly dipped into a loss but rebounded strongly in subsequent years.");
        const parts = [];
        if (isNum(gmBps)) parts.push(`Gross margin +${niceNum(gmBps, 0)} bps`);
        if (isNum(opmBps)) parts.push(`Operating margin +${niceNum(opmBps, 0)} bps`);
        if (isNum(pmBps)) parts.push(`Profit margin +${niceNum(pmBps, 0)} bps`);
        if (parts.length) notes.push(`Margin expansion observed: ${parts.join(", ")}.`);
        if (isNum(rndPctNow)) notes.push(`Current R&D intensity is ${pct(rndPctNow, 2)} of revenue, supporting future product pipeline.`);
        if (isNum(epsCAGR)) notes.push(`EPS compounded at ~${pct(epsCAGR, 2)} over the period, indicating per-share value creation.`);
        return notes;
    }, [hasData, data, first, last, revCAGR, gmBps, opmBps, pmBps, rndPctNow, epsCAGR]);

    const tableCols = [
        "Year",
        "Revenue",
        "RevYoY",
        "GrossMargin",
        "OpMargin",
        "ProfitMargin",
        "EBITDA",
        "EbitdaMargin",
        "EPSDil",
        "RnD",
        "ShOutDil",
    ];

    // -------------
    // Main renderer
    // -------------
    const renderMainChart = () => {
        const safeData = hasData ? data : [{ Year: "-", Revenue: 0 }];
        switch (focusMetric) {
            case "Revenue":
                return (
                    <ComposedChart data={safeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Revenue" yAxisId="left" name="Revenue" />
                        <Line type="monotone" dataKey="RevYoY" yAxisId="right" name="YoY %" />
                    </ComposedChart>
                );
            case "Margins":
                return (
                    <LineChart data={safeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="GrossMargin" name="Gross %" />
                        <Line type="monotone" dataKey="OpMargin" name="Operating %" />
                        <Line type="monotone" dataKey="ProfitMargin" name="Profit %" />
                        <ReferenceLine y={0} strokeDasharray="3 3" />
                    </LineChart>
                );
            case "Income":
                return (
                    <BarChart data={safeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="GrossProfit" name="Gross Profit" stackId="a" />
                        <Bar dataKey="OpInc" name="Operating Income" stackId="a" />
                        <Bar dataKey="NetInc" name="Net Income" stackId="a" />
                    </BarChart>
                );
            case "R&D":
                return (
                    <ComposedChart data={safeData.map((d) => ({
                        ...d,
                        RnD: (d as any).RnD ?? 0,
                        RnDPct: isNum((d as any).RnD) && isNum((d as any).Revenue) && (d as any).Revenue > 0
                            ? ((d as any).RnD / (d as any).Revenue) * 100
                            : null
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="RnD" name="R&D Spend" />
                        <Line type="monotone" dataKey="RnDPct" name="R&D % of Revenue" />
                    </ComposedChart>
                );
            case "EPS":
                return (
                    <LineChart data={safeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="EPSDil" name="EPS (Diluted)" />
                    </LineChart>
                );
            default:
                // Fallback to always return a valid single chart child
                return (
                    <LineChart data={safeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Revenue" name="Revenue" />
                    </LineChart>
                );
        }
    };
    return (
        <div className="flex flex-col gap-6">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPI title="Revenue (latest)" value={`₹ ${niceNum(last?.Revenue ?? null, 0)} M`} sub={`YoY ${pct(last?.RevYoY ?? null)}`} />
                <KPI title="Gross Margin (latest)" value={pct(last?.GrossMargin ?? null)} sub={`Δ from start ${gmBps == null ? "NA" : niceNum(gmBps, 0)} bps`} />
                <KPI title="Operating Margin (latest)" value={pct(last?.OpMargin ?? null)} sub={`Δ from start ${opmBps == null ? "NA" : niceNum(opmBps, 0)} bps`} />
                <KPI title="EPS Diluted (latest)" value={`${niceNum(last?.EPSDil ?? null, 2)}`} sub={`EPS CAGR ${epsCAGR == null ? "NA" : pct(epsCAGR)}`} />
            </section>


            {/* Focus Switcher */}
            <section className={`p-3 rounded-2xl ${COLORS.card}`}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    {["Revenue", "Margins", "Income", "R&D", "EPS"].map((k) => (
                        <button
                            key={k}
                            onClick={() => setFocusMetric(k)}
                            className={`px-3 py-1.5 rounded-xl border text-sm transition ${focusMetric === k
                                ? "bg-slate-900 text-white border-slate-900 shadow"
                                : "bg-white border-slate-300 hover:shadow"
                                }`}
                        >
                            {k}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-slate-500">Choose a focus to adapt the main chart below.</p>
            </section>

            {/* Main Chart (wrapped in boundary) */}
            <section className={`p-4 rounded-2xl ${COLORS.card}`}>
                <h2 className="text-lg font-semibold mb-3">{focusMetric} Focus</h2>
                <div className="flex flex-col lg:flex-row gap-2">
                    <div className="flex flex-col">
                        <div className="h-80 w-full flex-4">
                            <ChartBoundary>
                                <ResponsiveContainer>
                                    {renderMainChart()}
                                </ResponsiveContainer>
                            </ChartBoundary>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 flex items-start gap-2">
                            <span className="text-yellow-400 text-xl">💡</span>
                            <p className="text-sm leading-relaxed">
                                <span className="font-semibold">37.62% spike in 2019</span> followed by sustained momentum.
                                The company has nearly <span className="font-semibold">tripled revenue</span> from $233M (2018) to $670M (TTM).
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm">
                        <h3 className="font-semibold mb-2">Growth Trajectory</h3>
                        <p className="text-sm mb-2">
                            This company demonstrates exceptional revenue consistency, maintaining double-digit growth across 7+ years.
                            The standout period was 2019-2020 with 37.62% and 21.70% growth respectively.
                        </p>
                        <p className="text-sm mb-2">
                            The recent moderation to ~11% growth suggests maturity but remains healthy for a large-scale operation approaching $700M in annual revenue.
                        </p>
                        <p className="text-sm font-medium">
                            Investment Thesis: Sustainable growth engine with proven resilience across market cycles.
                        </p>
                    </div>
                </div>
            </section>

            {/* Secondary Charts */}
            <section className="space-y-6">
                <Card title="Cost Discipline: Revenue vs. CoGS">
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="flex flex-col">
                            <div className="h-80">
                                <ChartBoundary>
                                    <ResponsiveContainer>
                                        <AreaChart data={hasData ? data : [{ Year: "-", Revenue: 0, CoGS: 0 }]}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Year" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Area type="monotone" dataKey="Revenue" name="Revenue" />
                                            <Area type="monotone" dataKey="CoGS" name="Cost of Revenue" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartBoundary>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 flex items-start gap-2">
                                <span className="text-yellow-400 text-xl">💡</span>
                                <p className="text-sm leading-relaxed">
                                    <span className="font-semibold">37.62% spike in 2019</span> followed by sustained momentum.
                                    The company has nearly <span className="font-semibold">tripled revenue</span> from $233M (2018) to $670M (TTM).
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 p-4 rounded-2xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm">
                            <h3 className="font-semibold mb-2">Growth Trajectory</h3>
                            <p className="text-sm mb-2">
                                This company demonstrates exceptional revenue consistency, maintaining double-digit growth across 7+ years.
                                The standout period was 2019-2020 with 37.62% and 21.70% growth respectively.
                            </p>
                            <p className="text-sm mb-2">
                                The recent moderation to ~11% growth suggests maturity but remains healthy for a large-scale operation approaching $700M in annual revenue.
                            </p>
                            <p className="text-sm font-medium">
                                Investment Thesis: Sustainable growth engine with proven resilience across market cycles.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card title="Operating Leverage: EBITDA & Margin">
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="flex flex-col">
                            <div className="h-80">
                                <ChartBoundary>
                                    <ResponsiveContainer>
                                        <ComposedChart data={hasData ? data : [{ Year: "-", EBITDA: 0, EbitdaMargin: 0 }]}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Year" />
                                            <YAxis yAxisId="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="EBITDA" name="EBITDA" yAxisId="left" />
                                            <Line type="monotone" dataKey="EbitdaMargin" name="EBITDA %" yAxisId="right" />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </ChartBoundary>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 flex items-start gap-2">
                                <span className="text-yellow-400 text-xl">💡</span>
                                <p className="text-sm leading-relaxed">
                                    <span className="font-semibold">37.62% spike in 2019</span> followed by sustained momentum.
                                    The company has nearly <span className="font-semibold">tripled revenue</span> from $233M (2018) to $670M (TTM).
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 p-4 rounded-2xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm">
                            <h3 className="font-semibold mb-2">Growth Trajectory</h3>
                            <p className="text-sm mb-2">
                                This company demonstrates exceptional revenue consistency, maintaining double-digit growth across 7+ years.
                                The standout period was 2019-2020 with 37.62% and 21.70% growth respectively.
                            </p>
                            <p className="text-sm mb-2">
                                The recent moderation to ~11% growth suggests maturity but remains healthy for a large-scale operation approaching $700M in annual revenue.
                            </p>
                            <p className="text-sm font-medium">
                                Investment Thesis: Sustainable growth engine with proven resilience across market cycles.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card title="Capital Structure: Interest & Shares">
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="flex flex-col">
                            <div className="h-80">
                                <ChartBoundary>
                                    <ResponsiveContainer>
                                        <ComposedChart data={hasData ? data : [{ Year: "-", IntExp: 0, ShOutDil: 0 }]}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="Year" />
                                            <YAxis yAxisId="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="IntExp" name="Interest Expense" yAxisId="left" />
                                            <Line type="monotone" dataKey="ShOutDil" name="Diluted Shares" yAxisId="right" />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </ChartBoundary>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 flex items-start gap-2">
                                <span className="text-yellow-400 text-xl">💡</span>
                                <p className="text-sm leading-relaxed">
                                    <span className="font-semibold">37.62% spike in 2019</span> followed by sustained momentum.
                                    The company has nearly <span className="font-semibold">tripled revenue</span> from $233M (2018) to $670M (TTM).
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 p-4 rounded-2xl bg-white/70 backdrop-blur border border-slate-200 shadow-sm">
                            <h3 className="font-semibold mb-2">Growth Trajectory</h3>
                            <p className="text-sm mb-2">
                                This company demonstrates exceptional revenue consistency, maintaining double-digit growth across 7+ years.
                                The standout period was 2019-2020 with 37.62% and 21.70% growth respectively.
                            </p>
                            <p className="text-sm mb-2">
                                The recent moderation to ~11% growth suggests maturity but remains healthy for a large-scale operation approaching $700M in annual revenue.
                            </p>
                            <p className="text-sm font-medium">
                                Investment Thesis: Sustainable growth engine with proven resilience across market cycles.
                            </p>
                        </div>
                    </div>
                </Card>
            </section>


            {/* Storytelling Panel */}
            <section className={`p-5 rounded-2xl ${COLORS.card}`}>
                <h2 className="text-lg font-semibold mb-2">Investor Storyline</h2>
                <ul className="list-disc ml-5 space-y-1 text-sm text-slate-700">
                    {storyline.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
                <p className="text-xs text-slate-500 mt-2">Tip: Use these bullets as chart annotations in your pitch deck.</p>
            </section>

            {/* Data Table */}
            <section className={`p-4 rounded-2xl ${COLORS.card}`}>
                <h2 className="text-lg font-semibold mb-3">Data (key fields)</h2>
                <div className="overflow-auto rounded-xl border border-slate-200">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                {tableCols.map((c) => (
                                    <th key={c} className="px-3 py-2 text-left font-medium text-slate-600 whitespace-nowrap">
                                        {c}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(data || []).map((row, idx) => (
                                <tr key={idx} className={idx % 2 ? "bg-white" : "bg-slate-50/50"}>
                                    {tableCols.map((c) => (
                                        <td key={c} className="px-3 py-2 whitespace-nowrap">
                                            {typeof (row as Record<string, any>)?.[c] === "number"
                                                ? niceNum((row as Record<string, any>)?.[c], ["RevYoY", "GrossMargin", "OpMargin", "ProfitMargin", "EbitdaMargin"].includes(c) ? 2 : 0)
                                                : ((row as Record<string, any>)?.[c] ?? "NA")}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Developer Diagnostics & Tests */}
            <section className={`p-4 rounded-2xl ${COLORS.card}`}>
                <h2 className="text-lg font-semibold mb-2">Developer Diagnostics</h2>
                <ul className="list-disc ml-5 text-sm space-y-1">
                    <li>Data rows: <span className="font-mono">{hasData ? data.length : 0}</span></li>
                    <li>Focus metric: <span className="font-mono">{String(focusMetric)}</span></li>
                    <li>Rev CAGR: <span className="font-mono">{pct(revCAGR ?? null)}</span></li>
                    <li>EPS CAGR: <span className="font-mono">{pct(epsCAGR ?? null)}</span></li>
                    <li>Story bullets: <span className="font-mono">{storyline.length}</span></li>
                </ul>
                <SelfTests renderMainChart={renderMainChart} hasData={hasData} />
            </section>
        </div>
    )
}

export default IncomeComponent