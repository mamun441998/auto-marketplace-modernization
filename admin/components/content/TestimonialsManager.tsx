"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import TestimonialModal from "./TestimonialModal";
import { fetchTestimonials, deleteTestimonialApi, type Testimonial } from "@/lib/adminContent";

const GRADIENTS = [
  "from-blue-500 to-cyan-500", "from-violet-500 to-fuchsia-500", "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500", "from-sky-500 to-blue-600", "from-pink-500 to-rose-500",
];
function initials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
}

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const load = useCallback(async () => { setLoading(true); setItems(await fetchTestimonials()); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);

  async function remove(t: Testimonial) {
    if (!confirm(`Delete testimonial from ${t.name}?`)) return;
    const r = await deleteTestimonialApi(t.id);
    if (!r.success) alert(r.message || "Failed to delete.");
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold text-white">Homepage Testimonials</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Manage reviews shown on the public homepage</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="flex items-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[#94A3B8]">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] py-16 text-center text-[#64748B]">No testimonials yet. Add one.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t.id} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${GRADIENTS[t.id % GRADIENTS.length]} text-sm font-bold text-white`}>{initials(t.name)}</div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-[#64748B]">{[t.role, t.company].filter(Boolean).join(" · ")}</p>
                  </div>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold flex-shrink-0 ${t.published ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{t.published ? "Published" : "Draft"}</span>
              </div>

              <div className="flex items-center gap-0.5 mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className={i < t.rating ? "fill-amber-400 text-amber-400" : "fill-[#1e2a4a] text-[#1e2a4a]"} />
                ))}
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-3">&quot;{t.quote}&quot;</p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#1e2a4a]">
                <button onClick={() => { setEditing(t); setModalOpen(true); }} className="flex items-center gap-1.5 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white hover:border-[#2d3d5e] transition-colors">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => remove(t)} className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TestimonialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingTestimonial={editing} onSaved={load} />
    </div>
  );
}