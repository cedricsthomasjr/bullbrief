import type { SingleSummaryData } from "@/app/types/stock";

type Props = { data: SingleSummaryData | null; loading?: boolean };

export default function VerticalStatCard({ data, loading = false }: Props) {
  const render = (v: number | null, suffix = "", divide = 1) =>
    v != null ? `${(v / divide).toFixed(2)}${suffix}` : "—";

  if (loading) {
    return (
      <div
        className="rounded-2xl p-5 flex flex-col items-center justify-center min-h-[140px] gap-3"
        style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
      >
        <div
          className="w-5 h-5 rounded-full animate-spin"
          style={{ borderTop: "2px solid #38bdf8", borderRight: "2px solid transparent", borderBottom: "2px solid transparent", borderLeft: "2px solid transparent" }}
        />
        <p className="text-xs text-slate-700">Analyzing...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="rounded-2xl p-5 flex items-center justify-center min-h-[140px]"
        style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
      >
        <p className="text-xs text-slate-700">No data loaded.</p>
      </div>
    );
  }

  const stats = [
    { label: "Market Cap",    value: render(data.market_cap, "B", 1e9) },
    { label: "P/E Ratio",     value: render(data.pe_ratio) },
    { label: "ROE",           value: render(data.roe, "%", 0.01) },
    { label: "Profit Margin", value: render(data.profit_margin, "%", 0.01) },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.12)" }}
    >
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid rgba(56,189,248,0.08)" }}
      >
        <p className="text-sm font-bold text-blue-50">{data.company_name}</p>
        <p className="text-xs text-slate-600 font-mono mt-0.5">{data.ticker}</p>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(56,189,248,0.05)" }}>
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between px-5 py-3">
            <p className="text-xs text-slate-600">{s.label}</p>
            <p className="text-xs font-bold text-blue-50 tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
