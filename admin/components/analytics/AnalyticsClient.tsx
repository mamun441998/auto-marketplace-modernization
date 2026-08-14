"use client";

import { useEffect, useState } from "react";
import AnalyticsStats from "./AnalyticsStats";
import RevenueGrowthChart from "./RevenueGrowthChart";
import GeographicChart from "./GeographicChart";
import PlanDistributionChart from "./PlanDistributionChart";
import TopDealersTable from "./TopDealersTable";
import { fetchAdminAnalytics, type AdminAnalytics } from "@/lib/adminAnalytics";

export default function AnalyticsClient() {
  const [data, setData] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminAnalytics().then((r) => {
      if (r.success) setData(r.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-16 text-center text-[#94A3B8]">Loading analytics…</div>;
  if (!data) return <div className="py-16 text-center text-[#94A3B8]">Unable to load analytics.</div>;

  return (
    <>
      <AnalyticsStats kpis={data.kpis} />
      <RevenueGrowthChart data={data.growth} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeographicChart data={data.geographic} />
        <PlanDistributionChart data={data.plans} />
      </div>
      <TopDealersTable dealers={data.top_dealers} />
    </>
  );
}