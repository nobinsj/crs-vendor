import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {}

export const Input: React.FC<InputProps> = ({ className, type, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type
  const showToggle = type === "password"

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "h-10 w-full rounded-lg border px-3 py-2 text-base transition-colors outline-none focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500",
          "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400",
          className
        )}
        {...props}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-700 dark:hover:text-gray-400"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  )
}
