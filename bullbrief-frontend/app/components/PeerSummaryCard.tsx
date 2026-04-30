"use client";

import { Card } from "@/app/ui/card";

type CompanyMetrics = {
  name: string;
  ticker: string;
  market_cap: number;
  pe_ratio: number | null;
  price_to_sales: number | null;
  profit_margin: number | null;
};

type Props = {
  target: CompanyMetrics;
  peers: CompanyMetrics[];
};

export default function PeerSummaryCard({ target, peers }: Props) {
  const validPeers = peers.filter(
    (p) =>
      typeof p.market_cap === "number" &&
      typeof p.pe_ratio === "number" &&
      typeof p.price_to_sales === "number" &&
      typeof p.profit_margin === "number"
  );

  const rank = (key: keyof CompanyMetrics) => {
    const all = [...validPeers, target].filter(
      (p) => typeof p[key] === "number"
    );
    const sorted = all.sort((a, b) => (b[key] as number) - (a[key] as number));
    return sorted.findIndex((c) => c.ticker === target.ticker) + 1;
  };

  const avgPE = (
    validPeers.reduce((acc, p) => acc + (p.pe_ratio ?? 0), 0) /
    validPeers.length
  ).toFixed(2);

  const avgPS = (
    validPeers.reduce((acc, p) => acc + (p.price_to_sales ?? 0), 0) /
    validPeers.length
  ).toFixed(2);

  const avgPM = (
    validPeers.reduce((acc, p) => acc + (p.profit_margin ?? 0), 0) /
    validPeers.length *
    100
  ).toFixed(1);

  return (
    <Card className="p-4 rounded-2xl shadow-md border border-neutral-800 bg-black text-white space-y-2">
      <h3 className="text-lg font-bold text-blue-400 mb-1">Peer Snapshot</h3>

      <div className="flex justify-between">
        <span>P/E Ratio</span>
        <span>
          {target.pe_ratio?.toFixed(2) ?? "N/A"} (Rank #{rank("pe_ratio")} /{" "}
          {validPeers.length + 1})
        </span>
      </div>

      <div className="flex justify-between">
        <span>Price-to-Sales</span>
        <span>
          {target.price_to_sales?.toFixed(2) ?? "N/A"} (Rank #
          {rank("price_to_sales")} / {validPeers.length + 1})
        </span>
      </div>

      <div className="flex justify-between">
        <span>Profit Margin</span>
        <span>
          {((target.profit_margin ?? 0) * 100).toFixed(1)}% (Rank #
          {rank("profit_margin")} / {validPeers.length + 1})
        </span>
      </div>

      <div className="mt-2 pt-2 border-t border-neutral-700 text-sm text-neutral-400">
        <div>Sector Peer Averages:</div>
        <div>P/E: {avgPE} | P/S: {avgPS} | Margin: {avgPM}%</div>
      </div>
    </Card>
  );
}
