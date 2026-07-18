// dealer-admin/components/dashboard/OnboardingChecklist.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, X, PartyPopper } from "lucide-react";
import { inventoryVehicles, teamMembers } from "@/lib/dealerData";

interface ChecklistItem {
  id: number;
  label: string;
  description: string;
  href: string;
  completed: boolean;
}

export default function OnboardingChecklist() {
  const [dismissed, setDismissed] = useState(false);

  // 💡 Backend connect korar somoy: eikhane real dealer profile/domain status theke asbe
  const checklistItems: ChecklistItem[] = [
    {
      id: 1,
      label: "Add your first vehicle",
      description: "List a vehicle to start selling on MotoHave.",
      href: "/inventory/add",
      completed: inventoryVehicles.length > 0,
    },
    {
      id: 2,
      label: "Complete your dealership profile",
      description: "Add your business details and address.",
      href: "/settings",
      completed: true, // Mock e already filled dhora hocche
    },
    {
      id: 3,
      label: "Invite your team",
      description: "Add staff members to help manage your dealership.",
      href: "/team",
      completed: teamMembers.length > 1,
    },
    {
      id: 4,
      label: "Connect your custom domain",
      description: "Use your own domain for your dealership website.",
      href: "/settings?tab=domain",
      completed: false,
    },
    {
      id: 5,
      label: "Explore your Analytics",
      description: "See how your dealership is performing.",
      href: "/analytics",
      completed: false,
    },
  ];

  const completedCount = checklistItems.filter((item) => item.completed).length;
  const totalCount = checklistItems.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isAllComplete = completedCount === totalCount;

  if (dismissed || isAllComplete) return null;

  return (
    <div className="rounded-2xl border border-[#FC5E01]/30 bg-gradient-to-br from-[#111B33] to-[#0C1A32] p-6 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#FC5E01]/10 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Complete Your Dealership Setup</h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            {completedCount} of {totalCount} steps completed — you&apos;re almost there!
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#64748B] hover:text-white transition-colors flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 rounded-full bg-[#0A0F1E] overflow-hidden mb-5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FC5E01] to-[#E5540A] transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist Items */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {checklistItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
              item.completed
                ? "border-[#1e2a4a] bg-[#0A0F1E]/30"
                : "border-[#1e2a4a] bg-[#0A0F1E]/50 hover:border-[#FC5E01]/40"
            }`}
          >
            {item.completed ? (
              <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle size={18} className="text-[#64748B] flex-shrink-0 mt-0.5" />
            )}
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${item.completed ? "text-[#94A3B8] line-through" : "text-white"}`}>
                {item.label}
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {isAllComplete && (
        <div className="relative mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
          <PartyPopper size={18} className="text-emerald-400" />
          <p className="text-sm font-semibold text-emerald-400">All set! Your dealership is ready to go.</p>
        </div>
      )}
    </div>
  );
}