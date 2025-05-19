"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker) return;
    router.push(`/summary/${ticker.toUpperCase()}?ticker=${ticker.toUpperCase()}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-xl">
        <h1 className="text-4xl font-bold text-blue-400 tracking-tight">
          BullBrief 📈
        </h1>
        <p className="text-gray-400 text-lg">
          AI-powered public company summaries. Fast. Clear. Investor-ready.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Enter stock ticker (e.g. AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-3 rounded-xl w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            Generate Summary
          </button>
        </form>
      </div>
    </main>
  );
}
