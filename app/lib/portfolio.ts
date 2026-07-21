export type Holding = {
  symbol: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  type: "Stock" | "ETF";
};

export const STORAGE_KEY = "investment-lab-portfolio";

export const defaultHoldings: Holding[] = [
  { symbol: "AAPL", shares: 25, averageCost: 175.0, currentPrice: 195.5, type: "Stock" },
  { symbol: "MSFT", shares: 15, averageCost: 340.0, currentPrice: 380.2, type: "Stock" },
  { symbol: "VTI", shares: 12, averageCost: 248.0, currentPrice: 266.5, type: "ETF" },
  { symbol: "VOO", shares: 18, averageCost: 420.0, currentPrice: 447.8, type: "ETF" },
  { symbol: "NVDA", shares: 8, averageCost: 800.0, currentPrice: 875.5, type: "Stock" },
];

export const emptyForm = {
  symbol: "",
  shares: 1,
  averageCost: 0,
  currentPrice: 0,
  type: "Stock" as Holding["type"],
};

export function encodePortfolioForUrl(holdings: Holding[]) {
  return encodeURIComponent(JSON.stringify(holdings));
}

export function decodePortfolioFromUrl(value: string | null): Holding[] | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    return Array.isArray(parsed) ? (parsed as Holding[]) : null;
  } catch {
    return null;
  }
}
