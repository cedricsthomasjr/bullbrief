"use client";

import { useState } from "react";
import TradingViewMiniChart from "./TradingViewMiniChart";
import TradingViewFullChart from "./TradingViewFullChart";

export default function StockChartToggle({ symbol }: { symbol: string }) {
  const [view, setView] = useState<"mini" | "full">("mini");

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setView("mini")}
          className={`px-4 py-2 text-sm rounded-md border transition ${
            view === "mini"
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-zinc-800 text-gray-300 border-zinc-700 hover:border-blue-400"
          }`}
        >
          Mini Overview
        </button>
        <button
          onClick={() => setView("full")}
          className={`px-4 py-2 text-sm rounded-md border transition ${
            view === "full"
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-zinc-800 text-gray-300 border-zinc-700 hover:border-blue-400"
          }`}
        >
          Full Chart
        </button>
      </div>

      {/* Chart Display */}
      <div className="border border-zinc-700 bg-zinc-900 rounded-xl p-4 shadow-md">
        {view === "mini" ? (
          <TradingViewMiniChart symbol={symbol} />
        ) : (
          <TradingViewFullChart symbol={symbol} />
        )}
      </div>
    </div>
  );
}
