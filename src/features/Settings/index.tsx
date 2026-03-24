import { useState } from "react"
import {
  Bell,
  Zap,
  ShieldAlert,
  LogOut,
  Check,
  Save,
  Loader2,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// --- Reusable Setting Row ---
const SettingRow = ({ label, description, children }: any) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-bold text-gray-900 dark:text-white">
        {label}
      </span>
      {description && (
        <span className="max-w-[280px] text-xs text-gray-500 dark:text-gray-400">
          {description}
        </span>
      )}
    </div>
    {children}
  </div>
)

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Settings State
  const [config, setConfig] = useState({
    pushNotify: true,
    emailNotify: true,
    smsNotify: false,
    autoApprove: false,
    instantBook: true,
    currency: "INR",
    minDuration: "1 day",
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }, 800)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
      {/* HEADER */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your business preferences and notifications
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-70"
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : showSuccess ? (
            <Check size={18} />
          ) : (
            <Save size={18} />
          )}
          {showSuccess ? "Changes Saved" : "Save Changes"}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* NOTIFICATIONS SECTION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Bell size={20} />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            <SettingRow
              label="Push Notifications"
              description="Alerts for new booking requests in real-time."
            >
              <Switch
                checked={config.pushNotify}
                onCheckedChange={(val) =>
                  setConfig({ ...config, pushNotify: val })
                }
              />
            </SettingRow>
            <SettingRow
              label="Email Notifications"
              description="Receive daily summaries and payment receipts."
            >
              <Switch
                checked={config.emailNotify}
                onCheckedChange={(val) =>
                  setConfig({ ...config, emailNotify: val })
                }
              />
            </SettingRow>
            <SettingRow
              label="SMS Alerts"
              description="Direct text messages for urgent cancellations."
            >
              <Switch
                checked={config.smsNotify}
                onCheckedChange={(val) =>
                  setConfig({ ...config, smsNotify: val })
                }
              />
            </SettingRow>
          </div>
        </div>

        {/* BOOKING RULES SECTION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Zap size={20} />
            <h2 className="text-lg font-bold">Booking Rules</h2>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            <SettingRow
              label="Instant Booking"
              description="Allow customers to book instantly without your manual approval."
            >
              <Switch
                checked={config.instantBook}
                onCheckedChange={(val) =>
                  setConfig({ ...config, instantBook: val })
                }
              />
            </SettingRow>
            <SettingRow
              label="Auto-Approve Returns"
              description="Automatically mark cars as available once the booking period ends."
            >
              <Switch
                checked={config.autoApprove}
                onCheckedChange={(val) =>
                  setConfig({ ...config, autoApprove: val })
                }
              />
            </SettingRow>
            <div className="py-4">
              <label className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                Default Currency
              </label>
              <div className="mt-2 w-full max-w-xs">
                <Select
                  value={config.currency}
                  onValueChange={(val) =>
                    setConfig({ ...config, currency: val })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="rounded-2xl border border-red-100 bg-red-50/30 p-6 dark:border-red-900/20 dark:bg-red-900/10">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <ShieldAlert size={20} />
            <h2 className="text-lg font-bold">Danger Zone</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-50 dark:border-red-900/50 dark:bg-gray-900">
              <LogOut size={16} />
              Logout
            </button>
            <button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
