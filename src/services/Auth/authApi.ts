import { api } from "../axios/api"

export const authApi = {
  getMe: () => api.get({ endpoint: "/auth/me" }),

  login: (data: any) =>
    api.post({
      endpoint: "/auth/login",
      body: data,
    }),

  registerOtp: (data: any) =>
    api.post({ endpoint: "v1/web/user-register-otp", body: data }),

  verifyRegisterOtp: (data: any) =>
    api.post({ endpoint: "v1/web/user-register-otp", body: data }),

  logout: () => api.post({ endpoint: "/auth/logout" }),
}
