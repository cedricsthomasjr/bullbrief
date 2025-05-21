"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart,
  Activity,
  BadgePercent,
  AreaChart,
  PiggyBank,
  Banknote,
  BookOpen,
  CircleDollarSign,
  Percent,
  Users,
  ArrowDownUp,
} from "lucide-react";

import { formatFixed, formatNumber, formatPercent } from "@/app/lib/format";
import EPSChartModal from "@/app/components/EPSChartModal";

type BackendSummary = {
  company_name: string;
  ticker: string;
  business_summary: string;
  swot: string;
  outlook: string;
  market_cap: number;
  pe_ratio: number;
  range_52w: string;
  sector: string;
  current_price: number;
  eps_ttm: number;
  forward_pe: number;
  dividend_yield: number;
  beta: number;
  volume: number;
  avg_volume: number;
  peg_ratio: number;
  price_to_sales: number;
  price_to_book: number;
  roe: number;
  free_cashflow: number;
  debt_to_equity: number;
  profit_margin: number;
  institutional_ownership: number;
  short_percent: number;
  raw_summary: string;
};

export default function FinancialMetricsGrid({ data }: { data: BackendSummary }) {
  const [showModal, setShowModal] = useState(false);

  const metricGroups = [
    {
      title: "💸 Valuation Metrics",
      metrics: [
        { label: "EPS (TTM)", value: formatFixed(data.eps_ttm), icon: <BarChart3 className="w-4 h-4 text-blue-400" /> },
        { label: "Forward P/E", value: formatFixed(data.forward_pe), icon: <LineChart className="w-4 h-4 text-blue-400" /> },
        { label: "PEG Ratio", value: formatFixed(data.peg_ratio), icon: <TrendingUp className="w-4 h-4 text-blue-400" /> },
        { label: "Price to Sales", value: formatFixed(data.price_to_sales), icon: <PieChart className="w-4 h-4 text-blue-400" /> },
        { label: "Price to Book", value: formatFixed(data.price_to_book), icon: <BookOpen className="w-4 h-4 text-blue-400" /> },
      ],
    },
    {
      title: "📉 Risk & Ownership",
      metrics: [
        { label: "Beta", value: formatFixed(data.beta), icon: <Activity className="w-4 h-4 text-blue-400" /> },
        { label: "Volume", value: formatNumber(data.volume), icon: <ArrowDownUp className="w-4 h-4 text-blue-400" /> },
        { label: "Avg Volume", value: formatNumber(data.avg_volume), icon: <ArrowDownUp className="w-4 h-4 text-blue-400" /> },
        { label: "Short % of Float", value: formatPercent(data.short_percent), icon: <BadgePercent className="w-4 h-4 text-blue-400" /> },
        { label: "Institutional Ownership", value: formatPercent(data.institutional_ownership), icon: <Users className="w-4 h-4 text-blue-400" /> },
      ],
    },
    {
      title: "📈 Profitability & Cashflow",
      metrics: [
        { label: "Dividend Yield", value: formatPercent(data.dividend_yield), icon: <PiggyBank className="w-4 h-4 text-blue-400" /> },
        { label: "ROE", value: formatPercent(data.roe), icon: <Percent className="w-4 h-4 text-blue-400" /> },
        { label: "Profit Margin", value: formatPercent(data.profit_margin), icon: <CircleDollarSign className="w-4 h-4 text-blue-400" /> },
        { label: "Free Cash Flow", value: `$${formatNumber(data.free_cashflow)}`, icon: <Banknote className="w-4 h-4 text-blue-400" /> },
        { label: "Debt to Equity", value: formatFixed(data.debt_to_equity), icon: <AreaChart className="w-4 h-4 text-blue-400" /> },
      ],
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <h2 className="text-2xl justify-center font-semibold text-blue-300 flex items-center gap-2">
        📊 Key Financial Metrics
      </h2>

      {metricGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="space-y-4">
          <h3 className="text-lg font-bold text-blue-200">{group.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {group.metrics.map((item, idx) => {
              const isEPS = item.label === "EPS (TTM)";
              return (
                <div
                  key={idx}
                  className="relative group bg-zinc-900 p-4 rounded-xl border border-zinc-700 hover:border-blue-500 transition duration-200"
                >
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  <p className="text-white text-lg font-semibold flex items-center gap-2 mt-1">
                    {item.icon} {item.value}
                  </p>

                  {isEPS && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="absolute top-2 right-2 text-[11px] px-2 py-1 rounded-full border border-blue-400 text-blue-400 bg-black bg-opacity-60 group-hover:opacity-100 opacity-0 transition"
                    >
                      View Chart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {showModal && (
        <EPSChartModal
          ticker={data.ticker}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
