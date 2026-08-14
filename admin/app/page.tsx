import { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Welcome back. Here&apos;s what&apos;s happening across MotoHave today.
        </p>
      </div>

      <DashboardClient />
    </div>
  );
}