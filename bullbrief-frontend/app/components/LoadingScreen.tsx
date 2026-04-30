"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facts = [
  "Warren Buffett bought his first stock at age 11.",
  "The S&P 500 has averaged ~10% annual returns since inception.",
  "Peter Lynch averaged 29% annual returns managing the Magellan Fund.",
  "Only ~60 companies in the world have a $200B+ market cap.",
  "Dividends account for ~40% of total S&P 500 returns over time.",
  "Amazon didn't turn a yearly profit until 2003 — 9 years after launching.",
  "Dollar-cost averaging can reduce timing risk over long investment periods.",
  "Bear markets typically last less than a year; bull markets ~3.8 years on average.",
  "The VIX is often called the market's fear gauge.",
  "U.S. stocks make up ~60% of the global equity market cap.",
  "Tesla first turned a profit in Q3 of 2019.",
  "The NYSE was founded in 1792 under a buttonwood tree on Wall Street.",
];

export default function LoadingScreen({ isLoading = true }: { isLoading?: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % facts.length), 3200);
    return () => clearInterval(t);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "#060c1a" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow backdrop */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 40%, rgba(56,189,248,0.08) 0%, transparent 65%)",
            }}
          />

          {/* Spinner */}
          <div className="relative w-12 h-12">
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(56,189,248,0.1)" }}
            />
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{ borderTop: "2px solid #38bdf8", borderRight: "2px solid transparent", borderBottom: "2px solid transparent", borderLeft: "2px solid transparent" }}
            />
            <div
              className="absolute inset-2 rounded-full"
              style={{ backgroundColor: "rgba(56,189,248,0.04)" }}
            />
          </div>

          <div className="text-center space-y-3 max-w-sm px-6 relative">
            <p className="text-sm font-semibold text-blue-50">Generating Analysis</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                className="text-xs text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                {facts[idx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
