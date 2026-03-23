import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "./firebase"

export const firebaseAuthApi = {
  getCurrentUser: (): Promise<User | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        resolve(user)
        unsubscribe()
      })
    })
  },
}
