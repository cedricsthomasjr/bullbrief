"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TickerCompareInput() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleCompare = () => {
    const tickers = input
      .toUpperCase()
      .replace(/[^A-Z0-9,\s]/g, "")
      .split(/[\s,]+/)
      .filter(Boolean);

    if (tickers.length < 2 || tickers.length > 3) {
      alert("Please enter 2–3 valid tickers.");
      return;
    }

    router.push(`/compare/${tickers.join(",")}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCompare();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-x-2 flex justify-center">
      <input
        type="text"
        placeholder="Compare AAPL, MSFT, GOOGL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-zinc-800 text-white p-3 rounded-lg w-96 placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={handleCompare}
        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg font-medium transition"
      >
        Compare
      </button>
    </form>
  );
}
