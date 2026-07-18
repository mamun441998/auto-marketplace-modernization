// dealer-admin/components/inventory/VehicleGallery.tsx
"use client";

import { useState } from "react";

interface VehicleGalleryProps {
  photoCount?: number;
}

export default function VehicleGallery({ photoCount = 5 }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const placeholderPhotos = Array.from({ length: photoCount });

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
      {/* Main Image */}
      <div className="relative aspect-video rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] flex items-center justify-center mb-3">
        <span className="text-6xl">🚗</span>
        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-xs font-semibold text-white">
          {activeIndex + 1} / {photoCount}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {placeholderPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`aspect-square rounded-lg border flex items-center justify-center transition-colors ${
              activeIndex === index
                ? "border-[#FC5E01] bg-[#FC5E01]/10"
                : "border-[#1e2a4a] bg-[#0A0F1E] hover:border-[#2d3d5e]"
            }`}
          >
            <span className="text-lg">🚗</span>
          </button>
        ))}
      </div>
    </div>
  );
}