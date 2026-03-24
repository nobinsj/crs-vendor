import { useState } from "react"
import type { BookingT } from "./type"
import { Calendar, CarFront, Check, Eye, Search, User, X } from "lucide-react"
import { BookingSkeleton } from "./StatusBadge"
import StatusBadge from "../Dashboard/StatusBadge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [isLoading, _setIsLoading] = useState(false)

  const MOCK_BOOKINGS: BookingT[] = [
    {
      id: "BK-101",
      customerName: "Aarav Mehta",
      carName: "Maruti Swift",
      startDate: "2024-03-25",
      endDate: "2024-03-28",
      totalPrice: 4500,
      status: "Pending",
      customerPhone: "+91 98765 43210",
    },
    {
      id: "BK-102",
      customerName: "Ishani Rai",
      carName: "Mahindra Thar",
      startDate: "2024-03-20",
      endDate: "2024-03-22",
      totalPrice: 9000,
      status: "Confirmed",
      customerPhone: "+91 88776 55443",
    },
    {
      id: "BK-103",
      customerName: "Kabir Khan",
      carName: "Toyota Innova",
      startDate: "2024-03-15",
      endDate: "2024-03-18",
      totalPrice: 10500,
      status: "Completed",
      customerPhone: "+91 77665 44332",
    },
  ]

  const filteredBookings = MOCK_BOOKINGS.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.carName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "All" || b.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Bookings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your customer reservations and requests
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customer or car..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:w-64 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[180px]">
            <Select
              value={filterStatus}
              onValueChange={(val) => setFilterStatus(val)}
            >
              <SelectTrigger className="w-full border-gray-200 bg-white font-medium dark:border-gray-800 dark:bg-gray-900">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {isLoading ? (
          <div className="p-8">
            <BookingSkeleton />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold tracking-widest text-gray-500 uppercase dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Car Details</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Total Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {booking.customerName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.customerPhone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        <CarFront size={16} className="text-gray-400" />
                        {booking.carName}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                        <Calendar size={14} />
                        {booking.startDate} → {booking.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-gray-900 dark:text-white">
                      ₹{booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        {booking.status === "Pending" && (
                          <>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-all hover:bg-green-600 hover:text-white dark:bg-green-900/20"
                              title="Accept"
                            >
                              <Check size={16} strokeWidth={3} />
                            </button>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all hover:bg-red-600 hover:text-white dark:bg-red-900/20"
                              title="Reject"
                            >
                              <X size={16} strokeWidth={3} />
                            </button>
                          </>
                        )}
                        {booking.status === "Confirmed" && (
                          <button className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white transition-all hover:bg-blue-700">
                            Complete
                          </button>
                        )}
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
              <Calendar className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No bookings found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        <footer className="flex items-center justify-between border-t border-gray-100 p-4 dark:border-gray-800">
          <p className="text-xs font-medium text-gray-500">
            Showing {filteredBookings.length} results
          </p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-bold text-gray-600 disabled:opacity-50 dark:border-gray-800 dark:text-gray-400">
              Previous
            </button>
            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-bold text-gray-600 dark:border-gray-800 dark:text-gray-400">
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Bookings
