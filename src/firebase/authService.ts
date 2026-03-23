import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "./firebase"
import { toast } from "react-toastify"

export const registerVendor = async (
  data: Record<string, string>,
  setLoading: () => void,
  navigate: () => void
): Promise<void> => {
  const { email, password, ...extraData } = data

  try {
    // 1. Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const user = userCredential.user

    // 2. Send email verification
    await sendEmailVerification(user, {
      url: "http://localhost:5173/verify-email",
      handleCodeInApp: true,
    })

    // 3. Save vendor data
    await setDoc(doc(db, "vendors", user.uid), {
      uid: user.uid,
      email,
      ...extraData,
      isVerified: false,
      createdAt: new Date(),
    })

    // 4. Logout user
    await signOut(auth)

  } catch (error: any) {

    let message = "Something went wrong"

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "Email already registered"
        break
      case "auth/invalid-email":
        message = "Invalid email"
        break
      case "auth/weak-password":
        message = "Password must be at least 6 characters"
        break
      case "auth/network-request-failed":
        message = "Network error"
        break
      default:
        message = error.message
    }
    toast.error(message)
    setLoading?.()
  } finally {
    setLoading?.()
  }
}

// 🔑 Login Vendor
export const loginVendor = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  const user = userCredential.user

  // ❗ Check email verification
  if (!user.emailVerified) {
    await signOut(auth)
    throw new Error("Please verify your email.")
  }

  // (Optional) Fetch vendor profile
  const vendorDoc = await getDoc(doc(db, "vendors", user.uid))

  return {
    user,
    vendor: vendorDoc.data(),
  }
}

export const activateAccount = async () => {
  const user = auth.currentUser

  if (!user) return alert("Login required")

  if (!user.emailVerified) {
    return alert("Please verify email first")
  }

  await updateDoc(doc(db, "vendors", user.uid), {
    isVerified: true,
  })

  alert("Account activated!")
}
