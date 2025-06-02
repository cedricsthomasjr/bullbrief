"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fetchJobInsights } from "@/app/lib/fetchJobInsights";

export default function JobModePanel() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const result = await fetchJobInsights(url);
      setData(result);
    } catch (err) {
      console.error("JobMode Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold text-blue-400">🎯 Job Mode</h2>

      <input
        type="url"
        placeholder="Paste job listing URL"
        className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAnalyze}
        className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-md font-medium transition"
      >
        {loading ? "Analyzing..." : "Generate Insights"}
      </motion.button>

      {data && (
        <div className="space-y-4 text-sm text-gray-300">
          <h3 className="text-xl font-semibold text-white">{data.job_title} @ {data.company}</h3>
          <p className="italic text-gray-400">{data.location}</p>
          <p className="text-base">{data.role_summary}</p>

          <div>
            <h4 className="font-bold text-white mt-4">✅ Talking Points</h4>
            <ul className="list-disc ml-6">
              {data.talking_points.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mt-4">⭐ How to Stand Out</h4>
            <p>{data.how_to_stand_out}</p>
          </div>

          <div>
            <h4 className="font-bold text-white mt-4">📊 Company SWOT</h4>
            <pre className="bg-neutral-800 p-3 rounded-md overflow-auto">
              {JSON.stringify(data.company_swot, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
