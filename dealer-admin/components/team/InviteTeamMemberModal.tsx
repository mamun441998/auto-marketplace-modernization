"use client";

import { useState } from "react";
import { X, UserPlus, Lock } from "lucide-react";
import { teamMembers } from "@/lib/dealerData";
import { getCurrentDealerPlan } from "@/lib/planConfig";

interface InviteTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteTeamMemberModal({ isOpen, onClose }: InviteTeamMemberModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Sales Staff");

  const currentPlan = getCurrentDealerPlan();
  const isUnlimited = currentPlan.maxTeamMembers === "unlimited";
  const isAtLimit = !isUnlimited && teamMembers.length >= currentPlan.maxTeamMembers;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAtLimit) return;
    alert("Invite sent to " + email + " as " + role + " (backend not connected yet)");
    setName("");
    setEmail("");
    setRole("Sales Staff");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FC5E01]/10 text-[#FC5E01]">
              <UserPlus size={18} />
            </div>
            <h3 className="text-base font-bold text-white">Invite Team Member</h3>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {isAtLimit ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4">
              <Lock size={26} />
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Team Member Limit Reached</h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-5">
              Your {currentPlan.tier} plan allows up to {currentPlan.maxTeamMembers} team member(s). Upgrade your plan to invite more staff.
            </p>
            <a href="/settings?tab=billing" className="rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors">
              Upgrade Plan
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Smith"
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. jane@dealership.com"
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
              >
                <option value="Manager" className="bg-[#0A0F1E]">Manager</option>
                <option value="Sales Staff" className="bg-[#0A0F1E]">Sales Staff</option>
              </select>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
              >
                Send Invite
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}