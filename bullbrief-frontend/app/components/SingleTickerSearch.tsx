"use client";

import { useState, useRef, useEffect } from "react";
import { useTickerSuggestions } from "@/app/hooks/useTickerSuggestions";

type Props = {
  value?: string;
  onSubmit: (ticker: string) => void;
};

export default function SingleTickerSearch({ value = "", onSubmit }: Props) {
  const [input, setInput] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useTickerSuggestions(input);

  // Close suggestions when clicking outside
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

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      if (selected) handleSelect(selected.symbol);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        placeholder="Enter ticker (e.g., AAPL)"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        className="bg-zinc-800 text-white p-3 rounded-lg w-full placeholder:text-gray-400"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md max-h-48 overflow-y-auto shadow-lg">
          {suggestions.map((s, i) => (
  <li
    key={`${s.symbol}-${i}`} // ✅ composite key: unique every time
    onClick={() => handleSelect(s.symbol)}
    className={`p-2 cursor-pointer ${
      i === selectedIndex ? "bg-zinc-700" : "hover:bg-zinc-800"
    }`}
  >
    <span className="font-medium">{s.symbol}</span>{" "}
    <span className="text-gray-400 text-sm">{s.name}</span>
  </li>
))}

        </ul>
      )}
    </div>
  );
}
