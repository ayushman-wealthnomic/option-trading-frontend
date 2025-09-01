export default function SelfTests({ renderMainChart, hasData }: { renderMainChart: () => React.ReactNode; hasData: boolean }) {
    const tests = [];
    try {
        const child = renderMainChart();
        tests.push({ name: "Main chart returns a valid element", pass: !!child });
    } catch (e) {
        tests.push({ name: "Main chart returns a valid element", pass: false, error: (e as Error)?.message });
    }
    try {
        tests.push({ name: "Data presence check", pass: hasData === true });
    } catch (e) {
        tests.push({ name: "Data presence check", pass: false, error: (e as Error)?.message });
    }
    return (
        <div className="mt-2 text-xs">
            <div className="rounded-lg border border-slate-200 overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-3 py-2 text-left">Test</th>
                            <th className="px-3 py-2 text-left">Result</th>
                            <th className="px-3 py-2 text-left">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((t, i) => (
                            <tr key={i} className={i % 2 ? "bg-white" : "bg-slate-50/50"}>
                                <td className="px-3 py-2">{t.name}</td>
                                <td className={`px-3 py-2 font-medium ${t.pass ? "text-green-700" : "text-red-700"}`}>{t.pass ? "PASS" : "FAIL"}</td>
                                <td className="px-3 py-2">{t.error || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}