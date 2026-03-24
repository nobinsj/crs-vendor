import type { BookingStatus } from "./type"

export const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const styles: Record<BookingStatus, string> = {
    Pending:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Confirmed:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Completed:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tracking-wider uppercase ${styles[status]}`}
    >
      {status}
    </span>
  )
}

export const BookingSkeleton = () => (
  <div className="w-full animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-20 w-full rounded-xl bg-gray-100 dark:bg-gray-800"
      />
    ))}
  </div>
)
