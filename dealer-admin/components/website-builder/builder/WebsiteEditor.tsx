"use client";

"use client";

import { useMemo, useState } from "react";

import BuilderHeader from "./BuilderHeader";
import BuilderSidebar from "./BuilderSidebar";
import WebsitePreview from "./WebsitePreview";

import PageManager from "../PageManager";
import SettingsPanel from "../SettingsPanel";

import HomePageEditor from "../editors/HomePageEditor";
import InventoryPageEditor from "../editors/InventoryPageEditor";
import AboutPageEditor from "../editors/AboutPageEditor";
import ContactPageEditor from "../editors/ContactPageEditor";
import FinancingPageEditor from "../editors/FinancingPageEditor";

import { WebsiteData, WebsitePage } from "@/lib/websiteData";

export default function WebsiteEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [activePage, setActivePage] = useState<WebsitePage>("home");
  const [websiteData, setWebsiteData] = useState<WebsiteData>(defaultWebsiteData);

  // Ei function ta shudhu selected page er editor component ta return kore
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

  const handleSaveConfig = () => {
    setIsSaving(true);
    // 💡 Backend connect korar somoy: eikhane API call hobe
    // jemon: await fetch("/api/dealer/website", { method: "PATCH", body: JSON.stringify(websiteData) })
    setTimeout(() => {
      setIsSaving(false);
      alert("Website updated successfully (backend not connected yet)");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT PANEL */}
      <div className="lg:col-span-5 space-y-5">
        <PageManager data={websiteData} activePage={activePage} onPageChange={setActivePage} />

        {currentEditor}

        {/* Global settings (theme, contact, chat widget) - shob page e apply hoy */}
        <SettingsPanel data={websiteData} onChange={setWebsiteData} />

        <button
          type="button"
          onClick={handleSaveConfig}
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
              Save & Publish
            </>
          )}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:col-span-7">
        <WebsitePreview data={websiteData} activePage={activePage} device={previewDevice} setDevice={setPreviewDevice} />
      </div>
    </div>
  );
}