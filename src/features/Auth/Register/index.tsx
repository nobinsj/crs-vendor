import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type Step = 1 | 2

const Register = () => {
  const [step, setStep] = useState<Step>(1)
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(0)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    name: "",
    businessName: "",
    phone: "",
  })

  // Timer for resend OTP
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
    setError("")
  }

  const validateStep1 = () => {
    if (!form.email) return "Email is required"
    if (!form.password) return "Password is required"
    if (form.password.length < 6) return "Password must be at least 6 chars"
    if (form.password !== form.confirmPassword) return "Passwords do not match"
    return ""
  }

  const sendOtp = async () => {
    const err = validateStep1()
    if (err) return setError(err)

    try {
      setLoading(true)

      // 🔗 API call
      console.log("Sending OTP to", form.email)

      setOtpSent(true)
      setTimer(30)
    } catch (err) {
      setError("Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!form.otp) return setError("Enter OTP")

    try {
      setLoading(true)

      // 🔗 API call
      console.log("Verifying OTP", form.otp)

      setStep(2)
    } catch (err) {
      setError("Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!form.name || !form.businessName) {
      return setError("Fill all required fields")
    }

    try {
      setLoading(true)

      // 🔗 API call
      console.log("Register Vendor", form)

      alert("Registered successfully")
    } catch (err) {
      setError("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-lg dark:shadow-black/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 1 ? "Create Account" : "Business Details"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* ERROR */}
          {error && (
            <p className="mb-3 text-center text-sm text-red-500">{error}</p>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>

              <div>
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="mb-2">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {!otpSent ? (
                <Button onClick={sendOtp} disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              ) : (
                <>
                  <div>
                    <Label htmlFor="otp" className="mb-2">
                      OTP
                    </Label>
                    <Input
                      id="otp"
                      placeholder="Enter OTP"
                      value={form.otp}
                      onChange={handleChange}
                    />
                  </div>

                  <Button onClick={verifyOtp} disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>

                  <div className="flex justify-between text-sm">
                    <button
                      disabled={timer > 0}
                      onClick={sendOtp}
                      className="text-blue-500 disabled:opacity-50"
                    >
                      {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                    </button>

                    <button
                      onClick={() => {
                        setOtpSent(false)
                        setTimer(0)
                      }}
                      className="text-gray-500"
                    >
                      Change Email
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="name" className="mb-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="businessName" className="mb-2">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Company name"
                  value={form.businessName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <Button onClick={handleRegister} disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          )}

          {/* LOGIN LINK */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
