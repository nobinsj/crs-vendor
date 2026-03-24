import type { VendorUser } from "@/container/type"
import { firebaseAuthApi } from "@/firebase/firebaseAuthApi"
import { useQuery } from "@tanstack/react-query"

export const useFirebaseAuth = () => {
  const { data: authUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: firebaseAuthApi.getCurrentUser,
    refetchOnWindowFocus: false,
  })

  const {
    data: vendorData,
    isLoading: isVendorLoading,
    isError,
  } = useQuery({
    queryKey: ["vendor-profile", authUser?.uid],
    queryFn: () => firebaseAuthApi.getVendorProfile(authUser?.uid),
    enabled: !!authUser?.uid,
    retry: false,
  })

  return {
    user: (vendorData
      ? { ...authUser, ...vendorData }
      : authUser) as VendorUser,
    isLoading: isAuthLoading || isVendorLoading,
    isAuthenticated: !!authUser && !isError,
  }
}
