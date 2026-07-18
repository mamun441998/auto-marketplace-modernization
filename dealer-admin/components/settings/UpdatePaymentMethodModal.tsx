// dealer-admin/components/settings/UpdatePaymentMethodModal.tsx
"use client";

import { useState } from "react";
import { X, CreditCard, Lock } from "lucide-react";

interface UpdatePaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePaymentMethodModal({ isOpen, onClose }: UpdatePaymentMethodModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 💡 Backend connect korar somoy: eikhane Stripe/PayPal SDK diye card token
    // create hobe, tarpor backend e pathano hobe. Real card number kokhono
    // nijer server e store kora jabe na, shudhu gateway er token store korte hobe.
    // jemon: const token = await stripe.createToken(cardElement);
    //        await fetch("/api/billing/payment-method", { method: "PATCH", body: JSON.stringify({ token }) })
    alert("Payment method updated successfully (backend not connected yet)");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setNameOnCard("");
    onClose();
  };

  // Card number ke "1234 5678 9012 3456" format e dekhanor jonno
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FC5E01]/10 text-[#FC5E01]">
              <CreditCard size={18} />
            </div>
            <h3 className="text-base font-bold text-white">Update Payment Method</h3>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Name on Card</label>
            <input
              type="text"
              required
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Card Number</label>
            <input
              type="text"
              required
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Expiry Date</label>
              <input
                type="text"
                required
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">CVV</label>
              <input
                type="text"
                required
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="123"
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-start gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
            <Lock size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[#64748B] leading-relaxed">
              Your card details are encrypted and processed securely through Stripe. We never store your full card number.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
            >
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}