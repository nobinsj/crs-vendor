import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CarFront, Filter, Plus, Search, RefreshCcw } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

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
import type { CarMaster } from "./type"
import axiosInstance from "@/lib/axios"
import { toast } from "react-toastify"

const Cars = () => {
  const { user } = useAuth() // Extract userId from your custom hook
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState<CarMaster | null>(null)

  const fetchVendorCars = async (vendorId: string): Promise<CarMaster[]> => {
    const { data } = await axiosInstance.get(
      `/v1/vendor/web/cars/all-cars/${vendorId}`
    )
    return data
  }

  const {
    data: cars = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["vendorCars", user?.id],
    queryFn: () => fetchVendorCars(user!.id),
    enabled: !!user?.id,
  })

  const deleteCarMutation = useMutation({
    mutationFn: (carId: string) =>
      axiosInstance.delete(`/v1/vendor/web/cars/delete-car/${carId}`),

    onSuccess: (res: any) => {
      toast.success(res?.message || "Car deleted successfully")

      // 🔥 Refresh car list
      queryClient.invalidateQueries({
        queryKey: ["vendorCars"],
      })
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Delete failed")
    },
  })

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false)
    setIsViewModalOpen(false)
    setSelectedCar(null)
  }

  const handleEditClick = (car: CarMaster) => {
    setSelectedCar(car)
    setIsUpdateModalOpen(true)
  }

  const handleViewCar = (car: CarMaster) => {
    setSelectedCar(car)
    setIsViewModalOpen(true)
  }

  // --- Filter Logic ---
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.carName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      statusFilter === "All" ||
      (statusFilter === "available" && car.isActive === true) ||
      (statusFilter === "maintenance" && car.isActive === false)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4">
      {/* HEADER */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Cars</h1>
          <p className="text-gray-500">Manage and monitor your fleet</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            className={isFetching ? "animate-spin" : ""}
          >
            <RefreshCcw size={18} />
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add New Car
          </Button>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center dark:border-gray-800 dark:bg-slate-950">
        <div className="relative max-w-md flex-1">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search by car name or brand..."
            className="h-11 w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-1.5 md:flex dark:border-gray-800 dark:bg-slate-900/50">
            <Filter size={16} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500 uppercase">
              Filter
            </span>
          </div>

          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val)}
          >
            <SelectTrigger className="h-11 w-[160px] rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="available">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                  Available
                </div>
              </SelectItem>
              <SelectItem value="maintenance">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />{" "}
                  Maintenance
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CONTENT AREA */}
      {isLoading ? (
        <CarsSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-red-50 p-4 text-red-500">
            <CarFront size={40} />
          </div>
          <h3 className="text-lg font-semibold text-red-600">
            Failed to connect to server
          </h3>
          <p className="text-gray-500">
            Check your internet connection or backend status.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Retry Connection
          </Button>
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={() => handleEditClick(car)}
              onView={() => handleViewCar(car)}
              onDelete={deleteCarMutation.mutate}
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

      {/* MODALS */}
      <CreateCar open={isModalOpen} onOpenChange={setIsModalOpen} />

      {selectedCar && (
        <>
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
        </>
      )}
    </div>
  )
}

export default Cars
