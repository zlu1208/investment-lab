import StatCard from "@/app/components/StatCard";
import Card from "@/app/components/Card";
import MarketTicker from "@/app/components/MarketTicker";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Overview of your investment portfolio and market performance
        </p>
        <div className="mt-3 flex items-center gap-4">
          <MarketTicker symbol="AAPL" />
          <MarketTicker symbol="MSFT" />
          <MarketTicker symbol="BTC" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Portfolio Value"
          value="$125,430"
          change="12.5%"
          isPositive={true}
        />
        <StatCard
          label="Today's Gain/Loss"
          value="$2,340"
          change="2.1%"
          isPositive={true}
        />
        <StatCard
          label="YTD Return"
          value="$18,920"
          change="18.9%"
          isPositive={true}
        />
        <StatCard
          label="Cash Available"
          value="$15,000"
          change="0.0%"
          isPositive={false}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="font-medium text-black dark:text-white">
                  Bought 10 shares of AAPL
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  2 hours ago
                </p>
              </div>
              <span className="text-green-600 dark:text-green-400 font-medium">
                +$1,234
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="font-medium text-black dark:text-white">
                  Sold 5 shares of MSFT
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  1 day ago
                </p>
              </div>
              <span className="text-red-600 dark:text-red-400 font-medium">
                -$567
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-black dark:text-white">
                  Dividend received - VTSAX
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  3 days ago
                </p>
              </div>
              <span className="text-green-600 dark:text-green-400 font-medium">
                +$234
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Portfolio Allocation
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Stocks</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">60%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Bonds</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">20%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">
                Crypto
              </span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Cash</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
            Performance Comparison
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                Your Portfolio
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                +18.9%
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                S&P 500
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                +15.2%
              </p>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 pt-4">
              ✓ Outperforming by 3.7%
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
