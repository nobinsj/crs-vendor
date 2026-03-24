export type CarStatus = "Available" | "Booked" | "Maintenance";

export interface CarT {
  id: string;
  name: string;
  category: string; // e.g., Hatchback, SUV
  pricePerDay: number;
  status: CarStatus;
  image: string;
  fuelType: string;
  transmission: string;
}
