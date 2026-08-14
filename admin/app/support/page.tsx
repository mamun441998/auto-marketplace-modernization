import { Metadata } from "next";
import SupportManager from "@/components/support/SupportManager";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Help requests raised by dealerships across the platform.
        </p>
      </div>

      <SupportManager />
    </div>
  );
}