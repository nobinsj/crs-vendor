import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { CarT } from "./type";

export const ViewCar = ({ open, handleCloseModal, car }: {open:boolean; handleCloseModal:any;car:CarT}) => {
  if (!car) return null

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{car.carName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <img
            src={car.carImage}
            className="h-52 w-full rounded-xl object-cover"
          />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <b>Brand:</b> {car.manufacturer}
            </div>
            <div>
              <b>Price:</b> ₹{car.ratePerHour}
            </div>
            <div>
              <b>Fuel:</b> {car.fuelType}
            </div>
            <div>
              <b>Transmission:</b> {car.transmissionType}
            </div>
            <div>
              <b>Status:</b> {car.status}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
