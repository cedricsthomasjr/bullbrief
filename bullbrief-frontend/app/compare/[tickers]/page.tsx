"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CompareMetricsGrid from "@/app/components/CompareMetricsGrid";
import LoadingScreen from "@/app/components/LoadingScreen";
import CompareInsights from "@/app/components/CompareInsights";

type TickerData = {
  ticker: string;
  pe_ratio: number;
  market_cap: number;
  roe: number;
  profit_margin: number;
  // add any other required fields
};


type CompareSummaryResponse = {
  tickers: TickerData[];
  insight: string;
};

export default function ComparePage() {
  const { tickers } = useParams() as { tickers: string };
  const [data, setData] = useState<CompareSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tickers) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compare-summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickers: tickers.split(",") }),
    })
      .then((res) => res.json())
      .then((json: CompareSummaryResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [tickers]);

  if (loading) return <LoadingScreen />;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">
        Comparing {tickers.replaceAll(",", " vs ")}
      </h1>
      <CompareMetricsGrid data={data?.tickers} />
      <CompareInsights insight={data?.insight || "No insights available."} />
    </main>
  );
}
