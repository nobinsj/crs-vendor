import type { RegisterFormData } from "@/features/Auth/Register/types";
import type { User } from "firebase/auth";

export type VendorUser = User & Partial<RegisterFormData>;