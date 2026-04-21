import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { userRegistration } from "@/firebase/AuthUserService"

const Register = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    phone: "",
    addressState: "",
    addressDistrict: "",
    addressPlace: "",
  })
  const [loading, setLoading] = useState(false)
  const registrationFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
      minLength: 3,
    },
    {
      name: "email",
      label: "Email ID",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      required: true,
      minLength: 6,
    },
    {
      name: "confirmPassword",
      label: "Re-type Password",
      type: "password",
      placeholder: "Confirm password",
      required: true,
      match: "password",
    },
    {
      name: "businessName",
      label: "Business Name",
      type: "text",
      placeholder: "Enter business name",
      required: true,
      minLength: 2,
    },
    {
      name: "phone",
      label: "Mobile No",
      type: "tel",
      placeholder: "Enter 10-digit mobile number",
      required: true,
    },
    {
      name: "addressState",
      label: "State",
      type: "text",
      placeholder: "Enter state",
      required: true,
    },
    {
      name: "addressDistrict",
      label: "District",
      type: "text",
      placeholder: "Enter district",
      required: true,
    },
    {
      name: "addressPlace",
      label: "Place",
      type: "text",
      placeholder: "Enter place",
      required: true,
    },
  ]

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^[6-9]\d{9}$/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    let updatedValue = value

    if (id === "phone") {
      updatedValue = value.replace(/\D/g, "")
    }

    setForm({ ...form, [id]: updatedValue })

    if (id === "email") {
      if (updatedValue && !emailRegex.test(updatedValue)) {
        setErrors((prev) => ({
          ...prev,
          email: "Enter a valid email address",
        }))
        return
      }
    }

    if (id === "phone") {
      if (updatedValue && !phoneRegex.test(updatedValue)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Enter valid 10-digit mobile number",
        }))
        return
      }
    }

    if (id === "confirmPassword") {
      if (updatedValue !== form.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }))
        return
      }
    }

    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    registrationFields.forEach((field: any) => {
      const value = (form as any)[field.name]

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`
        return
      }

      if (field.minLength && value.length < field.minLength) {
        newErrors[field.name] =
          `${field.label} must be at least ${field.minLength} characters`
        return
      }

      if (field.name === "email" && !emailRegex.test(value)) {
        newErrors.email = "Enter a valid email address"
        return
      }

      if (field.name === "phone" && !phoneRegex.test(value)) {
        newErrors.phone = "Enter valid 10-digit mobile number"
        return
      }

      if (field.match && value !== (form as any)[field.match]) {
        newErrors[field.name] = "Passwords do not match"
      }
    })

    return newErrors
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    try {
      setLoading(true)
      await userRegistration(
        form,
        () => setLoading(false),
        () => navigate("/verify-email")
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-2 dark:bg-black">
      <Card className="w-full max-w-4xl shadow-lg dark:bg-gray-900">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 gap-x-12 gap-y-4 p-4 sm:grid-cols-2"
          >
            {registrationFields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <Label htmlFor={field.name}>{field.label}</Label>

                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(form as any)[field.name]}
                  onChange={handleChange}
                  inputMode={field.name === "phone" ? "numeric" : undefined}
                  className={`w-full pr-10 ${
                    errors[field.name]
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />

                {errors[field.name] && (
                  <p className="text-xs text-red-500">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Bottom Section */}
            <div className="col-span-1 mt-4 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>

              <div className="flex gap-3">
                <Button type="submit" className="w-[120px]" loading={loading}>
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
