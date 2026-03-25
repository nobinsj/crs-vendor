import * as React from "react"
// import Cropper, { type Area, type Point } from "react-easy-crop" // Commented out
import {
  Car,
  IndianRupee,
  X,
  Link,
  Check,
  Image as ImageIcon,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import { useCreateCar } from "@/hooks/useCars"

type CreateCarFormData = {
  name: string
  brand: string
  pricePerDay: string
  fuelType: string
  transmission: string
  status: "available" | "maintenance"
  image: string | null
}

export const CreateCar: React.FC<{
  open: boolean
  onOpenChange: (open: boolean) => void
}> = ({ open, onOpenChange }) => {
  const { mutateAsync } = useCreateCar()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [imgError, setImgError] = React.useState(false)

  const initialState: CreateCarFormData = {
    name: "",
    brand: "",
    pricePerDay: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "available",
    image: "",
  }

  const [formData, setFormData] = React.useState<CreateCarFormData>({
    name: "",
    brand: "",
    pricePerDay: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    status: "available",
    image: "",
  })

  /* --- ORIGINAL UPLOAD STATE (Commented Out) ---
  const [tempImage, setTempImage] = React.useState<string | null>(null)
  const [isCropping, setIsCropping] = React.useState(false)
  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [completedCrop, setCompletedCrop] = React.useState<Area | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.onload = () => {
        setTempImage(reader.result as string)
        setIsCropping(true)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  ----------------------------------------------- */
  React.useEffect(() => {
    if (!open) {
      setFormData(initialState)
      setImgError(false)
    }
  }, [open])

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    if (!formData.name.trim()) {
      toast.error("Car name is required")
      return
    }

    if (!formData.pricePerDay || Number(formData.pricePerDay) <= 0) {
      toast.error("Enter a valid price")
      return
    }

    if (!formData.image || !isValidUrl(formData.image)) {
      toast.error("Enter a valid image URL")
      return
    }

    if (imgError) {
      toast.error("Image URL is not loading")
      return
    }

    try {
      setIsSubmitting(true)

      await mutateAsync({
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        pricePerDay: Number(formData.pricePerDay),
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        status: formData.status,
        image: formData.image,
      })

      toast.success("Car created successfully 🚗")

      setFormData(initialState)
      setImgError(false)

      onOpenChange(false)
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => !isSubmitting && onOpenChange(val)}
    >
      <DialogContent className="max-w-2xl min-w-xl overflow-hidden rounded-2xl border-none p-0 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-2 text-blue-600">
              <Car size={20} className="fill-blue-600/10" />
              <DialogTitle className="text-xl font-bold">
                List New Vehicle
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-5 p-6">
            {/* Form Fields Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium text-gray-400">
                  Vehicle Model
                </Label>
                <Input
                  placeholder="e.g. Civic Type R"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium text-gray-400">
                  Manufacturer
                </Label>
                <Input
                  placeholder="e.g. Honda"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, brand: e.target.value }))
                  }
                  className="h-10"
                />
              </div>
            </div>

            {/* Form Fields Row 2 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium text-gray-400">
                  Rate Per Day
                </Label>
                <div className="relative">
                  <IndianRupee
                    size={14}
                    className="absolute top-1/2 left-3 z-2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    type="number"
                    className="h-10 pl-8"
                    value={formData.pricePerDay}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        pricePerDay: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label className="text-[12px] font-medium text-gray-400">
                  Specifications
                </Label>
                <div className="flex gap-3">
                  <Select
                    value={formData.fuelType}
                    onValueChange={(v) =>
                      setFormData((p) => ({ ...p, fuelType: v }))
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={formData.transmission}
                    onValueChange={(v) =>
                      setFormData((p) => ({ ...p, transmission: v }))
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* URL Input and Preview Section */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label className="text-[12px] font-medium tracking-tighter text-gray-400 uppercase">
                  Vehicle Image URL
                </Label>
                <div className="relative">
                  <Link
                    size={14}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 z-2"
                  />
                  <Input
                    placeholder="Paste image URL here (https://...)"
                    className={`h-10 pl-8 ${imgError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    value={formData.image || ""}
                    onChange={(e) => {
                      setImgError(false)
                      setFormData((p) => ({ ...p, image: e.target.value }))
                    }}
                  />
                </div>
              </div>

              {/* LIVE PREVIEW BOX (Fixed h-36 aspect-video) */}
              <div className="flex justify-center">
                <div
                  className={`relative flex aspect-video h-36 items-center justify-center overflow-hidden rounded-xl border border-dashed bg-gray-50/50 transition-all ${formData.image && !imgError ? "border-transparent shadow-md" : "border-gray-200"}`}
                >
                  {formData.image && !imgError ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImageIcon size={24} strokeWidth={1.5} className="mb-1" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        {imgError
                          ? "Invalid Image URL"
                          : "Preview will appear here"}
                      </span>
                    </div>
                  )}

                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, image: "" }))}
                      className="absolute top-2 right-2 rounded-full bg-white/80 p-1 shadow-sm backdrop-blur transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t bg-gray-50/50 px-6 py-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.image || imgError || isSubmitting}
              className="min-w-[140px] bg-blue-600 shadow-md shadow-blue-600/20 hover:bg-blue-700"
            >
              {isSubmitting ? "Processing..." : "List Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
