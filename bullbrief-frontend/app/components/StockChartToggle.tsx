"use client";

import { useState } from "react";
import TradingViewMiniChart from "./TradingViewMiniChart";
import TradingViewFullChart from "./TradingViewFullChart";

export default function StockChartToggle({ symbol }: { symbol: string }) {
  const [view, setView] = useState<"mini" | "full">("mini");

  return (
    <div className="space-y-4 p-4">
      {/* Toggle */}
      <div
        className="flex items-center gap-1 w-fit rounded-xl p-1"
        style={{ backgroundColor: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)" }}
      >
        {(["mini", "full"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg transition-all"
            style={
              view === v
                ? { backgroundColor: "#38bdf8", color: "#060c1a" }
                : { color: "#475569" }
            }
            onMouseEnter={(e) => {
              if (view !== v) (e.currentTarget as HTMLElement).style.color = "#94a3b8";
            }}
            onMouseLeave={(e) => {
              if (view !== v) (e.currentTarget as HTMLElement).style.color = "#475569";
            }}
          >
            {v === "mini" ? "Overview" : "Full Chart"}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl overflow-hidden">
        {view === "mini" ? (
          <TradingViewMiniChart symbol={symbol} />
        ) : (
          <TradingViewFullChart symbol={symbol} />
        )}
      </div>
    </div>
  );
}
