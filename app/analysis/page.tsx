"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/app/components/Card";
import { decodePortfolioFromUrl, defaultHoldings, emptyForm, encodePortfolioForUrl, isLegacyPortfolio, STORAGE_KEY, type Holding } from "@/app/lib/portfolio";

type Quote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

type LiveHolding = Holding & {
  currentPrice: number;
  marketValue: number;
  unrealizedPnl: number;
  changePercent: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function Analysis() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const shared = decodePortfolioFromUrl(params.get("portfolio"));
      if (shared) {
        setHoldings(shared);
      } else {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Holding[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHoldings(isLegacyPortfolio(parsed) ? defaultHoldings : parsed);
          } else {
            setHoldings(defaultHoldings);
          }
        } else {
          setHoldings(defaultHoldings);
        }
      }
    } catch {
      setHoldings([]);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (holdings.length) {
      url.searchParams.set("portfolio", encodePortfolioForUrl(holdings));
    } else {
      url.searchParams.delete("portfolio");
    }
    setShareUrl(url.toString());
  }, [holdings]);

  useEffect(() => {
    if (!holdings.length) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    void (async () => {
      const snapshot = await Promise.all(
        holdings.map(async (holding) => {
          try {
            const res = await fetch(`/api/market?symbol=${encodeURIComponent(holding.symbol)}`);
            if (!res.ok) throw new Error(`status ${res.status}`);
            const data = (await res.json()) as Quote;
            return {
              symbol: holding.symbol,
              price: Number(data.price ?? holding.currentPrice),
              change: Number(data.change ?? 0),
              changePercent: Number(data.changePercent ?? 0),
            };
          } catch {
            return {
              symbol: holding.symbol,
              price: holding.currentPrice,
              change: 0,
              changePercent: 0,
            };
          }
        })
      );

      if (cancelled) return;
      setQuotes(Object.fromEntries(snapshot.map((item) => [item.symbol, item])));
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [holdings]);

  const analysis = useMemo(() => {
    const liveHoldings: LiveHolding[] = holdings.map((holding) => {
      const quote = quotes[holding.symbol];
      const currentPrice = quote?.price ?? holding.currentPrice;
      const changePercent = quote?.changePercent ?? 0;
      const marketValue = holding.shares * currentPrice;
      const unrealizedPnl = marketValue - holding.shares * holding.averageCost;

      return {
        ...holding,
        currentPrice,
        marketValue,
        unrealizedPnl,
        changePercent,
      };
    });

    const totalValue = liveHoldings.reduce((acc, h) => acc + h.marketValue, 0);
    const totalCost = liveHoldings.reduce((acc, h) => acc + h.shares * h.averageCost, 0);
    const totalGain = totalValue - totalCost;
    const gainPct = totalCost === 0 ? 0 : (totalGain / totalCost) * 100;
    const stockWeight = liveHoldings
      .filter((h) => h.type === "Stock")
      .reduce((acc, h) => acc + h.marketValue, 0);
    const etfWeight = liveHoldings
      .filter((h) => h.type === "ETF")
      .reduce((acc, h) => acc + h.marketValue, 0);

    const weights = liveHoldings.map((h) => h.marketValue / (totalValue || 1));
    const concentration = weights.reduce((acc, w) => acc + w * w, 0);
    const diversification = clamp(Math.round((1 - concentration) * 100), 0, 100);

    const costDeviation = liveHoldings.map(
      (h) => ((h.currentPrice - h.averageCost) / Math.max(h.averageCost, 1)) * 100
    );
    const weightedDeviation = weights.reduce(
      (acc, weight, index) => acc + weight * Math.abs(costDeviation[index]),
      0
    );
    const volatilityProxy = clamp(
      Math.round(weightedDeviation * 1.5 + concentration * 35),
      0,
      100
    );
    const riskBand = volatilityProxy >= 60 ? "High" : volatilityProxy >= 35 ? "Moderate" : "Low";
    const riskScore = clamp(
      Math.round(volatilityProxy + (holdings.length > 5 ? 10 : 0)),
      0,
      100
    );

    const topPositions = [...liveHoldings]
      .sort((a, b) => b.marketValue - a.marketValue)
      .slice(0, 3);

    const watchlist = [...liveHoldings].sort((a, b) => b.marketValue - a.marketValue);

    return {
      totalValue,
      totalCost,
      totalGain,
      gainPct,
      stockWeight,
      etfWeight,
      diversification,
      riskBand,
      riskScore,
      volatilityProxy,
      topPositions,
      watchlist,
    };
  }, [holdings, quotes]);

  const positiveTrend = analysis.gainPct >= 0;
  const stockPct = analysis.totalValue === 0 ? 0 : (analysis.stockWeight / analysis.totalValue) * 100;
  const etfPct = analysis.totalValue === 0 ? 0 : (analysis.etfWeight / analysis.totalValue) * 100;

  const copyShareLink = async () => {
    if (!shareUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Investment Lab portfolio",
          text: "Open this portfolio on another device",
          url: shareUrl,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        alert("Portfolio link copied. Share it to open the same holdings on another device.");
        return;
      }
    } catch {
      // Ignore share cancellation and fall back to prompt.
    }

    window.prompt("Copy this portfolio link:", shareUrl);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Investment Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Live watchlist, allocation, and risk summary for the holdings saved in your portfolio.
          </p>
        </div>
        <button
          onClick={copyShareLink}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
        >
          Copy Share Link
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Portfolio Value</p>
          <p className="text-2xl font-bold text-black dark:text-white">${analysis.totalValue.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Unrealized Gain</p>
          <p className={`text-2xl font-bold ${positiveTrend ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {positiveTrend ? "+" : "-"}${Math.abs(analysis.totalGain).toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Gain %</p>
          <p className={`text-2xl font-bold ${positiveTrend ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {positiveTrend ? "+" : "-"}{Math.abs(analysis.gainPct).toFixed(1)}%
          </p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Positions</p>
          <p className="text-2xl font-bold text-black dark:text-white">{holdings.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr,0.9fr] gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">Allocation Chart</h2>
            <span className="text-xs text-zinc-500">Live mix</span>
          </div>
          <div className="space-y-4">
            <div className="h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div className="flex h-full w-full">
                <div className="h-full bg-blue-500" style={{ width: `${stockPct}%` }} />
                <div className="h-full bg-emerald-500" style={{ width: `${etfPct}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span className="font-medium text-black dark:text-white">Stocks</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">${analysis.stockWeight.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-black dark:text-white">ETFs</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">${analysis.etfWeight.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Risk Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Diversification</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{analysis.diversification}%</p>
            </div>
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Risk Score</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{analysis.riskScore}/100</p>
            </div>
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-center col-span-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Risk Band</p>
              <p className="text-lg font-semibold text-black dark:text-white">{analysis.riskBand}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                Weighted concentration + cost-basis deviation model.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-4">
        <Card>
          <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Top Positions</h2>
          <div className="space-y-3">
            {analysis.topPositions.map((position, idx) => (
              <div
                key={`${position.symbol}-${idx}`}
                className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-black dark:text-white">{position.symbol}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{position.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-black dark:text-white">${position.marketValue.toFixed(2)}</p>
                  <p className={`text-xs ${position.changePercent >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {position.changePercent >= 0 ? "+" : ""}{position.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">Watchlist</h2>
            <span className="text-xs text-zinc-500">{loading ? "Refreshing…" : "Live quotes"}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left py-3 px-2 font-semibold text-black dark:text-white">Symbol</th>
                  <th className="text-right py-3 px-2 font-semibold text-black dark:text-white">Type</th>
                  <th className="text-right py-3 px-2 font-semibold text-black dark:text-white">Shares</th>
                  <th className="text-right py-3 px-2 font-semibold text-black dark:text-white">Price</th>
                  <th className="text-right py-3 px-2 font-semibold text-black dark:text-white">% Change</th>
                  <th className="text-right py-3 px-2 font-semibold text-black dark:text-white">Value</th>
                </tr>
              </thead>
              <tbody>
                {analysis.watchlist.map((holding) => (
                  <tr
                    key={holding.symbol}
                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    <td className="py-3 px-2 font-medium text-black dark:text-white">{holding.symbol}</td>
                    <td className="py-3 px-2 text-right text-zinc-600 dark:text-zinc-400">{holding.type}</td>
                    <td className="py-3 px-2 text-right text-zinc-600 dark:text-zinc-400">{holding.shares}</td>
                    <td className="py-3 px-2 text-right text-zinc-600 dark:text-zinc-400">${holding.currentPrice.toFixed(2)}</td>
                    <td
                      className={`py-3 px-2 text-right font-semibold ${
                        holding.changePercent >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {holding.changePercent >= 0 ? "+" : ""}{holding.changePercent.toFixed(2)}%
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-black dark:text-white">${holding.marketValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Opportunity Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <p>
              Your current portfolio is {positiveTrend ? "showing a positive" : "running at a negative"} unrealized return of {positiveTrend ? "+" : "-"}
              {Math.abs(analysis.gainPct).toFixed(1)}%.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <p>
              The diversification score is {analysis.diversification}% and the weighted risk score is {analysis.riskScore}/100 ({analysis.riskBand}).
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <p>
              Live quote refresh is enabled for the saved symbols, with a graceful fallback to the last-known portfolio price if a quote source is unavailable.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
