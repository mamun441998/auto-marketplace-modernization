"use client";

import BillingSettings from "@/components/settings/BillingSettings";
import { useState, useEffect } from "react";
import {
  Building, Gauge, CreditCard, Bell, Globe, Lock, Network, Loader2, Save, Check,
} from "lucide-react";
import LocalizationSettings from "@/components/settings/LocalizationSettings";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PlanUsageSettings from "@/components/settings/PlanUsageSettings";
import {
  fetchDealerSettings, saveDealerSettings, changePassword, type NotificationPrefs,
} from "@/lib/settings";

type SettingTab = "profile" | "usage" | "billing" | "domain" | "security" | "notifications" | "localization";

const BRAND = "#FC5E01";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>("profile");

  // Domain
  const [domain, setDomain] = useState("");
  const [savingDomain, setSavingDomain] = useState(false);
  const [domainMsg, setDomainMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [domainSaved, setDomainSaved] = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState<NotificationPrefs>({ leads: true, inventory: false, billing: true });
  const [savingNotifs, setSavingNotifs] = useState(false);
  const [notifMsg, setNotifMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Password
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [savingPw, setSavingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Deep-link: open the tab passed as ?tab=... (billing / usage / domain / …)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    const valid = ["profile", "usage", "billing", "domain", "security", "notifications", "localization"];
    if (t && valid.includes(t)) setActiveTab(t as SettingTab);
  }, []);

  // Load current settings
  useEffect(() => {
    fetchDealerSettings().then((s) => {
      setDomain(s.custom_domain ?? "");
      setDomainSaved(Boolean(s.custom_domain));
      setNotifs(s.notifications);
    });
  }, []);

  async function saveDomain() {
    setSavingDomain(true);
    setDomainMsg(null);
    const res = await saveDealerSettings({ custom_domain: domain.trim() || null });
    setSavingDomain(false);
    if (res?.success) {
      setDomainSaved(Boolean(domain.trim()));
      setDomainMsg({ ok: true, text: "Domain saved." });
    } else {
      setDomainMsg({ ok: false, text: res?.message || "Failed to save domain." });
    }
  }

  async function saveNotifs() {
    setSavingNotifs(true);
    setNotifMsg(null);
    const res = await saveDealerSettings({ notifications: notifs });
    setSavingNotifs(false);
    if (res?.success) setNotifMsg({ ok: true, text: "Preferences saved." });
    else setNotifMsg({ ok: false, text: res?.message || "Failed to save." });
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (pw.next !== pw.confirm) {
      setPwMsg({ ok: false, text: "New passwords do not match." });
      return;
    }
    if (pw.next.length < 8) {
      setPwMsg({ ok: false, text: "New password must be at least 8 characters." });
      return;
    }
    setSavingPw(true);
    const res = await changePassword({
      current_password: pw.current,
      new_password: pw.next,
      new_password_confirmation: pw.confirm,
    });
    setSavingPw(false);
    if (res?.success) {
      setPwMsg({ ok: true, text: res.message || "Password changed." });
      setPw({ current: "", next: "", confirm: "" });
    } else {
      setPwMsg({ ok: false, text: res?.message || "Failed to change password." });
    }
  }

  const sidebarGroups = [
    {
      group: "Account",
      items: [
        { id: "profile" as SettingTab, label: "Dealership Profile", desc: "Business info and details", icon: Building },
        { id: "usage" as SettingTab, label: "Plan & Usage", desc: "Your plan limits and upgrades", icon: Gauge },
        { id: "billing" as SettingTab, label: "Billing", desc: "Payment method and invoices", icon: CreditCard },
        { id: "domain" as SettingTab, label: "Domain", desc: "Connect your custom domain", icon: Network },
      ],
    },
    {
      group: "Preferences",
      items: [
        { id: "security" as SettingTab, label: "Password", desc: "Change your account password", icon: Lock },
        { id: "notifications" as SettingTab, label: "Notifications", desc: "Choose what you're notified about", icon: Bell },
        { id: "localization" as SettingTab, label: "Localization", desc: "Currency and timezone", icon: Globe },
      ],
    },
  ];

  const inputCls = "w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]";
  const labelCls = "block text-xs font-semibold text-[#94A3B8] mb-1.5";

  function Msg({ m }: { m: { ok: boolean; text: string } | null }) {
    if (!m) return null;
    return (
      <div className={`rounded-lg border px-3 py-2 text-sm ${m.ok ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-300"}`}>
        {m.text}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">Manage your dealership profile, plan, billing and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <div className="space-y-5 lg:col-span-1">
          {sidebarGroups.map((group) => (
            <div key={group.group} className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-[#64748B] tracking-wider px-2 block">{group.group}</span>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-colors ${
                        isActive ? "bg-[#111B33] border border-[#FC5E01]/40 text-[#FC5E01]" : "border border-transparent text-[#94A3B8] hover:bg-[#111B33]"
                      }`}
                    >
                      <Icon size={16} className={`mt-0.5 flex-shrink-0 ${isActive ? "text-[#FC5E01]" : "text-[#64748B]"}`} />
                      <div>
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="block text-[11px] text-[#64748B] mt-0.5">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "usage" && <PlanUsageSettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "localization" && <LocalizationSettings />}

          {/* Domain */}
          {activeTab === "domain" && (
            <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#1e2a4a] pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Custom Domain</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">Connect your own domain to your dealership website.</p>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${domainSaved ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                  {domainSaved ? "Saved" : "Not set"}
                </span>
              </div>

              <Msg m={domainMsg} />

              <div className="space-y-2">
                <label className={labelCls}>Your Domain</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className={`${inputCls} font-mono`}
                    placeholder="e.g. shop.yourdomain.com"
                  />
                  <button
                    onClick={saveDomain}
                    disabled={savingDomain}
                    style={{ backgroundColor: BRAND }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:brightness-95 disabled:opacity-50 flex-shrink-0"
                  >
                    {savingDomain ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save
                  </button>
                </div>
              </div>

              {/* DNS guide (static help) */}
              <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-4 space-y-3">
                <span className="text-xs font-semibold text-[#FC5E01] block">Point your domain with this DNS record</span>
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left text-[#CBD5E1]">
                    <thead>
                      <tr className="text-[#64748B] text-[10px] uppercase border-b border-[#1e2a4a]">
                        <th className="pb-2">Type</th><th className="pb-2">Host</th><th className="pb-2">Value</th><th className="pb-2 text-right">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2.5 text-blue-400 font-semibold">CNAME</td>
                        <td className="py-2.5 text-white">shop</td>
                        <td className="py-2.5 text-[#94A3B8] font-mono">sites.motohave.com</td>
                        <td className="py-2.5 text-right text-[#64748B]">Auto</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-[#64748B]">After adding the DNS record and saving your domain here, it may take up to 24 hours to activate.</p>
              </div>
            </div>
          )}

          {/* Password */}
          {activeTab === "security" && (
            <form onSubmit={submitPassword} className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-5 max-w-lg">
              <div className="border-b border-[#1e2a4a] pb-4">
                <h3 className="text-sm font-bold text-white">Change Password</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Update the password you use to log in.</p>
              </div>

              <Msg m={pwMsg} />

              <div>
                <label className={labelCls}>Current Password</label>
                <input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} required className={inputCls} placeholder="••••••••" />
              </div>
              <div>
                <label className={labelCls}>New Password</label>
                <input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} required className={inputCls} placeholder="At least 8 characters" />
              </div>
              <div>
                <label className={labelCls}>Confirm New Password</label>
                <input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} required className={inputCls} placeholder="Re-type new password" />
              </div>

              <button type="submit" disabled={savingPw} style={{ backgroundColor: BRAND }} className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
                {savingPw ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                Change Password
              </button>
            </form>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-5">
              <div className="border-b border-[#1e2a4a] pb-4">
                <h3 className="text-sm font-bold text-white">Notifications</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Choose what you want to be notified about.</p>
              </div>

              <Msg m={notifMsg} />

              <div className="divide-y divide-[#1e2a4a]">
                {([
                  { key: "leads", label: "New Leads", desc: "Get notified when a new lead comes in." },
                  { key: "inventory", label: "Inventory Updates", desc: "Get notified when a vehicle's status changes." },
                  { key: "billing", label: "Billing Alerts", desc: "Get notified about invoices and payment issues." },
                ] as const).map((item) => (
                  <div key={item.key} className="py-4 flex items-center justify-between first:pt-0">
                    <div>
                      <span className="block text-sm font-semibold text-white">{item.label}</span>
                      <span className="block text-xs text-[#64748B] mt-0.5">{item.desc}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifs({ ...notifs, [item.key]: !notifs[item.key] })}
                      className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${notifs[item.key] ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"}`}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${notifs[item.key] ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#1e2a4a] pt-4">
                <button onClick={saveNotifs} disabled={savingNotifs} style={{ backgroundColor: BRAND }} className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
                  {savingNotifs ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}