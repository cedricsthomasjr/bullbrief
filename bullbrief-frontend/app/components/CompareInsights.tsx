export default function CompareInsights({ insight }: { insight: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.12)" }}
    >
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{ borderBottom: "1px solid rgba(56,189,248,0.08)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">AI Insights</p>
      </div>
      <div className="px-6 py-5">
        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{insight}</p>
      </div>
    </div>
  );
}
