"use client";

import { useEffect, useRef } from "react";

export default function TradingViewFullChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      studies: ["MACD@tv-basicstudies", "Volume@tv-basicstudies"],
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return <div ref={containerRef} className="w-full h-[500px] rounded-xl" />;
}
