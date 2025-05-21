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
