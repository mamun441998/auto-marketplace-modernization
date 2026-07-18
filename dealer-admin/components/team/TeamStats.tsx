// dealer-admin/components/team/TeamStats.tsx
"use client";

import { Users, UserCheck, MailQuestion } from "lucide-react";
import { teamMembers } from "@/lib/dealerData";
import { getCurrentDealerPlan } from "@/lib/planConfig";

export default function TeamStats() {
  const currentPlan = getCurrentDealerPlan();
  const activeCount = teamMembers.filter((m) => m.status === "Active").length;
  const invitedCount = teamMembers.filter((m) => m.status === "Invited").length;
  const totalCount = teamMembers.length;

  const isUnlimited = currentPlan.maxTeamMembers === "unlimited";
  const usagePercent = isUnlimited
    ? 0
    : Math.min(100, (totalCount / currentPlan.maxTeamMembers) * 100);
  const isNearLimit = !isUnlimited && usagePercent >= 80;
  const isAtLimit = !isUnlimited && totalCount >= currentPlan.maxTeamMembers;

  return (
    <div className="flex flex-col gap-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Users size={20} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-white">{totalCount}</p>
          <p className="mt-0.5 text-xs text-[#64748B]">Total Members</p>
        </div>

        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <UserCheck size={20} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-white">{activeCount}</p>
          <p className="mt-0.5 text-xs text-[#64748B]">Active</p>
        </div>

        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 col-span-2 lg:col-span-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <MailQuestion size={20} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-white">{invitedCount}</p>
          <p className="mt-0.5 text-xs text-[#64748B]">Pending Invites</p>
        </div>
      </div>

      {/* Plan Usage Bar */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#FC5E01]" />
            <p className="text-sm font-bold text-white">Team Members Usage</p>
          </div>
          <span className="text-xs font-semibold text-[#94A3B8]">
            {totalCount} / {isUnlimited ? "Unlimited" : currentPlan.maxTeamMembers}
          </span>
        </div>

        {!isUnlimited && (
          <>
            <div className="h-2 rounded-full bg-[#0A0F1E] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isNearLimit ? "bg-rose-500" : "bg-[#FC5E01]"
                }`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            {isAtLimit && (
              <p className="mt-2 text-xs text-rose-400 font-medium">
                You&apos;ve reached your team member limit on the {currentPlan.tier} plan.{" "}
                <a href="/settings?tab=billing" className="underline hover:text-rose-300">
                  Upgrade
                </a>{" "}
                to add more members.
              </p>
            )}
          </>
        )}
        {isUnlimited && (
          <p className="text-xs text-emerald-400 font-medium">
            ✓ Unlimited team members included in your {currentPlan.tier} plan
          </p>
        )}
      </div>
    </div>
  );
}