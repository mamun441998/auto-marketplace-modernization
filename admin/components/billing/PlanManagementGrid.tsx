"use client";

import PlanManagementCard from "./PlanManagementCard";
import type { PlanData } from "@/lib/adminBilling";

export default function PlanManagementGrid({ plans }: { plans: PlanData[] }) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white">Plans</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Current plans from your configuration and their active subscribers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <PlanManagementCard key={plan.key} plan={plan} />
        ))}
      </div>
    </div>
  );
}