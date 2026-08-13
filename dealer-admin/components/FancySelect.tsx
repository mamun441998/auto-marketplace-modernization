"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function FancySelect({ value, onChange, options, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 rounded-lg border bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-left text-white focus:outline-none transition-colors"
        style={{ borderColor: open ? "#FC5E01" : "#1e2a4a" }}
      >
        <span className={current ? "text-white" : "text-[#64748B]"}>{current?.label || placeholder}</span>
        <ChevronDown size={16} className={`text-[#64748B] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-full rounded-lg border border-[#1e2a4a] bg-[#111B33] shadow-2xl overflow-hidden max-h-64 overflow-y-auto py-1">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className="w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between transition-colors text-white"
                style={active ? { background: "#FC5E01" } : undefined}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#0A0F1E"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = ""; }}
              >
                {o.label}
                {active && <Check size={15} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}