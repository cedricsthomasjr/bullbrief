"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BackendSummary = {
  company_name: string;
  ticker: string;
  summary: string;
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

  if (loading) return <p className="text-white p-8">Loading...</p>;
  if (error) return <p className="text-red-500 p-8">Error: {error}</p>;
  if (!data) return null;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">
        {data.company_name} ({data.ticker})
      </h1>

      <p className="text-sm text-gray-400 mb-4">
        Sector: {data.sector} | Market Cap: ${Number(data.market_cap).toLocaleString()} | P/E: {data.pe_ratio} | 52W Range: {data.range_52w}
      </p>

      <h2 className="text-xl text-blue-300 font-semibold mt-10 mb-2">Raw Summary</h2>
      <pre className="text-sm text-gray-100 whitespace-pre-wrap">{data.summary}</pre>
    </main>
  );
}
