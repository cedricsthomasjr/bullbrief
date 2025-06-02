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
  const bulletPoints = aiSummary
  ?.split("\n")
  .filter((line) => line.trim().startsWith("-"))
  .map((line) => line.replace(/^- /, "").trim());

  useEffect(() => {
    if (!ticker || !metric) return;
  
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
        const endpoint =
          ["eps", "revenue"].includes(metric.toLowerCase())
            ? `${baseURL}/metric/${ticker}/${metric}`
            : `${baseURL}/macrotrends/${ticker}`;
  
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/interpret/${ticker}?metric=${metric}`);
        const json = await res.json();
        setAiSummary(json.analysis ?? null);
      } 
       finally {
        setSummaryLoading(false);
      }
    };
  
    fetchAISummary();
  }, [ticker, metric]);
  

  if (dataLoading) return <LoadingScreen />;

  return (
<div className="max-w-5xl mx-auto px-6 pt-24 pb-12 text-white space-y-10">
  <h1 className="text-4xl font-bold capitalize tracking-tight">
    {metric} – {ticker}
  </h1>

  {/* Chart Section */}
  <section className="space-y-6">
    <MetricChart data={data} title={metric} />
  </section>

  {/* AI Interpretation Section */}
  <section className="space-y-6">
    <h2 className="text-2xl font-semibold text-white tracking-tight">🧠 AI Interpretation</h2>

    {summaryLoading ? (
      <p className="text-gray-500 italic animate-pulse">Generating summary...</p>
    ) : bulletPoints && bulletPoints.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bulletPoints.map((point, idx) => {
          const [title, ...rest] = point.split(":");
          return (
            <div key={idx} className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl shadow hover:shadow-md transition">
              <p className="text-blue-400 font-semibold mb-1">{title}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{rest.join(":").trim()}</p>
            </div>
          );
        })}
      </div>
    ) : (
      <p className="text-red-500 italic">Could not generate summary.</p>
    )}
  </section>
</div>
  );
}
