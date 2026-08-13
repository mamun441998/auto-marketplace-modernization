"use client";

import { useState } from "react";
import {
  Plus, Trash2, ChevronUp, ChevronDown, Type, MessageSquareQuote, Megaphone,
  ImagePlus, X, Loader2, Star, Layers, Images, HelpCircle, BarChart3, Users, Video, Award, Flag,
} from "lucide-react";
import { WebsiteData, WebsiteSection, SectionType, SectionAnimation, ReviewItem } from "@/lib/websiteData";
import { uploadWebsiteAsset } from "@/lib/website";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

const ANIMATIONS: { value: SectionAnimation; label: string }[] = [
  { value: "none", label: "No animation" },
  { value: "fade", label: "Fade in" },
  { value: "slide-up", label: "Slide up" },
  { value: "zoom", label: "Zoom in" },
];

const inputCls =
  "w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]";

const TYPE_META: Record<SectionType, { label: string; icon: typeof Type }> = {
  "text-image": { label: "Text + Image", icon: Type },
  reviews: { label: "Reviews", icon: MessageSquareQuote },
  cta: { label: "Call to Action", icon: Megaphone },
  gallery: { label: "Gallery", icon: Images },
  faq: { label: "FAQ", icon: HelpCircle },
  stats: { label: "Stats", icon: BarChart3 },
  team: { label: "Team", icon: Users },
  video: { label: "Video", icon: Video },
  brands: { label: "Brands", icon: Award },
  banner: { label: "Banner", icon: Flag },
};

function uid() {
  return globalThis.crypto?.randomUUID?.() ?? `s_${Date.now()}_${Math.round(Math.random() * 1e6)}`;
}

function newSection(type: SectionType): WebsiteSection {
  const base = { id: uid(), type, enabled: true, animation: "fade" as SectionAnimation };
  switch (type) {
    case "text-image":
      return { ...base, heading: "Why Choose Us", body: "Describe what makes your dealership special.", image: "", imageSide: "right", buttonText: "", buttonLink: "" };
    case "cta":
      return { ...base, heading: "Ready to find your next car?", body: "Visit us today or get in touch.", buttonText: "Contact Us", buttonLink: "#contact", background: "primary" };
    case "reviews":
      return { ...base, heading: "What Our Customers Say", reviews: [{ name: "John D.", rating: 5, text: "Great experience, highly recommend!" }] };
    case "gallery":
      return { ...base, heading: "Our Showroom", images: [] };
    case "faq":
      return { ...base, heading: "Frequently Asked Questions", faqs: [{ q: "Do you offer financing?", a: "Yes, we offer flexible financing options for all customers." }] };
    case "stats":
      return { ...base, heading: "", stats: [{ value: "500+", label: "Cars Sold" }, { value: "10+", label: "Years Experience" }, { value: "1000+", label: "Happy Customers" }] };
    case "team":
      return { ...base, heading: "Meet Our Team", team: [{ name: "", role: "", image: "" }] };
    case "video":
      return { ...base, heading: "Watch Our Showroom Tour", body: "", videoUrl: "" };
    case "brands":
      return { ...base, heading: "Brands We Carry", images: [] };
    case "banner":
      return { ...base, heading: "🎉 Eid Sale — Up to 20% Off!", buttonText: "Shop Now", buttonLink: "#inventory", background: "primary" };
    default:
      return base as WebsiteSection;
  }
}

export default function SectionsEditor({ data, onChange }: Props) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const sections = data.sections ?? [];

  const setSections = (next: WebsiteSection[]) => onChange({ ...data, sections: next });
  const addSection = (type: SectionType) => setSections([...sections, newSection(type)]);
  const updateSection = (id: string, patch: Partial<WebsiteSection>) =>
    setSections(sections.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const removeSection = (id: string) => setSections(sections.filter((s) => s.id !== id));
  const moveSection = (id: string, dir: -1 | 1) => {
    const idx = sections.findIndex((s) => s.id === id);
    const to = idx + dir;
    if (idx < 0 || to < 0 || to >= sections.length) return;
    const next = [...sections];
    [next[idx], next[to]] = [next[to], next[idx]];
    setSections(next);
  };

  const doUpload = async (key: string, file: File, onUrl: (url: string) => void) => {
    setUploadingId(key);
    try {
      const res = await uploadWebsiteAsset(file);
      if (res.success) onUrl(res.url);
      else alert(res.message || "Upload failed.");
    } catch {
      alert("Upload failed.");
    } finally {
      setUploadingId(null);
    }
  };

  /* generic array helpers (faqs / stats / team / reviews) */
  const updateArr = (sec: WebsiteSection, field: string, i: number, patch: any) => {
    const arr = [...(((sec as any)[field]) ?? [])];
    arr[i] = { ...arr[i], ...patch };
    updateSection(sec.id, { [field]: arr } as any);
  };
  const addArr = (sec: WebsiteSection, field: string, item: any) =>
    updateSection(sec.id, { [field]: [...(((sec as any)[field]) ?? []), item] } as any);
  const removeArr = (sec: WebsiteSection, field: string, i: number) =>
    updateSection(sec.id, { [field]: (((sec as any)[field]) ?? []).filter((_: any, idx: number) => idx !== i) } as any);

  const removeImageAt = (sec: WebsiteSection, i: number) =>
    updateSection(sec.id, { images: (sec.images ?? []).filter((_, idx) => idx !== i) });

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
        <Layers size={16} className="text-[#FC5E01]" />
        <h3 className="text-sm font-bold text-white">Content Sections</h3>
        <span className="ml-auto text-xs text-[#64748B]">{sections.length} added</span>
      </div>

      {/* Add buttons */}
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(TYPE_META) as SectionType[]).map((t) => {
          const Icon = TYPE_META[t].icon;
          return (
            <button
              key={t}
              type="button"
              onClick={() => addSection(t)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] py-3 text-[#94A3B8] hover:border-[#FC5E01] hover:text-white transition-colors"
            >
              <Icon size={16} />
              <span className="text-[10px] font-semibold text-center leading-tight">{TYPE_META[t].label}</span>
            </button>
          );
        })}
      </div>

      {sections.length === 0 && (
        <p className="text-xs text-[#64748B] text-center py-4">No sections yet. Add one above to build your page.</p>
      )}

      {/* Section list */}
      <div className="space-y-3">
        {sections.map((sec, idx) => {
          const Icon = TYPE_META[sec.type].icon;
          const upKey = sec.id + ":img";
          return (
            <div key={sec.id} className={`rounded-xl border p-4 space-y-3 ${sec.enabled ? "border-[#1e2a4a] bg-[#0A0F1E]" : "border-[#1e2a4a]/50 bg-[#0A0F1E]/40 opacity-70"}`}>
              {/* header row */}
              <div className="flex items-center gap-2">
                <Icon size={14} className="text-[#FC5E01]" />
                <span className="text-xs font-bold text-white">{TYPE_META[sec.type].label}</span>
                <div className="ml-auto flex items-center gap-1">
                  <button type="button" onClick={() => moveSection(sec.id, -1)} disabled={idx === 0} className="p-1 rounded text-[#64748B] hover:text-white disabled:opacity-30"><ChevronUp size={15} /></button>
                  <button type="button" onClick={() => moveSection(sec.id, 1)} disabled={idx === sections.length - 1} className="p-1 rounded text-[#64748B] hover:text-white disabled:opacity-30"><ChevronDown size={15} /></button>
                  <button type="button" onClick={() => updateSection(sec.id, { enabled: !sec.enabled })} className={`relative h-5 w-9 rounded-full transition-colors ${sec.enabled ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"}`}>
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${sec.enabled ? "left-0.5 translate-x-[16px]" : "left-0.5"}`} />
                  </button>
                  <button type="button" onClick={() => removeSection(sec.id)} className="p-1 rounded text-[#64748B] hover:text-rose-400"><Trash2 size={15} /></button>
                </div>
              </div>

              {/* heading (most types) */}
              {sec.type !== "banner" && (
                <input value={sec.heading ?? ""} onChange={(e) => updateSection(sec.id, { heading: e.target.value })} placeholder="Heading" className={inputCls} />
              )}

              {/* ---- TEXT + IMAGE ---- */}
              {sec.type === "text-image" && (
                <div className="space-y-3">
                  <textarea rows={3} value={sec.body ?? ""} onChange={(e) => updateSection(sec.id, { body: e.target.value })} placeholder="Body text" className={`${inputCls} resize-none`} />
                  {sec.image ? (
                    <div className="relative rounded-lg overflow-hidden border border-[#1e2a4a]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sec.image} alt="" className="w-full h-28 object-cover" />
                      <button type="button" onClick={() => updateSection(sec.id, { image: "" })} className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={14} /></button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 h-20 rounded-lg border border-dashed border-[#1e2a4a] bg-[#0A0F1E] cursor-pointer hover:border-[#FC5E01]">
                      {uploadingId === sec.id ? <Loader2 size={16} className="animate-spin text-[#FC5E01]" /> : <><ImagePlus size={16} className="text-[#64748B]" /><span className="text-xs text-[#64748B]">Upload image</span></>}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) doUpload(sec.id, f, (url) => updateSection(sec.id, { image: url })); e.target.value = ""; }} />
                    </label>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#94A3B8]">Image side:</span>
                    {(["left", "right"] as const).map((side) => (
                      <button key={side} type="button" onClick={() => updateSection(sec.id, { imageSide: side })} className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${sec.imageSide === side ? "bg-[#FC5E01] text-white" : "bg-[#1e2a4a] text-[#94A3B8]"}`}>{side}</button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={sec.buttonText ?? ""} onChange={(e) => updateSection(sec.id, { buttonText: e.target.value })} placeholder="Button text (optional)" className={inputCls} />
                    <input value={sec.buttonLink ?? ""} onChange={(e) => updateSection(sec.id, { buttonLink: e.target.value })} placeholder="Button link" className={inputCls} />
                  </div>
                </div>
              )}

              {/* ---- CTA ---- */}
              {sec.type === "cta" && (
                <div className="space-y-3">
                  <textarea rows={2} value={sec.body ?? ""} onChange={(e) => updateSection(sec.id, { body: e.target.value })} placeholder="Subtitle" className={`${inputCls} resize-none`} />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={sec.buttonText ?? ""} onChange={(e) => updateSection(sec.id, { buttonText: e.target.value })} placeholder="Button text" className={inputCls} />
                    <input value={sec.buttonLink ?? ""} onChange={(e) => updateSection(sec.id, { buttonLink: e.target.value })} placeholder="Button link (#contact)" className={inputCls} />
                  </div>
                  <BgPicker sec={sec} updateSection={updateSection} />
                </div>
              )}

              {/* ---- REVIEWS ---- */}
              {sec.type === "reviews" && (
                <div className="space-y-3">
                  {(sec.reviews ?? []).map((r, i) => (
                    <div key={i} className="rounded-lg border border-[#1e2a4a] p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <input value={r.name ?? ""} onChange={(e) => updateArr(sec, "reviews", i, { name: e.target.value })} placeholder="Customer name" className={`${inputCls} flex-1`} />
                        <button type="button" onClick={() => removeArr(sec, "reviews", i)} className="p-1 text-[#64748B] hover:text-rose-400"><Trash2 size={14} /></button>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} type="button" onClick={() => updateArr(sec, "reviews", i, { rating: n })}>
                            <Star size={16} className={n <= r.rating ? "text-[#FC5E01] fill-[#FC5E01]" : "text-[#1e2a4a]"} />
                          </button>
                        ))}
                      </div>
                      <textarea rows={2} value={r.text ?? ""} onChange={(e) => updateArr(sec, "reviews", i, { text: e.target.value })} placeholder="Review text" className={`${inputCls} resize-none`} />
                    </div>
                  ))}
                  <AddBtn label="Add review" onClick={() => addArr(sec, "reviews", { name: "", rating: 5, text: "" } as ReviewItem)} />
                </div>
              )}

              {/* ---- GALLERY / BRANDS (image arrays) ---- */}
              {(sec.type === "gallery" || sec.type === "brands") && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {(sec.images ?? []).map((img, i) => (
                      <div key={i} className="relative rounded-lg overflow-hidden border border-[#1e2a4a] h-20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className={`w-full h-full ${sec.type === "brands" ? "object-contain bg-white p-1" : "object-cover"}`} />
                        <button type="button" onClick={() => removeImageAt(sec, i)} className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={12} /></button>
                      </div>
                    ))}
                    <label className="flex items-center justify-center h-20 rounded-lg border border-dashed border-[#1e2a4a] cursor-pointer hover:border-[#FC5E01]">
                      {uploadingId === upKey ? <Loader2 size={16} className="animate-spin text-[#FC5E01]" /> : <ImagePlus size={16} className="text-[#64748B]" />}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) doUpload(upKey, f, (url) => updateSection(sec.id, { images: [...(sec.images ?? []), url] })); e.target.value = ""; }} />
                    </label>
                  </div>
                  <p className="text-[11px] text-[#64748B]">{sec.type === "brands" ? "Upload brand logos (transparent PNG best)." : "Upload showroom / vehicle photos."}</p>
                </div>
              )}

              {/* ---- FAQ ---- */}
              {sec.type === "faq" && (
                <div className="space-y-3">
                  {(sec.faqs ?? []).map((f, i) => (
                    <div key={i} className="rounded-lg border border-[#1e2a4a] p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <input value={f.q ?? ""} onChange={(e) => updateArr(sec, "faqs", i, { q: e.target.value })} placeholder="Question" className={`${inputCls} flex-1`} />
                        <button type="button" onClick={() => removeArr(sec, "faqs", i)} className="p-1 text-[#64748B] hover:text-rose-400"><Trash2 size={14} /></button>
                      </div>
                      <textarea rows={2} value={f.a ?? ""} onChange={(e) => updateArr(sec, "faqs", i, { a: e.target.value })} placeholder="Answer" className={`${inputCls} resize-none`} />
                    </div>
                  ))}
                  <AddBtn label="Add question" onClick={() => addArr(sec, "faqs", { q: "", a: "" })} />
                </div>
              )}

              {/* ---- STATS ---- */}
              {sec.type === "stats" && (
                <div className="space-y-3">
                  {(sec.stats ?? []).map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={s.value ?? ""} onChange={(e) => updateArr(sec, "stats", i, { value: e.target.value })} placeholder="500+" className={`${inputCls} w-24`} />
                      <input value={s.label ?? ""} onChange={(e) => updateArr(sec, "stats", i, { label: e.target.value })} placeholder="Cars Sold" className={`${inputCls} flex-1`} />
                      <button type="button" onClick={() => removeArr(sec, "stats", i)} className="p-1 text-[#64748B] hover:text-rose-400"><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <AddBtn label="Add stat" onClick={() => addArr(sec, "stats", { value: "", label: "" })} />
                </div>
              )}

              {/* ---- TEAM ---- */}
              {sec.type === "team" && (
                <div className="space-y-3">
                  {(sec.team ?? []).map((m, i) => {
                    const tKey = `${sec.id}:team:${i}`;
                    return (
                      <div key={i} className="rounded-lg border border-[#1e2a4a] p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          {m.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={m.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                          ) : (
                            <label className="h-12 w-12 rounded-full border border-dashed border-[#1e2a4a] flex items-center justify-center cursor-pointer hover:border-[#FC5E01]">
                              {uploadingId === tKey ? <Loader2 size={14} className="animate-spin text-[#FC5E01]" /> : <ImagePlus size={14} className="text-[#64748B]" />}
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) doUpload(tKey, f, (url) => updateArr(sec, "team", i, { image: url })); e.target.value = ""; }} />
                            </label>
                          )}
                          <div className="flex-1 space-y-2">
                            <input value={m.name ?? ""} onChange={(e) => updateArr(sec, "team", i, { name: e.target.value })} placeholder="Name" className={inputCls} />
                            <input value={m.role ?? ""} onChange={(e) => updateArr(sec, "team", i, { role: e.target.value })} placeholder="Role (e.g. Sales Manager)" className={inputCls} />
                          </div>
                          <button type="button" onClick={() => removeArr(sec, "team", i)} className="p-1 text-[#64748B] hover:text-rose-400"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    );
                  })}
                  <AddBtn label="Add member" onClick={() => addArr(sec, "team", { name: "", role: "", image: "" })} />
                </div>
              )}

              {/* ---- VIDEO ---- */}
              {sec.type === "video" && (
                <div className="space-y-3">
                  <input value={sec.videoUrl ?? ""} onChange={(e) => updateSection(sec.id, { videoUrl: e.target.value })} placeholder="YouTube URL (https://youtube.com/watch?v=...)" className={inputCls} />
                  <textarea rows={2} value={sec.body ?? ""} onChange={(e) => updateSection(sec.id, { body: e.target.value })} placeholder="Short description (optional)" className={`${inputCls} resize-none`} />
                </div>
              )}

              {/* ---- BANNER ---- */}
              {sec.type === "banner" && (
                <div className="space-y-3">
                  <input value={sec.heading ?? ""} onChange={(e) => updateSection(sec.id, { heading: e.target.value })} placeholder="Banner text" className={inputCls} />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={sec.buttonText ?? ""} onChange={(e) => updateSection(sec.id, { buttonText: e.target.value })} placeholder="Button text (optional)" className={inputCls} />
                    <input value={sec.buttonLink ?? ""} onChange={(e) => updateSection(sec.id, { buttonLink: e.target.value })} placeholder="Button link" className={inputCls} />
                  </div>
                  <BgPicker sec={sec} updateSection={updateSection} />
                </div>
              )}

              {/* animation */}
              <div>
                <label className="block text-[11px] font-semibold text-[#64748B] mb-1">Scroll animation</label>
                <select value={sec.animation} onChange={(e) => updateSection(sec.id, { animation: e.target.value as SectionAnimation })} className={`${inputCls} cursor-pointer`}>
                  {ANIMATIONS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- small shared bits ---- */
function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-1.5 text-xs font-semibold text-[#FC5E01] hover:underline">
      <Plus size={14} /> {label}
    </button>
  );
}

function BgPicker({ sec, updateSection }: { sec: WebsiteSection; updateSection: (id: string, patch: Partial<WebsiteSection>) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#94A3B8]">Background:</span>
      {(["primary", "dark", "light"] as const).map((bg) => (
        <button key={bg} type="button" onClick={() => updateSection(sec.id, { background: bg })} className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${sec.background === bg ? "bg-[#FC5E01] text-white" : "bg-[#1e2a4a] text-[#94A3B8]"}`}>{bg}</button>
      ))}
    </div>
  );
}