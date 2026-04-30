"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

type Suggestion = {
  symbol: string;
  name: string;
  exchange?: string;
  sector?: string;
};

export default function TickerInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatExchange = (code?: string) => {
    const map: Record<string, string> = { NMS: "NASDAQ", NYQ: "NYSE", ASE: "AMEX" };
    return code ? map[code] ?? code : "—";
  };

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search/${query}`);
        const data = await res.json();
        setSuggestions(data);
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      }
    };
    fetchSuggestions();
  }, [query]);

  const handleSelect = (ticker: string) => {
    router.push(`/summary/${ticker.toUpperCase()}`);
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((p) => (p + 1) % suggestions.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((p) => (p - 1 + suggestions.length) % suggestions.length); }
    else if (e.key === "Enter") { e.preventDefault(); if (activeIndex >= 0 && suggestions[activeIndex]) handleSelect(suggestions[activeIndex].symbol); else handleSelect(query); }
    else if (e.key === "Escape") { setShowDropdown(false); setActiveIndex(-1); }
  };

  return (
    <div className="w-full max-w-lg relative">
      {/* Input */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(15, 30, 56, 0.8)",
          border: "1px solid rgba(56, 189, 248, 0.2)",
          boxShadow: "0 0 40px rgba(56,189,248,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search stocks — AAPL, Tesla, Nvidia..."
          className="w-full bg-transparent text-blue-50 pl-11 pr-16 py-4 focus:outline-none placeholder-slate-600 text-sm"
        />
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] text-slate-600 px-2 py-1 rounded-md"
          style={{ backgroundColor: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.1)" }}
        >
          ↵ enter
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence initial={false}>
        {showDropdown && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute top-full mt-2 w-full rounded-2xl overflow-hidden scrollbar-hide z-50 origin-top"
            style={{
              maxHeight: "288px",
              overflowY: "auto",
              background: "#0c1829",
              border: "1px solid rgba(56,189,248,0.15)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(56,189,248,0.05)",
            }}
          >
            {suggestions.map((s, i) => (
              <li
                key={s.symbol}
                onClick={() => handleSelect(s.symbol)}
                className="flex justify-between items-center px-4 py-3 cursor-pointer transition-all"
                style={{
                  backgroundColor: i === activeIndex ? "rgba(56,189,248,0.08)" : "transparent",
                  borderLeft: i === activeIndex ? "2px solid #38bdf8" : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (i !== activeIndex) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(56,189,248,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (i !== activeIndex) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-blue-50 text-sm">{s.symbol}</span>
                  <span className="text-slate-500 text-xs truncate">{s.name}</span>
                </div>
                <div className="text-right flex flex-col items-end gap-1 ml-4 shrink-0">
                  {s.sector && <span className="text-[10px] text-slate-600">{s.sector}</span>}
                  <span className="text-[10px] font-semibold text-sky-400">{formatExchange(s.exchange)}</span>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
