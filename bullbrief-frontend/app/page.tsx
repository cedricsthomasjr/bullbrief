"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TickerInput from "@/app/components/TickerInput";

export default function HomePage() {
  const router = useRouter();
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker.trim()) return;
    router.push(`/summary/${ticker.toUpperCase()}?ticker=${ticker.toUpperCase()}`);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white px-6 overflow-hidden">

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-blue-950 to-black opacity-60 blur-2xl" />

      {/* Hero Container */}
      <div className="z-10 text-center space-y-8 max-w-xl">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-tr from-blue-500 to-cyan-300 bg-clip-text text-transparent drop-shadow-xl"
        >
          BullBrief
        </motion.h1>

        {/* Animated Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-400 text-lg sm:text-xl"
        >
          AI-powered public company summaries. Fast. Clear. Investor-ready.
        </motion.p>

        {/* Form */}
        
 
  <TickerInput />
  <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  onClick={() => router.push("/compare")}
  className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md"
>
  Compare Companies
</motion.button>

      </div>
    </main>
  );
}
