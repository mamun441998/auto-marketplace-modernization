"use client";

import { useEffect, useState } from "react";
import DashboardStats from "./DashboardStats";
import RevenueChart from "./RevenueChart";
import SignupTrendChart from "./SignupTrendChart";
import RecentDealersTable from "./RecentDealersTable";
import { fetchAdminDashboard, type AdminDashboard } from "@/lib/dashboard";

export default function DashboardClient() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDashboard().then((r) => {
      if (r.success) setData(r.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-[#94A3B8]">Loading dashboard…</div>;
  }
  if (!data) {
    return <div className="py-16 text-center text-[#94A3B8]">Unable to load dashboard.</div>;
  }

  return (
    <>
      <DashboardStats totals={data.totals} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <SignupTrendChart data={data.signups_trend} />
      </div>
      <RecentDealersTable dealers={data.recent_dealers} />
    </>
  );
}