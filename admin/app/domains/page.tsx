import { Metadata } from "next";
import DomainsManager from "@/components/domains/DomainsManager";

export const metadata: Metadata = {
  title: "Domains",
};

export default function DomainsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Domain Management</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Custom domains connected by dealerships and their live status.
        </p>
      </div>

      <DomainsManager />
    </div>
  );
}