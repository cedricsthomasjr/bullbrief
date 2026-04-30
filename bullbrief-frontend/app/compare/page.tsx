"use client";

import TripleTickerCompare from "@/app/components/TripleTickerCompare";

export default function ComparePage() {
  return (
    <main className="min-h-screen pt-14" style={{ backgroundColor: "#060c1a" }}>
      {/* Background glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Tool</p>
          <h1 className="text-4xl font-bold tracking-tighter text-blue-50">Deep Compare</h1>
          <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
            Enter up to three stock tickers for a side-by-side AI breakdown of fundamentals, valuation, and strategic outlook.
          </p>
        </div>

        <TripleTickerCompare />
      </div>
    </main>
  );
}
