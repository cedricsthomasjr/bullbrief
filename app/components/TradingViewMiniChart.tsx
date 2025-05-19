"use client";

import { useEffect, useRef } from "react";

export default function TradingViewMiniChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous chart if it exists
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol, // Format: "NASDAQ:AAPL"
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "12M",
      colorTheme: "dark",
      isTransparent: true,
      autosize: true,
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return <div ref={containerRef} className="w-full h-64 rounded-xl overflow-hidden" />;
}
