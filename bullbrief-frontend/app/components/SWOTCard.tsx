"use client";

import React from "react";

type SWOTProps = { content: string };

const parseSWOTSection = (label: string, content: string): string[] => {
  const match = new RegExp(`\\*\\*${label}:\\*\\*[\\s\\n\\r]+([-\\s\\S]+?)(?=\\*\\*|$)`, "i").exec(content);
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-"))
    .map((l) => l.replace(/^-\s*/, ""));
};

const SWOT_CONFIG = {
  Strengths:     { color: "#10b981", bg: "rgba(16,185,129,0.05)",  border: "rgba(16,185,129,0.2)",  dot: "bg-emerald-400" },
  Weaknesses:    { color: "#f43f5e", bg: "rgba(244,63,94,0.05)",   border: "rgba(244,63,94,0.2)",   dot: "bg-rose-400" },
  Opportunities: { color: "#38bdf8", bg: "rgba(56,189,248,0.05)",  border: "rgba(56,189,248,0.2)",  dot: "bg-sky-400" },
  Threats:       { color: "#f59e0b", bg: "rgba(245,158,11,0.05)",  border: "rgba(245,158,11,0.2)",  dot: "bg-amber-400" },
};

function SWOTSection({ title, points }: { title: keyof typeof SWOT_CONFIG; points: string[] }) {
  const c = SWOT_CONFIG[title];
  return (
    <div className="rounded-2xl p-5 space-y-3" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        <h3
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: c.color }}
        >
          {title}
        </h3>
      </div>
      {points.length > 0 ? (
        <ul className="space-y-2">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
              <span className="shrink-0 mt-2 w-1 h-1 rounded-full" style={{ backgroundColor: c.color, opacity: 0.5 }} />
              {p}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-700 text-xs italic">No data available.</p>
      )}
    </div>
  );
}

export default function SWOTCard({ content }: SWOTProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <SWOTSection title="Strengths"     points={parseSWOTSection("Strengths", content)} />
      <SWOTSection title="Weaknesses"    points={parseSWOTSection("Weaknesses", content)} />
      <SWOTSection title="Opportunities" points={parseSWOTSection("Opportunities", content)} />
      <SWOTSection title="Threats"       points={parseSWOTSection("Threats", content)} />
    </div>
  );
}
