// dealer-admin/app/page.tsx
import { Metadata } from "next";
import OnboardingChecklist from "@/components/dashboard/OnboardingChecklist";
import DashboardStats from "@/components/dashboard/DashboardStats";
import SalesChart from "@/components/dashboard/SalesChart";
import LeadsSourceChart from "@/components/dashboard/LeadsSourceChart";
import TopInventoryTable from "@/components/dashboard/TopInventoryTable";
import RecentLeadsTable from "@/components/dashboard/RecentLeadsTable";
import { dealerProfile } from "@/lib/dealerData";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {dealerProfile.name.split(" ")[0]}!</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Here&apos;s what&apos;s happening with {dealerProfile.dealershipName} today.
        </p>
      </div>

      {/* Onboarding Checklist */}
      <OnboardingChecklist />

      {/* KPI Stats */}
      <DashboardStats />
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <LeadsSourceChart />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopInventoryTable />
        <RecentLeadsTable />
      </div>
    </div>
  );
}