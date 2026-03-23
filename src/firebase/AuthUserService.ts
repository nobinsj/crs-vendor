import type { RegisterFormData } from "@/features/Auth/Register/types"
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, setDoc } from "firebase/firestore"
import { DB_COLLECTIONS } from "@/helpers/constants"
import { toast } from "react-toastify"

export const userRegistration = async (
  data: RegisterFormData,
  loader: () => void,
  onSuccess: () => void
): Promise<void> => {
  const { email, password, ...userDetails } = data

  let user: any = null

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    user = userCredential.user
    await user.getIdToken()
    await sendEmailVerification(user, {
      url: "http://localhost:5173/activate-account",
      handleCodeInApp: true,
    })
    await updateProfile(user, { displayName: userDetails.name })
    await setDoc(doc(db, DB_COLLECTIONS.VENDORS, user.uid), {
      uid: user.uid,
      email,
      ...userDetails,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    onSuccess()
  } catch (error: any) {
    if (user) {
      try {
        await deleteUser(user)
      } catch (rollbackError) {
        toast.error("Rollback failed")
      }
    }

    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("Email already registered")
        break
      case "auth/invalid-email":
        toast.error("Invalid email")
        break
      case "auth/weak-password":
        toast.error("Password must be at least 6 characters")
        break
      case "auth/network-request-failed":
        toast.error("Network error")
        break
      default:
        toast.error(error.message)
    }

    throw error
  } finally {
    loader()
  }
}
