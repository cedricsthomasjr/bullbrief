"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MetricChart from "@/app/components/MetricChart";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function MetricDetailPage() {
  const { ticker, metric } = useParams() as { ticker: string; metric: string };
  const [data, setData] = useState<any[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticker || !metric) return;

    const fetchData = async () => {
      setLoading(true);

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

      const gptRes = await fetch(
        `http://localhost:8000/interpret/${ticker}?metric=${metric}`
      );
      const gptJson = await gptRes.json();
      setAiSummary(gptJson.analysis ?? "No interpretation available.");

      setLoading(false);
    };

    fetchData();
  }, [ticker, metric]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white space-y-6">
      <h1 className="text-3xl font-bold capitalize">{metric} – {ticker}</h1>
      <MetricChart data={data} title={metric} />
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">AI Interpretation</h2>
        <p className="text-gray-300 whitespace-pre-line">{aiSummary}</p>
      </div>
    </div>
  );
}
