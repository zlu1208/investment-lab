import Image from "next/image";
import Link from "next/link";
import Card from "./components/Card";

export default function Home() {
  const features = [
    {
      icon: "📊",
      title: "Dashboard",
      description: "Real-time portfolio overview and performance tracking",
      href: "/dashboard",
    },
    {
      icon: "💼",
      title: "Portfolio",
      description: "Manage and analyze your investment holdings",
      href: "/portfolio",
    },
    {
      icon: "📈",
      title: "Market Data",
      description: "Track stock indices, cryptocurrencies, and commodities",
      href: "/market",
    },
    {
      icon: "🔍",
      title: "Analysis",
      description: "In-depth performance metrics and risk analysis",
      href: "/analysis",
    },
    {
      icon: "ℹ️",
      title: "About",
      description: "Learn more about Investment Lab",
      href: "/about",
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: "Configure your preferences and integrations",
      href: "/settings",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-900 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8 inline-block">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={200}
            height={80}
            priority
          />
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-black dark:text-white mb-4">
          💼 Investment Lab
        </h1>

        <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your personal investment analysis and portfolio management tool. Track
          your investments, analyze market data, and make informed decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Get Started →
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-semibold text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Comprehensive Features
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to manage and grow your portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.href}>
              <Card className="hover:shadow-lg transition h-full cursor-pointer hover:border-blue-200 dark:hover:border-blue-800">
                <div className="space-y-3">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2 pt-2">
                    Explore <span>→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Why Choose Investment Lab?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              100%
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Open source and transparent
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              Real-time
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Live market data and updates
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              Secure
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Your data is encrypted and private
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              Free
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              No costs, no subscriptions
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Card>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Ready to transform your investing?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Start tracking your portfolio and analyzing market data today.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Launch Dashboard
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link href="/dashboard" className="hover:text-black dark:hover:text-white transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-black dark:hover:text-white transition">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/analysis" className="hover:text-black dark:hover:text-white transition">
                    Analysis
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link href="/about" className="hover:text-black dark:hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white transition">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white transition">
                    Docs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black dark:hover:text-white transition">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              © 2026 Investment Lab. Built with Next.js, React, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
