import { useAuth } from "@/hooks/useAuth"
import { BadgeCheck } from "lucide-react"

const Header = () => {
  const { isLoading, user } = useAuth()

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 transition-colors dark:border-gray-800 dark:bg-gray-900">
      <div>
        <h2 className="text-lg leading-tight font-bold text-gray-800 dark:text-white">
          Vendor Portal
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Manage your fleet and earnings
        </p>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? (
          <div className="flex animate-pulse items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="mb-1 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="ml-auto h-3 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        ) : (
          <>
            <div className="hidden text-right sm:block">
              <div className="flex items-center justify-end gap-1">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                  {user?.fullName || "New Vendor"}
                </p>
                {user?.isVerified !== false && (
                  <BadgeCheck
                    size={16}
                    className="fill-blue-500/10 text-green-500"
                  />
                )}
              </div>
              <p className="mr-5 text-xs font-medium text-gray-500 dark:text-gray-400">
                @{user?.businessName || "vendor"}
              </p>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
