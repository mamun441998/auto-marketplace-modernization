// admin/components/settings/SettingsTabs.tsx
"use client";

import { Settings2, CreditCard, Mail, Bell } from "lucide-react";

export type SettingsTab = "general" | "payment" | "email" | "notifications";

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs: { id: SettingsTab; label: string; icon: typeof Settings2 }[] = [
    { id: "general", label: "General", icon: Settings2 },
    { id: "payment", label: "Payment Gateway", icon: CreditCard },
    { id: "email", label: "Email Templates", icon: Mail },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="flex flex-col gap-1 w-full lg:w-56 flex-shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors text-left ${
              isActive
                ? "bg-[#FC5E01] text-white"
                : "text-[#94A3B8] hover:bg-[#111B33] hover:text-white"
            }`}
          >
            <Icon size={17} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}