import { Edit3, Fuel, MoreVertical, Settings2, Trash2 } from "lucide-react"
import { StatusBadge } from "./StatusBadge"
import type { CarT } from "./type"

interface CarCardProps {
  car: CarT
  onEdit: () => void
  onView: () => void
  onDelete: (id: string) => void // Optional: if you want delete too
}
export const CarCard = ({ car, onEdit, onView, onDelete }: CarCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={car.carImage}
          alt={car.carName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={car.status} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-blue-600 hover:text-white"
            onClick={onEdit}
          >
            <Edit3 size={18} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow-lg transition-colors hover:bg-red-600 hover:text-white"
            onClick={() => onDelete(car?.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              {car.manufacturer}
            </p>
            <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              {car.carName}
            </h3>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="mt-1 flex items-center gap-4 border-y border-gray-50 py-3 dark:border-gray-800">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Fuel size={14} className="text-gray-400" />
            {car.fuelType}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Settings2 size={14} className="text-gray-400" />
            {car.transmissionType}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              ₹{car.ratePerHour}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              /day
            </span>
          </div>
          <button
            className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400"
            onClick={onView}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
