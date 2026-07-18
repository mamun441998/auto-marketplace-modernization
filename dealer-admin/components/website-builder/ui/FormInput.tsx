"use client";

import { InputHTMLAttributes, ReactNode } from "react";

interface FormInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  label: string;
  value: string;
  onChange: (value: string) => void;

  description?: string;
  icon?: ReactNode;

  required?: boolean;
  error?: string;
}

export default function FormInput({
  label,
  value,
  onChange,

  description,
  icon,

  required = false,
  error,

  className = "",

  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">

      {/* Label */}

      <label className="flex items-center gap-2 text-sm font-semibold text-white">

        {icon && (
          <span className="text-[#FC5E01]">
            {icon}
          </span>
        )}

        <span>
          {label}
        </span>

        {required && (
          <span className="text-red-500">*</span>
        )}

      </label>

      {description && (
        <p className="text-xs text-[#64748B]">
          {description}
        </p>
      )}

      {/* Input */}

      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-sm text-white placeholder:text-[#64748B] transition-all duration-200 outline-none focus:border-[#FC5E01] focus:ring-4 focus:ring-[#FC5E01]/10 ${className}`}
      />

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}