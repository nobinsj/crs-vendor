export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface BookingT {
  id: string;
  customerName: string;
  carName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  customerPhone: string;
}
