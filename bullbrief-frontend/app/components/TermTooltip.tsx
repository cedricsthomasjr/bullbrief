"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { GLOSSARY } from "@/app/lib/glossary";

interface TermTooltipProps {
  termId: string;
  accentColor?: string;
}

export default function TermTooltip({ termId, accentColor = "#38bdf8" }: TermTooltipProps) {
  const [visible, setVisible] = useState(false);
  const term = GLOSSARY.find((t) => t.id === termId);
  if (!term) return null;

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{ zIndex: visible ? 50 : undefined }}
    >
      <button
        className="ml-1 flex items-center transition-opacity"
        style={{ color: accentColor, opacity: visible ? 0.9 : 0.3 }}
        tabIndex={-1}
        aria-label={`Definition of ${term.name}`}
      >
        <HelpCircle className="w-3 h-3" />
      </button>

      {visible && (
        <div
          className="absolute top-full left-0 mt-1.5 w-60 rounded-xl p-3 text-left"
          style={{
            backgroundColor: "#0c1829",
            border: "1px solid rgba(56,189,248,0.22)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.65)",
            zIndex: 50,
          }}
        >
          <p className="text-blue-50 text-xs font-bold mb-1 leading-tight">{term.name}</p>
          <p className="text-slate-500 text-[10px] leading-relaxed mb-2">{term.tagline}</p>
          <p className="text-slate-600 text-[10px] leading-relaxed mb-2.5 italic">{term.keyTakeaway}</p>
          <Link
            href={`/glossary#${term.id}`}
            className="text-[10px] font-semibold hover:underline"
            style={{ color: accentColor }}
          >
            Full definition →
          </Link>
        </div>
      )}
    </div>
  );
}
