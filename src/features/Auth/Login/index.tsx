import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-lg dark:shadow-black/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div>
              <Label
                htmlFor="username"
                className="text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-300"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button className="mt-2 w-full">Login</Button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              No account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
