import {
  Car,
  Calendar,
  IndianRupee,
  Clock,
  Plus,
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router"
import { useFirebaseAuth } from "@/services/auth"
import { StatCard } from "./StatCard"
import StatusBadge from "./StatusBadge"
import { CarCard } from "./CarCard"
import EmptyState from "./EmptyState"

// ---------- DUMMY DATA ----------
const stats = [
  {
    title: "Total Cars",
    value: 24,
    icon: Car,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    trend: "+2 added this month",
  },
  {
    title: "Active Bookings",
    value: 12,
    icon: Calendar,
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    trend: "8 returning today",
  },
  {
    title: "Total Earnings",
    value: "₹1,24,000",
    icon: IndianRupee,
    color:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    trend: "+14% from last week",
  },
  {
    title: "Pending Requests",
    value: 4,
    icon: Clock,
    color:
      "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    trend: "Requires your attention",
  },
]

const bookings = [
  {
    id: 1,
    name: "Rahul Sharma",
    car: "Maruti Swift (Yellow Plate)",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Aditi Rao",
    car: "Mahindra XUV700",
    status: "Pending",
  },
  {
    id: 3,
    name: "Vikram Singh",
    car: "Toyota Innova Hycross",
    status: "Completed",
  },
]

const cars = [
  {
    id: 1,
    name: "Maruti Swift",
    price: 1500,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Toyota Innova",
    price: 3500,
    status: "Booked",
    image:
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Mahindra Thar",
    price: 4500,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1660636752003-9118c7f29b46?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Honda City",
    price: 2500,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1594051664219-063a51609105?auto=format&fit=crop&q=80&w=600",
  },
]

const Dashboard = () => {
  const { user } = useFirebaseAuth()

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-4 transition-colors duration-300 md:p-8">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome back, {user?.businessName || "Partner"} 👋
          </h1>
          <p className="mt-1 font-medium text-gray-500 dark:text-gray-400">
            Here’s what’s happening with your fleet today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/cars/add"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            Add New Car
          </Link>
          <Link
            to="/bookings"
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            View Bookings
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Revenue Overview
            </h2>
            <select className="rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:text-gray-300">
              <option className="dark:bg-gray-900">Last 7 Days</option>
              <option className="dark:bg-gray-900">Last 30 Days</option>
            </select>
          </div>

          <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/30">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
              <IndianRupee size={24} className="text-blue-500" />
            </div>
            <p className="text-sm font-semibold text-gray-400">
              Revenue analytics will appear here
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
            Recent Bookings
          </h2>
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="group flex items-center justify-between rounded-xl border border-gray-50 bg-gray-50/50 p-4 transition-all hover:border-blue-100 hover:bg-blue-50/30 dark:border-gray-800 dark:bg-gray-950/30 dark:hover:border-blue-900/50"
              >
                <div className="overflow-hidden">
                  <p className="truncate font-bold text-gray-900 dark:text-white">
                    {b.name}
                  </p>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                    {b.car}
                  </p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
          <Link
            to="/bookings"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 transition-all hover:gap-3 dark:text-blue-400"
          >
            Manage All Bookings <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Fleet
          </h2>
          <Link
            to="/cars"
            className="group flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400"
          >
            Explore All Cars
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  )
}

export default Dashboard
