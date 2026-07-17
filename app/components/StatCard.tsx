interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export default function StatCard({ label, value, change, isPositive }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold text-black dark:text-white mb-2">
        {value}
      </p>
      {change && (
        <p
          className={`text-sm font-medium ${
            isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isPositive ? "↑" : "↓"} {change}
        </p>
      )}
    </div>
  );
}
