"use client";

import { useEffect, useState } from "react";
import BillingStats from "./BillingStats";
import PlanManagementGrid from "./PlanManagementGrid";
import SubscriptionsTable from "./SubscriptionsTable";
import RecentPaymentsTable from "./RecentPaymentsTable";
import { fetchBilling, type AdminBilling } from "@/lib/adminBilling";

export default function BillingManager() {
  const [data, setData] = useState<AdminBilling | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBilling().then((r) => {
      if (r.success) setData(r.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-16 text-center text-[#94A3B8]">Loading billing…</div>;
  if (!data) return <div className="py-16 text-center text-[#94A3B8]">Unable to load billing.</div>;

  return (
    <div className="flex flex-col gap-8">
      <BillingStats stats={data.stats} />
            <PlanManagementGrid plans={data.plans} />
      <RecentPaymentsTable
        payments={data.payments}
        collected={data.stats.collected}
        currency={data.stats.currency}
      />
      <SubscriptionsTable subscriptions={data.subscriptions} />
    </div>
  );
}