"use client";

import { useState, useEffect } from "react";
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
  const [loadingStates, setLoadingStates] = useState([false, false, false]);

  const handleChange = (index: number, ticker: string) => {
    const updatedTickers = [...tickers];
    updatedTickers[index] = ticker.toUpperCase();
    setTickers(updatedTickers);

    // mark index as loading
    const updatedLoading = [...loadingStates];
    updatedLoading[index] = true;
    setLoadingStates(updatedLoading);
  };

  useEffect(() => {
    const validTickers = tickers.filter((t) => t.trim().length > 0);
  
    const fetchCompare = async () => {
      try {
        const res = await fetch("http://localhost:8000/compare-summary", {
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
        setLoadingStates([false, false, false]);
      }
    };
  
    if (validTickers.length >= 1) {
      fetchCompare();
    } else {
      setData([null, null, null]);
      setInsights([]);
      setMasterInsight("");
    }
  }, [tickers]);
  

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

      {/* Stat Cards */}
      {insights.length === 0 && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {data.map((d, i) =>
      d ? (
        <VerticalStatCard key={i} data={d} loading={loadingStates[i]} />
      ) : null
    )}
  </div>
)}


      {/* AI Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <AISummaryBlock key={i} insight={insight} />
        ))}
      </div>

      {/* Master Summary */}
      <MasterCompareSummary summary={masterInsight} />
    </div>
  );
}
