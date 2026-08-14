"use client";

import { useState } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import { createUser } from "@/lib/adminUsers";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function InviteUserModal({ isOpen, onClose, onCreated }: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  function reset() {
    setName(""); setEmail(""); setPassword(""); setRole("admin"); setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await createUser({ name, email: email.trim(), password, role });
    setSaving(false);
    if (res.success) {
      reset();
      onCreated();
    } else {
      setError(res.message || "Failed to create user.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FC5E01]/10 text-[#FC5E01]">
              <UserPlus size={18} />
            </div>
            <h3 className="text-base font-bold text-white">Create Team Member</h3>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Full Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john@motohave.com"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer">
              <option value="admin" className="bg-[#0A0F1E]">Admin / Staff (limited)</option>
              <option value="super_admin" className="bg-[#0A0F1E]">Super Admin (full control)</option>
            </select>
            <p className="mt-1 text-[11px] text-[#64748B]">Staff can help manage dealers. Super Admin has full control.</p>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-60">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <UserPlus size={15} />}
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}