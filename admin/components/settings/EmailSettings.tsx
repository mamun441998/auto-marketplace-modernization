"use client";

import { useEffect, useState } from "react";
import { Mail, Save, Loader2, CheckCircle2 } from "lucide-react";
import { fetchSettings, saveSettings } from "@/lib/adminSettings";
import Toggle from "@/components/ui/Toggle";

interface EmailTemplate { id: number; name: string; description: string; enabled: boolean; }

const DEFAULTS: EmailTemplate[] = [
  { id: 1, name: "Welcome Email", description: "Sent when a new dealer signs up", enabled: true },
  { id: 2, name: "Invoice Email", description: "Sent after each successful subscription payment", enabled: true },
  { id: 3, name: "Payment Failed", description: "Sent when a subscription payment fails", enabled: true },
  { id: 4, name: "Trial Ending Soon", description: "Sent 3 days before free trial expires", enabled: true },
  { id: 5, name: "Support Ticket Reply", description: "Sent when support team replies to a ticket", enabled: false },
];

export default function EmailSettings() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings().then((s) => {
      if (Array.isArray(s.email_templates)) setTemplates(s.email_templates);
      setLoading(false);
    });
  }, []);

  const toggle = (id: number) =>
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await saveSettings({ email_templates: templates });
    setSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold text-white">Email Templates</h2>
        <p className="text-xs text-[#64748B] mt-0.5">Enable or disable automated emails sent to dealers</p>
      </div>

      {loading ? (
        <div className="py-8 text-center text-[#64748B] text-sm">Loading…</div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {templates.map((template) => (
              <div key={template.id} className="flex items-center justify-between gap-4 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E]/50 p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#FC5E01]/10 text-[#FC5E01]">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{template.name}</p>
                    <p className="text-xs text-[#64748B] truncate">{template.description}</p>
                  </div>
                </div>
                <Toggle on={template.enabled} onClick={() => toggle(template.id)} />
              </div>
            ))}
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