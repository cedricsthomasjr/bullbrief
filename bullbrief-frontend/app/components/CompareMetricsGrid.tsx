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
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#0c1829", border: "1px solid rgba(244,63,94,0.2)" }}
      >
        <p className="text-rose-400 text-sm">No comparison data available.</p>
      </div>
    );
  }

  const renderValue = (value: number | null, suffix = "", divisor = 1) =>
    value != null
      ? `${(value / divisor).toFixed(2)}${suffix}`
      : <span style={{ color: "#1e293b" }}>—</span>;

  const columns = [
    { label: "Market Cap",    key: "market_cap" as const, suffix: "B", divisor: 1e9 },
    { label: "P/E Ratio",     key: "pe_ratio" as const },
    { label: "ROE",           key: "roe" as const, suffix: "%", divisor: 0.01 },
    { label: "Profit Margin", key: "profit_margin" as const, suffix: "%", divisor: 0.01 },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.12)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(56,189,248,0.08)" }}>
              <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-sky-400">Ticker</th>
              {columns.map((col) => (
                <th key={col.key} className="text-left px-5 py-3.5 text-[10px] font-medium uppercase tracking-widest text-slate-600">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((c, i) => (
              <tr
                key={c.ticker}
                style={{ borderBottom: i < data.length - 1 ? "1px solid rgba(56,189,248,0.05)" : "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(56,189,248,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td className="px-5 py-4 font-bold text-blue-50 font-mono">{c.ticker}</td>
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4 text-slate-400 tabular-nums text-sm">
                    {renderValue(c[col.key], col.suffix, col.divisor)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
