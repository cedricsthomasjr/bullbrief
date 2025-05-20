"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MetricChart from "@/app/components/MetricChart";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function MetricDetailPage() {
  const { ticker, metric } = useParams() as { ticker: string; metric: string };
  const [data, setData] = useState<any[]>([]);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticker || !metric) return;

    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/macrotrends/${ticker}`);
      const json = await res.json();

      const metricKey = Object.keys(json.data).find(
        (k) => k.toLowerCase() === metric.toLowerCase()
      );

      if (!metricKey || !Array.isArray(json.data[metricKey])) {
        setData([]);
      } else {
        setData(json.data[metricKey]);
      }

      setLoading(false); // ✅ Chart shows now
    };

    fetchData();
  }, [ticker, metric]);

  useEffect(() => {
    if (!ticker || !metric) return;

    const fetchAISummary = async () => {
      try {
        const res = await fetch(`http://localhost:8000/interpret/${ticker}?metric=${metric}`);
        const json = await res.json();
        setAiSummary(json.analysis ?? null);
      } catch (err) {
        setAiSummary(null);
      }
    };

    fetchAISummary();
  }, [ticker, metric]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white space-y-6">
      <h1 className="text-3xl font-bold capitalize">{metric} – {ticker}</h1>

      <MetricChart data={data} title={metric} />

      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg min-h-[180px]">
        <h2 className="text-xl font-semibold mb-2">AI Interpretation</h2>
        {aiSummary ? (
          <p className="text-gray-300 whitespace-pre-line">{aiSummary}</p>
        ) : (
          <p className="text-gray-500 italic animate-pulse">Generating summary...</p>
        )}
      </div>
    </div>
  );
}
