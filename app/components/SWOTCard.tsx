"use client";

import React from "react";

type SWOTProps = {
  content: string;
};

const parseSWOTSection = (label: string, content: string) => {
  const match = new RegExp(`\\*\\*${label}:\\*\\*[\\s\\n\\r]+([-\\s\\S]+?)(?=\\*\\*|$)`, "i").exec(content);
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => line.replace(/^-\s*/, ""));
};

export default function SWOTCard({ content }: SWOTProps) {
  const strengths = parseSWOTSection("Strengths", content);
  const weaknesses = parseSWOTSection("Weaknesses", content);
  const opportunities = parseSWOTSection("Opportunities", content);
  const threats = parseSWOTSection("Threats", content);

  return (
    <section className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-green-400 mb-2">Strengths</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          {strengths.map((point, i) => (
            <li key={`s-${i}`}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-red-400 mb-2">Weaknesses</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          {weaknesses.map((point, i) => (
            <li key={`w-${i}`}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-blue-400 mb-2">Opportunities</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          {opportunities.map((point, i) => (
            <li key={`o-${i}`}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">Threats</h3>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          {threats.map((point, i) => (
            <li key={`t-${i}`}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
