"use client";

import { Users } from "lucide-react";
import type { PlanData } from "@/lib/adminBilling";

export default function PlanManagementCard({ plan }: { plan: PlanData }) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{plan.name}</h3>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{plan.currency}</span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-5">
        <Users size={13} />
        {plan.subscribers} active subscribers
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Monthly</label>
          <p className="text-xl font-extrabold text-white">${plan.monthly}</p>
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Yearly</label>
          <p className="text-xl font-extrabold text-white">${plan.yearly.toLocaleString()}</p>
        </div>
      </div>

      <div className="border-t border-[#1e2a4a] pt-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-2.5">Included Features</p>
        <ul className="flex flex-col gap-1.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-[#94A3B8]">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#FC5E01] flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}