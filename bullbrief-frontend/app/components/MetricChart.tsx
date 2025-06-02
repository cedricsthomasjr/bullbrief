"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

import { motion } from "framer-motion";

const formatNumber = (num: number) => {
  return num >= 1e9
    ? `$${(num / 1e9).toFixed(1)}B`
    : num >= 1e6
    ? `$${(num / 1e6).toFixed(1)}M`
    : `$${num.toLocaleString()}`;
};

type Props = {
    data: { year: number; value: number }[] | null;
    title: string;
  };
  

export default function MetricChart({ data, title }: Props) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.warn("MetricChart: No valid data passed", data);
    return (
      <div className="text-center text-gray-400 py-12">
        No data available for this metric.
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 p-6 rounded-xl shadow border border-zinc-700"
    >
      <h2 className="text-2xl font-bold text-white mb-6 capitalize tracking-tight">
        {title} Trend
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={sortedData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="year"
            stroke="#ccc"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#ccc"
            fontSize={12}
            tickFormatter={(v) => formatNumber(v)}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
            labelStyle={{ color: "#ccc" }}
            formatter={(value: number | string) => {
              const num = typeof value === "number" ? value : parseFloat(value);
              return isNaN(num) ? "-" : formatNumber(num);
            }}
            
          />
          <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ color: '#ccc' }} />
          <Line
            type="monotone"
            dataKey="value"
            name={title}
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
