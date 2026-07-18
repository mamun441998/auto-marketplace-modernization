// dealer-admin/components/shared/EmptyState.tsx
"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-[#1e2a4a] bg-[#111B33] py-16 px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A0F1E] border border-[#1e2a4a] text-[#64748B] mb-4">
        <Icon size={26} />
      </div>
      <h3 className="text-sm font-bold text-white mb-1.5">{title}</h3>
      <p className="text-xs text-[#64748B] max-w-sm mb-5">{description}</p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}