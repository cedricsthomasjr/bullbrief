"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TickerInput from "@/app/components/TickerInput";
import { ArrowRight, BarChart3, Zap, Shield, Activity } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-4 h-4 text-sky-400" />,
    label: "AI Summaries",
    desc: "GPT-powered breakdowns of fundamentals, outlook, and competitive position.",
    accent: "rgba(56,189,248,0.06)",
    border: "rgba(56,189,248,0.15)",
  },
  {
    icon: <BarChart3 className="w-4 h-4 text-indigo-400" />,
    label: "Live Metrics",
    desc: "Real-time financials — EPS, P/E, ROE, FCF, debt ratios, and more.",
    accent: "rgba(129,140,248,0.06)",
    border: "rgba(129,140,248,0.15)",
  },
  {
    icon: <Shield className="w-4 h-4 text-violet-400" />,
    label: "SWOT Analysis",
    desc: "Structured breakdown of company strengths, risks, and opportunities.",
    accent: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.15)",
  },
  {
    icon: <Activity className="w-4 h-4 text-emerald-400" />,
    label: "Peer Compare",
    desc: "Side-by-side AI analysis across up to three companies at once.",
    accent: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.15)",
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#060c1a" }}>
      {/* Radial glow backgrounds */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center space-y-8 max-w-2xl w-full"
        >
          {/* Live badge */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-sky-300"
            style={{
              backgroundColor: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-live" />
            AI-Powered Stock Intelligence
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter leading-none gradient-text">
              BullBrief
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
              Institutional-grade company analysis powered by AI.
              Search any public company for an instant breakdown.
            </p>
          </div>

          {/* Search */}
          <TickerInput />

          {/* Hint */}
          <p className="text-xs text-slate-600">
            Try <button onClick={() => router.push("/summary/AAPL")} className="text-sky-500 hover:text-sky-400 transition-colors">AAPL</button>
            {" · "}
            <button onClick={() => router.push("/summary/NVDA")} className="text-sky-500 hover:text-sky-400 transition-colors">NVDA</button>
            {" · "}
            <button onClick={() => router.push("/summary/MSFT")} className="text-sky-500 hover:text-sky-400 transition-colors">MSFT</button>
          </p>
        </motion.div>
      </section>

      {/* Deep Compare card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto px-6 pb-12"
      >
        <div
          className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(99,102,241,0.08) 100%)",
            border: "1px solid rgba(56,189,248,0.18)",
          }}
        >
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-sky-400 uppercase tracking-widest">Featured Tool</p>
            <h2 className="text-2xl font-bold text-white tracking-tight">Deep Compare</h2>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Side-by-side AI-powered analysis across fundamentals, valuation, and outlook. Compare up to three companies at once.
            </p>
          </div>
          <button
            onClick={() => router.push("/compare")}
            className="btn-gradient shrink-0 flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-xl"
          >
            Compare Companies
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.section>

      {/* Features grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto px-6 pb-28"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 space-y-3 transition-all duration-200 hover:scale-[1.01]"
              style={{
                backgroundColor: f.accent,
                border: `1px solid ${f.border}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: f.accent, border: `1px solid ${f.border}` }}
              >
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-50">{f.label}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
