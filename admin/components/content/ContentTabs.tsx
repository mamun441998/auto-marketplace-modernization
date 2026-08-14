// admin/components/content/ContentTabs.tsx
"use client";

import { MessageSquareQuote, HelpCircle } from "lucide-react";

interface ContentTabsProps {
  activeTab: "testimonials" | "faq";
  onTabChange: (tab: "testimonials" | "faq") => void;
}

export default function ContentTabs({ activeTab, onTabChange }: ContentTabsProps) {
  const tabs = [
    { id: "testimonials" as const, label: "Testimonials", icon: MessageSquareQuote },
    { id: "faq" as const, label: "FAQ", icon: HelpCircle },
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-[#1e2a4a] bg-[#111B33] p-1.5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-[#FC5E01] text-white"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}