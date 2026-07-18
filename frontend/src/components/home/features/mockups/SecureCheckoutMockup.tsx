// features/mockups/SecureCheckoutMockup.tsx
"use client";

export default function SecureCheckoutMockup() {
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      {/* Payment Card */}
      <div className="rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 p-3 text-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-100/80">Secure Checkout</span>
          <span className="text-xs">🔒</span>
        </div>
        <p className="text-[11px] font-mono tracking-widest">•••• •••• •••• 4242</p>
        <div className="flex justify-between mt-2">
          <span className="text-[8px] text-emerald-100/80">David Wilson</span>
          <span className="text-[8px] text-emerald-100/80">12/28</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-4 gap-1.5">
        {["Visa", "MC", "PayPal", "Stripe"].map((m) => (
          <div key={m} className="rounded bg-[#0A0A0A] border border-[#262626] p-1.5 text-center">
            <span className="text-[7px] font-bold text-[#94A3B8]">{m}</span>
          </div>
        ))}
      </div>

      {/* Invoice Summary */}
      <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2.5">
        <div className="flex justify-between text-[9px] text-[#94A3B8] mb-1">
          <span>BMW X5 2023</span>
          <span className="text-white font-bold">$58,900</span>
        </div>
        <div className="flex justify-between text-[9px] text-[#94A3B8]">
          <span>Processing Fee</span>
          <span className="text-white font-bold">$0</span>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-2.5 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-[#94A3B8]">Transaction encrypted</span>
        <span className="text-[9px] font-bold text-emerald-400">✓ Verified</span>
      </div>
    </div>
  );
}