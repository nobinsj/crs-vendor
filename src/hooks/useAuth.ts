import { useMe } from "./useMe";

export const useAuth = () => {
  const { data, isLoading, isError } = useMe();

  return {
    user: data,
    isLoading,
    isAuthenticated: !!data && !isError,
  };
};