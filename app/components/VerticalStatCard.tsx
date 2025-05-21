
  import type { SingleSummaryData } from "@/app/types/stock";

type StatCardProps = {
  data: SingleSummaryData | null;
};

  
  export default function VerticalStatCard({ data }: StatCardProps) {
    if (!data) {
      return (
        <div className="bg-zinc-900 rounded-lg p-4 text-center text-gray-400">
          No data loaded.
        </div>
      );
    }
  
    const render = (label: string, value: number | null, suffix = "", divide = 1) =>
      value != null ? `${(value / divide).toFixed(2)}${suffix}` : "—";
  
    return (
      <div className="bg-zinc-900 rounded-xl p-4 space-y-2 text-white shadow-md">
        <h2 className="text-lg font-bold">{data.company_name} ({data.ticker})</h2>
        <p className="text-sm text-gray-400">Market Cap: {render("Market Cap", data.market_cap, "B", 1e9)}</p>
        <p className="text-sm text-gray-400">P/E Ratio: {render("PE", data.pe_ratio)}</p>
        <p className="text-sm text-gray-400">ROE: {render("ROE", data.roe, "%", 0.01)}</p>
        <p className="text-sm text-gray-400">Profit Margin: {render("Margin", data.profit_margin, "%", 0.01)}</p>
      </div>
    );
  }
  