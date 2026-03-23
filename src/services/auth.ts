import { firebaseAuthApi } from "@/firebase/firebaseAuthApi"
import { useQuery } from "@tanstack/react-query"

export const useFirebaseAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: firebaseAuthApi.getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  })

  return {
    user: data,
    isLoading,
    isAuthenticated: !!data && !isError,
  }
}
