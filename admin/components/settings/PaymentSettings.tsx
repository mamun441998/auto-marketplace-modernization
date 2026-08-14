"use client";

import { useEffect, useState } from "react";
import { Save, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { fetchSettings, saveSettings } from "@/lib/adminSettings";
import Toggle from "@/components/ui/Toggle";

const DEFAULT = { stripeKey: "", paypalClientId: "", stripeEnabled: false, paypalEnabled: false };

export default function PaymentSettings() {
  const [form, setForm] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);

  useEffect(() => {
    fetchSettings().then((s) => {
      if (s.payment) setForm({ ...DEFAULT, ...s.payment });
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await saveSettings({ payment: form });
    setSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold text-white">Payment Gateway Configuration</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Store Stripe and PayPal API credentials (used when billing goes live)</p>
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
              <Toggle on={form.stripeEnabled} onClick={() => setForm({ ...form, stripeEnabled: !form.stripeEnabled })} />
            </div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Secret Key</label>
            <div className="flex items-center gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
              <input type={showStripe ? "text" : "password"} value={form.stripeKey} onChange={(e) => setForm({ ...form, stripeKey: e.target.value })}
                placeholder="sk_live_..." className="w-full bg-transparent text-sm text-white font-mono focus:outline-none placeholder:text-[#64748B]" />
              <button type="button" onClick={() => setShowStripe(!showStripe)} className="text-[#64748B] hover:text-white transition-colors flex-shrink-0">
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
              <Toggle on={form.paypalEnabled} onClick={() => setForm({ ...form, paypalEnabled: !form.paypalEnabled })} />
            </div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Client ID</label>
            <div className="flex items-center gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
              <input type={showPaypal ? "text" : "password"} value={form.paypalClientId} onChange={(e) => setForm({ ...form, paypalClientId: e.target.value })}
                placeholder="Client ID..." className="w-full bg-transparent text-sm text-white font-mono focus:outline-none placeholder:text-[#64748B]" />
              <button type="button" onClick={() => setShowPaypal(!showPaypal)} className="text-[#64748B] hover:text-white transition-colors flex-shrink-0">
                {showPaypal ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors w-fit disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Saved" : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}