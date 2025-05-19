"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TradingViewMiniChart from "@/app/components/TradingViewMiniChart";
import SWOTCard from "@/app/components/SWOTCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoadingScreen from "@/app/components/LoadingScreen"; // ⬅️ Add this import
import StockChartToggle from "@/app/components/StockChartToggle";

type BackendSummary = {
  company_name: string;
  ticker: string;
  business_summary: string;
  swot: string;
  outlook: string;
  market_cap: number;
  pe_ratio: number;
  range_52w: string;
  sector: string;
};

export default function TickerPage() {
  const { ticker } = useParams();
  const [data, setData] = useState<BackendSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/summary/${ticker}`);
        const json = await res.json();
        if (res.ok) setData(json);
        else setError(json.error || "Unknown error");
      } catch (e) {
        setError("Could not connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  if (loading)
    return <LoadingScreen isLoading={loading} />;    
  if (error)
    return <p className="text-red-500 p-8 text-center">Error: {error}</p>;
  if (!data) return null;

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-16 py-24 font-sans space-y-16">
        
      {/* Header */}
      <section className="space-y-4">
      <Link
  href="/"
  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-200 transition mb-4"
>
  <ArrowLeft className="w-4 h-4 mr-2" />
  Back to Home
</Link>
        <h1 className="text-4xl font-extrabold text-blue-400 tracking-tight">
          {data.company_name} <span className="text-white">({data.ticker})</span>
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <span className="bg-zinc-800 px-3 py-1 rounded-full">
            Sector: <span className="text-white">{data.sector}</span>
          </span>
          <span className="bg-zinc-800 px-3 py-1 rounded-full">
            Market Cap: ${Number(data.market_cap).toLocaleString()}
          </span>
          <span className="bg-zinc-800 px-3 py-1 rounded-full">
            P/E Ratio: {data.pe_ratio}
          </span>
          <span className="bg-zinc-800 px-3 py-1 rounded-full">
            52W Range: {data.range_52w}
          </span>
        </div>
      </section>

      {/* Chart */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">📈 Stock Performance</h2>
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
        <StockChartToggle symbol={`NASDAQ:${data.ticker}`} />
        </div>
      </section>

      {/* Business Summary */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">📌 Business Summary</h2>
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
          {data.business_summary}
        </div>
      </section>

      {/* SWOT */}
      <SWOTCard content={data.swot} />


      {/* Outlook */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">🔮 Outlook</h2>
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
          {data.outlook}
        </div>
      </section>
    </main>
  );
}
