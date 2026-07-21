export type Holding = {
  symbol: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  type: "Stock" | "ETF";
};

export const STORAGE_KEY = "investment-lab-portfolio";

export const defaultHoldings: Holding[] = [
  { symbol: "GLW", shares: 500, averageCost: 176, currentPrice: 158.39, type: "Stock" },
  { symbol: "TQQQ", shares: 1461, averageCost: 48, currentPrice: 70.74, type: "ETF" },
  { symbol: "QQQ", shares: 117, averageCost: 598, currentPrice: 705.94, type: "ETF" },
  { symbol: "SPY", shares: 105, averageCost: 667, currentPrice: 750.72, type: "ETF" },
  { symbol: "SOXL", shares: 100, averageCost: 140, currentPrice: 142.48, type: "ETF" },
];

export const emptyForm = {
  symbol: "",
  shares: 1,
  averageCost: 0,
  currentPrice: 0,
  type: "Stock" as Holding["type"],
};

const legacyPlaceholderSymbols = new Set(["AAPL", "MSFT", "VTI", "VOO", "NVDA"]);

export function isLegacyPortfolio(holdings: Holding[]) {
  return holdings.length > 0 && holdings.every((holding) => legacyPlaceholderSymbols.has(holding.symbol));
}

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
