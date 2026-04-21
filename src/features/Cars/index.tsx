import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { CreateCar } from "./CreateCar"
import { Input } from "@/components/ui/input"
import { UpdateCar } from "./UpdateCar"
import { ViewCar } from "./ViewCar"

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState<any>(null)

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false)
    setIsViewModalOpen(false)
    setSelectedCar(null)
  }

  const handleEditClick = (car: any) => {
    setSelectedCar(car)
    setIsUpdateModalOpen(true)
  }
  const handleViewCar = (car: any) => {
    setSelectedCar(car)
    setIsViewModalOpen(true)
  }
  const cars: any = []
  let isLoading = false
  let isError = true
  // 🔍 Filter logic
  const filteredCars = cars.filter((car: any) => {
    const matchesSearch = car.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesFilter =
      statusFilter === "All" ||
      car.status?.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-4">
      {/* HEADER */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Cars</h1>
          <p className="text-gray-500">Manage and monitor your fleet</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add New Car
        </Button>
      </header>

      {/* FILTER BAR */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors md:flex-row md:items-center dark:border-gray-800 dark:bg-slate-950">
        {/* SEARCH SECTION */}
        <div className="relative max-w-md flex-1">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search by car name..."
            className="h-11 w-full rounded-xl border-gray-200 bg-transparent pl-10 text-sm ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-800 dark:bg-slate-900/50 dark:ring-offset-slate-950 dark:placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FILTER SECTION */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-1.5 dark:border-gray-800 dark:bg-slate-900/50">
            <Filter size={16} className="text-gray-400 dark:text-gray-500" />
            <span className="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Filter
            </span>
          </div>

          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val)}
          >
            <SelectTrigger className="h-11 w-[160px] rounded-xl border-gray-200 bg-white dark:border-gray-800 dark:bg-slate-950">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent className="rounded-xl dark:border-gray-800 dark:bg-slate-950">
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="available">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Available
                </div>
              </SelectItem>
              <SelectItem value="maintenance">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Maintenance
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* STATES */}
      {isLoading ? (
        <CarsSkeleton />
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load cars</div>
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCars.map((car: any) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={() => handleEditClick(car)}
              onView={() => handleViewCar(car)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed py-20">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
            <CarFront size={40} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold">No cars found</h3>
          <p className="mt-1 text-gray-500">
            Add your first vehicle to get started.
          </p>

          <Button className="mt-6" onClick={() => setIsModalOpen(true)}>
            Add Car
          </Button>
        </div>
      )}

      {/* MODAL */}
      <CreateCar open={isModalOpen} onOpenChange={setIsModalOpen} />
      <UpdateCar
        open={isUpdateModalOpen}
        handleCloseModal={handleCloseModal}
        car={selectedCar}
      />
      <ViewCar
        open={isViewModalOpen}
        handleCloseModal={handleCloseModal}
        car={selectedCar}
      />
    </div>
  )
}

export default Cars
