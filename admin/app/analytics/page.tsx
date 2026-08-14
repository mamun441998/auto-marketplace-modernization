import { Metadata } from "next";
import AnalyticsClient from "@/components/analytics/AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Platform Analytics</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Real-time insights across MotoHave dealers, inventory and leads.
        </p>
      </div>

      <AnalyticsClient />
    </div>
  );
}