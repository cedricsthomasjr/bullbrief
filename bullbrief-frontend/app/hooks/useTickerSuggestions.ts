// app/hooks/useTickerSuggestions.ts

import { useEffect, useState } from "react";

type Suggestion = {
  symbol: string;
  name: string;
};

export const useTickerSuggestions = (query: string) => {
  const [allTickers, setAllTickers] = useState<Suggestion[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/tickers.json"); // ✅ after moving file
      const json = await res.json();
      setAllTickers(json);
    };
    load();
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    setSuggestions(
      allTickers.filter(
        (s) =>
          s.symbol.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q)
      )
    );
  }, [query, allTickers]);

  return suggestions;
};
