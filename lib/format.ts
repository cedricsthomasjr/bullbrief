// /app/lib/format.ts

export function formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) return "N/A";
  
    const abs = Math.abs(value);
    let suffix = "";
    let scaled = value;
  
    if (abs >= 1e12) {
      suffix = "T";
      scaled = value / 1e12;
    } else if (abs >= 1e9) {
      suffix = "B";
      scaled = value / 1e9;
    } else if (abs >= 1e6) {
      suffix = "M";
      scaled = value / 1e6;
    } else if (abs >= 1e3) {
      suffix = "K";
      scaled = value / 1e3;
    }
  
    return `${scaled.toFixed(2)}${suffix}`;
  }
  
  export function formatPercent(value: number | null | undefined): string {
    return value !== null && value !== undefined
      ? `${(value * 100).toFixed(2)}%`
      : "N/A";
  }
  
  export function formatFixed(value: number | null | undefined): string {
    return value !== null && value !== undefined
      ? value.toFixed(2)
      : "N/A";
  }
  