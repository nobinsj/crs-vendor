export type CarStatus = "available" | "maintenance" | "booked"

export type CarT = {
  id: string
  carName: string
  manufacturer: string
  ratePerHour: string
  fuelType: string
  transmissionType: string
  carImage: string
  vendorId: string
  isActive: boolean
  createdAt: string
  status: CarStatus
}

export type CarFormData = {
  name: string
  brand: string
  pricePerDay: string
  fuelType: string
  transmission: string
  status: CarStatus
  image: string
}

export interface CarMaster {
  id: string
  carName: string
  manufacturer: string
  ratePerHour: string
  fuelType: string
  transmissionType: string
  carImage: string
  vendorId: string
  isActive: boolean
  createdAt: string
  status: CarStatus
}
