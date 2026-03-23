// components/ProtectedRoute.tsx
import { useFirebaseAuth } from "@/services/auth"
import type { ReactNode } from "react"
import { Navigate } from "react-router"

interface ProtectedRouteProps {
  children: ReactNode
  requireEmailVerified?: boolean
}

const ProtectedRoute = ({
  children,
  requireEmailVerified = true,
}: ProtectedRouteProps) => {
  const { user, isLoading, isAuthenticated } = useFirebaseAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireEmailVerified && user && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
