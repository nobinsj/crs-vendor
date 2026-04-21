import * as React from "react"
import { IndianRupee, Link, X, Image as ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { CarFormData } from "./type"

type Props = {
  formData: CarFormData
  setFormData: React.Dispatch<React.SetStateAction<CarFormData>>
  imgError: boolean
  setImgError: (v: boolean) => void
}

export const CarForm: React.FC<Props> = ({
  formData,
  setFormData,
  imgError,
  setImgError,
}) => {
  return (
    <div className="space-y-5 p-6">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[12px] font-medium text-gray-400">
            Vehicle Model
          </Label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            placeholder="e.g. Civic Type R"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-[12px] font-medium text-gray-400">
            Manufacturer
          </Label>
          <Input
            value={formData.brand}
            onChange={(e) =>
              setFormData((p) => ({ ...p, brand: e.target.value }))
            }
            placeholder="e.g. Honda"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[12px] font-medium text-gray-400">Rate</Label>
          <div className="relative">
            <IndianRupee
              className="absolute top-1/2 left-3 z-1 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <Input
              type="number"
              className="h-10 pl-8"
              value={formData.pricePerDay}
              onChange={(e) =>
                setFormData((p) => ({ ...p, pricePerDay: e.target.value }))
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
              onValueChange={(v) => setFormData((p) => ({ ...p, fuelType: v }))}
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

      {/* Image URL */}
      <div className="space-y-2">
        <Label className="text-[12px] font-medium text-gray-400">
          Image URL
        </Label>
        <div className="relative">
          <Link
            className="absolute top-1/2 left-3 z-1 -translate-y-1/2 text-gray-400"
            size={14}
          />
          <Input
            className={`pl-8 ${imgError ? "border-red-500" : ""}`}
            value={formData.image}
            onChange={(e) => {
              setImgError(false)
              setFormData((p) => ({ ...p, image: e.target.value }))
            }}
            placeholder="Paste image URL here (https://...)"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <div className="relative aspect-video h-36 overflow-hidden rounded-xl border bg-gray-50 dark:bg-gray-800">
          {formData.image && !imgError ? (
            <img
              src={formData.image}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <ImageIcon />
            </div>
          )}

          {formData.image && (
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, image: "" }))}
              className="absolute top-2 right-2 rounded-full bg-white/80 p-1"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
