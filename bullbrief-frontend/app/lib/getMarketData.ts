export async function getMarketData(symbol: string) {
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${encodeURIComponent(
        symbol
      )}?apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
    );
  
    const data = await res.json();
    const quote = data[0];
  
    return {
      name: quote.name,
      symbol: quote.symbol,
      price: quote.price,
      change: quote.change,
      percent: quote.changesPercentage,
    };
  }
  