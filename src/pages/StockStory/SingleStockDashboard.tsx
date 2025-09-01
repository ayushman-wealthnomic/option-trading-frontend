
import IncomeComponent from "@/components/StockStory/IncomeComponent";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
    initial: { x: "100%", opacity: 0 }, // enter from right
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }   // exit to left
};
/**
 * Single-Stock Storytelling Dashboard — SAFE & ROBUST
 * Fixes:
 *  - Prevents ResponsiveContainer from receiving a null child (root cause of "cannot read 'props' of null").
 *  - Guards all calculations against undefined/null data.
 *  - Adds an Error Boundary around each chart so rendering errors show a friendly fallback instead of crashing.
 *  - Sanitizes chart datasets (replaces undefined with null / drops NaN).
 *  - Correct bps/percentage displays for zero values.
 *  - Adds developer diagnostics & lightweight self-tests.
 *
 * How to use:
 * 1) Drop this component into a React + Tailwind project.
 * 2) Ensure recharts is installed: `npm i recharts`
 * 3) Default export makes it easy to render directly.
 */

// ----------------------------
// Data (you can swap with API)
// ----------------------------
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

// ----------------------------
// Utilities & Safe Helpers
// ---------------------------

const toCSV = (rows: Array<Record<string, any>>) => {
    if (!rows || !rows.length) return "";
    const headers = Object.keys(rows[0]);
    const body = rows.map((r) => headers.map((h) => (r[h] ?? "")).join(",")).join("\n");
    return [headers.join(","), body].join("\n");
};

const download = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};


export default function StockStorytellingDashboard() {
    const [pageContent, setPageContent] = useState("Income");
    const [includeTTM, setIncludeTTM] = useState(true);
    // Build data safely
    const data = useMemo(() => {
        const rows = includeTTM ? RAW : RAW.filter((r) => r.Year !== "TTM");
        const ordered = [...rows].reverse();
        return ordered;
    }, [includeTTM]);



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

    const onExportCSV = () => {
        const pruned = (data || []).map((d) =>
            Object.fromEntries(tableCols.map((c) => [c, (d as Record<string, any>)?.[c]]))
        );
        download("stock-fundamentals.csv", toCSV(pruned));
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
            {/* Header */}
            <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Single-Stock Storytelling Dashboard</h1>
                        <p className="text-sm text-slate-500">Turn fundamentals into an investor-ready narrative</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-slate-700"
                                checked={!!includeTTM}
                                onChange={(e) => setIncludeTTM(Boolean(e.target.checked))}
                            />
                            Include TTM
                        </label>
                        <button
                            onClick={onExportCSV}
                            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm shadow hover:shadow-md transition"
                        >
                            Export CSV
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
                <div className="flex justify-center items-center gap-10">
                    {["Income", "Balance Sheet", "Cash Flow", "Ratio"].map((k) => (
                        <button
                            key={k}
                            onClick={() => setPageContent(k)}
                            className={`px-3 py-1.5 rounded-xl border text-md transition ${pageContent === k
                                ? "bg-slate-900 text-white border-slate-900 shadow"
                                : "bg-white border-slate-300 hover:shadow"
                                }`}
                        >
                            {k}
                        </button>
                    ))}
                </div>
                {/* Income Tab Content Component */}
                <AnimatePresence mode="wait">
                    {(() => {
                        switch (pageContent) {
                            case "Income":
                                return (
                                    <motion.div
                                        key="Income"               // unique key for AnimatePresence
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={pageVariants}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <IncomeComponent />
                                    </motion.div>
                                );
                            case "Balance Sheet":
                                return (
                                    <motion.div key="BalanceSheet" initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.3 }}>
                                        <IncomeComponent />
                                    </motion.div>
                                );
                            default:
                                return null;
                        }
                    })()}
                </AnimatePresence>

                {/* Footer */}
                <footer className="py-6 text-center text-xs text-slate-500">
                    Built with ❤️ for investor storytelling — plug your own dataset or bind to an API.
                </footer>
            </main>
        </div>
    );
}

