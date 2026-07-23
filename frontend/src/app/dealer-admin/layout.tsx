"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DealerSidebar from "@/components/layout/DealerSidebar";
import DealerTopbar from "@/components/layout/DealerTopbar";
import { ProfileProvider } from "@/components/layout/ProfileContext";

export default function DealerAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("motohave_token");
    const user = localStorage.getItem("motohave_user");

    if (!token || !user) {
      router.replace("/sign-in");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E]">
        <div className="flex flex-col items-center gap-5">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-[#0A0F1E]">
        <DealerSidebar />
        <div className="ml-[260px]">
          <DealerTopbar />
          <main className="p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProfileProvider>
  );
}
