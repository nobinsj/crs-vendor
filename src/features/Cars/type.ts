export type CarStatus = "available" | "maintenance" | "booked"

export type CarT = {
  id?: string
  name: string
  brand: string
  pricePerDay: number
  fuelType: string
  transmission: string
  status: CarStatus
  image: string
  vendorId: string
  createdAt?: any
}

export type CarFormData = {
  name: string
  brand: string
  pricePerDay: string
  fuelType: string
  transmission: string
  status: "available" | "maintenance"
  image: string
}