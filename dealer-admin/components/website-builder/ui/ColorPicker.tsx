"use client";

import { Palette, RotateCcw, Copy } from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;

  defaultColor?: string;
  description?: string;
}

const presets = [
  "#FC5E01",
  "#2563EB",
  "#10B981",
  "#8B5CF6",
  "#EF4444",
  "#F59E0B",
  "#14B8A6",
  "#111B33",
];

export default function ColorPicker({
  label,
  value,
  onChange,
  defaultColor,
  description,
}: ColorPickerProps) {
  const copyColor = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  };

  return (
    <div className="space-y-3">

      <div>
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-[#FC5E01]" />

          <h4 className="text-sm font-semibold text-white">
            {label}
          </h4>
        </div>

        {description && (
          <p className="mt-1 text-xs text-[#94A3B8]">
            {description}
          </p>
        )}
      </div>

      {/* Preview */}

      <div className="flex items-center gap-3">

        <button
          type="button"
          className="h-12 w-12 rounded-xl border border-[#1e2a4a]"
          style={{
            background: value,
          }}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-sm text-white outline-none focus:border-[#FC5E01]"
        />

        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-12 cursor-pointer rounded-xl border border-[#1e2a4a] bg-transparent"
        />
      </div>

      {/* Presets */}

      <div className="flex flex-wrap gap-2">

        {presets.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`h-8 w-8 rounded-lg border-2 transition ${
              value === color
                ? "border-white scale-110"
                : "border-[#1e2a4a]"
            }`}
            style={{
              background: color,
            }}
          />
        ))}

      </div>

      {/* Actions */}

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={copyColor}
          className="flex items-center gap-2 rounded-lg border border-[#1e2a4a] px-3 py-2 text-xs text-white hover:bg-[#0A0F1E]"
        >
          <Copy size={14} />
          Copy
        </button>

        {defaultColor && (
          <button
            type="button"
            onClick={() => onChange(defaultColor)}
            className="flex items-center gap-2 rounded-lg border border-[#1e2a4a] px-3 py-2 text-xs text-white hover:bg-[#0A0F1E]"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        )}

      </div>

    </div>
  );
}