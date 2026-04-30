export default function MasterCompareSummary({ summary }: { summary: string }) {
  if (!summary) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(14,165,233,0.07) 0%, rgba(99,102,241,0.07) 100%)",
        border: "1px solid rgba(56,189,248,0.2)",
      }}
    >
      <div
        className="px-6 py-4 flex items-center gap-2.5"
        style={{ borderBottom: "1px solid rgba(56,189,248,0.1)" }}
      >
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-live" />
        <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">
          AI Master Comparison
        </p>
      </div>
      <div className="px-6 py-5">
        <p className="text-sm text-slate-400 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
