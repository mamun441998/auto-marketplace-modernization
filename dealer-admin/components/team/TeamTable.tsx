// dealer-admin/components/team/TeamTable.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  UserCog,
  Trash2,
  Mail,
} from "lucide-react";
import InviteTeamMemberModal from "./InviteTeamMemberModal";
import EmptyState from "@/components/shared/EmptyState";
import { teamMembers, TeamMember } from "@/lib/dealerData";

const roleStyles: Record<string, string> = {
  Owner: "bg-[#FC5E01]/10 text-[#FC5E01] border-[#FC5E01]/20",
  Manager: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Sales Staff": "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Invited: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function TeamTable() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (member: TeamMember, action: string) => {
    // Backend connect korar somoy ekhane API call hobe

    if (action === "remove") {
      if (confirm(`Remove ${member.name} from your team?`)) {
        alert("Team member removed (backend not connected yet)");
      }
    } else if (action === "resend") {
      alert(`Invite resent to ${member.email} (backend not connected yet)`);
    } else {
      alert(
        `Action "${action}" triggered for ${member.name} (backend not connected yet)`
      );
    }

    setOpenMenuId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#94A3B8]">
          <span className="font-bold text-white">{teamMembers.length}</span>{" "}
          team member(s)
        </p>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E5540A]"
        >
          <UserCog size={16} />
          Invite Member
        </button>
      </div>

      {teamMembers.length === 0 ? (
        <EmptyState
          icon={UserCog}
          title="No team members yet"
          description="Invite your staff to help manage your dealership."
        />
      ) : (
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-[#1e2a4a]">
                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Member
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Role
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Last Active
                  </th>

                  <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {teamMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${member.gradient} text-xs font-bold text-white`}
                        >
                          {member.avatarInitials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {member.name}
                          </p>

                          <p className="truncate text-[11px] text-[#64748B]">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${roleStyles[member.role]}`}
                      >
                        {member.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusStyles[member.status]}`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-sm text-[#94A3B8]">
                      {member.lastActive
                        ? new Date(member.lastActive).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "—"}
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      {member.role !== "Owner" && (
                        <>
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === member.id ? null : member.id
                              )
                            }
                            className="rounded-lg p-1.5 text-[#94A3B8] transition-colors hover:bg-[#0A0F1E] hover:text-white"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openMenuId === member.id && (
                            <div
                              ref={menuRef}
                              className="absolute right-5 top-full z-20 mt-1 w-48 rounded-xl border border-[#1e2a4a] bg-[#0C1A32] p-1.5 text-left shadow-xl"
                            >
                              <button
                                onClick={() =>
                                  handleAction(member, "change-role")
                                }
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white transition-colors hover:bg-[#111B33]"
                              >
                                <UserCog
                                  size={15}
                                  className="text-[#94A3B8]"
                                />
                                Change Role
                              </button>

                              {member.status === "Invited" && (
                                <button
                                  onClick={() =>
                                    handleAction(member, "resend")
                                  }
                                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-blue-400 transition-colors hover:bg-[#111B33]"
                                >
                                  <Mail size={15} />
                                  Resend Invite
                                </button>
                              )}

                              <button
                                onClick={() =>
                                  handleAction(member, "remove")
                                }
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-400 transition-colors hover:bg-[#111B33]"
                              >
                                <Trash2 size={15} />
                                Remove Member
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <InviteTeamMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </div>
  );
}