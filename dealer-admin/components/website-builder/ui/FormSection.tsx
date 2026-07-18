"use client";

import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export default function FormSection({
  title,
  description,
  icon,
  children,
  actions,
}: FormSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#1e2a4a] bg-[#111B33]">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#1e2a4a] px-5 py-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]">
              {icon}
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-white">{title}</h3>

            {description && (
              <p className="mt-1 text-xs leading-5 text-[#94A3B8]">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && <div>{actions}</div>}
      </div>

      {/* Body */}
      <div className="space-y-5 p-5">{children}</div>
    </section>
  );
}