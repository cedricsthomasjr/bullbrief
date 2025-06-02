"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Or use "settings" or "rotate-ccw" for a gear feel

export default function AnalyzingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-md w-full bg-[#0d1117] border border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col items-center space-y-4"
    >
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <h2 className="text-lg font-semibold text-white tracking-tight text-center">
        BullBrief is analyzing these stocks...
      </h2>
      <p className="text-sm text-gray-400 text-center">
        We’re pulling market fundamentals and AI insights for a full breakdown.
      </p>
    </motion.div>
  );
}
