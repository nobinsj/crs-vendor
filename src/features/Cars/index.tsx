import { useState, useEffect } from "react"
import { Link } from "react-router"
import type { CarT } from "./type"
import { CarFront, Filter, Plus, Search } from "lucide-react"
import { CarsSkeleton } from "./StatusBadge"
import { CarCard } from "./CarCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MOCK_CARS: CarT[] = [
  {
    id: "CAR-001",
    name: "Maruti Swift",
    category: "Hatchback",
    pricePerDay: 1500,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
    fuelType: "Petrol",
    transmission: "Manual",
  },
  {
    id: "CAR-002",
    name: "Mahindra Thar",
    category: "SUV",
    pricePerDay: 4500,
    status: "Booked",
    image:
      "https://images.unsplash.com/photo-1660636752003-9118c7f29b46?auto=format&fit=crop&q=80&w=800",
    fuelType: "Diesel",
    transmission: "Manual",
  },
  {
    id: "CAR-003",
    name: "Toyota Innova Hycross",
    category: "MPV",
    pricePerDay: 3500,
    status: "Maintenance",
    image:
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800",
    fuelType: "Hybrid",
    transmission: "Automatic",
  },
]

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredCars = MOCK_CARS.filter((car) => {
    const matchesSearch = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === "All" || car.status === statusFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Cars
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and monitor your fleet performance
          </p>
        </div>

        <Link
          to="/cars/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          Add New Car
        </Link>
      </header>

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center dark:border-gray-800 dark:bg-gray-900">
        <div className="relative flex-1">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by car name..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Booked">Booked</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <CarsSkeleton />
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 py-20 dark:border-gray-800">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
            <CarFront size={40} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            No cars added yet
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            List your first vehicle to start earning.
          </p>
          <button className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white shadow-md hover:bg-blue-700">
            Add Your First Car
          </button>
        </div>
      )}

      {!loading && filteredCars.length > 0 && (
        <div className="flex justify-center pt-10">
          <button className="rounded-xl border border-gray-200 bg-white px-8 py-3 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            Load More Vehicles
          </button>
        </div>
      )}
    </div>
  )
}

export default Cars
