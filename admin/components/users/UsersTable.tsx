"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Ban, CheckCircle2, Trash2 } from "lucide-react";
import type { AdminUserRow } from "@/lib/adminUsers";

const roleStyles: Record<string, string> = {
  super_admin: "text-violet-400",
  admin: "text-orange-400",
  dealer: "text-blue-400",
};
const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  suspended: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};
const GRADIENTS = [
  "from-blue-500 to-cyan-500", "from-violet-500 to-fuchsia-500", "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500", "from-sky-500 to-blue-600", "from-pink-500 to-rose-500",
];
function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "U";
}

interface Props {
  users: AdminUserRow[];
  loading: boolean;
  onRoleChange: (id: number, role: string) => void;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

export default function UsersTable({ users, loading, onRoleChange, onStatusChange, onDelete }: Props) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-visible">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-[#1e2a4a]">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">User</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Role</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Joined</th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#1e2a4a] last:border-0 hover:bg-[#0A0F1E]/50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${GRADIENTS[user.id % GRADIENTS.length]} text-xs font-bold text-white flex-shrink-0`}>
                      {initials(user.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-[#64748B] truncate">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                    className={`rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#FC5E01] cursor-pointer ${roleStyles[user.role] ?? "text-white"}`}
                  >
                    <option value="dealer" className="bg-[#0A0F1E] text-white">Dealer</option>
                    <option value="admin" className="bg-[#0A0F1E] text-white">Admin / Staff</option>
                    <option value="super_admin" className="bg-[#0A0F1E] text-white">Super Admin</option>
                  </select>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize ${statusStyles[user.status] ?? "bg-[#1e2a4a] text-[#94A3B8] border-[#1e2a4a]"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-[#94A3B8] whitespace-nowrap">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </td>
                <td className="px-5 py-4 text-right relative">
                  <button onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)} className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#0A0F1E] hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                  {openMenuId === user.id && (
                    <div ref={menuRef} className="absolute right-5 top-full z-20 mt-1 w-48 rounded-xl border border-[#1e2a4a] bg-[#0C1A32] p-1.5 shadow-xl text-left">
                      {user.status === "suspended" ? (
                        <button onClick={() => { onStatusChange(user.id, "active"); setOpenMenuId(null); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-emerald-400 hover:bg-[#111B33] transition-colors">
                          <CheckCircle2 size={15} /> Activate
                        </button>
                      ) : (
                        <button onClick={() => { onStatusChange(user.id, "suspended"); setOpenMenuId(null); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-amber-400 hover:bg-[#111B33] transition-colors">
                          <Ban size={15} /> Suspend
                        </button>
                      )}
                      <button onClick={() => { onDelete(user.id); setOpenMenuId(null); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-[#111B33] transition-colors">
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[#94A3B8]">Loading users…</div>
      ) : users.length === 0 ? (
        <div className="py-16 text-center text-[#94A3B8]">No users found.</div>
      ) : null}
    </div>
  );
}