"use client";

import { useEffect, useState } from "react";

import { getUser } from "@/lib/auth";
import { fetchMyDealer, Dealer } from "@/lib/dealer";

import OnboardingChecklist from "@/components/dashboard/OnboardingChecklist";
import DashboardStats from "@/components/dashboard/DashboardStats";
import SalesChart from "@/components/dashboard/SalesChart";
import LeadsSourceChart from "@/components/dashboard/LeadsSourceChart";
import TopInventoryTable from "@/components/dashboard/TopInventoryTable";
import RecentLeadsTable from "@/components/dashboard/RecentLeadsTable";
import TrialBanner from "@/components/subscription/TrialBanner";

export default function DashboardPage() {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [firstName, setFirstName] = useState("there");

  useEffect(() => {
    // user-এর নাম localStorage থেকে
    const user = getUser<{ name?: string }>();
    if (user?.name) {
      setFirstName(user.name.split(" ")[0]);
    }

    // dealership-এর আসল data API থেকে
    fetchMyDealer().then(setDealer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading — আসল data */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Here&apos;s what&apos;s happening with{" "}
          {dealer?.name ?? "your dealership"} today.
        </p>
      </div>

      {/* Onboarding Checklist */}
      <OnboardingChecklist />
            {/* Trial / subscription banner */}
      <TrialBanner />

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