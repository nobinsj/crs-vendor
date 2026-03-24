import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  trend: string
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
          <p className="text-xs font-medium text-gray-400 italic dark:text-gray-500">
            {trend}
          </p>
        </div>

        <div className={`rounded-xl p-3 shadow-sm ${color}`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}
