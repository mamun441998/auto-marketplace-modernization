"use client";

import { useEffect, useState } from "react";
import {
  fetchTeam,
  addTeamMember,
  updateTeamRole,
  removeTeamMember,
  type TeamMember,
  type TeamUsage,
} from "@/lib/team";

const BRAND = "#FC5E01";

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [usage, setUsage] = useState<TeamUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await fetchTeam();
    if (res?.success) {
      setMembers(res.data ?? []);
      setUsage(res.usage);
    } else {
      setError(res?.message || "Unable to load team.");
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleRoleChange(id: number, role: "manager" | "staff") {
    const res = await updateTeamRole(id, role);
    if (res?.success) load();
    else alert(res?.message || "Unable to update role.");
  }

  async function handleRemove(m: TeamMember) {
    if (!confirm(`Remove ${m.name} from your team? Their account will be deleted.`)) return;
    const res = await removeTeamMember(m.id);
    if (res?.success) load();
    else alert(res?.message || "Unable to remove member.");
  }

  const canAdd = usage ? usage.can_add : false;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Invite staff to help manage your dealership.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          disabled={!canAdd}
          style={canAdd ? { backgroundColor: BRAND } : undefined}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            canAdd
              ? "text-white hover:brightness-95"
              : "bg-[#1e2a4a] text-[#64748B] cursor-not-allowed"
          }`}
          title={canAdd ? "" : "You've reached your plan's team limit."}
        >
          + Add Member
        </button>
      </div>

      {/* Usage bar */}
      {usage && (
        <div className="mb-6 bg-[#0F1B33] border border-[#1e2a4a] rounded-xl p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#94A3B8]">Team members</span>
            <span className="font-medium text-white">
              {usage.used}
              {usage.unlimited ? " (Unlimited)" : ` / ${usage.limit}`}
            </span>
          </div>
          {!usage.unlimited && usage.limit ? (
            <div className="mt-2 h-2 bg-[#1e2a4a] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (usage.used / usage.limit) * 100)}%`,
                  backgroundColor: BRAND,
                }}
              />
            </div>
          ) : null}
          {!canAdd && (
            <p className="text-xs text-[#FC5E01] mt-2">
              You've reached your plan's team member limit. Upgrade your plan to add more.
            </p>
          )}
        </div>
      )}

      {/* States */}
      {loading ? (
        <div className="text-center py-16 text-[#64748B]">Loading team…</div>
      ) : error ? (
        <div className="text-center py-16 text-rose-400">{error}</div>
      ) : (
        <div className="bg-[#0F1B33] border border-[#1e2a4a] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0C1A32] text-[#64748B] text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Member</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2a4a]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#111B33]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                        style={{ backgroundColor: BRAND }}
                      >
                        {m.initials || m.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{m.name}</div>
                        <div className="text-[#94A3B8]">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {m.is_owner ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300">
                        Owner
                      </span>
                    ) : (
                      <select
                        value={m.team_role}
                        onChange={(e) =>
                          handleRoleChange(m.id, e.target.value as "manager" | "staff")
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0C1A32] text-white border border-[#1e2a4a] cursor-pointer outline-none focus:border-[#FC5E01] focus:ring-2 focus:ring-[#FC5E01]/30"
                      >
                        <option value="manager">Manager</option>
                        <option value="staff">Staff</option>
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#94A3B8]">{m.joined_at || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    {m.is_owner ? (
                      <span className="text-[#64748B] text-xs">—</span>
                    ) : (
                      <button
                        onClick={() => handleRemove(m)}
                        className="text-rose-400 hover:text-rose-300 text-xs font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Member Modal */}
      {showModal && (
        <AddMemberModal
          onClose={() => setShowModal(false)}
          onAdded={() => {
            setShowModal(false);
            load();
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Add Member Modal (dark)                                             */
/* ------------------------------------------------------------------ */

function AddMemberModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamRole, setTeamRole] = useState<"manager" | "staff">("staff");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const inputCls =
    "w-full bg-[#0C1A32] border border-[#1e2a4a] text-white placeholder-[#64748B] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FC5E01] focus:ring-2 focus:ring-[#FC5E01]/30";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    const res = await addTeamMember({ name, email, password, team_role: teamRole });
    if (res?.success) onAdded();
    else {
      setErr(res?.message || "Unable to add member.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F1B33] border border-[#1e2a4a] rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Add Team Member</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputCls}
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputCls}
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1">
              Temporary password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className={inputCls}
              placeholder="At least 8 characters"
            />
            <p className="text-xs text-[#64748B] mt-1">
              Share this with them — they can log in and change it later.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Role</label>
            <select
              value={teamRole}
              onChange={(e) => setTeamRole(e.target.value as "manager" | "staff")}
              className={inputCls}
            >
              <option value="staff">Staff — manage inventory & leads</option>
              <option value="manager">Manager — also manage the team</option>
            </select>
          </div>

          {err && <p className="text-sm text-rose-400">{err}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-[#94A3B8] hover:bg-[#111B33]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{ backgroundColor: BRAND }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:brightness-95 disabled:opacity-60"
            >
              {saving ? "Adding…" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}