"use client";

import { useRef } from "react";
import {
  ImagePlus,
  Trash2,
  RefreshCw,
  UploadCloud,
} from "lucide-react";

interface ImageUploaderProps {
  label: string;

  value: string;

  onChange: (value: string) => void;

  recommended?: string;

  maxSize?: string;

  accept?: string;

  disabled?: boolean;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  recommended = "400 × 120 px",

  maxSize = "2 MB",

  accept = "image/*",

  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBrowse = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Backend connect hole ekhane upload API call hobe

    const url = URL.createObjectURL(file);

    onChange(url);
  };

  return (
    <div className="space-y-3">

      <div>

        <h4 className="text-sm font-semibold text-white">
          {label}
        </h4>

        <p className="mt-1 text-xs text-[#94A3B8]">
          Recommended {recommended} • Max {maxSize}
        </p>

      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        onChange={handleFile}
      />

      {!value ? (
        <button
          type="button"
          disabled={disabled}
          onClick={handleBrowse}
          className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2A3958] bg-[#0A0F1E] transition hover:border-[#FC5E01]"
        >
          <ImagePlus
            size={42}
            className="text-[#FC5E01]"
          />

          <p className="mt-4 text-sm font-semibold text-white">
            Upload Image
          </p>

          <p className="mt-1 text-xs text-[#64748B]">
            PNG • JPG • WEBP • SVG
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#FC5E01] px-4 py-2 text-sm font-semibold text-white">
            <UploadCloud size={16} />
            Browse Files
          </div>
        </button>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#1e2a4a]">

          <img
            src={value}
            alt=""
            className="h-56 w-full object-contain bg-[#0A0F1E]"
          />

          <div className="flex gap-3 border-t border-[#1e2a4a] bg-[#111B33] p-4">

            <button
              type="button"
              onClick={handleBrowse}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2A3958] py-2 text-sm text-white transition hover:border-[#FC5E01]"
            >
              <RefreshCw size={16} />

              Replace
            </button>

            <button
              type="button"
              onClick={() => onChange("")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={16} />

              Remove
            </button>

          </div>

        </div>
      )}
    </div>
  );
}