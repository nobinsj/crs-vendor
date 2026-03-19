import Login from "@/features/Auth/Login"
import Register from "@/features/Auth/Register"
import { createBrowserRouter } from "react-router"

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
])
