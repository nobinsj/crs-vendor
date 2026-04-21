import axiosInstance from "@/lib/axios"
import { API_ENDPOINTS } from "./endpoints"

export const fetchUser = async (): Promise<any> => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER_ME)
  return response.data
}
