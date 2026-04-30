"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SWOTCard from "@/app/components/SWOTCard";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, ArrowUpRight, Brain } from "lucide-react";
import LoadingScreen from "@/app/components/LoadingScreen";
import StockChartToggle from "@/app/components/StockChartToggle";
import FinancialMetricsGrid from "@/app/components/FinancialMetricsGrid";
import ExecutiveGrid from "@/app/components/ExecutiveGrid";
import StockDriversCard, { type StockDriversData } from "@/app/components/StockDriversCard";

type BackendSummary = {
  company_name: string;
  ticker: string;
  exchange: string;
  exchange_symbol: string;
  business_summary: string;
  swot: string;
  outlook: string;
  market_cap: number;
  pe_ratio: number;
  range_52w: string;
  sector: string;
  current_price: number;
  eps_ttm: number;
  forward_pe: number;
  dividend_yield: number;
  beta: number;
  volume: number;
  avg_volume: number;
  peg_ratio: number;
  price_to_sales: number;
  price_to_book: number;
  roe: number;
  free_cashflow: number;
  debt_to_equity: number;
  profit_margin: number;
  institutional_ownership: number;
  short_percent: number;
  raw_summary: string;
};

function fmtNum(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
  return `$${v.toFixed(2)}`;
}

function fmtVol(v: number): string {
  if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return v.toString();
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span
        className="text-[10px] font-mono font-bold tabular-nums px-2 py-0.5 rounded"
        style={{
          color: "#38bdf8",
          backgroundColor: "rgba(56,189,248,0.08)",
          border: "1px solid rgba(56,189,248,0.15)",
        }}
      >
        {num}
      </span>
      <h2 className="text-lg font-bold text-blue-50 tracking-tight">{title}</h2>
      <div className="flex-1 h-px" style={{ background: "rgba(56,189,248,0.07)" }} />
    </div>
  );
}

export default function TickerPage() {
  const { ticker } = useParams();
  const [data, setData] = useState<BackendSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<{ title: string; publisher: string; link: string; providerPublishTime: string }[]>([]);
  const [execs, setExecs] = useState<{ name: string; title: string; pay: string }[]>([]);
  const [peerInsight, setPeerInsight] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<StockDriversData | null>(null);
  const [driversLoading, setDriversLoading] = useState(false);
  const [driversError, setDriversError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;
    const fetchData = async () => {
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/company/peers/insight/${ticker}`);
        const j = await r.json();
        setPeerInsight(j.insight || null);
      } catch { /* optional */ }

      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/${ticker}`);
        const j = await r.json();
        if (r.ok) setData(j);
        else setError(j.error || "Unknown error");
      } catch { setError("Failed to fetch summary"); }
      finally { setLoading(false); }

      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${ticker}`);
        const j = await r.json();
        setNews(j.news || []);
      } catch { /* optional */ }

      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/executives/${ticker}`);
        const j = await r.json();
        setExecs(j.executives || []);
      } catch { /* optional */ }

      setDriversLoading(true);
      setDriversError(null);
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/drivers/${ticker}`);
        const j = await r.json();
        if (r.ok) setDrivers(j);
        else setDriversError(j.error || "No SEC driver data found.");
      } catch {
        setDriversError("Failed to fetch SEC driver data.");
      } finally {
        setDriversLoading(false);
      }
    };
    fetchData();
  }, [ticker]);

  if (loading) return <LoadingScreen isLoading={loading} />;

  if (error) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#060c1a" }}>
      <div className="text-center space-y-3">
        <p className="text-rose-400 text-sm font-medium">Failed to load data</p>
        <p className="text-slate-600 text-xs">{error}</p>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors mt-2">
          <ArrowLeft className="w-3 h-3" /> Back to Home
        </Link>
      </div>
    </main>
  );

  if (!data) return null;

  const isBearish = data.pe_ratio > 100;
  const sectionNum = (n: number) => String(n).padStart(2, "0");
  let sectionIdx = 1;

  return (
    <main className="min-h-screen pt-14" style={{ backgroundColor: "#060c1a" }}>
      {/* Page glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">

        {/* ── Header ── */}
        <section className="space-y-6 pt-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-400 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div className="space-y-1.5">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#38bdf8" }}
              >
                {data.sector}
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-blue-50 leading-none">
                {data.company_name}
              </h1>
              <p className="text-slate-500 text-sm font-mono">{data.ticker} · {data.exchange}</p>
            </div>

            <div
              className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-2 rounded-full text-xs font-semibold"
              style={
                isBearish
                  ? { backgroundColor: "rgba(244,63,94,0.1)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.25)" }
                  : { backgroundColor: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }
              }
            >
              {isBearish ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
              {isBearish ? "Bearish Signal" : "Bullish Trend"}
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Price", value: `$${data.current_price?.toFixed(2)}` },
              { label: "Market Cap", value: fmtNum(data.market_cap) },
              { label: "P/E Ratio", value: data.pe_ratio?.toFixed(1) ?? "—" },
              { label: "EPS (TTM)", value: `$${data.eps_ttm?.toFixed(2)}` },
              { label: "52W Range", value: data.range_52w },
              { label: "Volume", value: fmtVol(data.volume) },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3"
                style={{
                  backgroundColor: "#0c1829",
                  border: "1px solid rgba(56,189,248,0.1)",
                }}
              >
                <p className="text-[10px] uppercase tracking-wider text-slate-600">{item.label}</p>
                <p className="text-blue-50 font-bold text-sm mt-1 tabular-nums">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI Analyst Report CTA ── */}
        <section>
          <Link href={`/summary/${ticker}/analyst`}>
            <div
              className="group rounded-2xl p-5 flex items-center justify-between gap-4 cursor-pointer transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(129,140,248,0.08) 0%, rgba(56,189,248,0.06) 100%)",
                border: "1px solid rgba(129,140,248,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.45)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.25)")}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.25)" }}
                >
                  <Brain className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-50">AI Analyst Report</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Full investment thesis — rating, scorecard, price target, bull/bear cases, catalysts & risks
                  </p>
                </div>
              </div>
              <div
                className="shrink-0 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                style={{ backgroundColor: "rgba(129,140,248,0.12)", color: "#818cf8", border: "1px solid rgba(129,140,248,0.2)" }}
              >
                Generate Report <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </section>

        {/* ── Chart ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="Stock Performance" />
          <div className="rounded-2xl overflow-hidden p-1" style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}>
            <StockChartToggle symbol={data.exchange_symbol} />
          </div>
        </section>

        {/* ── Explore Metrics ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="Explore Metrics" />
          <div className="flex gap-3 flex-wrap">
            {[
              { label: "Revenue", href: `/summary/${ticker}/metric/revenue` },
              { label: "EPS",     href: `/summary/${ticker}/metric/eps` },
            ].map((m) => (
              <Link key={m.href} href={m.href}>
                <button
                  className="flex items-center gap-2 text-sm font-medium text-sky-300 px-5 py-2.5 rounded-xl transition-all"
                  style={{
                    backgroundColor: "rgba(56,189,248,0.07)",
                    border: "1px solid rgba(56,189,248,0.18)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(56,189,248,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(56,189,248,0.07)")}
                >
                  {m.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </Link>
            ))}
          </div>
        </section>

        {/* ── BullBrief ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="The BullBrief" />
          <div
            className="rounded-2xl p-6 text-sm leading-8 text-slate-400 whitespace-pre-wrap"
            style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
          >
            {data.business_summary}
          </div>
        </section>

        {/* ── Stock Drivers ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="What Drives The Stock" />
          <StockDriversCard data={drivers} loading={driversLoading} error={driversError} />
        </section>

        {/* ── SWOT ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="SWOT Analysis" />
          <SWOTCard content={data.swot} />
        </section>

        {/* ── Outlook ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="Outlook" />
          <div
            className="rounded-2xl p-6 text-sm leading-8 text-slate-400 whitespace-pre-wrap"
            style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
          >
            {data.outlook}
          </div>
        </section>

        {/* ── Financials ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="Financial Metrics" />
          <FinancialMetricsGrid data={data} />
        </section>

        {/* ── Peer Insight ── */}
        {peerInsight && (
          <section>
            <SectionHeader num={sectionNum(sectionIdx++)} title="AI Peer Insight" />
            <div
              className="rounded-2xl p-6 text-sm leading-8 text-slate-400 whitespace-pre-wrap"
              style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
            >
              {peerInsight}
            </div>
          </section>
        )}

        {/* ── Executives ── */}
        {execs.length > 0 && (
          <section>
            <SectionHeader num={sectionNum(sectionIdx++)} title="Executive Team" />
            <ExecutiveGrid execs={execs} />
          </section>
        )}

        {/* ── News ── */}
        <section>
          <SectionHeader num={sectionNum(sectionIdx++)} title="Recent News" />
          {news.length === 0 ? (
            <p className="text-slate-700 text-sm">No recent news found.</p>
          ) : (
            <div className="space-y-2">
              {news.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-xl p-4 transition-all"
                  style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.08)")}
                >
                  <div className="min-w-0">
                    <p className="text-sm text-blue-50 font-medium leading-snug group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {item.publisher} · {new Date(item.providerPublishTime).toLocaleDateString()}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-700 shrink-0 mt-0.5 group-hover:text-sky-400 transition-colors" />
                </a>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
