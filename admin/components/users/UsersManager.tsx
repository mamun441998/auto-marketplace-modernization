"use client";

import { useState, useEffect, useCallback } from "react";
import UsersStats from "./UsersStats";
import UsersFilters from "./UsersFilters";
import UsersTable from "./UsersTable";
import InviteUserModal from "./InviteUserModal";
import { useAdminUser } from "@/lib/adminAuthContext";
import {
  fetchUsers, updateUserRole, updateUserStatus, deleteUser,
  type AdminUserRow, type UsersCounts, type UsersMeta,
} from "@/lib/adminUsers";

export default function UsersManager() {
  const me = useAdminUser();
  const isSuper = me?.role === "super_admin";

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);

  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [meta, setMeta] = useState<UsersMeta>({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
  const [counts, setCounts] = useState<UsersCounts>({ total: 0, super_admin: 0, admin: 0, dealer: 0 });
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);

  const load = useCallback(async () => {
    if (!isSuper) return;
    setLoading(true);
    const res = await fetchUsers({ search, role, page });
    if (res.success) {
      setUsers(res.users);
      setMeta(res.meta);
      setCounts(res.counts);
    }
    setLoading(false);
  }, [search, role, page, isSuper]);

  useEffect(() => {
    const t = setTimeout(load, 350);
    return () => clearTimeout(t);
  }, [load]);

  async function onRoleChange(id: number, newRole: string) {
    const res = await updateUserRole(id, newRole);
    if (!res.success) alert(res.message || "Failed to update role.");
    load();
  }
  async function onStatusChange(id: number, status: string) {
    const res = await updateUserStatus(id, status);
    if (!res.success) alert(res.message || "Failed to update status.");
    load();
  }
  async function onDelete(id: number) {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    const res = await deleteUser(id);
    if (!res.success) alert(res.message || "Failed to delete user.");
    load();
  }

  // Staff / non-super-admin → no access
  if (me && !isSuper) {
    return (
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-12 text-center">
        <p className="text-white font-semibold">Restricted area</p>
        <p className="text-sm text-[#94A3B8] mt-1">Only a super admin can manage users and roles.</p>
      </div>
    );
  }

  const totalPages = meta.last_page;

  return (
    <div className="flex flex-col gap-6">
      <UsersStats counts={counts} />

      <div>
        <UsersFilters
          searchQuery={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          selectedRole={role}
          onRoleChange={(v) => { setRole(v); setPage(1); }}
          resultCount={meta.total}
          onInviteClick={() => setInviteOpen(true)}
        />

        <UsersTable
          users={users}
          loading={loading}
          onRoleChange={onRoleChange}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`h-10 w-10 rounded-lg text-sm font-semibold transition-colors ${page === p ? "bg-[#FC5E01] text-white" : "border border-[#1e2a4a] bg-[#111B33] text-[#94A3B8] hover:text-white hover:border-[#2d3d5e]"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-[#1e2a4a] bg-[#111B33] px-4 py-2 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#2d3d5e] transition-colors">
              Next
            </button>
          </div>
        )}
      </div>

      <InviteUserModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onCreated={() => { setInviteOpen(false); load(); }}
      />
    </div>
  );
}