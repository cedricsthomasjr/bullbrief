"use client";

import { useState, useRef, useEffect } from "react";
import { useTickerSuggestions } from "@/app/hooks/useTickerSuggestions";
import { Search } from "lucide-react";

type Props = {
  value?: string;
  onSubmit: (ticker: string) => void;
  placeholder?: string;
};

export default function SingleTickerSearch({ value = "", onSubmit, placeholder = "Enter ticker (e.g., AAPL)" }: Props) {
  const [input, setInput] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestions = useTickerSuggestions(input);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (symbol: string) => {
    setInput(symbol);
    onSubmit(symbol);
    setShowSuggestions(false);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((p) => (p + 1) % suggestions.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((p) => (p - 1 + suggestions.length) % suggestions.length); }
    else if (e.key === "Enter") { e.preventDefault(); const s = suggestions[selectedIndex]; if (s) handleSelect(s.symbol); }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          backgroundColor: "#0f1e38",
          border: "1px solid rgba(56,189,248,0.15)",
        }}
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-blue-50 text-sm pl-10 pr-4 py-3 focus:outline-none placeholder-slate-700"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          className="absolute z-20 mt-1.5 w-full rounded-xl overflow-hidden max-h-52 overflow-y-auto scrollbar-hide"
          style={{
            backgroundColor: "#0c1829",
            border: "1px solid rgba(56,189,248,0.15)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.symbol}-${i}`}
              onClick={() => handleSelect(s.symbol)}
              className="flex items-center gap-3 px-3.5 py-2.5 cursor-pointer transition-colors"
              style={{
                backgroundColor: i === selectedIndex ? "rgba(56,189,248,0.08)" : "transparent",
                borderLeft: i === selectedIndex ? "2px solid #38bdf8" : "2px solid transparent",
              }}
            >
              <span className="font-bold text-blue-50 text-sm">{s.symbol}</span>
              <span className="text-slate-600 text-xs truncate">{s.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
