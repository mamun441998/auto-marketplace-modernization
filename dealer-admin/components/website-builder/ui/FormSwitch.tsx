"use client";

import { ReactNode } from "react";

interface FormSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;

  description?: string;
  icon?: ReactNode;

  disabled?: boolean;
  loading?: boolean;
}

export default function FormSwitch({
  label,
  checked,
  onChange,
  description,
  icon,
  disabled = false,
  loading = false,
}: FormSwitchProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]">
            {icon}
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-white">
            {label}
          </h4>

          {description && (
            <p className="mt-1 text-xs leading-5 text-[#94A3B8]">
              {description}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled || loading}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition-all duration-300 ${
          checked
            ? "bg-[#FC5E01]"
            : "bg-[#25314f]"
        } ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}