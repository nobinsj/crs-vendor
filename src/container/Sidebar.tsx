import { auth } from "@/firebase/firebase"
import axiosInstance from "@/lib/axios"
import { API_ENDPOINTS } from "@/services/endpoints"
import { useQueryClient } from "@tanstack/react-query"
import { signOut } from "firebase/auth"
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  Banknote,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react"
import { NavLink, useNavigate } from "react-router"
import { toast } from "react-toastify"

const Sidebar = () => {
  const navigate = useNavigate()
    const queryClient = useQueryClient()

  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Bookings", path: "/bookings", icon: <CalendarCheck size={20} /> },
    { name: "Cars", path: "/cars", icon: <Car size={20} /> },
    { name: "Earnings", path: "/earnings", icon: <Banknote size={20} /> },
    { name: "Profile", path: "/profile", icon: <UserCircle size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ]

  const activeLink =
    "flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
  const normalLink =
    "flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg transition-colors"

  const handleLogout = async () => {
    await axiosInstance.post(API_ENDPOINTS.LOGOUT)

    queryClient.setQueryData(["me"], null)
  }
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      {/* Brand Logo */}
      <div className="mb-10 flex items-center gap-3 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white">
          R
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
          Rentic
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {item.icon}
            <span className="text-sm font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Action */}
      <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
        <button
          className="flex w-full items-center gap-3 px-4 py-3 text-gray-500 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
