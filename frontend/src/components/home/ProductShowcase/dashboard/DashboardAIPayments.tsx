// src/components/home/ProductShowcase/dashboard/DashboardAIPayments.tsx
"use client";

const paymentMethods = [
  { name: "Visa", icon: "💳" },
  { name: "Mastercard", icon: "💳" },
  { name: "PayPal", icon: "🅿️" },
  { name: "Stripe", icon: "◆" },
];

export default function DashboardAIPayments() {
  return (
    <div className="space-y-4 text-white select-none">
      {/* AI KPI Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 text-white shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-violet-100/80">AI Suggestions</p>
          <h3 className="mt-1 text-xl font-black tracking-tight">312</h3>
          <p className="text-[10px] font-medium text-violet-100/90">This Month</p>
        </div>

        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">Payments Processed</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-white">$186K</h3>
          <p className="text-[10px] font-medium text-emerald-400">↑ 22%</p>
        </div>

        <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">Success Rate</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-amber-400">99.2%</h3>
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Reliable</p>
        </div>
      </div>

      {/* AI Pricing Suggestion Card */}
      <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-white">AI Pricing Suggestion</h4>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
            AI Powered
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#262626] p-3 bg-[#0A0A0A]/50">
          <div>
            <p className="text-[11px] font-bold text-white">Tesla Model Y LR</p>
            <p className="text-[10px] text-[#64748B]">Market average: $46,800</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-black text-violet-400">$47,500</p>
            <p className="text-[9px] font-bold text-emerald-400">Optimal Price</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
        <h4 className="text-xs font-bold text-white mb-3">Accepted Payment Methods</h4>
        <div className="grid grid-cols-4 gap-2">
          {paymentMethods.map((method) => (
            <div key={method.name} className="flex flex-col items-center gap-1 rounded-lg border border-[#262626] bg-[#0A0A0A]/50 p-2.5">
              <span className="text-base">{method.icon}</span>
              <span className="text-[8px] font-bold text-[#94A3B8]">{method.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transaction */}
      <div className="rounded-xl bg-[#171717] p-4 border border-[#262626] shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-white">Payment Received</p>
            <p className="text-[10px] text-[#64748B]">David Wilson • BMW X5 2023</p>
          </div>
          <span className="text-xs font-black text-emerald-400">+$58,900</span>
        </div>
      </div>
    </div>
  );
}