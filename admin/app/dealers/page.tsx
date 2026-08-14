// admin/app/dealers/page.tsx
import { Metadata } from "next";
import DealerTable from "@/components/dealers/DealerTable";

export const metadata: Metadata = {
  title: "Dealer Management",
};

export default function DealersPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dealer Management</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          View, manage and control all dealerships on the MotoHave platform.
        </p>
      </div>

      {/* Dealer Table */}
      <DealerTable />
    </div>
  );
}