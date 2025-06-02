
  // /app/types/stock.ts
export type SingleSummaryData = {
  company_name: string;
  ticker: string;
  market_cap: number | null;
  pe_ratio: number | null;
  roe: number | null;
  profit_margin: number | null;
  ai_summary: string;
};

export type InsightSection = {
  ticker: string;
  valuation: string;
  profitability: string;
  margins: string;
  outlook: string;
};
