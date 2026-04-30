"use client";

import { ArrowUpRight, Building2, FileText, Gauge, Loader2 } from "lucide-react";
import { formatNumber } from "@/app/lib/format";

export type StockDriverOperation = {
  name: string;
  role: string;
  why_it_matters: string;
  evidence: string;
};

export type StockFinancialDriver = {
  label: string;
  value: number | null;
  description: string;
};

export type StockDriversData = {
  ticker: string;
  company_name: string;
  summary: string;
  operations: StockDriverOperation[];
  financial_drivers: StockFinancialDriver[];
  watch_items: string[];
  fiscal_year?: number | null;
  filing_date?: string | null;
  source?: {
    name: string;
    url: string;
  };
};

type Props = {
  data: StockDriversData | null;
  loading: boolean;
  error: string | null;
};

function formatMoney(value: number | null) {
  if (value === null || value === undefined) return "N/A";
  return `$${formatNumber(value)}`;
}

export default function StockDriversCard({ data, loading, error }: Props) {
  if (loading) {
    return (
      <div
        className="rounded-2xl p-6 flex items-center gap-3"
        style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.1)" }}
      >
        <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
        <p className="text-sm text-slate-500">Reading latest SEC filing...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#0c1829", border: "1px solid rgba(244,63,94,0.18)" }}
      >
        <p className="text-sm text-rose-400">Could not load SEC driver analysis.</p>
        {error && <p className="text-xs text-slate-600 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{ backgroundColor: "#0c1829", border: "1px solid rgba(56,189,248,0.12)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-bold text-blue-50">What Drives The Stock</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-600">
                  SEC 10-K {data.fiscal_year ? `FY${data.fiscal_year}` : ""}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-7 max-w-3xl">{data.summary}</p>
          </div>

          {data.source?.url && (
            <a
              href={data.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl shrink-0"
              style={{ color: "#38bdf8", backgroundColor: "rgba(56,189,248,0.07)", border: "1px solid rgba(56,189,248,0.16)" }}
            >
              SEC Filing <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {data.financial_drivers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.financial_drivers.slice(0, 3).map((driver) => (
              <div
                key={driver.label}
                className="rounded-xl p-4"
                style={{ backgroundColor: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.1)" }}
              >
                <div className="flex items-center gap-1.5 text-sky-400 mb-2">
                  <Gauge className="w-3.5 h-3.5" />
                  <p className="text-[9px] uppercase tracking-wider font-medium text-slate-500">{driver.label}</p>
                </div>
                <p className="text-blue-50 font-bold text-lg tabular-nums">{formatMoney(driver.value)}</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{driver.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.operations.map((operation) => (
            <div
              key={operation.name}
              className="rounded-xl p-5 space-y-3"
              style={{ backgroundColor: "rgba(16,185,129,0.045)", border: "1px solid rgba(16,185,129,0.13)" }}
            >
              <div>
                <p className="text-sm font-bold text-blue-50">{operation.name}</p>
                <p className="text-xs text-emerald-400 mt-1">{operation.role}</p>
              </div>
              <p className="text-sm text-slate-400 leading-7">{operation.why_it_matters}</p>
              {operation.evidence && (
                <div className="flex items-start gap-2 pt-1">
                  <FileText className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">{operation.evidence}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {data.watch_items.length > 0 && (
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "rgba(245,158,11,0.045)", border: "1px solid rgba(245,158,11,0.14)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-3">Investor Watch Items</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.watch_items.slice(0, 3).map((item, idx) => (
                <p key={idx} className="text-xs text-slate-400 leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
