import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-xl text-black dark:text-white">
              💼 Investment Lab
            </Link>
            <div className="hidden sm:flex gap-6">
              <Link
                href="/dashboard"
                className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
              >
                Dashboard
              </Link>
              <Link
                href="/portfolio"
                className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
              >
                Portfolio
              </Link>
              <Link
                href="/market"
                className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
              >
                Market Data
              </Link>
              <Link
                href="/analysis"
                className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
              >
                Analysis
              </Link>
              <Link
                href="/about"
                className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
              >
                About
              </Link>
            </div>
          </div>
          <Link
            href="/settings"
            className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
          >
            ⚙️ Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
