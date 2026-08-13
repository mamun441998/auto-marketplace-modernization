"use client";

import { useEffect, useState } from "react";
import { Save, Eye, EyeOff, CheckCircle2, Loader2, CreditCard } from "lucide-react";
import {
  fetchPaymentSettings,
  savePaymentSettings,
  type DealerPaymentForm,
} from "@/lib/dealerPayment";

const DEFAULT: DealerPaymentForm = {
  stripeKey: "",
  paypalClientId: "",
  stripeEnabled: false,
  paypalEnabled: false,
  deposit: "",
};

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        on ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"
      }`}
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition-all ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function PaymentGatewaySettings() {
  const [form, setForm] = useState<DealerPaymentForm>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);

  useEffect(() => {
    fetchPaymentSettings().then((res) => {
      if (res.success && res.payment) setForm({ ...DEFAULT, ...res.payment });
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await savePaymentSettings(form);
    setSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FC5E01]/10 flex items-center justify-center text-[#FC5E01]">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Payment Gateway</h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Connect your own Stripe or PayPal account to accept payments on your website.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-[#64748B] text-sm">Loading…</div>
      ) : (
        <div className="flex flex-col gap-6 max-w-lg">
          {/* Stripe */}
          <div className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Stripe</span>
                {form.stripeEnabled && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 size={11} /> Enabled
                  </span>
                )}
              </div>
              <Toggle
                on={form.stripeEnabled}
                onClick={() => setForm({ ...form, stripeEnabled: !form.stripeEnabled })}
              />
            </div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">
              Secret Key
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
              <input
                type={showStripe ? "text" : "password"}
                value={form.stripeKey}
                onChange={(e) => setForm({ ...form, stripeKey: e.target.value })}
                placeholder="sk_live_..."
                className="w-full bg-transparent text-sm text-white font-mono focus:outline-none placeholder:text-[#64748B]"
              />
              <button
                type="button"
                onClick={() => setShowStripe(!showStripe)}
                className="text-[#64748B] hover:text-white transition-colors flex-shrink-0"
              >
                {showStripe ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* PayPal */}
          <div className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">PayPal</span>
                {form.paypalEnabled && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 size={11} /> Enabled
                  </span>
                )}
              </div>
              <Toggle
                on={form.paypalEnabled}
                onClick={() => setForm({ ...form, paypalEnabled: !form.paypalEnabled })}
              />
            </div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">
              Client ID
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
              <input
                type={showPaypal ? "text" : "password"}
                value={form.paypalClientId}
                onChange={(e) => setForm({ ...form, paypalClientId: e.target.value })}
                placeholder="Client ID..."
                className="w-full bg-transparent text-sm text-white font-mono focus:outline-none placeholder:text-[#64748B]"
              />
              <button
                type="button"
                onClick={() => setShowPaypal(!showPaypal)}
                className="text-[#64748B] hover:text-white transition-colors flex-shrink-0"
              >
                {showPaypal ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Reservation deposit */}
          <div className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-4">
            <label className="mb-1.5 block text-sm font-bold text-white">
              Reservation Deposit (USD)
            </label>
            <p className="text-xs text-[#64748B] mb-3">
              Amount a customer pays to reserve a vehicle on your website. Leave empty to use 5% of the vehicle price.
            </p>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.deposit}
              onChange={(e) => setForm({ ...form, deposit: e.target.value })}
              placeholder="e.g. 500"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]/60 placeholder:text-[#64748B]"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors w-fit disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <CheckCircle2 size={16} />
            ) : (
              <Save size={16} />
            )}
            {saved ? "Saved" : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}