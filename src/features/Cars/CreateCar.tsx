import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { CarForm } from "./CarForm"
import * as React from "react"
import type { CarFormData } from "./type"
import { Car } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"
import { API_ENDPOINTS } from "@/services/endpoints"
import { useAuth } from "@/hooks/useAuth"

const initialState: CarFormData = {
  name: "",
  brand: "",
  pricePerDay: "",
  fuelType: "Petrol",
  transmission: "Automatic",
  status: "available",
  image: "",
}

export const CreateCar = ({ open, onOpenChange }: any) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [formData, setFormData] = React.useState(initialState)
  const [imgError, setImgError] = React.useState(false)

  const addCarMutation = useMutation({
    mutationFn: (data: any) => axiosInstance.post(API_ENDPOINTS.ADD_CAR, data),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Success")
      onOpenChange(false)
      setFormData(initialState)
      queryClient.invalidateQueries({ queryKey: ["vendorCars"] })
    },
    onError: (err: any) => {
      toast.error(err?.message || "Register Error")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.image) {
      toast.error("Required fields missing")
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
    addCarMutation.mutate(carData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl min-w-xl overflow-hidden rounded-2xl border-none p-0 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-2 text-blue-600">
              <Car size={20} className="fill-blue-600/10" />
              <DialogTitle className="text-xl font-bold">Add Car</DialogTitle>
            </div>
          </DialogHeader>
          <CarForm {...{ formData, setFormData, imgError, setImgError }} />

          <DialogFooter className="border-t bg-gray-50/50 px-6 py-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={addCarMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.image || imgError || addCarMutation.isPending}
              className="min-w-[140px] bg-blue-600 shadow-md shadow-blue-600/20 hover:bg-blue-700"
            >
              {addCarMutation.isPending ? "Processing..." : "List Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
