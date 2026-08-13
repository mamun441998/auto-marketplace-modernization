"use client";

import { useState } from "react";
import { Sliders, Settings, Image as ImageIcon, ImagePlus, X, Loader2, Share2, Megaphone, Search } from "lucide-react";
import { WebsiteData, websiteThemes } from "@/lib/websiteData";
import { uploadWebsiteAsset } from "@/lib/website";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

const SOCIALS: { key: keyof WebsiteData["branding"]; label: string; placeholder: string }[] = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourpage" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourpage" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/yourpage" },
  { key: "whatsapp", label: "WhatsApp", placeholder: "+1 555 123 4567" },
];

function ColorField({
  label,
  value,
  onChange,
  fallback = "#FC5E01",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  fallback?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || fallback}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-11 rounded-lg cursor-pointer bg-transparent border border-[#1e2a4a] p-0.5"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={fallback}
          className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
        />
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-xs text-[#64748B] hover:text-white px-1">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default function SettingsPanel({ data, onChange }: Props) {
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [uploadingFav, setUploadingFav] = useState(false);

    const updateSettings = (
    key: keyof WebsiteData["settings"],
    value: string | boolean | number | typeof websiteThemes[number]
  ) => {
    onChange({ ...data, settings: { ...data.settings, [key]: value } });
  };

    const updateBranding = (key: keyof WebsiteData["branding"], value: string) => {
    onChange({ ...data, branding: { ...data.branding, [key]: value } });
  };

  const updateSeo = (key: string, value: string) => {
    onChange({ ...data, seo: { ...(data.seo ?? {}), [key]: value } });
  };

  const uploadTo = async (file: File, setBusy: (b: boolean) => void, onUrl: (url: string) => void) => {
    setBusy(true);
    try {
      const res = await uploadWebsiteAsset(file);
      if (res.success) onUrl(res.url);
      else alert(res.message || "Upload failed.");
    } catch {
      alert("Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const res = await uploadWebsiteAsset(file);
      if (res.success) updateBranding("logo", res.url);
      else alert(res.message || "Upload failed.");
    } catch {
      alert("Upload failed.");
    } finally {
      setUploadingLogo(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Branding / Logo */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <ImageIcon size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Branding & Logo</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Dealership Name</label>
          <input
            value={data.branding.dealershipName || ""}            
            onChange={(e) => updateBranding("dealershipName", e.target.value)}
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Tagline</label>
          <input
            value={data.branding.tagline || ""}
                        onChange={(e) => updateBranding("tagline", e.target.value)}
            placeholder="Trusted Cars. Honest Prices."
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Logo</label>
          {data.branding.logo ? (
            <div className="flex items-center gap-3 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.branding.logo} alt="Logo" className="h-12 w-auto max-w-[140px] object-contain" />
              <button
                type="button"
                onClick={() => updateBranding("logo", "")}
                className="ml-auto h-8 w-8 rounded-full bg-[#1e2a4a] text-white flex items-center justify-center hover:bg-rose-500/70"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 h-24 rounded-lg border border-dashed border-[#1e2a4a] bg-[#0A0F1E] cursor-pointer hover:border-[#FC5E01] transition-colors">
              {uploadingLogo ? (
                <Loader2 size={18} className="animate-spin text-[#FC5E01]" />
              ) : (
                <>
                  <ImagePlus size={18} className="text-[#64748B]" />
                  <span className="text-xs text-[#64748B]">Upload logo</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
            </label>
          )}
        </div>
      </div>

      {/* Theme Color */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Sliders size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Theme Color</h3>
        </div>

                <div className="grid grid-cols-2 gap-2">
          {websiteThemes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => updateSettings("theme", theme)}
              className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-colors ${
                data.settings.theme.id === theme.id
                  ? "border-[#FC5E01] bg-[#0A0F1E]"
                  : "border-[#1e2a4a] bg-[#0A0F1E]/40 hover:border-[#2d3d5e]"
              }`}
            >
              <span className="h-4 w-4 rounded-full flex-shrink-0" style={{ backgroundColor: theme.primary }} />
              <span className="text-xs font-semibold text-white truncate">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      
      {/* Custom Colors */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Sliders size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Custom Colors</h3>
        </div>
        <p className="text-xs text-[#64748B] -mt-1">Pick a color or paste a hex code. Leave blank to use the theme default.</p>

        <ColorField
          label="Header Background"
          value={data.settings.headerBg || ""}
          onChange={(v) => updateSettings("headerBg", v)}
          fallback="#ffffff"
        />
        <ColorField
          label="Header Text Color"
          value={data.settings.textColor || ""}
          onChange={(v) => updateSettings("textColor", v)}
          fallback="#111827"
        />
        <ColorField
          label="CTA / Button Color"
          value={data.settings.ctaColor || ""}
          onChange={(v) => updateSettings("ctaColor", v)}
          fallback={data.settings.theme.primary}
        />
      </div>

      {/* Contact & Widget Settings */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Settings size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Contact & Widget</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Contact Phone Number</label>
          <input
            value={data.settings.contactPhone || ""}
            onChange={(e) => updateSettings("contactPhone", e.target.value)}
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
          <div>
            <p className="text-sm font-semibold text-white">Live Chat Widget</p>
            <p className="text-xs text-[#64748B]">Show a chat bubble on your website</p>
          </div>
          <button
            type="button"
            onClick={() => updateSettings("enableChatWidget", !data.settings.enableChatWidget)}
            className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors duration-200 ${
              data.settings.enableChatWidget ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"
            }`}
          >
                        <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                data.settings.enableChatWidget ? "translate-x-[18px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Vehicle Page & Map */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Settings size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Vehicle Page & Map</h3>
        </div>

        {/* Show map */}
        <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
          <div>
            <p className="text-sm font-semibold text-white">Show Location Map</p>
            <p className="text-xs text-[#64748B]">Google map in contact section (uses your address)</p>
          </div>
          <button
            type="button"
            onClick={() => updateSettings("showMap", data.settings.showMap === false ? true : false)}
            className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors duration-200 ${data.settings.showMap !== false ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"}`}
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${data.settings.showMap !== false ? "translate-x-[18px]" : "translate-x-0"}`} />
          </button>
        </div>
                {/* Google Maps link */}
        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Google Maps Location</label>
          <input
            value={data.branding.googleMaps || ""}
            onChange={(e) => updateBranding("googleMaps", e.target.value)}
            placeholder="Paste embed link, address, or coordinates"
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
          />
                    <p className="text-[11px] text-[#64748B] mt-1">
            Google Maps → Share → <b>Embed a map</b> → copy the link. Or paste an address / coordinates.
          </p>
        </div>


        {/* Finance calculator */}
        <div className="flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 p-3">
          <div>
            <p className="text-sm font-semibold text-white">Finance Calculator</p>
            <p className="text-xs text-[#64748B]">EMI estimator on each vehicle page</p>
          </div>
          <button
            type="button"
            onClick={() => updateSettings("showFinanceCalc", data.settings.showFinanceCalc === false ? true : false)}
            className={`relative h-6 w-11 overflow-hidden rounded-full transition-colors duration-200 ${data.settings.showFinanceCalc !== false ? "bg-[#FC5E01]" : "bg-[#1e2a4a]"}`}
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${data.settings.showFinanceCalc !== false ? "translate-x-[18px]" : "translate-x-0"}`} />
          </button>
        </div>

                {/* Default APR */}
        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Default Interest Rate (APR %)</label>
          <input
            type="number"
            min={0}
            max={40}
            step={0.5}
            value={data.settings.financeApr ?? 8}
            onChange={(e) => updateSettings("financeApr", Number(e.target.value))}
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
          />
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Megaphone size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Announcement Bar</h3>
        </div>
        <p className="text-xs text-[#64748B] -mt-1">A strip at the very top of your site. Leave blank to hide.</p>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Message</label>
          <input
            value={data.settings.announcement || ""}
            onChange={(e) => updateSettings("announcement", e.target.value)}
            placeholder="🎉 Eid Sale — up to 20% off this week!"
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Link (optional)</label>
          <input
            value={data.settings.announcementLink || ""}
            onChange={(e) => updateSettings("announcementLink", e.target.value)}
            placeholder="#inventory"
            className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
          />
        </div>
      </div>

            {/* SEO & Favicon */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Search size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">SEO & Favicon</h3>
        </div>
        <p className="text-xs text-[#64748B] -mt-1">How your site appears on Google and social shares.</p>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Meta Title</label>
          <input value={data.seo?.metaTitle || ""} onChange={(e) => updateSeo("metaTitle", e.target.value)} placeholder="Anderson Auto — Quality Used Cars" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Meta Description</label>
          <textarea rows={2} value={data.seo?.metaDescription || ""} onChange={(e) => updateSeo("metaDescription", e.target.value)} placeholder="Browse our inventory of certified used and new vehicles." className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
        </div>

        {/* OG image */}
        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Social Share Image (OG)</label>
          {data.seo?.ogImage ? (
            <div className="relative rounded-lg overflow-hidden border border-[#1e2a4a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.seo.ogImage} alt="" className="w-full h-28 object-cover" />
              <button type="button" onClick={() => updateSeo("ogImage", "")} className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={14} /></button>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 h-20 rounded-lg border border-dashed border-[#1e2a4a] bg-[#0A0F1E] cursor-pointer hover:border-[#FC5E01]">
              {uploadingOg ? <Loader2 size={16} className="animate-spin text-[#FC5E01]" /> : <><ImagePlus size={16} className="text-[#64748B]" /><span className="text-xs text-[#64748B]">Upload image (1200×630)</span></>}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadTo(f, setUploadingOg, (url) => updateSeo("ogImage", url)); e.target.value = ""; }} />
            </label>
          )}
        </div>

        {/* Favicon */}
        <div>
          <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Favicon (browser tab icon)</label>
          {data.branding.favicon ? (
            <div className="flex items-center gap-3 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.branding.favicon} alt="" className="h-8 w-8 object-contain" />
              <button type="button" onClick={() => updateBranding("favicon", "")} className="ml-auto h-8 w-8 rounded-full bg-[#1e2a4a] text-white flex items-center justify-center hover:bg-rose-500/70"><X size={14} /></button>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 h-16 rounded-lg border border-dashed border-[#1e2a4a] bg-[#0A0F1E] cursor-pointer hover:border-[#FC5E01]">
              {uploadingFav ? <Loader2 size={16} className="animate-spin text-[#FC5E01]" /> : <><ImagePlus size={16} className="text-[#64748B]" /><span className="text-xs text-[#64748B]">Upload favicon (square PNG)</span></>}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadTo(f, setUploadingFav, (url) => updateBranding("favicon", url)); e.target.value = ""; }} />
            </label>
          )}
        </div>
      </div>


      {/* Social Links */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Share2 size={16} className="text-[#FC5E01]" />
          <h3 className="text-sm font-bold text-white">Social Links</h3>
        </div>
        <p className="text-xs text-[#64748B] -mt-1">Shown as icons in your website footer. Leave blank to hide.</p>

        {SOCIALS.map((s) => (
          <div key={s.key}>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">{s.label}</label>
            <input
              value={(data.branding[s.key] as string) || ""}
              onChange={(e) => updateBranding(s.key, e.target.value)}
              placeholder={s.placeholder}
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}