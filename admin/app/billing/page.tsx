import { Metadata } from "next";
import BillingManager from "@/components/billing/BillingManager";

export const metadata: Metadata = {
  title: "Billing & Plans",
};

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing & Plans</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Subscription plans, pricing and platform revenue.
        </p>
      </div>

      <BillingManager />
    </div>
  );
}