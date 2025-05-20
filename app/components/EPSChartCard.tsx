"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type EPSData = {
  year: string;
  eps: number;
};

export default function EPSChartCard({ ticker }: { ticker: string }) {
  const [data, setData] = useState<EPSData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEPS = async () => {
      try {
        const res = await fetch(`http://localhost:8000/eps-history/${ticker}`);
        const json = await res.json();
        const sorted = [...json.eps_history].sort(
          (a, b) => parseInt(a.year) - parseInt(b.year)
        );
        setData(sorted);
      } catch (err) {
        console.error("Failed to fetch EPS history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEPS();
  }, [ticker]);

  if (loading) {
    return (
      <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg text-white">
        Loading EPS data...
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-white text-xl font-semibold mb-4">
        EPS History ({ticker.toUpperCase()})
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="year" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "none" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#3b82f6" }}
          />
          <Bar dataKey="eps" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Line
            type="monotone"
            dataKey="eps"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={{ r: 3, fill: "#60a5fa" }}
            activeDot={{ r: 5 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
