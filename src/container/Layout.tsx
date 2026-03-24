import { Outlet } from "react-router"
import Sidebar from "./Sidebar"
import Header from "./Header"

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-950">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
