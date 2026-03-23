import { createBrowserRouter } from "react-router"
import ProtectedRoute from "./ProtectedRoute"
import Login from "@/features/Auth/Login"
import LoginRoute from "./LoginRoute"
import Register from "@/features/Auth/Register"
import VerifyEmailRoute from "./VerifyEmailRoute"
import VerifyEmail from "@/features/Auth/VerifyEmail"
import ActivateAccount from "@/features/Auth/AcivateAccount"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <LoginRoute>
        <Login />
      </LoginRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <LoginRoute>
        <Register />
      </LoginRoute>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <VerifyEmailRoute>
        <VerifyEmail />
      </VerifyEmailRoute>
    ),
  },
  {
    path: "/activate-account",
    element: (
      <VerifyEmailRoute>
        <ActivateAccount />
      </VerifyEmailRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <div>Main</div>
      </ProtectedRoute>
    ),
  },
])
