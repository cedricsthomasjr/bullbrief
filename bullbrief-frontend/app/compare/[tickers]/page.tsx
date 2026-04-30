"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CompareMetricsGrid from "@/app/components/CompareMetricsGrid";
import LoadingScreen from "@/app/components/LoadingScreen";
import CompareInsights from "@/app/components/CompareInsights";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type TickerData = {
  ticker: string;
  pe_ratio: number;
  market_cap: number;
  roe: number;
  profit_margin: number;
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
      .then((r) => r.json())
      .then((j: CompareSummaryResponse) => { setData(j); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [tickers]);

  if (loading) return <LoadingScreen />;

  return (
    <main className="min-h-screen pt-14" style={{ backgroundColor: "#060c1a" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-3">
          <Link href="/compare" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-400 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Compare
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter text-blue-50">
            {tickers.split(",").join(" vs ")}
          </h1>
        </div>
        <CompareMetricsGrid data={data?.tickers} />
        <CompareInsights insight={data?.insight || "No insights available."} />
      </div>
    </main>
  );
}
