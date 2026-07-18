"use client";

import { WebsiteData } from "@/lib/websiteData";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

export default function HomePageEditor({ data, onChange }: Props) {
  const update = (key: keyof WebsiteData["home"], value: string | number | boolean) => {
    onChange({
      ...data,
      home: {
        ...data.home,
        [key]: value,
      },
    });
  };

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
      <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3">Home Page</h2>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Hero Title</label>
        <input
          value={data.home.heroTitle}
          onChange={(e) => update("heroTitle", e.target.value)}
          className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Hero Description</label>
        <textarea
          rows={3}
          value={data.home.heroSubtitle}
          onChange={(e) => update("heroSubtitle", e.target.value)}
          className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-[#94A3B8]">Featured Vehicles</label>
          <span className="text-xs font-bold text-[#FC5E01] bg-[#FC5E01]/10 px-2 py-0.5 rounded-md">
            {data.home.featuredCount} vehicles
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          value={data.home.featuredCount}
          onChange={(e) => update("featuredCount", Number(e.target.value))}
          className="w-full accent-[#FC5E01] h-1.5 rounded-lg cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
        <div>
          <p className="text-sm font-semibold text-white">Show Financing Banner</p>
          <p className="text-xs text-[#64748B]">Display a financing callout on the home page</p>
        </div>
       <button
  type="button"
  onClick={() => update("showFinancing", !data.home.showFinancing)}
  className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors duration-200 ${
    data.home.showFinancing
      ? "bg-[#FC5E01]"
      : "bg-[#1e2a4a]"
  }`}
>
  <span
    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
      data.home.showFinancing
        ? "translate-x-[18px]"
        : "translate-x-0"
    }`}
  />
</button>
      </div>
    </div>
  );
}