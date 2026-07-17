"use client";

import { useEffect, useState } from "react";

interface Quote {
  symbol: string;
  price?: string;
  change?: string;
  changePercent?: string;
}

export default function MarketTicker({
  symbol,
  interval = 60000,
}: {
  symbol: string;
  interval?: number;
}) {
  const [quote, setQuote] = useState<Quote>({ symbol });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchQuote() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/market?symbol=${encodeURIComponent(symbol)}`);
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();

      // Alpha Vantage GLOBAL_QUOTE shape
      const g = data["Global Quote"] || data["Global Quote"] === 0 ? data["Global Quote"] : null;
      if (!g) {
        setError("No quote returned");
        setLoading(false);
        return;
      }

      const price = g["05. price"] ?? g.price ?? null;
      const change = g["09. change"] ?? g.change ?? null;
      const changePercent = g["10. change percent"] ?? g.changePercent ?? null;

      setQuote({ symbol, price, change, changePercent });
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  useEffect(() => {
    // Defer initial fetch to avoid calling setState synchronously in the effect body
    const t = setTimeout(() => {
      void fetchQuote();
    }, 0);

    const id = setInterval(fetchQuote, interval);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, interval]);

  return (
    <div className="inline-flex items-baseline gap-3">
      <span className="font-medium text-sm text-zinc-600 dark:text-zinc-400">{symbol}</span>
      {loading ? (
        <span className="text-sm text-zinc-500">Loading…</span>
      ) : error ? (
        <span className="text-sm text-red-600">Err</span>
      ) : (
        <>
          <span className="text-sm font-semibold text-black dark:text-white">{quote.price}</span>
          {quote.changePercent && (
            <span
              className={`text-sm font-medium ${quote.change && parseFloat(quote.change) >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {quote.changePercent}
            </span>
          )}
        </>
      )}
    </div>
  );
}
