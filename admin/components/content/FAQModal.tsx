"use client";

import { useState, useEffect } from "react";
import { X, HelpCircle, Loader2 } from "lucide-react";
import { saveFaq, type Faq } from "@/lib/adminContent";
import FancySelect from "@/components/FancySelect";
import Toggle from "@/components/ui/Toggle";

const CATEGORIES = ["General", "Billing", "Support", "Technical"].map((c) => ({ value: c, label: c }));

export default function FAQModal({ isOpen, onClose, editingFAQ, onSaved }: { isOpen: boolean; onClose: () => void; editingFAQ: Faq | null; onSaved: () => void; }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingFAQ) {
      setQuestion(editingFAQ.question); setAnswer(editingFAQ.answer); setCategory(editingFAQ.category); setPublished(editingFAQ.published);
    } else {
      setQuestion(""); setAnswer(""); setCategory("General"); setPublished(true);
    }
    setError(null);
  }, [editingFAQ, isOpen]);

  if (!isOpen) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const r = await saveFaq({ question, answer, category, published }, editingFAQ?.id);
    setSaving(false);
    if (r.success) { onSaved(); onClose(); } else setError(r.message || "Failed to save.");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FC5E01]/10 text-[#FC5E01]"><HelpCircle size={18} /></div>
            <h3 className="text-base font-bold text-white">{editingFAQ ? "Edit FAQ" : "Add New FAQ"}</h3>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Question</label>
            <input type="text" required value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. Can I switch plans later?" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Answer</label>
            <textarea required rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write the answer..." className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Category</label>
            <FancySelect value={category} onChange={setCategory} options={CATEGORIES} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-3">
            <span className="text-sm font-medium text-white">Published on website</span>
            <Toggle on={published} onClick={() => setPublished(!published)} />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-60">
              {saving ? <Loader2 size={15} className="animate-spin" /> : null}
              {editingFAQ ? "Save Changes" : "Add FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}