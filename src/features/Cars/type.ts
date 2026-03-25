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
