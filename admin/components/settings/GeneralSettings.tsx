"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { fetchSettings, saveSettings } from "@/lib/adminSettings";
import FancySelect from "@/components/FancySelect";

const DEFAULT = {
  platformName: "MotoHave",
  supportEmail: "support@motohave.com",
  supportPhone: "",
  timezone: "UTC+00:00 (London)",
};

const TIMEZONES = [
  "UTC+00:00 (London)",
  "UTC-05:00 (New York)",
  "UTC-08:00 (Los Angeles)",
  "UTC+04:00 (Dubai)",
  "UTC+08:00 (Singapore)",
].map((t) => ({ value: t, label: t }));

export default function GeneralSettings() {
  const [form, setForm] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings().then((s) => {
      if (s.general) setForm({ ...DEFAULT, ...s.general });
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await saveSettings({ general: form });
    setSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold text-white">General Settings</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Basic platform information and configuration</p>
      </div>

      {loading ? (
        <div className="py-8 text-center text-[#64748B] text-sm">Loading…</div>
      ) : (
        <div className="flex flex-col gap-5 max-w-lg">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Platform Name</label>
            <input type="text" value={form.platformName} onChange={(e) => setForm({ ...form, platformName: e.target.value })}
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Support Email</label>
            <input type="email" value={form.supportEmail} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Support Phone</label>
            <input type="text" value={form.supportPhone} onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Timezone</label>
            <FancySelect value={form.timezone} onChange={(v) => setForm({ ...form, timezone: v })} options={TIMEZONES} />
          </div>

          <button onClick={handleSave} disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors w-fit mt-2 disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Saved" : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}