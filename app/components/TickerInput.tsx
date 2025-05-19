// app/components/TickerInput.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const mockTickers = [
  "AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "NVDA", "NFLX", "META", "NKE", "JPM"
]; // can replace with API later

export default function TickerInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const filtered = mockTickers.filter((ticker) =>
      ticker.toLowerCase().startsWith(query.toLowerCase())
    );

    setSuggestions(filtered);
    setShowDropdown(true);
  }, [query]);

  const handleSelect = (ticker: string) => {
    router.push(`/summary/${ticker.toUpperCase()}?ticker=${ticker.toUpperCase()}`);
    setQuery("");
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    }
  };

  return (
    <div className="relative w-full sm:w-80">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter stock ticker (e.g. AAPL)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-zinc-900 text-white px-4 py-3 rounded-xl w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
      />
      <AnimatePresence>
        {showDropdown && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-10 mt-2 w-full bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 overflow-hidden"
          >
            {suggestions.map((ticker, i) => (
              <li
                key={ticker}
                onClick={() => handleSelect(ticker)}
                className={`px-4 py-2 cursor-pointer text-white ${
                  i === activeIndex ? "bg-blue-600" : "hover:bg-zinc-700"
                }`}
              >
                {ticker}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
