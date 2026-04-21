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

  const [formData, setFormData] = React.useState(initialState)
  const [imgError, setImgError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.image) {
      toast.error("Required fields missing")
      return
    }

    try {
      setLoading(true)

      // await mutateAsync({
      //   ...formData,
      //   pricePerDay: Number(formData.pricePerDay),
      // })

      toast.success("Car added 🚗")
      onOpenChange(false)
      setFormData(initialState)
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
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
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.image || imgError || loading}
              className="min-w-[140px] bg-blue-600 shadow-md shadow-blue-600/20 hover:bg-blue-700"
            >
              {loading ? "Processing..." : "List Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
