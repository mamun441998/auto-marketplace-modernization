"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import DealerSidebar from "@/components/layout/DealerSidebar";
import DealerTopbar from "@/components/layout/DealerTopbar";
import { ProfileProvider } from "@/components/layout/ProfileContext";

import { useAuth } from "@/contexts/AuthContext";

interface DealerAdminLayoutProps {
  children: React.ReactNode;
}

export default function DealerAdminLayout({
  children,
}: DealerAdminLayoutProps) {
  const router = useRouter();

  const {
    user,
    authenticated,
    loading,
  } = useAuth();

  /*
  |--------------------------------------------------------------------------
  | Authentication Guard
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (loading) return;

    if (!authenticated) {
      router.replace("/sign-in");
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Future Role Protection
    |--------------------------------------------------------------------------
    |
    | Example:
    |
    | if (user?.role !== "dealer") {
    |   router.replace("/");
    | }
    |
    */

  }, [
    loading,
    authenticated,
    router,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Loading Screen
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E]">
        <div className="flex flex-col items-center gap-5">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#FC5E01] border-t-transparent" />

          <div className="space-y-2 text-center">
            <h2 className="text-lg font-semibold text-white">
              Loading Dashboard
            </h2>

            <p className="text-sm text-slate-400">
              Please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Prevent Dashboard Flash
  |--------------------------------------------------------------------------
  */

  if (!authenticated || !user) {
    return null;
  }

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-[#0A0F1E]">
        {/* Sidebar */}

        <DealerSidebar />

        {/* Main Content */}

        <div className="ml-[260px] flex min-h-screen flex-col">
          {/* Header */}

          <DealerTopbar />

          {/* Page */}

          <main className="flex-1 overflow-x-hidden p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}