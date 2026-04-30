"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import MetricChart from "@/app/components/MetricChart";
import LoadingScreen from "@/app/components/LoadingScreen";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MetricDetailPage() {
  const { ticker, metric } = useParams() as { ticker: string; metric: string };
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [data, setData] = useState<{ year: number; value: number }[] | null>(null);
  const lastGoodData = useRef<{ year: number; value: number }[] | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const bulletPoints = aiSummary
    ?.split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.replace(/^- /, "").trim());

  useEffect(() => {
    if (!ticker || !metric) return;
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
        const endpoint = ["eps", "revenue"].includes(metric.toLowerCase())
          ? `${baseURL}/metric/${ticker}/${metric}`
          : `${baseURL}/macrotrends/${ticker}`;
        const res = await fetch(endpoint);
        const json = await res.json();
        let extracted = null;
        if (["eps", "revenue"].includes(metric.toLowerCase())) {
          extracted = json.data;
        } else {
          const key = Object.keys(json.data).find((k) => k.toLowerCase() === metric.toLowerCase());
          extracted = key && Array.isArray(json.data[key]) ? json.data[key] : null;
        }
        if (extracted) { lastGoodData.current = extracted; setData(extracted); }
        else setData(lastGoodData.current);
      } catch { setData(lastGoodData.current); }
      finally { setDataLoading(false); }
    };
    fetchData();
  }, [ticker, metric]);

  useEffect(() => {
    if (!ticker || !metric) return;
    const fetchAI = async () => {
      setSummaryLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/interpret/${ticker}?metric=${metric}`);
        const json = await res.json();
        setAiSummary(json.analysis ?? null);
      } finally { setSummaryLoading(false); }
    };
    fetchAI();
  }, [ticker, metric]);

  if (dataLoading) return <LoadingScreen />;

  return (
    <main className="min-h-screen pt-14" style={{ backgroundColor: "#060c1a" }}>
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-3 pt-2">
          <Link href={`/summary/${ticker}`} className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-400 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to {ticker}
          </Link>
          <div>
            <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-1">{ticker}</p>
            <h1 className="text-4xl font-bold tracking-tighter text-blue-50 capitalize">{metric}</h1>
          </div>
        </div>

        {/* Chart */}
        <section
          className="rounded-2xl p-6"
          style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
        >
          <MetricChart data={data} title={metric} />
        </section>

        {/* AI Interpretation */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-mono font-bold tabular-nums px-2 py-0.5 rounded"
              style={{ color: "#818cf8", backgroundColor: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.2)" }}
            >
              AI
            </span>
            <h2 className="text-lg font-bold text-blue-50">AI Interpretation</h2>
            <div className="flex-1 h-px" style={{ background: "rgba(56,189,248,0.07)" }} />
          </div>

          {summaryLoading ? (
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full animate-spin"
                style={{ borderTop: "2px solid #818cf8", borderRight: "2px solid transparent", borderBottom: "2px solid transparent", borderLeft: "2px solid transparent" }}
              />
              <p className="text-xs text-slate-600">Generating analysis...</p>
            </div>
          ) : bulletPoints && bulletPoints.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bulletPoints.map((point, idx) => {
                const [title, ...rest] = point.split(":");
                return (
                  <div
                    key={idx}
                    className="rounded-xl p-5 space-y-1.5 transition-all"
                    style={{
                      backgroundColor: "rgba(129,140,248,0.05)",
                      border: "1px solid rgba(129,140,248,0.15)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(129,140,248,0.09)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(129,140,248,0.05)")}
                  >
                    <p className="text-xs font-bold text-indigo-400">{title}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{rest.join(":").trim()}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-rose-400 text-sm italic">Could not generate summary.</p>
          )}
        </section>
      </div>
    </main>
  );
}
