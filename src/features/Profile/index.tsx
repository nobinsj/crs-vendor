import React, { useState, useEffect } from "react"
import {
  User,
  Mail,
  Building2,
  Phone,
  MapPin,
  Map,
  Navigation,
  Camera,
  Save,
  Edit2,
  Lock,
  Loader2,
} from "lucide-react"
import { useFirebaseAuth } from "@/services/auth"
import { Input } from "@/components/ui/input"

export type RegisterFormData = {
  name: string
  email: string
  businessName: string
  phone: string
  addressState: string
  addressDistrict: string
  addressPlace: string
}

const ProfilePage = () => {
  const { user, isLoading } = useFirebaseAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    businessName: "",
    phone: "",
    addressState: "",
    addressDistrict: "",
    addressPlace: "",
  })

  // Sync state with user data from Firebase
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        businessName: user.businessName || "",
        phone: user.phone || "",
        addressState: user.addressState || "",
        addressDistrict: user.addressDistrict || "",
        addressPlace: user.addressPlace || "",
      })
    }
    // 👇 Only re-run if the email or UID changes, not the whole object
  }, [user?.email, user?.uid])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Logic for updating Firebase/Firestore would go here
      console.log("Updated Data:", formData)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and update your business details
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        )}
      </div>

      {/* OVERVIEW SECTION */}
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row dark:border-gray-800 dark:bg-gray-900">
        <div className="group relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-3xl font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {formData.name.charAt(0) || <User />}
          </div>
          <button className="absolute right-0 bottom-0 rounded-full bg-blue-600 p-2 text-white shadow-lg transition-transform hover:scale-110">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {formData.name || "Partner"}
          </h2>
          <p className="text-gray-500">
            {formData.businessName || "Registered Vendor"}
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 flex items-center justify-between border-b border-gray-50 pb-4 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            General Information
          </h3>
          {isEditing && (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm font-bold text-gray-500 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Save size={16} />
                )}
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* PERSONAL INFO */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Full Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              leftIcon={<User size={18} />}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Email Address <Lock size={12} />
            </label>
            <Input
              name="email"
              value={formData.email}
              leftIcon={<Mail size={18} />}
              disabled={true}
              className="cursor-not-allowed bg-gray-50/50 dark:bg-gray-950/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Business Name
            </label>
            <Input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              leftIcon={<Building2 size={18} />}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Phone
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              leftIcon={<Phone size={18} />}
              disabled={!isEditing}
            />
          </div>

          {/* ADDRESS SECTION */}
          <div className="col-span-full pt-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <MapPin size={16} className="text-blue-500" /> Location Details
            </h4>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              State
            </label>
            <Input
              name="addressState"
              value={formData.addressState}
              onChange={handleChange}
              leftIcon={<Map size={18} />}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              District
            </label>
            <Input
              name="addressDistrict"
              value={formData.addressDistrict}
              onChange={handleChange}
              leftIcon={<Navigation size={18} />}
              disabled={!isEditing}
            />
          </div>

          <div className="col-span-full space-y-1.5">
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Place / Locality
            </label>
            <Input
              name="addressPlace"
              value={formData.addressPlace}
              onChange={handleChange}
              leftIcon={<MapPin size={18} />}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
