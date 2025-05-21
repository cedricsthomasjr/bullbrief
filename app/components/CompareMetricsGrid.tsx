type CompanyMetric = {
    ticker: string;
    market_cap: number | null;
    pe_ratio: number | null;
    roe: number | null;
    profit_margin: number | null;
  };
  
  export default function CompareMetricsGrid({ data }: { data: CompanyMetric[] | undefined }) {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <div className="text-white text-center p-6 border border-red-500 rounded-lg">
          <p className="text-red-400">No comparison data available.</p>
        </div>
      );
    }
  
    const renderValue = (value: number | null, suffix = "", divisor = 1) =>
      value != null ? `${(value / divisor).toFixed(2)}${suffix}` : <span className="text-gray-500 italic">—</span>;
  
    return (
      <div className="overflow-x-auto mt-6 pt-6 border border-zinc-800 rounded-lg">
        <table className="table-auto w-full text-left text-sm text-white">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-2">Ticker</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">P/E</th>
              <th className="p-2">ROE</th>
              <th className="p-2">Profit Margin</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.ticker} className="hover:bg-zinc-800 transition">
                <td className="p-2 font-bold">{c.ticker}</td>
                <td className="p-2">{renderValue(c.market_cap, "B", 1e9)}</td>
                <td className="p-2">{renderValue(c.pe_ratio)}</td>
                <td className="p-2">{renderValue(c.roe, "%", 0.01)}</td>
                <td className="p-2">{renderValue(c.profit_margin, "%", 0.01)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  