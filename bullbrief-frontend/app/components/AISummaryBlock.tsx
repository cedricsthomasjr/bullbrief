import type { InsightSection } from "@//app/types/stock";

export default function AISummaryBlock({ insight }: { insight: InsightSection }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 text-white space-y-4 shadow-lg border border-zinc-800">
      <h3 className="text-blue-400 font-semibold text-sm">AI Summary – {insight.ticker}</h3>

      {/* Section Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700">
          <h4 className="text-red-300 font-semibold mb-1">📌 Valuation</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{insight.valuation}</p>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700">
          <h4 className="text-pink-300 font-semibold mb-1">📌 Profitability</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{insight.profitability}</p>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700">
          <h4 className="text-orange-300 font-semibold mb-1">📌 Margins</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{insight.margins}</p>
        </div>

        <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700">
          <h4 className="text-cyan-300 font-semibold mb-1">📊 Outlook</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{insight.outlook}</p>
        </div>
      </div>
    </div>
  );
}
