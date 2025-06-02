"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SWOTCard from "@//app/components/SWOTCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoadingScreen from "@/app/components/LoadingScreen"; // ⬅️ Add this import
import StockChartToggle from "@/app/components/StockChartToggle";
import FinancialMetricsGrid from "@/app/components/FinancialMetricsGrid";
import ExecutiveGrid from "@/app/components/ExecutiveGrid";

type BackendSummary = {
  company_name: string;
  ticker: string;
  exchange: string; // ← new
  exchange_symbol: string; // ← new
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


export default function TickerPage() {
  const { ticker } = useParams();
  const [data, setData] = useState<BackendSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<
  {
    title: string;
    publisher: string;
    link: string;
    providerPublishTime: string;
  }[]
>([]);
const [execs, setExecs] = useState<
  { name: string; title: string; pay: string }[]
>([]);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/${ticker}`);
        const json = await res.json();
        if (res.ok) setData(json);
        else setError(json.error || "Unknown error");
      }  finally {
        setLoading(false);
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${ticker}`);
        const json = await res.json();
        setNews(json.news || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/executives/${ticker}`);
        const json = await res.json();
        setExecs(json.executives || []);
      } catch (err) {
        console.error("Failed to fetch executives:", err);
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
        <StockChartToggle symbol={data.exchange_symbol} />
        </div>
      </section>
      <section>
  <h2 className="text-2xl font-semibold text-blue-300 mb-4">📊 Explore Metrics</h2>
  <div className="flex gap-4 flex-wrap">
    <Link href={`/summary/${ticker}/metric/revenue`}>
      <button className="bg-zinc-800 px-5 py-2 rounded-lg text-sm hover:bg-blue-600 transition text-white border border-zinc-700 shadow-sm">
        Revenue
      </button>
    </Link>
    <Link href={`/summary/${ticker}/metric/eps`}>
      <button className="bg-zinc-800 px-5 py-2 rounded-lg text-sm hover:bg-blue-600 transition text-white border border-zinc-700 shadow-sm">
        EPS
      </button>
    </Link>
    {/* You can keep adding buttons here as you build more metrics */}
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
      {/* Financial Metrics */}
      <section>
        <FinancialMetricsGrid data={data} />  
      </section>
      <section>
      {execs.length > 0 && <ExecutiveGrid execs={execs} />}

      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">📰 Recent News</h2>
          {news.length === 0 ? (
            <p className="text-gray-400 text-sm">No recent news found.</p>
            ) : (
              <div className="grid gap-4">
            {news.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            className="block bg-zinc-900 border border-zinc-700 rounded-lg p-4 hover:border-blue-400 transition"
            >
            <p className="text-sm text-white font-semibold mb-1">{item.title}</p>
            <p className="text-xs text-gray-400">
              {item.publisher} •{" "}
              {new Date(item.providerPublishTime).toLocaleDateString()}
            </p>
          </a>
        ))}
    </div>
  )}
</section>
</main>
  );
}
