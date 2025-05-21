"use client";

import { useState } from "react";
import SingleTickerSearch from "./SingleTickerSearch";
import VerticalStatCard from "./VerticalStatCard";
import AISummaryBlock from "@/app/components/AISummaryBlock";
import type { SingleSummaryData } from "@/app/types/stock"; // or wherever your type is


export default function TripleTickerCompare() {
  const [tickers, setTickers] = useState(["", "", ""]);
  const [data, setData] = useState<(SingleSummaryData | null)[]>([null, null, null]);

  const handleChange = async (index: number, ticker: string) => {
    const updatedTickers = [...tickers];
    updatedTickers[index] = ticker.toUpperCase();
    setTickers(updatedTickers);

    if (ticker.length >= 1) {
      try {
        const res = await fetch(`http://localhost:8000/summary-single/${ticker.toUpperCase()}`);
        const json = await res.json();

        const updatedData = [...data];
        updatedData[index] = json;
        setData(updatedData);
      } catch (err) {
        console.error("Fetch failed for", ticker, err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <SingleTickerSearch
          key={i}
          value={tickers[i]}
          onSubmit={(val) => handleChange(i, val)}
        />
        
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((d, i) => (
          <VerticalStatCard key={i} data={d} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((d, i) => (
          <AISummaryBlock key={i} summary={d?.ai_summary || ""} ticker={tickers[i]} />
        ))}
      </div>
    </div>
  );
}
