"use client";

import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Save,
  Rocket,
  Loader2,
} from "lucide-react";

interface BuilderHeaderProps {
  websiteName: string;
  status: "draft" | "published" | "maintenance";

  device: "desktop" | "tablet" | "mobile";
  onDeviceChange: (device: "desktop" | "tablet" | "mobile") => void;

  isSaving?: boolean;
  lastSaved?: string;

  onSave?: () => void;
  onPublish?: () => void;
  onPreview?: () => void;
}

export default function BuilderHeader({
  websiteName,
  status,
  device,
  onDeviceChange,
  isSaving = false,
  lastSaved = "Just now",
  onSave,
  onPublish,
  onPreview,
}: BuilderHeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between rounded-2xl border border-[#1e2a4a] bg-[#111B33] px-6 py-4">

      {/* LEFT */}
      <div>
        <h1 className="text-lg font-bold text-white">
          {websiteName}
        </h1>

        <div className="mt-1 flex items-center gap-2">

          <span
            className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
              status === "published"
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {status}
          </span>

          <span className="text-xs text-[#64748B]">
            {isSaving ? "Saving..." : `Last saved ${lastSaved}`}
          </span>

        </div>
      </div>

      {/* CENTER */}
      <div className="flex items-center rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-1">

        {[
          {
            id: "desktop",
            icon: Monitor,
          },
          {
            id: "tablet",
            icon: Tablet,
          },
          {
            id: "mobile",
            icon: Smartphone,
          },
        ].map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onDeviceChange(item.id as any)}
              className={`rounded-lg p-2 transition ${
                device === item.id
                  ? "bg-[#FC5E01] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        <button
          onClick={onPreview}
          className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2 text-sm font-medium text-white"
        >
          <Eye size={16} />
          Preview
        </button>

        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2 text-sm font-medium text-white"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}

          Save Draft
        </button>

        <button
          onClick={onPublish}
          className="flex items-center gap-2 rounded-xl bg-[#FC5E01] px-5 py-2 text-sm font-semibold text-white hover:bg-[#E55700]"
        >
          <Rocket size={16} />
          Publish
        </button>

      </div>
    </div>
  );
}