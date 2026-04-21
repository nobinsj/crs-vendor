import { logout } from "@/redux/Auth/slice"
import store from "@/redux/store"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends httpOnly cookies automatically
  headers: { "Content-Type": "application/json" },
})

// Request interceptor — attach CSRF token if your backend needs it
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1]
  if (csrfToken) config.headers["X-CSRFToken"] = csrfToken
  return config
})

// Response interceptor — handle 401/403 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout()) // clears Redux state
      window.location.href = "/login"
    }
    return Promise.reject(error.response?.data ?? error)
  }
)

export default axiosInstance
