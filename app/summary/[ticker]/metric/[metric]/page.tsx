"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import MetricChart from "@/app/components/MetricChart";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function MetricDetailPage() {
  const { ticker, metric } = useParams() as { ticker: string; metric: string };
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [data, setData] = useState<{ year: number; value: number }[] | null>(null);
  const lastGoodData = useRef<{ year: number; value: number }[] | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    if (!ticker || !metric) return;
  
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const endpoint =
          ["eps", "revenue"].includes(metric.toLowerCase())
            ? `http://localhost:8000/metric/${ticker}/${metric}` // <— use new clean route
            : `http://localhost:8000/macrotrends/${ticker}`;
  
        const res = await fetch(endpoint);
        const json = await res.json();
  
        let extractedData = null;
  
        if (["eps", "revenue"].includes(metric.toLowerCase())) {
          extractedData = json.data;
        } else {
          const metricKey = Object.keys(json.data).find(
            (k) => k.toLowerCase() === metric.toLowerCase()
          );
          extractedData = metricKey && Array.isArray(json.data[metricKey])
            ? json.data[metricKey]
            : null;
        }
  
        if (extractedData) {
          lastGoodData.current = extractedData;
          setData(extractedData);
        } else {
          setData(lastGoodData.current);
        }
      } catch (e) {
        console.error("Failed to fetch metric data:", e);
        setData(lastGoodData.current);
      } finally {
        setDataLoading(false);
      }
    };
  
    fetchData();
  }, [ticker, metric]);
  

  useEffect(() => {
    if (!ticker || !metric) return;

    const fetchAISummary = async () => {
      setSummaryLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/interpret/${ticker}?metric=${metric}`);
        const json = await res.json();
        setAiSummary(json.analysis ?? null);
      } catch (err) {
        setAiSummary(null);
      } finally {
        setSummaryLoading(false);
      }
    };

    fetchAISummary();
  }, [ticker, metric]);

  if (dataLoading) return <LoadingScreen />;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white space-y-6">
      <h1 className="text-3xl font-bold capitalize">{metric} – {ticker}</h1>

      <MetricChart data={data} title={metric} />

      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg min-h-[180px]">
        <h2 className="text-xl font-semibold mb-2">AI Interpretation</h2>
        {summaryLoading ? (
          <p className="text-gray-500 italic animate-pulse">Generating summary...</p>
        ) : aiSummary ? (
          <p className="text-gray-300 whitespace-pre-line">{aiSummary}</p>
        ) : (
          <p className="text-red-500 italic">Could not generate summary.</p>
        )}
      </div>
    </div>
  );
}
