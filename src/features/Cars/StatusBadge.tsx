import type { CarStatus } from "./type"

export const StatusBadge = ({ status }: { status: CarStatus }) => {
  const styles: Record<CarStatus, string> = {
    Available:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Booked:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Maintenance:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${styles[status]}`}
    >
      {status}
    </span>
  )
}

export const CarsSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="aspect-video w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
        <div className="mt-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-2 h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    ))}
  </div>
)
