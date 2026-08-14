// admin/app/security/page.tsx
import { Metadata } from "next";
import SecurityStats from "@/components/security/SecurityStats";
import SecurityLogsTable from "@/components/security/SecurityLogsTable";

export const metadata: Metadata = {
  title: "Security Logs",
};

export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Logs</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Track login history and admin actions across the MotoHave platform.
        </p>
      </div>

      {/* Stats */}
      <SecurityStats />

      {/* Logs Table */}
      <SecurityLogsTable />
    </div>
  );
}