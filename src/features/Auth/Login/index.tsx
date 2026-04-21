import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios"

const Login = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
    setErrors({ ...errors, [e.target.id]: "" })
  }

  const validate = () => {
    const newErrors = { email: "", password: "" }

    if (!form.email) newErrors.email = "Email is required"
    if (!form.password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.values(newErrors).every((e) => !e)
  }

  const loginMutation = useMutation({
    mutationFn: (data: any) => axiosInstance.post("/v1/auth/vendor-login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      navigate("/")
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Login failed")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    loginMutation.mutate({ emailId: form.email, password: form.password })
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-2 dark:bg-black">
      <Card className="w-full max-w-sm shadow-lg dark:bg-gray-900">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <Label className="mb-2 text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <Label className="mb-2 text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              No account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
