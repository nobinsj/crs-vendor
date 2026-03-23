import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "./Auth/authApi"

export const useLogin = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] })
    },
  })
}
