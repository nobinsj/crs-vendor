// src/lib/apiClient.ts

import axios, { AxiosError, type AxiosRequestConfig } from "axios"

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true, // 🔥 required for HttpOnly cookies
})

// 🔄 Refresh handling
let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
}[] = []

const processQueue = (error: any) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error)
    else p.resolve(null)
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    const status = error.response?.status
    const url = originalRequest?.url || ""

    // 🚫 Skip interceptor logic for auth endpoints
    const isAuthRoute =
      url.includes("/auth/me") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/login") ||
      url.includes("web/user-register-otp") ||
      url.includes("web/verify-otp") 

    // 🚫 If no response (network error)
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
      })
    }

    // 🔁 Handle 401 (Access token expired) for normal API calls
    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        // Queue requests while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 🔥 Call refresh endpoint (cookie sent automatically)
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        )

        processQueue(null)

        // 🔁 Retry original request
        return apiClient(originalRequest)
      } catch (refreshError: any) {
        processQueue(refreshError)

        // ❗ Don't redirect immediately (let UI handle it)
        return Promise.reject(
          refreshError.response?.data || {
            message: "Session expired. Please login again.",
            status: 401,
          }
        )
      } finally {
        isRefreshing = false
      }
    }

    // 🚫 Forbidden (no permission)
    if (status === 403) {
      return Promise.reject({
        message: "You do not have permission to perform this action.",
        status: 403,
      })
    }

    // ❗ Default error handling
    return Promise.reject(
      error.response?.data || {
        message: "Something went wrong",
        status,
      }
    )
  }
)
