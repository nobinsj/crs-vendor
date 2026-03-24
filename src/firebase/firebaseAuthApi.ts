import { onAuthStateChanged, type User } from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"
import { DB_COLLECTIONS } from "@/helpers/constants"

export const firebaseAuthApi = {
  getCurrentUser: (): Promise<User | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        resolve(user)
        unsubscribe()
      })
    })
  },
  getVendorProfile: async (uid: any) => {
    if (!uid) return null
    const docRef = doc(db, DB_COLLECTIONS.VENDORS, uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { uid, ...docSnap.data() }
    } else {
      throw new Error("Vendor profile not found")
    }
  },
}
