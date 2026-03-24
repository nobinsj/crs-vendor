import { CarFront, Plus } from "lucide-react"
import { Link } from "react-router"

const EmptyState = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 text-center transition-colors dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
        <CarFront size={40} strokeWidth={1.5} />
      </div>

      <div className="max-w-xs space-y-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Your garage is empty
        </h3>
        <p className="text-sm leading-relaxed font-medium text-gray-500 dark:text-gray-400">
          You haven't added any vehicles yet. List your first car to start
          receiving bookings and tracking your earnings.
        </p>
      </div>

      <Link
        to="/cars/add"
        className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95"
      >
        <Plus size={18} strokeWidth={3} />
        Add Your First Car
      </Link>
    </div>
  )
}

export default EmptyState
