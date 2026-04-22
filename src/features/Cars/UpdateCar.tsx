import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CarForm } from "./CarForm"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { toast } from "react-toastify"
import type { CarFormData, CarT } from "./type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"

interface UpdateCarProps {
  open: boolean
  handleCloseModal: () => void
  car: (CarT & { id: string }) | null
}

const initialState: CarFormData = {
  name: "",
  brand: "",
  pricePerDay: "",
  fuelType: "Petrol",
  transmission: "Automatic",
  status: "available",
  image: "",
}

export const UpdateCar = ({ open, handleCloseModal, car }: UpdateCarProps) => {
  // State for form and UI
  const { user } = useAuth()

  const queryClient = useQueryClient()

  const [formData, setFormData] = React.useState(initialState)
  const [imgError, setImgError] = React.useState(false)

  // Sync state when "car" prop changes (Crucial for editing different cars)
  React.useEffect(() => {
    if (car) {
      setFormData({
        name: car.carName,
        brand: car.manufacturer,
        pricePerDay: car.ratePerHour,
        fuelType: car.fuelType,
        transmission: car.transmissionType,
        status: car.status,
        image: car.carImage,
      })
      setImgError(false)
    }
  }, [car])

  const updateCarMutation = useMutation({
    mutationFn: (data: any) =>
      axiosInstance.put(`/v1/vendor/web/cars/update-car/${car?.id}`, data),

    onSuccess: () => {
      toast.success("Car updated successfully")
      queryClient.invalidateQueries({ queryKey: ["vendorCars"] })
      handleCloseModal()
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Update failed")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!car || !formData) return
    // Basic Validation
    if (!formData.name || !formData.image) {
      toast.error("Please fill in all required fields")
      return
    }

    const carData = {
      carName: formData.name,
      manufacturer: formData.brand,
      ratePerHour: formData.pricePerDay,
      fuelType: formData.fuelType,
      transmissionType: formData.transmission,
      carImage: formData.image,
      vendorId: user.id,
      vendorName: user.fullName,
    }
    updateCarMutation.mutate(carData)
  }

  // Prevent rendering if no car data is provided yet
  if (!formData) return null

  return (
    <Dialog
      open={open}
      onOpenChange={() => !updateCarMutation.isPending && handleCloseModal()}
    >
      <DialogContent className="max-w-2xl min-w-xl overflow-hidden rounded-2xl border-none p-0 shadow-2xl dark:bg-slate-950">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-2 text-blue-600">
              <Car size={20} className="fill-blue-600/10" />
              <DialogTitle className="text-xl font-bold">
                Edit Vehicle Details
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Reusable Form Component */}
          <div className="p-6">
            <CarForm {...{ formData, setFormData, imgError, setImgError }} />
          </div>

          <DialogFooter className="border-t bg-gray-50/50 px-6 py-6 dark:bg-slate-900/50">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCloseModal}
              disabled={updateCarMutation.isPending}
              className="h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !formData.image || imgError || updateCarMutation.isPending
              }
              className="h-11 min-w-[160px] bg-blue-600 font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50"
            >
              {updateCarMutation.isPending
                ? "Saving Changes..."
                : "Update Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
