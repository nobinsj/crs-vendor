import { createBrowserRouter } from "react-router"
import ProtectedRoute from "./ProtectedRoute"
import Login from "@/features/Auth/Login"
import LoginRoute from "./LoginRoute"
import Register from "@/features/Auth/Register"
import VerifyEmailRoute from "./VerifyEmailRoute"
import VerifyEmail from "@/features/Auth/VerifyEmail"
import ActivateAccount from "@/features/Auth/AcivateAccount"
import Layout from "@/container/Layout"
import { lazy, Suspense } from "react"
import Loader from "@/components/Loader"

const Dashboard = lazy(() => import("@/features/Dashboard"))
const Bookings = lazy(() => import("@/features/Bookings"))
const Cars = lazy(() => import("@/features/Cars"))
const Earnings = lazy(() => import("@/features/Earnings"))
const Profile = lazy(() => import("@/features/Profile"))
const Settings = lazy(() => import("@/features/Settings"))

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
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/bookings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Bookings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cars",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Cars />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/earnings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Earnings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Settings />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
])
