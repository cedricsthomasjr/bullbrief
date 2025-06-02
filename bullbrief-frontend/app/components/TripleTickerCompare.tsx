"use client";

import { useState } from "react";
import SingleTickerSearch from "./SingleTickerSearch";
import VerticalStatCard from "./VerticalStatCard";
import AISummaryBlock from "@/app/components/AISummaryBlock";
import MasterCompareSummary from "@/app/components/MasterCompareSummary";
import type { SingleSummaryData, InsightSection } from "@/app/types/stock";

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

      const aligned = tickers.map((t) => json.tickers[t] ?? null);
      setData(aligned);
      setInsights(json.insights);
      setMasterInsight(json.master_insight);
    } catch (err) {
      console.error("Compare fetch failed:", err);
    } finally {
      setLoading(false);
      setLoadingStates([false, false, false]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Ticker Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <SingleTickerSearch
            key={i}
            value={tickers[i]}
            onSubmit={(val) => handleChange(i, val)}
          />
        ))}
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
          onClick={handleCompare}
        >
          Compare
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-lg font-semibold text-gray-400">
          BullBrief is analyzing these stocks...
        </div>
      )}

      {/* Stat Cards */}
      {!loading && insights.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((d, i) =>
            d ? (
              <VerticalStatCard key={i} data={d} loading={loadingStates[i]} />
            ) : null
          )}
        </div>
      )}

      {/* AI Summaries */}
      {!loading && insights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
