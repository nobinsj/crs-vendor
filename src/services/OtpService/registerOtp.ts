import { api } from "../axios/api"
import type { VerifyOTPDataT } from "./model"

export const verifyOtpApi = (data: VerifyOTPDataT) => {
  return api.post({
    endpoint: "v1/web/verify-otp",
    body: data,
  })
}
