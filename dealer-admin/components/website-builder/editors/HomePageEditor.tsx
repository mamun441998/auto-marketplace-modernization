"use client";

import { useEffect, useState } from "react";
import { ImagePlus, X, Loader2, Check } from "lucide-react";
import { WebsiteData } from "@/lib/websiteData";
import { uploadWebsiteAsset } from "@/lib/website";
import { fetchMyVehicles, type Vehicle } from "@/lib/vehicle";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

function thumb(v: Vehicle): string | null {
  return v.primary_image_url || v.featured_image?.image_url || v.images?.[0]?.image_url || null;
}

export default function HomePageEditor({ data, onChange }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMyVehicles({ per_page: 50, sort_by: "created_at", sort_dir: "desc" });
        if (res.success) setVehicles(res.vehicles ?? []);
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const update = (key: keyof WebsiteData["home"], value: string | number | boolean | number[]) => {
    onChange({ ...data, home: { ...data.home, [key]: value } });
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadWebsiteAsset(file);
      if (res.success) update("heroImage", res.url);
      else alert(res.message || "Upload failed.");
    } catch {
      alert("Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const selected = data.home.featuredVehicleIds ?? [];
  const isManual = selected.length > 0;

  const toggleVehicle = (id: number) => {
    const set = new Set(selected);
    set.has(id) ? set.delete(id) : set.add(id);
    update("featuredVehicleIds", Array.from(set));
  };

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
      <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3">Home Page</h2>

      {/* Hero Title */}
      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Hero Title</label>
        <input
          value={data.home.heroTitle || ""}
          onChange={(e) => update("heroTitle", e.target.value)}
          className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
        />
      </div>

      {/* Hero Description */}
      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Hero Description</label>
        <textarea
          rows={3}
          value={data.home.heroSubtitle || ""}
          onChange={(e) => update("heroSubtitle", e.target.value)}
          className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
        />
      </div>

      {/* Hero Image */}
      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Hero Background Image</label>
        {data.home.heroImage ? (
          <div className="relative rounded-lg overflow-hidden border border-[#1e2a4a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.home.heroImage} alt="Hero" className="w-full h-32 object-cover" />
            <button
              type="button"
              onClick={() => update("heroImage", "")}
              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 h-28 rounded-lg border border-dashed border-[#1e2a4a] bg-[#0A0F1E] cursor-pointer hover:border-[#FC5E01] transition-colors">
            {uploading ? (
              <Loader2 size={18} className="animate-spin text-[#FC5E01]" />
            ) : (
              <>
                <ImagePlus size={18} className="text-[#64748B]" />
                <span className="text-xs text-[#64748B]">Upload hero image</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} disabled={uploading} />
          </label>
        )}
      </div>

      {/* Featured Vehicles — mode */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-[#94A3B8]">Featured Vehicles</label>
          <span className="text-xs font-bold text-[#FC5E01] bg-[#FC5E01]/10 px-2 py-0.5 rounded-md">
            {isManual ? `${selected.length} selected` : `Auto · ${data.home.featuredCount}`}
          </span>
        </div>

        {/* Auto count slider (used only when nothing is manually selected) */}
        <div className={`${isManual ? "opacity-40 pointer-events-none" : ""} mb-3`}>
          <p className="text-[11px] text-[#64748B] mb-1">Auto mode: show latest {data.home.featuredCount} vehicles</p>
          <input
            type="range"
            min="2"
            max="8"
            value={data.home.featuredCount}
            onChange={(e) => update("featuredCount", Number(e.target.value))}
            className="w-full accent-[#FC5E01] h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        <p className="text-[11px] text-[#64748B] mb-2">
          Or pick specific cars below. {isManual && (
            <button type="button" onClick={() => update("featuredVehicleIds", [])} className="text-[#FC5E01] font-semibold hover:underline">
              Clear selection (use auto)
            </button>
          )}
        </p>

        {/* Vehicle picker */}
        <div className="max-h-64 overflow-y-auto space-y-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] p-2">
          {vehicles.length === 0 ? (
            <p className="text-[11px] text-[#64748B] py-4 text-center">No vehicles found. Add cars in Inventory.</p>
          ) : (
            vehicles.map((v) => {
              const img = thumb(v);
              const checked = selected.includes(v.id);
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => toggleVehicle(v.id)}
                  className={`w-full flex items-center gap-3 rounded-lg border p-2 text-left transition-colors ${
                    checked ? "border-[#FC5E01] bg-[#FC5E01]/10" : "border-[#1e2a4a] hover:border-[#2d3d5e]"
                  }`}
                >
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt="" className="h-10 w-14 rounded object-cover flex-shrink-0" />
                  ) : (
                    <div className="h-10 w-14 rounded bg-[#1e2a4a] flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{v.make} {v.model}</p>
                    <p className="text-[10px] text-[#64748B]">{v.year} · {v.formatted_price || `$${Number(v.price).toLocaleString()}`}</p>
                  </div>
                  <span className={`h-5 w-5 rounded flex items-center justify-center flex-shrink-0 ${checked ? "bg-[#FC5E01] text-white" : "border border-[#1e2a4a]"}`}>
                    {checked && <Check size={13} />}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Financing toggle */}
      <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
        <div>
          <p className="text-sm font-semibold text-white">Show Financing Banner</p>
          <p className="text-xs text-[#64748B]">Display a financing callout on the home page</p>
        </div>
        <button
          type="button"
          onClick={() => update("showFinancing", !data.home.showFinancing)}
          className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors duration-200 ${
            data.home.showFinancing ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
              data.home.showFinancing ? "translate-x-[18px]" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}