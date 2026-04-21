import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { auth, db } from "../firebase"
import { DB_COLLECTIONS } from "@/helpers/constants"
import type { CarT } from "@/features/Cars/type"

// ---------- CREATE ----------
export const createCar = async (data: Omit<CarT, "vendorId">) => {
  const user = auth.currentUser
  if (!user) throw new Error("Not authenticated")

  return await addDoc(collection(db, "cars"), {
    ...data,
    vendorId: user.uid,
    createdAt: serverTimestamp(),
  })
}

// ---------- GET VENDOR CARS ----------
export const getVendorCars = async (): Promise<CarT[]> => {
  const user = auth.currentUser
  if (!user) return []

  const q = query(
    collection(db, DB_COLLECTIONS.CARS),
    where("vendorId", "==", user.uid)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<CarT, "id">),
  }))
}

// ---------- DELETE ----------
export const deleteCar = async (id: string) => {
  return await deleteDoc(doc(db, "cars", id))
}

// ---------- UPDATE ----------
export const updateCar = async (id: string, data: Partial<CarT>) => {
  return await updateDoc(doc(db, "cars", id), data)
}
