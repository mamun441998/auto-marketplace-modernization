"use client";

import { createContext, useContext } from "react";
import type { AdminUser } from "@/lib/adminAuth";

export const AdminUserContext = createContext<AdminUser | null>(null);

export function useAdminUser() {
  return useContext(AdminUserContext);
}