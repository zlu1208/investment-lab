import Card from "@/app/components/Card";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          💼 Investment Lab
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Your personal investment analysis and portfolio management tool
        </p>
      </div>

      {/* Mission */}
      <Card>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Investment Lab is designed to empower individual investors with
          professional-grade tools for portfolio management, market analysis,
          and data-driven investment decisions. We believe that access to
          quality financial tools and information should not be limited to
          institutional investors.
        </p>
      </Card>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "📊",
              title: "Portfolio Dashboard",
              description:
                "Real-time overview of your investments and performance",
            },
            {
              icon: "💰",
              title: "Portfolio Tracking",
              description:
                "Monitor your holdings and asset allocation",
            },
            {
              icon: "📈",
              title: "Market Data",
              description:
                "Access real-time market indices, stocks, and crypto prices",
            },
            {
              icon: "🔍",
              title: "Advanced Analysis",
              description:
                "Performance metrics, risk analysis, and comparisons",
            },
            {
              icon: "⚙️",
              title: "Customizable Settings",
              description:
                "Configure preferences and API integrations",
            },
            {
              icon: "🔐",
              title: "Secure & Private",
              description:
                "Your data is encrypted and stored securely",
            },
          ].map((feature, idx) => (
            <Card key={idx}>
              <div className="space-y-2">
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <Card>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Technology Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: "Next.js", version: "16" },
            { name: "React", version: "19" },
            { name: "TypeScript", version: "5" },
            { name: "Tailwind CSS", version: "4" },
            { name: "Node.js", version: "20+" },
            { name: "ESLint", version: "9" },
          ].map((tech, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg text-center"
            >
              <p className="font-semibold text-black dark:text-white">
                {tech.name}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-300">
                v{tech.version}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              100%
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Open Source
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              24/7
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Available
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              Free
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Forever
            </p>
          </div>
        </Card>
      </div>

      {/* Contact & Resources */}
      <Card>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Get Started
        </h2>
        <div className="space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300">
            Ready to take control of your investments?
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Start Exploring
            </button>
            <a
              href="https://github.com"
              className="px-6 py-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Investment Lab © 2026. Built with ❤️ for investors by investors.
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
          Disclaimer: Investment Lab is for educational and informational
          purposes only. It is not financial advice. Always consult with a
          qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}
