import type { AxiosRequestConfig } from "axios"
import { apiClient } from "./apiClient"

type ApiRequest<TBody = any, TParams = any> = {
  endpoint: string
  params?: TParams
  body?: TBody
  headers?: Record<string, string>
  responseType?: "json" | "blob"
}

const request = async <TResponse = any>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  { endpoint, params, body, headers, responseType = "json" }: ApiRequest
): Promise<TResponse> => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    params,
    data: body,
    headers,
    responseType,
  }

  try {
    const res = await apiClient(config)
    return res.data
  } catch (error: any) {
    throw (
      error || {
        message: "Something went wrong",
      }
    )
  }
}

export const api = {
  get: <T>(req: ApiRequest) => request<T>("GET", req),
  post: <T>(req: ApiRequest) => request<T>("POST", req),
  put: <T>(req: ApiRequest) => request<T>("PUT", req),
  delete: <T>(req: ApiRequest) => request<T>("DELETE", req),
  patch: <T>(req: ApiRequest) => request<T>("PATCH", req),
}
