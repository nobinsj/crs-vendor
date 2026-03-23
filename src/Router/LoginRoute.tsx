import { useFirebaseAuth } from "@/services/auth"
import { Navigate } from "react-router"

const LoginRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useFirebaseAuth()

  if (isLoading) {
    return <div>Checking auth...</div>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default LoginRoute
