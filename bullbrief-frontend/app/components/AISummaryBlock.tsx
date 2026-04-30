import type { InsightSection } from "@//app/types/stock";

const SECTIONS = [
  { key: "valuation",    label: "Valuation",    color: "#38bdf8", border: "rgba(56,189,248,0.2)",  bg: "rgba(56,189,248,0.04)" },
  { key: "profitability",label: "Profitability", color: "#10b981", border: "rgba(16,185,129,0.2)",  bg: "rgba(16,185,129,0.04)" },
  { key: "margins",      label: "Margins",       color: "#f59e0b", border: "rgba(245,158,11,0.2)",  bg: "rgba(245,158,11,0.04)" },
  { key: "outlook",      label: "Outlook",       color: "#818cf8", border: "rgba(129,140,248,0.2)", bg: "rgba(129,140,248,0.04)" },
] as const;

export default function AISummaryBlock({ insight }: { insight: InsightSection }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.12)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(56,189,248,0.08)" }}
      >
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">AI Summary</p>
        <p className="text-sm font-bold text-blue-50 mt-0.5 gradient-text">{insight.ticker}</p>
      </div>

      {/* Sections */}
      <div>
        {SECTIONS.map((s) => (
          <div
            key={s.key}
            className="px-5 py-4"
            style={{
              backgroundColor: s.bg,
              borderLeft: `2px solid ${s.color}`,
              borderBottom: "1px solid rgba(56,189,248,0.04)",
            }}
          >
            <p
              className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: s.color }}
            >
              {s.label}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {insight[s.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
