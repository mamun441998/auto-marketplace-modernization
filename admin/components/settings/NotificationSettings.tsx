"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, MessageSquare, Save, Loader2, CheckCircle2 } from "lucide-react";
import { fetchSettings, saveSettings } from "@/lib/adminSettings";
import Toggle from "@/components/ui/Toggle";

interface NotificationRule { id: number; event: string; description: string; email: boolean; sms: boolean; inApp: boolean; }

const DEFAULTS: NotificationRule[] = [
  { id: 1, event: "New Dealer Signup", description: "Notify when a new dealership registers", email: true, sms: false, inApp: true },
  { id: 2, event: "Payment Failed", description: "Notify when a subscription payment fails", email: true, sms: true, inApp: true },
  { id: 3, event: "Support Ticket Created", description: "Notify when a dealer submits a new ticket", email: true, sms: false, inApp: true },
  { id: 4, event: "Dealer Account Suspended", description: "Notify when an account is suspended", email: true, sms: false, inApp: false },
  { id: 5, event: "Suspicious Login Detected", description: "Notify on unusual login activity", email: true, sms: true, inApp: true },
];

export default function NotificationSettings() {
  const [rules, setRules] = useState<NotificationRule[]>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings().then((s) => {
      if (Array.isArray(s.notification_rules)) setRules(s.notification_rules);
      setLoading(false);
    });
  }, []);

  const toggle = (id: number, channel: "email" | "sms" | "inApp") =>
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, [channel]: !r[channel] } : r)));

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await saveSettings({ notification_rules: rules });
    setSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold text-white">Notification Settings</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Choose how you want to be notified for each platform event</p>
      </div>

      {loading ? (
        <div className="py-8 text-center text-[#64748B] text-sm">Loading…</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1e2a4a]">
                  <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Event</th>
                  <th className="pb-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#64748B]"><div className="flex items-center justify-center gap-1"><Mail size={12} />Email</div></th>
                  <th className="pb-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#64748B]"><div className="flex items-center justify-center gap-1"><MessageSquare size={12} />SMS</div></th>
                  <th className="pb-3 text-center text-[11px] font-semibold uppercase tracking-wider text-[#64748B]"><div className="flex items-center justify-center gap-1"><Bell size={12} />In-App</div></th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id} className="border-b border-[#1e2a4a] last:border-0">
                    <td className="py-4 pr-4">
                      <p className="text-sm font-semibold text-white">{rule.event}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{rule.description}</p>
                    </td>
                    <td className="py-4"><div className="flex justify-center"><Toggle size="sm" on={rule.email} onClick={() => toggle(rule.id, "email")} /></div></td>
                    <td className="py-4"><div className="flex justify-center"><Toggle size="sm" on={rule.sms} onClick={() => toggle(rule.id, "sms")} /></div></td>
                    <td className="py-4"><div className="flex justify-center"><Toggle size="sm" on={rule.inApp} onClick={() => toggle(rule.id, "inApp")} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors w-fit disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Saved" : "Save Changes"}
          </button>
        </>
      )}
    </div>
  );
}