"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  GLOSSARY, CATEGORIES, CATEGORY_COLOR, searchGlossary,
  type GlossaryCategory, type GlossaryTerm,
} from "@/app/lib/glossary";

function TermCard({
  term,
  isExpanded,
  onToggle,
}: {
  term: GlossaryTerm;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const color = CATEGORY_COLOR[term.category];

  return (
    <div
      id={term.id}
      className="rounded-2xl transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: "#0c1829",
        border: `1px solid ${isExpanded ? color.border : "rgba(56,189,248,0.1)"}`,
      }}
      onClick={onToggle}
    >
      {/* Always-visible header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ color: color.text, backgroundColor: color.bg, border: `1px solid ${color.border}` }}
          >
            {term.category}
          </span>
          {isExpanded
            ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            : <ChevronDown className="w-3.5 h-3.5 text-slate-700" />}
        </div>

        <div className="flex items-baseline gap-2 mb-1.5">
          <h3 className="text-base font-bold text-blue-50">{term.name}</h3>
          {term.abbreviation && term.abbreviation !== term.name && (
            <span className="text-[10px] font-mono text-slate-600">{term.abbreviation}</span>
          )}
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-3">{term.tagline}</p>

        {term.formula && (
          <div
            className="rounded-lg px-3 py-1.5 text-[10px] font-mono text-slate-400 mb-3 leading-relaxed"
            style={{ backgroundColor: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.08)" }}
          >
            {term.formula}
          </div>
        )}

        <div className="flex items-start gap-2">
          <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color.text }} />
          <p className="text-[11px] text-slate-500 leading-relaxed italic">{term.keyTakeaway}</p>
        </div>
      </div>

      {/* Expanded detail section */}
      {isExpanded && (
        <div
          className="px-5 pb-5 space-y-4"
          style={{ borderTop: "1px solid rgba(56,189,248,0.08)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-4">
            <p className="text-[9px] uppercase tracking-widest font-bold text-slate-600 mb-2">Definition</p>
            <p className="text-sm text-slate-400 leading-relaxed">{term.definition}</p>
          </div>

          {term.example && (
            <div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-600 mb-2">Example</p>
              <p
                className="text-xs text-slate-400 leading-relaxed rounded-xl p-3"
                style={{ backgroundColor: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.1)" }}
              >
                {term.example}
              </p>
            </div>
          )}

          {term.signal && (
            <div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-600 mb-2">Signal</p>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="rounded-xl p-3"
                  style={{ backgroundColor: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
                >
                  <p className="text-[9px] uppercase font-bold text-emerald-400 mb-1">High</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{term.signal.high}</p>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{ backgroundColor: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.15)" }}
                >
                  <p className="text-[9px] uppercase font-bold text-rose-400 mb-1">Low</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{term.signal.low}</p>
                </div>
              </div>
            </div>
          )}

          {term.typical && (
            <div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-600 mb-1.5">Typical Range</p>
              <p className="text-xs text-slate-400">{term.typical}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const terms = searchGlossary(query, activeCategory ?? undefined);

  return (
    <main className="min-h-screen pt-14" style={{ backgroundColor: "#060c1a" }}>
      {/* Background glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(56,189,248,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-sky-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#38bdf8" }}>
              Investor Education
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-blue-50">Term Glossary</h1>
            <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
              Plain-English definitions for every financial metric — so you can read any stock's fundamentals with confidence.
            </p>
          </div>
        </div>

        {/* Sticky search + filter bar */}
        <div
          className="sticky top-14 z-10 pb-4 -mx-6 px-6 pt-2"
          style={{ backgroundColor: "rgba(6,12,26,0.95)", backdropFilter: "blur(12px)" }}
        >
          {/* Search input */}
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
            <input
              type="text"
              placeholder='Search terms... (e.g. "P/E ratio", "beta", "EPS")'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-sm text-blue-50 placeholder-slate-600 rounded-xl outline-none transition-all"
              style={{
                backgroundColor: "#0c1829",
                border: "1px solid rgba(56,189,248,0.12)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.35)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(56,189,248,0.12)")}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={
                !activeCategory
                  ? { backgroundColor: "#38bdf8", color: "#060c1a" }
                  : { backgroundColor: "rgba(56,189,248,0.06)", color: "#475569", border: "1px solid rgba(56,189,248,0.1)" }
              }
            >
              All ({GLOSSARY.length})
            </button>
            {CATEGORIES.map((cat) => {
              const color = CATEGORY_COLOR[cat];
              const isActive = activeCategory === cat;
              const count = GLOSSARY.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={
                    isActive
                      ? { backgroundColor: color.bg, color: color.text, border: `1px solid ${color.border}` }
                      : { backgroundColor: "rgba(56,189,248,0.04)", color: "#475569", border: "1px solid rgba(56,189,248,0.07)" }
                  }
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-slate-700 mb-5 mt-2">
          {terms.length === GLOSSARY.length
            ? `All ${GLOSSARY.length} terms`
            : `${terms.length} of ${GLOSSARY.length} terms`}
        </p>

        {/* Term cards */}
        {terms.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-600 text-sm">No terms match &ldquo;{query}&rdquo;</p>
            <button
              onClick={() => { setQuery(""); setActiveCategory(null); }}
              className="text-xs text-sky-400 mt-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {terms.map((term) => (
              <TermCard
                key={term.id}
                term={term}
                isExpanded={expanded === term.id}
                onToggle={() => setExpanded(expanded === term.id ? null : term.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
