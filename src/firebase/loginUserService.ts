import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"
import { toast } from "react-toastify"

export const userLogin = async (
  email: string,
  password: string,
  loader: () => void,
  onSuccess: () => void,
  notVerified: () => void
): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    const user = userCredential.user

    await user.reload()

    if (!user.emailVerified) {
      notVerified()
      return
    }

    toast.success("Login successful 🎉")
    onSuccess()
  } catch (error: any) {
    switch (error.code) {
      case "auth/user-not-found":
        toast.error("User not found")
        break
      case "auth/wrong-password":
        toast.error("Incorrect password")
        break
      case "auth/invalid-email":
        toast.error("Invalid email")
        break
      case "auth/invalid-credential":
        toast.error("Invalid credentials")
        break
      case "auth/network-request-failed":
        toast.error("Network error. Check your connection")
        break
      case "auth/too-many-requests":
        toast.error("Too many attempts. Try again later")
        break
      default:
        toast.error(error.message || "Login failed")
    }

    throw error
  } finally {
    loader()
  }
}
