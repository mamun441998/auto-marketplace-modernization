// admin/app/settings/page.tsx
"use client";

import { useState } from "react";
import SettingsTabs, { SettingsTab } from "@/components/settings/SettingsTabs";
import GeneralSettings from "@/components/settings/GeneralSettings";
import PaymentSettings from "@/components/settings/PaymentSettings";
import EmailSettings from "@/components/settings/EmailSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Configure platform-wide settings, payment gateways and notifications.
        </p>
      </div>

      {/* Tabs + Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 min-w-0">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "payment" && <PaymentSettings />}
          {activeTab === "email" && <EmailSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
}