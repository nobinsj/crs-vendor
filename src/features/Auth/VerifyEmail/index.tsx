import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { sendEmailVerification, signOut } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

const VerifyEmail = () => {
  const navigate = useNavigate()
  const [vendorName, setVendorName] = useState<string>("")
  const [resending, setResending] = useState(false)

  useEffect(() => {
    const user = auth.currentUser

    if (user) {
      setVendorName(user?.displayName || "")
    } else {
      navigate("/login", { replace: true })
    }
  }, [navigate])

  const handleResend = async () => {
    if (!auth.currentUser) return

    try {
      setResending(true)
      await sendEmailVerification(auth.currentUser, {
        url: "http://localhost:5173/activate-account",
        handleCodeInApp: true,
      })
      toast.success(
        "Verification email resent! Check your inbox or spam folder."
      )
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Failed to resend email")
    } finally {
      setResending(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardContent className="space-y-6 p-6 text-center">
          <h2 className="text-2xl font-bold">
            {vendorName ? `Hello, ${vendorName}` : "Welcome!"}
          </h2>

          <p className="text-sm text-gray-600">
            Registration successful! A verification email has been sent to your
            inbox. Please verify your email to continue.
          </p>

          <div className="mt-4 flex justify-between gap-2">
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={resending}
              className="flex-1"
            >
              {resending ? "Resending..." : "Resend Email"}
            </Button>

            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail
