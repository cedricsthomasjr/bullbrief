"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker) return;
    router.push(`/summary/${ticker.toUpperCase()}?ticker=${ticker.toUpperCase()}`);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black animate-pulse blur-2xl" />

      {/* Hero Content */}
      <div className="z-10 text-center space-y-6 max-w-xl">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight"
        >
          BullBrief
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-400 text-lg"
        >
          AI-powered public company summaries. Fast. Clear. Investor-ready.
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <input
            type="text"
            placeholder="Enter stock ticker (e.g. AAPL)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="bg-zinc-900 text-white px-4 py-3 rounded-xl w-full sm:w-72 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition ring-2 ring-blue-400/40 hover:ring-blue-400"
          >
            Generate Summary
          </button>
        </motion.form>
      </div>
    </main>
  );
}
