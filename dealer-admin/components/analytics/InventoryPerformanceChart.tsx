// dealer-admin/components/analytics/InventoryPerformanceChart.tsx
"use client";

import { Eye, MessageSquare } from "lucide-react";
import { vehiclePerformanceData } from "@/lib/dealerData";

export default function InventoryPerformanceChart() {
  const maxViews = Math.max(...vehiclePerformanceData.map((v) => v.views));

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-white">Top Performing Vehicles</h3>
        <p className="text-xs text-[#64748B] mt-0.5">Ranked by views and inquiries this month</p>
      </div>

      <div className="flex flex-col gap-4">
        {vehiclePerformanceData
          .sort((a, b) => b.views - a.views)
          .map((vehicle) => (
            <div key={vehicle.model}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-semibold text-white">{vehicle.model}</p>
                <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {vehicle.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    {vehicle.inquiries}
                  </span>
                  <span className="font-bold text-[#FC5E01]">{vehicle.conversionRate}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-[#0A0F1E] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FC5E01] to-[#E5540A]"
                  style={{ width: `${(vehicle.views / maxViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}