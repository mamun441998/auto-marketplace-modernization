// dealer-admin/app/team/page.tsx
import { Metadata } from "next";
import TeamStats from "@/components/team/TeamStats";
import TeamTable from "@/components/team/TeamTable";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Team Management</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Manage your dealership staff and their access permissions.
        </p>
      </div>

      {/* Stats + Plan Usage */}
      <TeamStats />

      {/* Team Table */}
      <TeamTable />
    </div>
  );
}