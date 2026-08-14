"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import FAQModal from "./FAQModal";
import { fetchFaqs, deleteFaqApi, type Faq } from "@/lib/adminContent";

export default function FAQManager() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);

  const load = useCallback(async () => { setLoading(true); setFaqs(await fetchFaqs()); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);

  async function remove(f: Faq) {
    if (!confirm(`Delete this FAQ: "${f.question}"?`)) return;
    const r = await deleteFaqApi(f.id);
    if (!r.success) alert(r.message || "Failed to delete.");
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-[#64748B] mt-0.5">Manage FAQ shown on the pricing and homepage</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="flex items-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-[#94A3B8]">Loading…</div>
      ) : faqs.length === 0 ? (
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] py-16 text-center text-[#64748B]">No FAQs yet. Add one.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-[#FC5E01]/10 border border-[#FC5E01]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#FC5E01]">{faq.category}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${faq.published ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>{faq.published ? "Published" : "Draft"}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{faq.question}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { setEditing(faq); setModalOpen(true); }} className="flex items-center gap-1.5 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white hover:border-[#2d3d5e] transition-colors">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => remove(faq)} className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FAQModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingFAQ={editing} onSaved={load} />
    </div>
  );
}