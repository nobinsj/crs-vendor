import type { ReactNode } from "react"
import { Navigate } from "react-router"

interface VerifyEmailRouteProps {
  children: ReactNode
}

const VerifyEmailRoute = ({ children }: VerifyEmailRouteProps) => {
//   const { user, isLoading, isAuthenticated } = useFirebaseAuth()

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center text-gray-600">
//         Checking authentication...
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (user && user.emailVerified) {
//     return <Navigate to="/" replace />
//   }

  return <>{children}</>
}

export default VerifyEmailRoute
