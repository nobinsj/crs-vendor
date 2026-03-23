import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router"
import { applyActionCode, sendEmailVerification, signOut } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

const ActivateAccount = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  )

  const [resending, setResending] = useState(false)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get("oobCode")

        if (!oobCode) {
          setStatus("error")
          return
        }

        await applyActionCode(auth, oobCode)

        setStatus("success")
        toast.success("Email verified successfully")
      } catch (err: any) {
        console.error(err)
        setStatus("error")
        toast.error("Invalid or expired verification link")
      }
    }

    verifyEmail()
  }, [searchParams])

  const handleResend = async () => {
    const user = auth.currentUser

    if (!user) {
      toast.error("Please login to resend verification email")
      navigate("/login")
      return
    }

    try {
      setResending(true)

      await sendEmailVerification(user, {
        url: "http://localhost:5173/activate-account",
        handleCodeInApp: true,
      })

      toast.success("Verification email resent successfully 📩")
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Failed to resend email")
    } finally {
      setResending(false)
    }
  }

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardContent className="space-y-6 p-6 text-center">
          {status === "loading" && (
            <>
              <h2 className="text-xl font-semibold">Verifying your email...</h2>
              <p className="text-sm text-gray-500">
                Please wait while we activate your account.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <h2 className="text-2xl font-bold text-green-600">
                Email Verified 🎉
              </h2>

              <p className="text-sm text-gray-600">
                Your email has been successfully verified. You can now log in
                and start using the platform.
              </p>

              <Button className="w-full" onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <h2 className="text-2xl font-bold text-red-500">
                Verification Failed ❌
              </h2>

              <p className="text-sm text-gray-600">
                The verification link is invalid or has expired.
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleResend}
                  disabled={resending}
                >
                  {resending ? "Resending..." : "Resend Email"}
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ActivateAccount
