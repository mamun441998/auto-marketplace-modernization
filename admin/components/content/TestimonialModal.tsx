"use client";

import { useState, useEffect } from "react";
import { X, MessageSquareQuote, Star, Loader2 } from "lucide-react";
import { saveTestimonial, type Testimonial } from "@/lib/adminContent";
import Toggle from "@/components/ui/Toggle";

export default function TestimonialModal({ isOpen, onClose, editingTestimonial, onSaved }: { isOpen: boolean; onClose: () => void; editingTestimonial: Testimonial | null; onSaved: () => void; }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTestimonial) {
      setName(editingTestimonial.name); setCompany(editingTestimonial.company ?? ""); setRole(editingTestimonial.role ?? "");
      setQuote(editingTestimonial.quote); setRating(editingTestimonial.rating); setPublished(editingTestimonial.published);
    } else {
      setName(""); setCompany(""); setRole(""); setQuote(""); setRating(5); setPublished(true);
    }
    setError(null);
  }, [editingTestimonial, isOpen]);

  if (!isOpen) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const r = await saveTestimonial({ name, company, role, quote, rating, published }, editingTestimonial?.id);
    setSaving(false);
    if (r.success) { onSaved(); onClose(); } else setError(r.message || "Failed to save.");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FC5E01]/10 text-[#FC5E01]"><MessageSquareQuote size={18} /></div>
            <h3 className="text-base font-bold text-white">{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</h3>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Role</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Owner" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Company / Dealership</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Anderson Auto Group" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Quote</label>
            <textarea required rows={4} value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Write the testimonial quote..." className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                  <Star size={22} className={star <= rating ? "fill-amber-400 text-amber-400" : "fill-[#1e2a4a] text-[#1e2a4a]"} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-3">
            <span className="text-sm font-medium text-white">Published on website</span>
            <Toggle on={published} onClick={() => setPublished(!published)} />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#FC5E01] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-60">
              {saving ? <Loader2 size={15} className="animate-spin" /> : null}
              {editingTestimonial ? "Save Changes" : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}