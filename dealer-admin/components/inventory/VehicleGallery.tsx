"use client";

import { useState } from "react";
import { VehicleImage } from "@/lib/vehicle";

interface VehicleGalleryProps {
  images?: VehicleImage[];
}

export default function VehicleGallery({ images = [] }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // No images -> friendly placeholder.
  if (!images.length) {
    return (
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <div className="aspect-video rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] flex flex-col items-center justify-center gap-2">
          <span className="text-6xl">🚗</span>
          <span className="text-xs text-[#64748B]">No photos uploaded yet</span>
        </div>
      </div>
    );
  }

  const safeIndex = Math.min(activeIndex, images.length - 1);
  const active = images[safeIndex];

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
      {/* Main Image */}
      <div className="relative aspect-video rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] overflow-hidden flex items-center justify-center mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active.image_url}
          alt={active.alt_text ?? ""}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-xs font-semibold text-white">
          {safeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(index)}
            className={`aspect-square rounded-lg border overflow-hidden transition-colors ${
              safeIndex === index
                ? "border-[#FC5E01] ring-1 ring-[#FC5E01]/40"
                : "border-[#1e2a4a] hover:border-[#2d3d5e]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.image_url} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}