"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";
import SuperAdminTopbar from "@/components/layout/SuperAdminTopbar";
import { getAdminToken, fetchAdminMe, type AdminUser } from "@/lib/adminAuth";
import { AdminUserContext } from "@/lib/adminAuthContext";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<"loading" | "authed" | "guest">("loading");
  const [user, setUser] = useState<AdminUser | null>(null);

  const isLogin = pathname === "/login";

  useEffect(() => {
    if (isLogin) {
      setState("guest");
      return;
    }
    const token = getAdminToken();
    if (!token) {
      router.replace("/login");
      setState("guest");
      return;
    }
    fetchAdminMe().then((u) => {
      if (u) {
        setUser(u);
        setState("authed");
      } else {
        router.replace("/login");
        setState("guest");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (isLogin) return <>{children}</>;

  if (state !== "authed") {
    return <div className="min-h-screen flex items-center justify-center text-[#94A3B8]">Loading…</div>;
  }

  return (
    <AdminUserContext.Provider value={user}>
      <SuperAdminSidebar />
      <div className="ml-[260px]">
        <SuperAdminTopbar />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </AdminUserContext.Provider>
  );
}