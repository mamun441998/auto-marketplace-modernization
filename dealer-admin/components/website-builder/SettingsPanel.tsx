"use client";

import { Sliders, Settings } from "lucide-react";
import { WebsiteData, websiteThemes } from "@/lib/websiteData";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

export default function SettingsPanel({ data, onChange }: Props) {
  const updateSettings = (key: keyof WebsiteData["settings"], value: string | boolean | typeof websiteThemes[number]) => {
    onChange({
      ...data,
      settings: {
        ...data.settings,
        [key]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Theme Color */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Sliders size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Theme Color</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {websiteThemes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => updateSettings("theme", theme)}
              className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-colors ${
                data.settings.theme.id === theme.id
                  ? "border-[#FC5E01] bg-[#0A0F1E]"
                  : "border-[#1e2a4a] bg-[#0A0F1E]/40 hover:border-[#2d3d5e]"
              }`}
            >
              <span className="h-4 w-4 rounded-full flex-shrink-0" style={{ backgroundColor: theme.primary }} />
              <span className="text-xs font-semibold text-white truncate">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact & Widget Settings */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Settings size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Contact & Widget</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Contact Phone Number</label>
          <input
            value={data.settings.contactPhone}
            onChange={(e) => updateSettings("contactPhone", e.target.value)}
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
          <div>
            <p className="text-sm font-semibold text-white">Live Chat Widget</p>
            <p className="text-xs text-[#64748B]">Show a chat bubble on your website</p>
          </div>
          <button
  type="button"
  onClick={() =>
    updateSettings(
      "enableChatWidget",
      !data.settings.enableChatWidget
    )
  }
  className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors duration-200 ${
    data.settings.enableChatWidget
      ? "bg-[#FC5E01]"
      : "bg-[#1e2a4a]"
  }`}
>
  <span
    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
      data.settings.enableChatWidget
        ? "translate-x-[18px]"
        : "translate-x-0"
    }`}
  />
</button>
        </div>
      </div>
    </div>
  );
}