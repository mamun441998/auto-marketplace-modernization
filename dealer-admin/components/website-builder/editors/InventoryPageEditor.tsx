"use client";

import { WebsiteData } from "@/lib/websiteData";
import { inventoryVehicles } from "@/lib/dealerData";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

export default function InventoryPageEditor({ data, onChange }: Props) {
  const update = (key: keyof WebsiteData["inventory"], value: string | boolean) => {
    onChange({
      ...data,
      inventory: {
        ...data.inventory,
        [key]: value,
      },
    });
  };

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
      <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3">Inventory Page</h2>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Page Title</label>
        <input
          value={data.inventory.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Page Description</label>
        <textarea
          rows={3}
          value={data.inventory.subtitle}
          onChange={(e) => update("subtitle", e.target.value)}
          className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
        <div>
          <p className="text-sm font-semibold text-white">Show Inventory Page</p>
          <p className="text-xs text-[#64748B]">This page automatically syncs with your live inventory</p>
        </div>
        <button
  type="button"
  onClick={() => update("enabled", !data.inventory.enabled)}
  className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors duration-200 ${
    data.inventory.enabled
      ? "bg-[#FC5E01]"
      : "bg-[#1e2a4a]"
  }`}
>
  <span
    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
      data.inventory.enabled
        ? "translate-x-[18px]"
        : "translate-x-0"
    }`}
  />
</button>
      </div>

      <p className="text-xs text-[#64748B]">
        Currently showing {inventoryVehicles.length} vehicles from your inventory.
      </p>
    </div>
  );
}