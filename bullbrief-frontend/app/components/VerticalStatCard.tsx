import type { SingleSummaryData } from "@/app/types/stock";

type Props = {
  data: SingleSummaryData | null;
  loading?: boolean;
};

export default function VerticalStatCard({ data, loading = false }: Props) {
  const render = (label: string, value: number | null, suffix = "", divide = 1) =>
    value != null ? `${(value / divide).toFixed(2)}${suffix}` : "—";

  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-xl p-4 text-center border border-zinc-700 flex flex-col items-center justify-center min-h-[140px]">
        <div className="animate-spin h-6 w-6 rounded-full border-t-2 border-blue-500 mb-3"></div>
        <p className="text-sm text-gray-300">BullBrief is analyzing this stock...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-zinc-900 rounded-lg p-4 text-center text-gray-400 border border-zinc-700 min-h-[140px]">
        No data loaded.
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-xl p-4 space-y-2 text-white shadow-md border border-zinc-800">
      <h2 className="text-lg font-bold">
        {data.company_name} ({data.ticker})
      </h2>
      <p className="text-sm text-gray-400">
        Market Cap: {render("Market Cap", data.market_cap, "B", 1e9)}
      </p>
      <p className="text-sm text-gray-400">
        P/E Ratio: {render("PE", data.pe_ratio)}
      </p>
      <p className="text-sm text-gray-400">
        ROE: {render("ROE", data.roe, "%", 0.01)}
      </p>
      <p className="text-sm text-gray-400">
        Profit Margin: {render("Margin", data.profit_margin, "%", 0.01)}
      </p>
    </div>
  );
}
