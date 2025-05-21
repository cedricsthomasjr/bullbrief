"use client";

import TripleTickerCompare from "@/app/components/TripleTickerCompare";

export default function ComparePage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-blue-400 text-center">Deep Compare</h1>
      <TripleTickerCompare />
    </main>
  );
}
