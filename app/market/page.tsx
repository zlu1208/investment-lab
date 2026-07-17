import Card from "@/app/components/Card";
import MarketTicker from "@/app/components/MarketTicker";

export default function MarketData() {
  const marketData = [
    {
      name: "S&P 500",
      symbol: "^GSPC",
      price: "5,234.80",
      change: 1.2,
      volume: "2.1B",
    },
    {
      name: "NASDAQ",
      symbol: "^IXIC",
      price: "16,482.30",
      change: 2.1,
      volume: "3.5B",
    },
    {
      name: "Dow Jones",
      symbol: "^DJI",
      price: "40,352.60",
      change: 0.8,
      volume: "1.8B",
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$45,234.50",
      change: 5.2,
      volume: "28.5B",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$2,345.80",
      change: 3.8,
      volume: "15.2B",
    },
    {
      name: "Gold",
      symbol: "GC",
      price: "$2,087.30",
      change: -0.5,
      volume: "180K oz",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Market Data
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Real-time market indices, cryptocurrencies, and commodities
        </p>
      </div>

      {/* Market Indices */}
      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          Market Indices
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.slice(0, 3).map((item) => (
            <Card key={item.symbol}>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {item.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {item.symbol}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-black dark:text-white">
                      <MarketTicker symbol={item.symbol} />
                    </p>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Vol: {item.volume}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cryptocurrencies */}
      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          Cryptocurrencies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {marketData.slice(3, 5).map((item) => (
            <Card key={item.symbol}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {item.name}
                  </p>
                  <p className="text-2xl font-bold text-black dark:text-white">
                    {item.price}
                  </p>
                </div>
                <p
                  className={`text-lg font-semibold ${
                    item.change > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.change > 0 ? "+" : ""}
                  {item.change}%
                </p>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-3">
                24h Vol: {item.volume}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Commodities */}
      <Card>
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          Commodities
        </h2>
        <div className="space-y-3">
          {marketData.slice(5).map((item) => (
            <div
              key={item.symbol}
              className="flex justify-between items-center pb-3 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-black dark:text-white">
                  {item.name}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {item.symbol}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-black dark:text-white">
                  {item.price}
                </p>
                <p
                  className={`text-sm ${
                    item.change > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.change > 0 ? "+" : ""}
                  {item.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Source Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          ℹ️ Market data is updated in real-time. Prices may be delayed by 15
          minutes for some markets.
        </p>
      </div>
    </div>
  );
}
