"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Suggestion = {
  symbol: string;
  name: string;
};

export default function TickerInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`http://localhost:8000/search/${query}`);
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
    router.push(`/summary/${ticker.toUpperCase()}?ticker=${ticker.toUpperCase()}`);
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % (suggestions.length + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + (suggestions.length + 1)) % (suggestions.length + 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex].symbol);
      } else {
        handleSelect(query); // fallback search
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  return (
<div className="relative w-full max-w-xl">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search stock (e.g. Tesla, AAPL)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-zinc-900 text-white px-4 py-3 rounded-xl w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
      />
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="absolute z-10 mt-2 w-full bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 overflow-hidden"
          >
            {suggestions.length > 0 ? (
              suggestions.map((s, i) => (
                <li
                  key={s.symbol}
                  onClick={() => handleSelect(s.symbol)}
                  className={`px-4 py-2 cursor-pointer text-white transition ${
                    i === activeIndex ? "bg-blue-600" : "hover:bg-zinc-700"
                  }`}
                >
                  <span className="font-semibold">{s.symbol}</span>{" "}
                  <span className="text-gray-400">— {s.name}</span>
                </li>
              ))
            ) : (
              <li
                onClick={() => handleSelect(query)}
                className={`px-4 py-2 cursor-pointer text-white transition ${
                  activeIndex === 0 ? "bg-blue-600" : "hover:bg-zinc-700"
                }`}
              >
                🔍 Search <span className="font-semibold">"{query}"</span>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
