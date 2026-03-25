// hooks/useCars.ts

import type { CarT } from "@/features/Cars/type"
import {
  createCar,
  deleteCar,
  getVendorCars,
  updateCar,
} from "@/firebase/carService"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// ---------- GET ----------
export const useCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: getVendorCars,
  })
}

// ---------- CREATE ----------
export const useCreateCar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    },
  })
}

// ---------- DELETE ----------
export const useDeleteCar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    },
  })
}

// ---------- UPDATE ----------
export const useUpdateCar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CarT> }) =>
      updateCar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] })
    },
  })
}
