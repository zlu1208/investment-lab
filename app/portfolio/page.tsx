"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/app/components/Card";

type Holding = {
  symbol: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  type: "Stock" | "ETF";
};

const STORAGE_KEY = "investment-lab-portfolio";

const defaultHoldings: Holding[] = [
  { symbol: "AAPL", shares: 25, averageCost: 175.0, currentPrice: 195.5, type: "Stock" },
  { symbol: "MSFT", shares: 15, averageCost: 340.0, currentPrice: 380.2, type: "Stock" },
  { symbol: "VTI", shares: 12, averageCost: 248.0, currentPrice: 266.5, type: "ETF" },
  { symbol: "VOO", shares: 18, averageCost: 420.0, currentPrice: 447.8, type: "ETF" },
  { symbol: "NVDA", shares: 8, averageCost: 800.0, currentPrice: 875.5, type: "Stock" },
];

const emptyForm = {
  symbol: "",
  shares: 1,
  averageCost: 0,
  currentPrice: 0,
  type: "Stock" as Holding["type"],
};

export default function Portfolio() {
  const [holdings, setHoldings] = useState<Holding[]>(defaultHoldings);
  const [form, setForm] = useState(emptyForm);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Holding[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHoldings(parsed);
        }
      }
    } catch {
      // Ignore storage issues and keep defaults.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
  }, [holdings, hydrated]);

  const metrics = useMemo(() => {
    const totalValue = holdings.reduce((acc, h) => acc + h.shares * h.currentPrice, 0);
    const totalCost = holdings.reduce((acc, h) => acc + h.shares * h.averageCost, 0);
    const unrealizedGain = totalValue - totalCost;
    const gainPct = totalCost === 0 ? 0 : (unrealizedGain / totalCost) * 100;
    const averageWeight = totalValue === 0 ? 0 : (holdings.length / totalValue) * 1000;

    return {
      totalValue,
      totalCost,
      unrealizedGain,
      gainPct,
      averageWeight,
    };
  }, [holdings]);

  const addHolding = () => {
    if (!form.symbol.trim()) return;

    setHoldings((current) => [
      ...current,
      {
        symbol: form.symbol.trim().toUpperCase(),
        shares: Number(form.shares),
        averageCost: Number(form.averageCost),
        currentPrice: Number(form.currentPrice),
        type: form.type,
      },
    ]);
    setForm(emptyForm);
  };

  const resetHoldings = () => {
    setHoldings(defaultHoldings);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Portfolio
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Capture every stock or ETF holding and keep the analysis tied to the latest saved portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Total Portfolio Value
          </p>
          <p className="text-2xl font-bold text-black dark:text-white">
            ${metrics.totalValue.toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Total Cost Basis
          </p>
          <p className="text-2xl font-bold text-black dark:text-white">
            ${metrics.totalCost.toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Unrealized Gain
          </p>
          <p
            className={`text-2xl font-bold ${
              metrics.unrealizedGain >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {metrics.unrealizedGain >= 0 ? "+" : "-"}
            ${Math.abs(metrics.unrealizedGain).toFixed(2)}
          </p>
        </Card>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Symbol
            <input
              value={form.symbol}
              onChange={(e) => setForm({ ...form, symbol: e.target.value })}
              className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
              placeholder="AAPL"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Shares
            <input
              type="number"
              min="0"
              step="1"
              value={form.shares}
              onChange={(e) => setForm({ ...form, shares: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Avg Cost
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.averageCost}
              onChange={(e) => setForm({ ...form, averageCost: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Current Price
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.currentPrice}
              onChange={(e) => setForm({ ...form, currentPrice: Number(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Type
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as Holding["type"] })}
              className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
            >
              <option value="Stock">Stock</option>
              <option value="ETF">ETF</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={addHolding}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Position
          </button>
          <button
            onClick={resetHoldings}
            className="px-6 py-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium"
          >
            Reset Sample Portfolio
          </button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-6">
          Current Holdings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left py-3 px-4 font-semibold text-black dark:text-white">Symbol</th>
                <th className="text-right py-3 px-4 font-semibold text-black dark:text-white">Type</th>
                <th className="text-right py-3 px-4 font-semibold text-black dark:text-white">Shares</th>
                <th className="text-right py-3 px-4 font-semibold text-black dark:text-white">Avg Cost</th>
                <th className="text-right py-3 px-4 font-semibold text-black dark:text-white">Current</th>
                <th className="text-right py-3 px-4 font-semibold text-black dark:text-white">Value</th>
                <th className="text-right py-3 px-4 font-semibold text-black dark:text-white">P/L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const value = holding.shares * holding.currentPrice;
                const pnl = value - holding.shares * holding.averageCost;
                return (
                  <tr key={`${holding.symbol}-${holding.type}`} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                    <td className="py-4 px-4 font-medium text-black dark:text-white">{holding.symbol}</td>
                    <td className="py-4 px-4 text-right text-zinc-600 dark:text-zinc-400">{holding.type}</td>
                    <td className="py-4 px-4 text-right text-zinc-600 dark:text-zinc-400">{holding.shares}</td>
                    <td className="py-4 px-4 text-right text-zinc-600 dark:text-zinc-400">${holding.averageCost.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right text-zinc-600 dark:text-zinc-400">${holding.currentPrice.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right font-semibold text-black dark:text-white">${value.toFixed(2)}</td>
                    <td className={`py-4 px-4 text-right font-semibold ${pnl >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {pnl >= 0 ? "+" : "-"}${Math.abs(pnl).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex flex-wrap gap-4">
        <a href="/analysis" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Start Analysis
        </a>
      </div>
    </div>
  );
}
