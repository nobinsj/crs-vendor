import { useState, useRef, useEffect, useCallback } from "react"
import { useNavigate } from "react-router"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "react-toastify"
import axiosInstance from "@/lib/axios"
import { API_ENDPOINTS } from "@/services/endpoints"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(0)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const startTimer = useCallback((seconds: number) => {
    const expiryTime = Date.now() + seconds * 1000
    localStorage.setItem("otpExpiry", expiryTime.toString())
    setTimer(seconds)
  }, [])

  // Sync timer on mount
  useEffect(() => {
    const storedExpiry = localStorage.getItem("otpExpiry")
    if (storedExpiry) {
      const remaining = Math.round((Number(storedExpiry) - Date.now()) / 1000)
      if (remaining > 0) setTimer(remaining)
      else localStorage.removeItem("otpExpiry")
    }
  }, [])

  // Countdown Interval
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otpExpiry")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, "")
    if (!value && element.value !== "") return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (data.length > 0) {
      const newOtp = [...otp]
      data.split("").forEach((char, i) => (newOtp[i] = char))
      setOtp(newOtp)
      inputRefs.current[Math.min(data.length, 5)]?.focus()
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    // try {
    //   await resendOtp()
    //   startTimer(300) // Reset to 5m on success
    //   toast.success("A new code has been sent.")
    // } catch (error) {
    //   toast.error("Failed to resend. Please try again.")
    // } finally {
    //   setIsResending(false)
    // }
  }

  const otpVerifyMutation = useMutation({
    mutationFn: (data:any) => axiosInstance.post(API_ENDPOINTS.VERIFY_OTP, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      navigate("/")
    },
    onError: (err: any) => {
      toast.error(err?.message || "Register Error")
    },
  })

  const handleSendOtp = async () => {
    const userOtp = otp.join("")
    console.log(userOtp);
    
    otpVerifyMutation.mutate({userOtp})
  }

  const handleLogout = async () => {
    await axiosInstance.post(API_ENDPOINTS.LOGOUT)

    queryClient.setQueryData(["me"], null)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Verify your account
          </CardTitle>
          <CardDescription>
            {user?.email
              ? `Code sent to ${user.email}`
              : "Enter your verification code."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-12 w-12 text-center text-lg font-bold md:h-14 md:w-14"
              />
            ))}
          </div>
          <Button
            className="w-full"
            onClick={handleSendOtp}
            disabled={otpVerifyMutation.isPending || otp.includes("")}
          >
            {otpVerifyMutation.isPending ? "Verifying..." : "Verify Account"}
          </Button>
          <div className="text-center text-sm">
            {timer > 0 ? (
              <p className="text-muted-foreground">
                Resend code in{" "}
                <span className="font-mono font-bold text-primary">
                  {formatTime(timer)}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold text-primary hover:underline"
              >
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full text-muted-foreground hover:text-destructive"
          >
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail
