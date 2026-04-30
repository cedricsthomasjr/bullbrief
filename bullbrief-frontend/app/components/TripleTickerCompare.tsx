"use client";

import { useState } from "react";
import SingleTickerSearch from "./SingleTickerSearch";
import VerticalStatCard from "./VerticalStatCard";
import AISummaryBlock from "@/app/components/AISummaryBlock";
import MasterCompareSummary from "@/app/components/MasterCompareSummary";
import type { SingleSummaryData, InsightSection } from "@/app/types/stock";
import { ArrowRight } from "lucide-react";

export default function TripleTickerCompare() {
  const [tickers, setTickers] = useState(["", "", ""]);
  const [data, setData] = useState<(SingleSummaryData | null)[]>([null, null, null]);
  const [insights, setInsights] = useState<InsightSection[]>([]);
  const [masterInsight, setMasterInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState([false, false, false]);

  const handleChange = (index: number, ticker: string) => {
    const updated = [...tickers];
    updated[index] = ticker.toUpperCase();
    setTickers(updated);
  };

  const handleCompare = async () => {
    const validTickers = tickers.filter((t) => t.trim().length > 0);
    if (validTickers.length === 0) return;
    setLoading(true);
    setLoadingStates([true, true, true]);
    setData([null, null, null]);
    setInsights([]);
    setMasterInsight("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compare-summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickers: validTickers }),
      });
      const json = await res.json();
      setData(tickers.map((t) => json.tickers[t] ?? null));
      setInsights(json.insights);
      setMasterInsight(json.master_insight);
    } catch (err) {
      console.error("Compare fetch failed:", err);
    } finally {
      setLoading(false);
      setLoadingStates([false, false, false]);
    }
  };

  const hasResults = !loading && (insights.length > 0 || data.some(Boolean));

  return (
    <div className="space-y-8">
      {/* Input panel */}
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.12)" }}
      >
        <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Enter up to 3 tickers</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <SingleTickerSearch
              key={i}
              value={tickers[i]}
              placeholder={`Ticker ${i + 1} — e.g. ${["AAPL", "MSFT", "NVDA"][i]}`}
              onSubmit={(val) => handleChange(i, val)}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={handleCompare}
            disabled={loading || tickers.every((t) => !t.trim())}
            className="btn-gradient flex items-center gap-2 text-white text-sm font-bold px-6 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Run Comparison"}
            {!loading && <ArrowRight className="w-3.5 h-3.5" />}
          </button>

          {loading && (
            <div className="flex items-center gap-2.5">
              <div
                className="w-4 h-4 rounded-full animate-spin"
                style={{ borderTop: "2px solid #38bdf8", borderRight: "2px solid transparent", borderBottom: "2px solid transparent", borderLeft: "2px solid transparent" }}
              />
              <p className="text-xs text-slate-600">BullBrief is analyzing...</p>
            </div>
          )}
        </div>
      </div>

      {/* Stat cards fallback */}
      {hasResults && insights.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((d, i) => d ? <VerticalStatCard key={i} data={d} loading={loadingStates[i]} /> : null)}
        </div>
      )}

      {/* AI Summaries */}
      {!loading && insights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, i) => (
            <AISummaryBlock key={i} insight={insight} />
          ))}
        </div>
      )}

      {/* Master Summary */}
      {!loading && masterInsight && (
        <MasterCompareSummary summary={masterInsight} />
      )}
    </div>
  );
}
