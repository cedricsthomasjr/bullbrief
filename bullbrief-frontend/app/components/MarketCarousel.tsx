"use client";
import MarketCard from "./MarketCard";

const symbols = ["SPY", "QQQ", "DIA", "VTI", "ARKK", "XLF"];

export default function MarketTickerMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-black border-t border-b border-zinc-800 py-4">
      <div className="animate-marquee flex gap-6 w-max">
        {[...symbols, ...symbols].map((symbol, idx) => (
          <div key={symbol + idx} className="shrink-0">
            <MarketCard symbol={symbol} />
          </div>
        ))}
      </div>
    </div>
  );
}
