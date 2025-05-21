import { useEffect, useState } from "react";

type Ticker = {
  symbol: string;
  name: string;
};

export function useTickerSuggestions(input: string) {
  const [allTickers, setAllTickers] = useState<Ticker[]>([]);
  const [suggestions, setSuggestions] = useState<Ticker[]>([]);

  useEffect(() => {
    fetch("/tickers.json")
      .then((res) => res.json())
      .then((data: Ticker[]) => setAllTickers(data));
  }, []);

  useEffect(() => {
    const query = input.toUpperCase();
    const matches = allTickers
      .filter(t => t.symbol.startsWith(query))
      .slice(0, 6);
    setSuggestions(matches);
  }, [input, allTickers]);

  return suggestions;
}
