// dealer-admin/app/settings/page.tsx
"use client";

import { useState } from "react";
import {
  Building,
  Gauge,
  CreditCard,
  Bell,
  Globe,
  Key,
  Check,
  Network,
  RefreshCw,
} from "lucide-react";
import LocalizationSettings from "@/components/settings/LocalizationSettings";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PlanUsageSettings from "@/components/settings/PlanUsageSettings";
import BillingSettings from "@/components/settings/BillingSettings";

type SettingTab = "profile" | "usage" | "billing" | "domain" | "security" | "notifications" | "localization";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>("profile");

  // Domain connect state
  const [domain, setDomain] = useState("shop.andersonauto.com");
  const [dnsVerified, setDnsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Notification toggles
  const [notifs, setNotifs] = useState({ leads: true, inventory: false, billing: true });
  const [copied, setCopied] = useState(false);

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
        { id: "security" as SettingTab, label: "API Keys", desc: "Integrations and access tokens", icon: Key },
        { id: "notifications" as SettingTab, label: "Notifications", desc: "Choose what you're notified about", icon: Bell },
        { id: "localization" as SettingTab, label: "Localization", desc: "Currency and timezone", icon: Globe },
      ],
    },
  ];

  const verifyDNS = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setDnsVerified(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Manage your dealership profile, plan, billing and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <div className="space-y-5 lg:col-span-1">
          {sidebarGroups.map((group) => (
            <div key={group.group} className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-[#64748B] tracking-wider px-2 block">
                {group.group}
              </span>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-colors ${
                        isActive
                          ? "bg-[#111B33] border border-[#FC5E01]/40 text-[#FC5E01]"
                          : "border border-transparent text-[#94A3B8] hover:bg-[#111B33]"
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

          {/* Domain Tab */}
          {activeTab === "domain" && (
            <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#1e2a4a] pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Custom Domain</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">Connect your own domain to your dealership website.</p>
                </div>
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                    dnsVerified
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {dnsVerified ? "Connected" : "Pending Verification"}
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#94A3B8]">Your Domain</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value);
                      setDnsVerified(false);
                    }}
                    className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#FC5E01]"
                    placeholder="e.g. shop.yourdomain.com"
                  />
                  <button
                    onClick={verifyDNS}
                    disabled={verifying}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FC5E01] text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    <RefreshCw size={14} className={verifying ? "animate-spin" : ""} />
                    {verifying ? "Checking..." : "Verify DNS"}
                  </button>
                </div>
              </div>

              {/* DNS Records Guide */}
              <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-4 space-y-3">
                <span className="text-xs font-semibold text-[#FC5E01] block">Add This DNS Record</span>
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left text-[#CBD5E1]">
                    <thead>
                      <tr className="text-[#64748B] text-[10px] uppercase border-b border-[#1e2a4a]">
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Host</th>
                        <th className="pb-2">Value</th>
                        <th className="pb-2 text-right">TTL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2a4a]">
                      <tr>
                        <td className="py-2.5 text-blue-400 font-semibold">CNAME</td>
                        <td className="py-2.5 text-white">shop</td>
                        <td className="py-2.5 text-[#94A3B8] font-mono">sites.motohave.com</td>
                        <td className="py-2.5 text-right text-[#64748B]">Auto</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === "security" && (
            <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white">API Keys</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Use this key to connect third-party integrations.</p>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#94A3B8]">Your API Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    readOnly
                    value="sk_live_51NxYzAndersonAuto8Kd2"
                    className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-[#94A3B8] font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("sk_live_51NxYzAndersonAuto8Kd2");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-4 py-2.5 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] text-sm font-semibold text-white hover:border-[#FC5E01] transition-colors min-w-[80px]"
                  >
                    {copied ? <Check size={15} className="text-emerald-400 mx-auto" /> : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white">Notifications</h3>
                <p className="text-xs text-[#64748B] mt-0.5">Choose what you want to be notified about.</p>
              </div>
              <div className="divide-y divide-[#1e2a4a]">
                {[
                  { key: "leads" as const, label: "New Leads", desc: "Get notified when a new lead comes in." },
                  { key: "inventory" as const, label: "Inventory Updates", desc: "Get notified when a vehicle's status changes." },
                  { key: "billing" as const, label: "Billing Alerts", desc: "Get notified about invoices and payment issues." },
                ].map((item) => (
                  <div key={item.key} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                    <div>
                      <span className="block text-sm font-semibold text-white">{item.label}</span>
                      <span className="block text-xs text-[#64748B] mt-0.5">{item.desc}</span>
                    </div>
                    <button
  onClick={() =>
    setNotifs({
      ...notifs,
      [item.key]: !notifs[item.key],
    })
  }
  className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
    notifs[item.key] ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"
  }`}
>
  <span
    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
      notifs[item.key] ? "left-[22px]" : "left-0.5"
    }`}
  />
</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Localization Tab */}
          {activeTab === "localization" && <LocalizationSettings />}
        </div>
      </div>
    </div>
  );
}