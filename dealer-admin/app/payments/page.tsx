// dealer-admin/app/payments/page.tsx
import { Metadata } from "next";
import PaymentGatewaySettings from "@/components/payments/PaymentGatewaySettings";
import PaymentsStats from "@/components/payments/PaymentsStats";
import TransactionsTable from "@/components/payments/TransactionsTable";

export const metadata: Metadata = {
  title: "Payments",
};

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Payments & Transactions</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Track customer payments and transaction history for your dealership.
        </p>
      </div>


      {/* Payment Gateway configuration */}
      <PaymentGatewaySettings />
      
      {/* Stats */}
      <PaymentsStats />

      {/* Transactions Table */}
      <TransactionsTable />
    </div>
  );
}