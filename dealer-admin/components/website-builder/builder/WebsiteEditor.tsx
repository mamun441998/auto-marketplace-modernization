"use client";

import { useMemo, useState } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react"; 

// Using absolute paths (starting with @/) ensures Next.js always finds your files
// regardless of where WebsiteEditor.tsx is located in your project.
import PageManager from "@/components/website-builder/PageManager";
import SettingsPanel from "@/components/website-builder/SettingsPanel";
import WebsitePreview from "@/components/website-builder/WebsitePreview";

// Importing editors using absolute paths
import HomePageEditor from "@/components/website-builder/editors/HomePageEditor";
import InventoryPageEditor from "@/components/website-builder/editors/InventoryPageEditor";
import AboutPageEditor from "@/components/website-builder/editors/AboutPageEditor";
import ContactPageEditor from "@/components/website-builder/editors/ContactPageEditor";
import FinancingPageEditor from "@/components/website-builder/editors/FinancingPageEditor";

import { WebsiteData, WebsitePage, defaultWebsiteData } from "@/lib/websiteData";

export default function WebsiteEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [activePage, setActivePage] = useState<WebsitePage>("home");
  const [websiteData, setWebsiteData] = useState<WebsiteData>(defaultWebsiteData);

  // This function returns the specific editor component based on the selected page
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
    // Note: When connecting to the backend, trigger the API call here
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

        {/* Global settings (theme, contact, chat widget) - applied to all pages */}
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