"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option { value: string; label: string; }

export default function FancySelect({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
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
        className="w-full flex items-center justify-between gap-2 rounded-lg border bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-left focus:outline-none transition-colors"
        style={{ borderColor: open ? "#FC5E01" : "#1e2a4a" }}
      >
        <span className={current ? "text-white" : "text-[#64748B]"}>{current?.label || placeholder}</span>
        <ChevronDown size={16} className={`text-[#64748B] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-lg border border-[#1e2a4a] bg-[#0C1A32] shadow-xl overflow-hidden max-h-64 overflow-y-auto py-1">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className="w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between transition-colors"
                style={active ? { background: "#FC5E01", color: "#fff" } : undefined}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#111B33"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = ""; }}
              >
                <span className={active ? "text-white" : "text-[#94A3B8]"}>{o.label}</span>
                {active && <Check size={15} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}