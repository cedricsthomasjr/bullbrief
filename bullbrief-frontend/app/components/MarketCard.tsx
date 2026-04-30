"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = { symbol: string };

type MarketData = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  percent: number;
};

export default function MarketCard({ symbol }: Props) {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/market?symbol=${encodeURIComponent(symbol)}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Not JSON response");
        }
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setData(result);
        setError(false);
      } catch (err) {
        console.error(`❌ Failed to fetch ${symbol}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Only runs once
  }, [symbol]);

  const cardClasses =
    "w-60 p-4 rounded-xl transition-all duration-300 shadow-md border hover:scale-105";

  if (loading) {
    return (
      <div className={`${cardClasses} bg-zinc-900 border-zinc-800 animate-pulse text-gray-500 text-sm text-center`}>
        Loading {symbol}...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${cardClasses} bg-zinc-900 border-red-800 text-red-400 text-sm text-center`}>
        Failed to load {symbol}
      </div>
    );
  }

  const isUp = data.change >= 0;
  const arrow = isUp ? "▲" : "▼";
  const changeColor = isUp ? "text-green-400" : "text-red-400";

  return (
    <Link
      href={`/summary/${data.symbol}`}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
    >
      <div className={`${cardClasses} bg-zinc-900 border-zinc-700 cursor-pointer`}>
        <h2 className="text-white font-semibold text-sm mb-1 truncate">
          {data.name} ({data.symbol})
        </h2>
        <p className="text-2xl font-bold text-white">${data.price.toFixed(2)}</p>
        <p className={`text-sm mt-1 font-medium ${changeColor}`}>
          {arrow} {data.change.toFixed(2)} ({data.percent.toFixed(2)}%)
        </p>
      </div>
    </Link>
  );
}
