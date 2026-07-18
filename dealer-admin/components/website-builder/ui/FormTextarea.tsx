"use client";

import { ReactNode, TextareaHTMLAttributes } from "react";

interface FormTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
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

export default function FormTextarea({
  label,
  value,
  onChange,

  description,
  icon,

  required = false,
  error,

  rows = 5,

  className = "",

  ...props
}: FormTextareaProps) {
  return (
    <div className="space-y-2">

      <label className="flex items-center gap-2 text-sm font-semibold text-white">

        {icon && (
          <span className="text-[#FC5E01]">
            {icon}
          </span>
        )}

        <span>{label}</span>

        {required && (
          <span className="text-red-500">*</span>
        )}

      </label>

      {description && (
        <p className="text-xs text-[#64748B]">
          {description}
        </p>
      )}

      <textarea
        {...props}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full resize-none rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-sm text-white placeholder:text-[#64748B] outline-none transition-all duration-200 focus:border-[#FC5E01] focus:ring-4 focus:ring-[#FC5E01]/10 ${className}`}
      />

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}