"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Zap,
  Shield,
  BarChart3,
  Activity,
  Target,
  Brain,
} from "lucide-react";
import LoadingScreen from "@/app/components/LoadingScreen";

// ─── Types ───────────────────────────────────────────────────────────────────

type Rating = "STRONG BUY" | "BUY" | "HOLD" | "SELL" | "STRONG SELL";
type Severity = "LOW" | "MEDIUM" | "HIGH";
type Timeline = "Near-term" | "Mid-term" | "Long-term";

interface AnalystReport {
  company_name: string;
  ticker: string;
  sector: string;
  industry: string;
  current_price: number;
  market_cap: number;
  wk52_low: number;
  wk52_high: number;
  rating: Rating;
  confidence: number;
  price_target: { low: number; mid: number; high: number };
  scores: {
    valuation: number;
    growth: number;
    profitability: number;
    financial_health: number;
    competitive_position: number;
    momentum: number;
  };
  score_rationale: {
    valuation: string;
    growth: string;
    profitability: string;
    financial_health: string;
    competitive_position: string;
    momentum: string;
  };
  bull_thesis: string[];
  bear_thesis: string[];
  catalysts: { title: string; description: string; timeline: Timeline }[];
  risks: { title: string; description: string; severity: Severity }[];
  executive_summary: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const RATING_CONFIG: Record<Rating, { color: string; bg: string; border: string; glow: string; icon: React.ReactNode }> = {
  "STRONG BUY": {
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.35)",
    glow: "0 0 40px rgba(16,185,129,0.2)",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  BUY: {
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    glow: "0 0 30px rgba(52,211,153,0.12)",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  HOLD: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.3)",
    glow: "0 0 30px rgba(245,158,11,0.12)",
    icon: <Minus className="w-5 h-5" />,
  },
  SELL: {
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.08)",
    border: "rgba(244,63,94,0.3)",
    glow: "0 0 30px rgba(244,63,94,0.12)",
    icon: <TrendingDown className="w-5 h-5" />,
  },
  "STRONG SELL": {
    color: "#e11d48",
    bg: "rgba(225,29,72,0.1)",
    border: "rgba(225,29,72,0.35)",
    glow: "0 0 40px rgba(225,29,72,0.2)",
    icon: <TrendingDown className="w-5 h-5" />,
  },
};

const SEVERITY_CONFIG: Record<Severity, { color: string; bg: string; border: string; label: string }> = {
  HIGH:   { color: "#f43f5e", bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.25)",   label: "HIGH" },
  MEDIUM: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  label: "MED" },
  LOW:    { color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  label: "LOW" },
};

const TIMELINE_CONFIG: Record<Timeline, { color: string; bg: string }> = {
  "Near-term": { color: "#38bdf8", bg: "rgba(56,189,248,0.1)" },
  "Mid-term":  { color: "#818cf8", bg: "rgba(129,140,248,0.1)" },
  "Long-term": { color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
};

const SCORE_ICONS: Record<string, React.ReactNode> = {
  valuation:            <Target className="w-4 h-4" />,
  growth:               <TrendingUp className="w-4 h-4" />,
  profitability:        <BarChart3 className="w-4 h-4" />,
  financial_health:     <Shield className="w-4 h-4" />,
  competitive_position: <Zap className="w-4 h-4" />,
  momentum:             <Activity className="w-4 h-4" />,
};

const SCORE_LABELS: Record<string, string> = {
  valuation:            "Valuation",
  growth:               "Growth",
  profitability:        "Profitability",
  financial_health:     "Financial Health",
  competitive_position: "Competitive Moat",
  momentum:             "Momentum",
};

function scoreColor(score: number): string {
  if (score >= 8) return "#10b981";
  if (score >= 6) return "#38bdf8";
  if (score >= 4) return "#f59e0b";
  return "#f43f5e";
}

function fmtPrice(v: number | null | undefined): string {
  if (v == null) return "—";
  return `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtCap(v: number | null | undefined): string {
  if (v == null) return "—";
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9)  return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6)  return `$${(v / 1e6).toFixed(2)}M`;
  return `$${v.toFixed(0)}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-4"
      style={{ borderBottom: "1px solid rgba(56,189,248,0.08)" }}
    >
      <span className="text-sky-400">{icon}</span>
      <p className="text-sm font-bold text-blue-50 tracking-tight">{title}</p>
    </div>
  );
}

function ScoreBar({ score, label, rationale, dimension }: { score: number; label: string; rationale: string; dimension: string }) {
  const color = scoreColor(score);
  const pct = (score / 10) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4 space-y-3"
      style={{ backgroundColor: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span style={{ color }}>{SCORE_ICONS[dimension]}</span>
          <p className="text-xs font-semibold text-slate-400">{label}</p>
        </div>
        <span className="text-2xl font-bold tabular-nums" style={{ color }}>
          {score}<span className="text-sm text-slate-700 font-normal">/10</span>
        </span>
      </div>

      {/* Bar */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>

      <p className="text-[11px] text-slate-600 leading-relaxed">{rationale}</p>
    </motion.div>
  );
}

function PriceTargetBar({ current, low, mid, high, wk52Low, wk52High }: {
  current: number; low: number; mid: number; high: number;
  wk52Low: number; wk52High: number;
}) {
  const min = Math.min(current, low, wk52Low) * 0.97;
  const max = Math.max(current, high, wk52High) * 1.03;
  const range = max - min;
  const pct = (v: number) => `${((v - min) / range) * 100}%`;

  const points = [
    { label: "52W Low", value: wk52Low, color: "#f43f5e", top: true },
    { label: "Bear Target", value: low, color: "#f59e0b", top: false },
    { label: "Base Target", value: mid, color: "#38bdf8", top: true },
    { label: "Bull Target", value: high, color: "#10b981", top: false },
    { label: "52W High", value: wk52High, color: "#818cf8", top: true },
  ];

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium">Current Price</p>
          <p className="text-3xl font-bold gradient-text tabular-nums">{fmtPrice(current)}</p>
        </div>
        <div className="text-right space-y-1">
          <div>
            <span className="text-[10px] text-slate-600">Base Target </span>
            <span className="text-lg font-bold text-sky-400 tabular-nums">{fmtPrice(mid)}</span>
          </div>
          <div className="text-xs text-slate-600">
            <span className="text-emerald-400">{fmtPrice(high)}</span>
            {" · "}
            <span className="text-amber-400">{fmtPrice(low)}</span>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="relative pt-8 pb-8">
        {/* Background track */}
        <div
          className="h-2 rounded-full w-full"
          style={{ background: "linear-gradient(to right, rgba(244,63,94,0.3), rgba(245,158,11,0.3), rgba(56,189,248,0.3), rgba(16,185,129,0.3))" }}
        />

        {/* Current price needle */}
        <div
          className="absolute top-0 bottom-0 flex flex-col items-center"
          style={{ left: pct(current), transform: "translateX(-50%)" }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-white z-10 mt-5"
            style={{ backgroundColor: "#060c1a", boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
          />
          <div className="text-[10px] text-white font-bold mt-1 whitespace-nowrap">Now</div>
        </div>

        {/* Marker dots */}
        {points.map((p) => (
          <div
            key={p.label}
            className="absolute flex flex-col items-center"
            style={{
              left: pct(p.value),
              transform: "translateX(-50%)",
              top: p.top ? "-28px" : "auto",
              bottom: p.top ? "auto" : "-28px",
            }}
          >
            <div className="text-[9px] font-medium whitespace-nowrap" style={{ color: p.color }}>{p.label}</div>
            <div className="w-0.5 h-3 mx-auto" style={{ backgroundColor: p.color, opacity: 0.5 }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-slate-700 font-mono">
        <span>{fmtPrice(min)}</span>
        <span>{fmtPrice(max)}</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalystReportPage() {
  const { ticker } = useParams() as { ticker: string };
  const [report, setReport] = useState<AnalystReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analyst/${ticker}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.error) setError(j.error);
        else setReport(j);
      })
      .catch(() => setError("Failed to generate report"))
      .finally(() => setLoading(false));
  }, [ticker]);

  if (loading) return <LoadingScreen isLoading />;

  if (error || !report) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#060c1a" }}>
        <div className="text-center space-y-3">
          <p className="text-rose-400 text-sm font-medium">Failed to generate report</p>
          <p className="text-slate-600 text-xs">{error}</p>
          <Link href={`/summary/${ticker}`} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors mt-2">
            <ArrowLeft className="w-3 h-3" /> Back to Summary
          </Link>
        </div>
      </main>
    );
  }

  const ratingCfg = RATING_CONFIG[report.rating];
  const scoreKeys = Object.keys(report.scores) as (keyof typeof report.scores)[];
  const overallScore = Math.round(Object.values(report.scores).reduce((a, b) => a + b, 0) / scoreKeys.length * 10) / 10;

  return (
    <main className="min-h-screen pt-14" style={{ backgroundColor: "#060c1a" }}>
      {/* Background glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(ellipse, ${ratingCfg.color}18 0%, transparent 65%)`, filter: "blur(60px)" }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* ── Back + Label ── */}
        <div className="flex items-center justify-between pt-4">
          <Link href={`/summary/${ticker}`} className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-400 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Summary
          </Link>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Analyst Report · {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{report.sector} · {report.industry}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-blue-50">{report.company_name}</h1>
          <p className="text-slate-500 font-mono text-sm">{report.ticker} · {fmtCap(report.market_cap)}</p>
        </motion.div>

        {/* ── Rating + Executive Summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {/* Rating card */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center"
            style={{ backgroundColor: ratingCfg.bg, border: `1px solid ${ratingCfg.border}`, boxShadow: ratingCfg.glow }}
          >
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">AI Rating</p>
              <div className="flex items-center justify-center gap-2" style={{ color: ratingCfg.color }}>
                {ratingCfg.icon}
                <span className="text-2xl font-black tracking-tight">{report.rating}</span>
              </div>
            </div>

            {/* Confidence ring */}
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>Confidence</span>
                <span style={{ color: ratingCfg.color }} className="font-bold">{report.confidence}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${report.confidence}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  style={{ backgroundColor: ratingCfg.color }}
                />
              </div>
            </div>

            {/* Overall score */}
            <div className="space-y-1 pt-1 border-t w-full" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] text-slate-600 uppercase tracking-widest">Overall Score</p>
              <p className="text-3xl font-black tabular-nums" style={{ color: scoreColor(overallScore) }}>
                {overallScore}<span className="text-sm font-normal text-slate-700">/10</span>
              </p>
            </div>
          </div>

          {/* Executive summary */}
          <div
            className="lg:col-span-2 rounded-2xl p-6 flex flex-col justify-between gap-4"
            style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
          >
            <div>
              <p className="text-[10px] text-sky-400 uppercase tracking-widest font-bold mb-3">Executive Summary</p>
              <p className="text-sm text-slate-300 leading-8">{report.executive_summary}</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 border-t" style={{ borderColor: "rgba(56,189,248,0.06)" }}>
              {[
                { label: "Current", value: fmtPrice(report.current_price), color: "#e2e8f0" },
                { label: "Base Target", value: fmtPrice(report.price_target.mid), color: "#38bdf8" },
                { label: "Upside", value: `${(((report.price_target.mid - report.current_price) / report.current_price) * 100).toFixed(1)}%`, color: report.price_target.mid > report.current_price ? "#10b981" : "#f43f5e" },
              ].map((s) => (
                <div key={s.label} className="space-y-0.5">
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest">{s.label}</p>
                  <p className="text-base font-bold tabular-nums" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Price Target Visualization ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          <SectionCard>
            <SectionTitle icon={<Target className="w-4 h-4" />} title="12-Month Price Target" />
            <PriceTargetBar
              current={report.current_price}
              low={report.price_target.low}
              mid={report.price_target.mid}
              high={report.price_target.high}
              wk52Low={report.wk52_low}
              wk52High={report.wk52_high}
            />
          </SectionCard>
        </motion.div>

        {/* ── Scorecard ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}>
          <SectionCard>
            <SectionTitle icon={<BarChart3 className="w-4 h-4" />} title="AI Scorecard" />
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scoreKeys.map((key) => (
                <ScoreBar
                  key={key}
                  dimension={key}
                  label={SCORE_LABELS[key]}
                  score={report.scores[key]}
                  rationale={report.score_rationale[key]}
                />
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* ── Bull vs Bear ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Bull */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.18)" }}
          >
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(16,185,129,0.1)" }}>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <p className="text-sm font-bold text-emerald-400">Bull Case</p>
            </div>
            <ul className="p-5 space-y-3">
              {report.bull_thesis.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#10b981" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-400 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Bear */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "rgba(244,63,94,0.04)", border: "1px solid rgba(244,63,94,0.18)" }}
          >
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(244,63,94,0.1)" }}>
              <TrendingDown className="w-4 h-4 text-rose-400" />
              <p className="text-sm font-bold text-rose-400">Bear Case</p>
            </div>
            <ul className="p-5 space-y-3">
              {report.bear_thesis.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: "rgba(244,63,94,0.15)", color: "#f43f5e" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-400 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Catalysts ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}>
          <SectionCard>
            <SectionTitle icon={<Zap className="w-4 h-4" />} title="Key Catalysts" />
            <div className="p-5 space-y-0">
              {report.catalysts.map((c, i) => {
                const tc = TIMELINE_CONFIG[c.timeline];
                const isLast = i === report.catalysts.length - 1;
                return (
                  <div key={i} className="flex gap-4">
                    {/* Timeline column */}
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: tc.color }} />
                      {!isLast && <div className="w-0.5 flex-1 my-1" style={{ backgroundColor: "rgba(56,189,248,0.08)" }} />}
                    </div>
                    {/* Content */}
                    <div className={`pb-5 flex-1 ${isLast ? "" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-blue-50">{c.title}</p>
                        <span
                          className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                          style={{ color: tc.color, backgroundColor: tc.bg }}
                        >
                          {c.timeline}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </motion.div>

        {/* ── Risks ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}>
          <SectionCard>
            <SectionTitle icon={<AlertTriangle className="w-4 h-4" />} title="Risk Factors" />
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.risks.map((r, i) => {
                const sc = SEVERITY_CONFIG[r.severity];
                return (
                  <div
                    key={i}
                    className="rounded-xl p-4 space-y-2"
                    style={{ backgroundColor: sc.bg, border: `1px solid ${sc.border}`, borderLeft: `3px solid ${sc.color}` }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-blue-50">{r.title}</p>
                      <span
                        className="shrink-0 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest"
                        style={{ color: sc.color, backgroundColor: `${sc.color}18` }}
                      >
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{r.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </motion.div>

        {/* ── Disclaimer ── */}
        <div className="pb-10">
          <p className="text-[11px] text-slate-700 text-center leading-relaxed max-w-2xl mx-auto">
            This report is generated by BullBrief AI and is for informational purposes only. It does not constitute financial advice.
            Always conduct your own due diligence before making investment decisions.
          </p>
        </div>

      </div>
    </main>
  );
}
