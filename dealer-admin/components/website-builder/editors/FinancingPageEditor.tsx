"use client";

import { WebsiteData } from "@/lib/websiteData";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

export default function FinancingPageEditor({
  data,
  onChange
}: Props) {

  const update = (key: string, value: any) => {
    onChange({
      ...data,
      financing: {
        ...data.financing,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-5">

      <h2 className="text-lg font-bold text-white">
        Financing Page
      </h2>

      <input
        value={data.financing.title}
        onChange={(e) => update("title", e.target.value)}
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white"
      />

      <textarea
        rows={4}
        value={data.financing.subtitle}
        onChange={(e) => update("subtitle", e.target.value)}
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white resize-none"
      />

      <div className="flex items-center justify-between rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-4">
        <span className="text-white font-medium">
          Enable Financing Page
        </span>
        <input
          type="checkbox"
          checked={data.financing.enabled}
          onChange={(e) => update("enabled", e.target.checked)}
        />
      </div>

    </div>
  );
}