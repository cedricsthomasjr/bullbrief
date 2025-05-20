"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const funFacts = [
    "📈 Warren Buffett bought his first stock at age 11.",
    "💰 The S&P 500 has averaged ~10% annual returns since inception.",
    "🏦 The NYSE was founded in 1792 under a buttonwood tree on Wall Street.",
    "🚗 Tesla first turned a profit in Q3 of 2019.",
    "🧠 Peter Lynch averaged 29% annual returns managing the Magellan Fund.",
    "🌍 Only ~60 companies in the world have a $200B+ market cap.",
    "📉 The largest single-day Dow drop was -2,997 points on March 16, 2020.",
    "📱 Apple’s market cap once surpassed the GDP of the UK.",
    "🔁 Stock market corrections (10%+ drops) happen every 1-2 years on average.",
    "📆 October is historically the most volatile month for U.S. stocks.",
    "🧾 Dividends account for roughly 40% of total S&P 500 returns over time.",
    "🧮 The P/E ratio is one of the most common valuation metrics investors use.",
    "🌡️ Inflation eats away at returns — that's why real return > nominal return.",
    "📦 Amazon didn’t turn a yearly profit until 2003 — 9 years after launching.",
    "🎯 Dollar-cost averaging can reduce timing risk over long investment periods.",
    "🧬 The Nasdaq is more tech-heavy, while the Dow is price-weighted.",
    "📉 Bear markets typically last less than a year, while bull markets last ~3.8 years on average.",
    "💸 Buying during fear can outperform selling during hype.",
    "🚀 In 2020, retail investors drove GameStop up over 1,700% in a month.",
    "🌎 U.S. stocks make up ~60% of the global equity market cap.",
    "🔄 The VIX is a volatility index — often called the market’s “fear gauge.”",
    "🔒 Bonds are generally less volatile than stocks, but offer lower returns.",
    "🪙 Bitcoin was worth less than a penny in 2010 — now over $60,000 at peak.",
    "🏛️ The Fed doesn’t set stock prices, but it heavily influences them via rates.",
    "📚 Long-term investing tends to outperform short-term trading for most investors.",
  ];

  export default function LoadingScreen({ isLoading = true }: { isLoading?: boolean }) {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center space-y-6 px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h1
            className="text-2xl font-semibold text-blue-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Generating Summary...
          </motion.h1>

          <motion.p
            key={currentFactIndex}
            className="text-sm text-gray-300 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {funFacts[currentFactIndex]}
          </motion.p>

          <div className="h-8 w-8 rounded-full border-t-2 border-blue-400 border-opacity-50 animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
