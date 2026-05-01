import { useMe } from "@/hooks/useMe"

export const useAuth = () => {
  const { data: user, isLoading, isError } = useMe()

  return {
    user: user ?? null,
    isAuthenticated: !!user && !isError,
    isLoading,
  }
}