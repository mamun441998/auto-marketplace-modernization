"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw, CheckCircle2, ExternalLink, Globe, Loader2 } from "lucide-react";

import PageManager from "@/components/website-builder/PageManager";
import SettingsPanel from "@/components/website-builder/SettingsPanel";
import WebsitePreview from "@/components/website-builder/WebsitePreview";
import SectionsEditor from "@/components/website-builder/SectionsEditor";
import HomePageEditor from "@/components/website-builder/editors/HomePageEditor";
import InventoryPageEditor from "@/components/website-builder/editors/InventoryPageEditor";
import AboutPageEditor from "@/components/website-builder/editors/AboutPageEditor";
import ContactPageEditor from "@/components/website-builder/editors/ContactPageEditor";
import FinancingPageEditor from "@/components/website-builder/editors/FinancingPageEditor";

import { WebsiteData, WebsitePage, defaultWebsiteData } from "@/lib/websiteData";
import { fetchMyWebsite, saveWebsite, publishWebsite } from "@/lib/website";

export default function WebsiteEditor() {
  const [websiteData, setWebsiteData] = useState<WebsiteData>(defaultWebsiteData);
  const [activePage, setActivePage] = useState<WebsitePage>("home");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [isPublished, setIsPublished] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Marketing / tracking
  const [metaPixelId, setMetaPixelId] = useState("");
  const [gaId, setGaId] = useState("");

  /* ---- Load website from backend ---- */
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetchMyWebsite();
        if (res.success) {
          const cfg = res.website.config as unknown as WebsiteData;
          // Use saved config only if it matches our editor shape.
          if (cfg && (cfg as any).home && (cfg as any).settings) {
            setWebsiteData(cfg);
          }
          setIsPublished(res.website.is_published);
          setPreviewUrl(res.website.preview_url);
          setMetaPixelId(res.website.meta_pixel_id ?? "");
          setGaId(res.website.google_analytics_id ?? "");
        }
      } catch (err) {
        console.error("Load website failed:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const currentEditor = useMemo(() => {
    switch (activePage) {
      case "home":
        return <HomePageEditor data={websiteData} onChange={setWebsiteData} />;
      case "inventory":
        return <InventoryPageEditor data={websiteData} onChange={setWebsiteData} />;
      case "about":
        return <AboutPageEditor data={websiteData} onChange={setWebsiteData} />;
      case "contact":
        return <ContactPageEditor data={websiteData} onChange={setWebsiteData} />;
      case "financing":
        return <FinancingPageEditor data={websiteData} onChange={setWebsiteData} />;
      default:
        return null;
    }
  }, [activePage, websiteData]);

  const handleSave = async () => {
    setIsSaving(true);
    setNotice(null);
    setError(null);
    try {
      const res = await saveWebsite({
        config: websiteData as any,
        meta_pixel_id: metaPixelId.trim() || null,
        google_analytics_id: gaId.trim() || null,
      });
      if (res.success) {
        setPreviewUrl(res.website.preview_url);
        setNotice("Website saved successfully.");
        setTimeout(() => setNotice(null), 2500);
      } else {
        setError((res as any).message || "Failed to save.");
      }
    } catch (err) {
      console.error("Save website failed:", err);
      setError("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishToggle = async () => {
    setIsPublishing(true);
    setError(null);
    try {
      const res = await publishWebsite(!isPublished);
      if (res.success) {
        setIsPublished(res.website.is_published);
        setNotice(res.message);
        setTimeout(() => setNotice(null), 2500);
      } else {
        setError((res as any).message || "Failed to update publish state.");
      }
    } catch (err) {
      console.error("Publish failed:", err);
      setError("Something went wrong.");
    } finally {
      setIsPublishing(false);
    }
  };

  const openLive = () => {
    if (previewUrl) window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#94A3B8]">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading your website...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ---- Top action bar ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#1e2a4a] bg-[#111B33] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${isPublished ? "bg-emerald-500 animate-pulse" : "bg-slate-500"}`} />
          <span className={`text-sm font-semibold ${isPublished ? "text-emerald-400" : "text-[#94A3B8]"}`}>
            {isPublished ? "Website Live" : "Not Published"}
          </span>
          {previewUrl && (
            <span className="text-xs text-[#64748B] hidden sm:inline">· {previewUrl}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openLive}
            disabled={!previewUrl}
            className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors disabled:opacity-50"
          >
            <ExternalLink size={15} />
            View Live
          </button>

          <button
            onClick={handlePublishToggle}
            disabled={isPublishing}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${
              isPublished
                ? "border border-[#1e2a4a] bg-[#0A0F1E] text-[#94A3B8] hover:text-white"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            <Globe size={15} />
            {isPublishing ? "..." : isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      {(notice || error) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {error || notice}
        </div>
      )}

      {/* ---- Editor + Preview ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT */}
        <div className="lg:col-span-5 space-y-5">
          <PageManager data={websiteData} activePage={activePage} onPageChange={setActivePage} />

          {currentEditor}

          <SettingsPanel data={websiteData} onChange={setWebsiteData} />
          <SectionsEditor data={websiteData} onChange={setWebsiteData} />

          {/* Marketing / Tracking */}
          <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
            <h3 className="text-sm font-bold text-white mb-1">Marketing & Tracking</h3>
            <p className="text-xs text-[#64748B] mb-4">Add pixels to track visitors for ads & analytics.</p>

            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Meta (Facebook) Pixel ID</label>
            <input
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              placeholder="e.g. 1234567890"
              className="w-full mb-4 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />

            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Google Analytics ID</label>
            <input
              value={gaId}
              onChange={(e) => setGaId(e.target.value)}
              placeholder="e.g. G-XXXXXXX"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FC5E01] py-3.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={15} />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7">
          <WebsitePreview data={websiteData} activePage={activePage} device={previewDevice} setDevice={setPreviewDevice} />
        </div>
      </div>
    </div>
  );
}