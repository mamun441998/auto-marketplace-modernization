"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import DealerSidebar from "@/components/layout/DealerSidebar";
import DealerTopbar from "@/components/layout/DealerTopbar";
import { ProfileProvider } from "@/components/layout/ProfileContext";

import { getToken, getUser, captureAuthFromUrl, FRONTEND_URL } from "@/lib/auth";
import { fetchMyDealer } from "@/lib/dealer";
import { refreshDealerPlan } from "@/lib/planConfig";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      // :3000 থেকে আসা token URL-এ থাকলে save করো
      captureAuthFromUrl();

      const token = getToken();
      const user = getUser();

      // login নেই → marketing app-এর sign-in
      if (!token || !user) {
        window.location.href = `${FRONTEND_URL}/sign-in`;
        return;
      }

      // dealer profile আছে কিনা চেক
      const dealer = await fetchMyDealer();
      if (!active) return;

      // dealer-এর real plan resolve করে cache করো (feature gating-এর জন্য)
      if (dealer) {
        await refreshDealerPlan();
        if (!active) return;
      }

      const onOnboarding = pathname === "/onboarding";

      // dealer নেই + onboarding-এ নেই → onboarding-এ পাঠাও
      if (!dealer && !onOnboarding) {
        router.replace("/onboarding");
        return;
      }

      // dealer আছে + onboarding-এ আছে → dashboard-এ পাঠাও
      if (dealer && onOnboarding) {
        router.replace("/");
        return;
      }

      setChecking(false);
    })();

    return () => {
      active = false;
    };
  }, [pathname, router]);

  /* Loading / redirect চলছে */
  if (checking) {
    return (
      <html lang="en" data-scroll-behavior="smooth">
        <body>
          <div className="flex min-h-screen items-center justify-center bg-[#0A0F1E]">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
              <p className="text-sm text-slate-300">Loading...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  /* Onboarding page → sidebar/topbar ছাড়া full screen */
  if (pathname === "/onboarding") {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen bg-[#0A0F1E]">{children}</div>
        </body>
      </html>
    );
  }

  /* Normal dashboard chrome */
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          <div className="min-h-screen bg-[#0A0F1E]">
            <DealerSidebar />
            <div className="ml-[260px]">
              <DealerTopbar />
              <main className="p-6 lg:p-8">{children}</main>
            </div>
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}