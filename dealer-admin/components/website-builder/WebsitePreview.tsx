"use client";

import { useMemo } from "react";
import { Monitor, Smartphone, Eye, Car, Phone, MessageSquare, ShieldCheck, BadgePercent } from "lucide-react";
import { inventoryVehicles, dealerProfile } from "@/lib/dealerData";
import { WebsiteData, WebsitePage } from "@/lib/websiteData";

interface WebsitePreviewProps {
  data: WebsiteData;
  activePage: WebsitePage;
  device: "desktop" | "mobile";
  setDevice: (device: "desktop" | "mobile") => void;
}

// Protita page er hero e ki dekhabe (title, subtitle, CTA button text)
// shobgulo shorashori data theke ashe, kono hardcoded generic text nei
function getPageHero(data: WebsiteData, activePage: WebsitePage) {
  switch (activePage) {
    case "home":
      return {
        title: data.home.heroTitle,
        subtitle: data.home.heroSubtitle,
        ctaLabel: `Explore Inventory (${inventoryVehicles.length})`,
      };
    case "inventory":
      return {
        title: data.inventory.title,
        subtitle: data.inventory.subtitle,
        ctaLabel: "View Vehicle Details",
      };
    case "about":
      return {
        title: data.about.title,
        subtitle: data.about.subtitle,
        ctaLabel: "Meet Our Team",
      };
    case "financing":
      return {
        title: data.financing.title,
        subtitle: data.financing.subtitle,
        ctaLabel: "Apply Financing",
      };
    case "contact":
      return {
        title: data.contact.title,
        subtitle: data.contact.subtitle,
        ctaLabel: "Contact Dealer",
      };
  }
}

export default function WebsitePreview({ data, activePage, device, setDevice }: WebsitePreviewProps) {
  const liveVehicles = useMemo(
    () => inventoryVehicles.slice(0, data.home.featuredCount),
    [data.home.featuredCount]
  );

  const hero = getPageHero(data, activePage);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-4 shadow-2xl sticky top-6">
      {/* Simulation Window Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2a4a] pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/40 flex-shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/40 flex-shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/40 flex-shrink-0" />
          <span className="text-[10px] text-[#64748B] font-mono ml-2 truncate max-w-[180px] sm:max-w-xs">
            showroom.{dealerProfile.dealershipName.toLowerCase().replace(/\s+/g, "-")}.com
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-1">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`p-1.5 rounded-lg transition-colors ${device === "desktop" ? "bg-[#FC5E01] text-white" : "text-[#64748B] hover:text-white"}`}
            >
              <Monitor size={14} />
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`p-1.5 rounded-lg transition-colors ${device === "mobile" ? "bg-[#FC5E01] text-white" : "text-[#64748B] hover:text-white"}`}
            >
              <Smartphone size={14} />
            </button>
          </div>

          <div className="flex items-center gap-1 text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg font-bold tracking-wider uppercase">
            <Eye size={10} />
            Live Preview
          </div>
        </div>
      </div>

      {/* Iframe-style Preview */}
      <div className="w-full bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 transition-all duration-300">
        <div
          className={`mx-auto bg-slate-900 min-h-[580px] max-h-[650px] overflow-y-auto transition-all duration-300 flex flex-col justify-between relative ${
            device === "mobile" ? "max-w-[360px] border-x border-slate-700" : "w-full"
          }`}
        >
          <div>
            {/* Navbar - shobshomoy Settings er global contactPhone use kore, jate ekta consistent number thake */}
            <nav className="bg-slate-950/80 backdrop-blur border-b border-slate-800/60 px-4 py-3.5 flex items-center justify-between sticky top-0 z-10">
              <span className="text-xs font-bold tracking-tight text-white">{dealerProfile.dealershipName}</span>
              
                <a
  href="#" 
  className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg text-white transition-opacity"
  style={{ backgroundColor: data.settings.theme.primary }}
>
  <Phone size={11} />
  {device === "desktop" && "Call Dealer"}
</a>
            </nav>

            {/* Hero Banner - shob field shorashori data theke, kono hardcoded text nei */}
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center py-14 px-5 border-b border-slate-800/40 relative">
              <h2 className="text-base sm:text-xl font-bold text-white leading-tight max-w-md mx-auto">
                {hero.title || "Add a title in the editor"}
              </h2>
              <p className="text-[11px] text-slate-400 mt-2.5 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                {hero.subtitle || "Add a description in the editor"}
              </p>
              <button
                type="button"
                className="mt-5 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                style={{ backgroundColor: data.settings.theme.primary }}
              >
                {hero.ctaLabel}
              </button>
            </div>

            {/* Home page: Featured vehicle grid */}
            {activePage === "home" && (
              <div className="p-4 bg-slate-900/50">
                <div className="flex items-center justify-between mb-3.5">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Featured Vehicles</p>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Showing {liveVehicles.length} of {inventoryVehicles.length}
                  </span>
                </div>

                <div className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                  {liveVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
                      <div>
                        <div className={`h-24 w-full rounded-lg bg-gradient-to-br ${vehicle.gradient} flex items-center justify-center mb-2.5 opacity-90`}>
                          <Car size={26} className="text-white/80" />
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {vehicle.make} {vehicle.model}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {vehicle.year} · {vehicle.bodyType} · {vehicle.transmission}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-bold text-white">${vehicle.price.toLocaleString()}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            vehicle.status === "In Stock" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inventory page: full vehicle list */}
            {activePage === "inventory" && (
              <div className="p-4 bg-slate-900/50">
                <div className="flex items-center justify-between mb-3.5">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">All Vehicles</p>
                  <span className="text-[10px] text-slate-500 font-medium">{inventoryVehicles.length} vehicles</span>
                </div>

                <div className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                  {inventoryVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
                      <div>
                        <div className={`h-24 w-full rounded-lg bg-gradient-to-br ${vehicle.gradient} flex items-center justify-center mb-2.5 opacity-90`}>
                          <Car size={26} className="text-white/80" />
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {vehicle.make} {vehicle.model}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {vehicle.year} · {vehicle.bodyType} · {vehicle.transmission}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-bold text-white">${vehicle.price.toLocaleString()}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            vehicle.status === "In Stock" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About page: story content */}
            {activePage === "about" && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{data.about.title}</h3>
                <p className="mt-2 text-slate-400">{data.about.subtitle}</p>
                <p className="mt-6 text-sm leading-7 text-slate-300 whitespace-pre-line">{data.about.story}</p>
              </div>
            )}

            {/* Financing page: dedicated content (financing banner nicher conditional block e na, ekhaneo ache) */}
            {activePage === "financing" && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{data.financing.title}</h3>
                <p className="mt-2 text-slate-400">{data.financing.subtitle}</p>
                <button
                  className="mt-6 rounded-xl px-5 py-3 text-white font-bold text-sm"
                  style={{ backgroundColor: data.settings.theme.primary }}
                >
                  Apply Now
                </button>
              </div>
            )}

            {/* Contact page: contact details */}
            {activePage === "contact" && (
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">{data.contact.title}</h3>
                <p className="text-slate-400">{data.contact.subtitle}</p>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>📞 {data.contact.phone}</p>
                  <p>✉️ {data.contact.email}</p>
                  <p>📍 {data.contact.address}</p>
                </div>
              </div>
            )}

            {/* Financing banner - SHUDHU Home page e dekhabe, onno kono page e na */}
            {activePage === "home" && data.home.showFinancing && (
              <div className="mx-4 mb-6 p-3.5 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 flex items-start gap-3">
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: `${data.settings.theme.primary}15`,
                    color: data.settings.theme.primary,
                  }}
                >
                  <BadgePercent size={15} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{data.financing.title || "Instant Credit Approval"}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                    {data.financing.subtitle || "Apply directly online for fast pre-approval."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Widget Trigger */}
          {data.settings.enableChatWidget && (
            <div className="fixed bottom-4 right-4 z-20 shadow-xl pointer-events-none">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-white cursor-pointer transform active:scale-90 transition-transform shadow-lg"
                style={{ backgroundColor: data.settings.theme.primary }}
              >
                <MessageSquare size={16} />
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="border-t border-slate-800/60 bg-slate-950 px-4 py-3 flex items-center justify-between text-[9px] text-slate-500">
            <span>© {new Date().getFullYear()} {dealerProfile.dealershipName}</span>
            <div className="flex items-center gap-1">
              <ShieldCheck size={10} className="text-slate-400" />
              <span>Certified Storefront</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}