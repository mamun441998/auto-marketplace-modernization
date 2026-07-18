// dealer-admin/app/analytics/page.tsx
import { Metadata } from "next";
import AnalyticsStats from "@/components/analytics/AnalyticsStats";
import SalesTrendChart from "@/components/analytics/SalesTrendChart";
import InventoryPerformanceChart from "@/components/analytics/InventoryPerformanceChart";
import LeadSourceChart from "@/components/analytics/LeadSourceChart";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Track your dealership&apos;s performance, sales trends and lead sources.
        </p>
      </div>

      {/* Overview Stats */}
      <AnalyticsStats />

      {/* Sales Trend (full width) */}
      <SalesTrendChart />

      {/* Inventory Performance + Lead Source */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryPerformanceChart />
        <LeadSourceChart />
      </div>
    </div>
  );
}