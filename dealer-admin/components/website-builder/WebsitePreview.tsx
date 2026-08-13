"use client";

import { useEffect, useMemo, useState } from "react";
import { Monitor, Smartphone, Eye, Car, Phone, MessageSquare, ShieldCheck, BadgePercent } from "lucide-react";
import { WebsiteData, WebsitePage } from "@/lib/websiteData";
import { fetchMyVehicles, type Vehicle } from "@/lib/vehicle";

interface WebsitePreviewProps {
  data: WebsiteData;
  activePage: WebsitePage;
  device: "desktop" | "mobile";
  setDevice: (device: "desktop" | "mobile") => void;
}

/* ---- real vehicle helpers ---- */
function vehicleImage(v: Vehicle): string | null {
  return (
    v.primary_image_url ||
    v.featured_image?.image_url ||
    v.images?.[0]?.image_url ||
    null
  );
}
function vehiclePrice(v: Vehicle): string {
  if (v.formatted_price) return v.formatted_price;
  const n = Number(v.price);
  return isNaN(n) ? "—" : `$${n.toLocaleString()}`;
}
function statusLabel(v: Vehicle): { text: string; ok: boolean } {
  if (v.status === "active") return { text: "In Stock", ok: true };
  if (v.status === "sold") return { text: "Sold", ok: false };
  if (v.status === "pending") return { text: "Pending", ok: false };
  return { text: v.status, ok: false };
}

function getPageHero(data: WebsiteData, activePage: WebsitePage, count: number) {
  switch (activePage) {
    case "home":
      return { title: data.home.heroTitle, subtitle: data.home.heroSubtitle, ctaLabel: `Explore Inventory (${count})` };
    case "inventory":
      return { title: data.inventory.title, subtitle: data.inventory.subtitle, ctaLabel: "View Vehicle Details" };
    case "about":
      return { title: data.about.title, subtitle: data.about.subtitle, ctaLabel: "Meet Our Team" };
    case "financing":
      return { title: data.financing.title, subtitle: data.financing.subtitle, ctaLabel: "Apply Financing" };
    case "contact":
      return { title: data.contact.title, subtitle: data.contact.subtitle, ctaLabel: "Contact Dealer" };
  }
}

/* ---- a single vehicle card ---- */
function VehicleCard({ v, primary }: { v: Vehicle; primary: string }) {
  const img = vehicleImage(v);
  const st = statusLabel(v);
  return (
    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
      <div>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={`${v.make} ${v.model}`} className="h-24 w-full rounded-lg object-cover mb-2.5" />
        ) : (
          <div className="h-24 w-full rounded-lg bg-slate-800 flex items-center justify-center mb-2.5">
            <Car size={26} className="text-white/40" />
          </div>
        )}
        <h4 className="text-xs font-bold text-white truncate">
          {v.make} {v.model}
        </h4>
        <p className="text-[10px] text-slate-400 mt-0.5">
          {[v.year, v.body_type, v.transmission].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-xs font-bold text-white">{vehiclePrice(v)}</span>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
            st.ok ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
          }`}
        >
          {st.text}
        </span>
      </div>
    </div>
  );
}

export default function WebsitePreview({ data, activePage, device, setDevice }: WebsitePreviewProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const primary = data.settings.theme.primary;
  const dealershipName = data.branding.dealershipName || "Your Dealership";

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMyVehicles({ per_page: 50, sort_by: "created_at", sort_dir: "desc" });
        if (res.success) setVehicles(res.vehicles ?? []);
      } catch {
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

    const featured = useMemo(() => {
    const ids = data.home.featuredVehicleIds ?? [];
    if (ids.length > 0) {
      // keep selection order
      return ids
        .map((id) => vehicles.find((v) => v.id === id))
        .filter((v): v is Vehicle => Boolean(v));
    }
    return vehicles.slice(0, Math.max(0, data.home.featuredCount));
  }, [vehicles, data.home.featuredVehicleIds, data.home.featuredCount]);

  const hero = getPageHero(data, activePage, vehicles.length);

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-4 shadow-2xl sticky top-6">
      {/* Simulation Window Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2a4a] pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/40 flex-shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/40 flex-shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/40 flex-shrink-0" />
          <span className="text-[10px] text-[#64748B] font-mono ml-2 truncate max-w-[180px] sm:max-w-xs">
            showroom.{dealershipName.toLowerCase().replace(/\s+/g, "-")}.com
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-1">
            <button type="button" onClick={() => setDevice("desktop")} className={`p-1.5 rounded-lg transition-colors ${device === "desktop" ? "bg-[#FC5E01] text-white" : "text-[#64748B] hover:text-white"}`}>
              <Monitor size={14} />
            </button>
            <button type="button" onClick={() => setDevice("mobile")} className={`p-1.5 rounded-lg transition-colors ${device === "mobile" ? "bg-[#FC5E01] text-white" : "text-[#64748B] hover:text-white"}`}>
              <Smartphone size={14} />
            </button>
          </div>
          <div className="flex items-center gap-1 text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg font-bold tracking-wider uppercase">
            <Eye size={10} />
            Live Preview
          </div>
        </div>
      </div>

      {/* Preview body */}
      <div className="w-full bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 transition-all duration-300">
        <div
          className={`mx-auto bg-slate-900 min-h-[580px] max-h-[650px] overflow-y-auto transition-all duration-300 flex flex-col justify-between relative ${
            device === "mobile" ? "max-w-[360px] border-x border-slate-700" : "w-full"
          }`}
        >
          <div>
            {/* Navbar */}
            <nav className="bg-slate-950/80 backdrop-blur border-b border-slate-800/60 px-4 py-3.5 flex items-center justify-between sticky top-0 z-10">
              <span className="flex items-center gap-2 text-xs font-bold tracking-tight text-white">
                {data.branding.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.branding.logo} alt={dealershipName} className="h-6 w-auto object-contain" />
                ) : null}
                {dealershipName}
              </span>
              <a href="#" className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg text-white" style={{ backgroundColor: primary }}>
                <Phone size={11} />
                {device === "desktop" && "Call Dealer"}
              </a>
            </nav>

            {/* Hero */}
            <div
              className="text-center py-14 px-5 border-b border-slate-800/40 relative bg-cover bg-center"
              style={
                activePage === "home" && data.home.heroImage
                  ? { backgroundImage: `linear-gradient(rgba(2,6,23,0.7),rgba(2,6,23,0.85)), url(${data.home.heroImage})` }
                  : { background: "linear-gradient(to bottom, #020617, #0f172a, #020617)" }
              }
            >
              <h2 className="text-base sm:text-xl font-bold text-white leading-tight max-w-md mx-auto">
                {hero.title || "Add a title in the editor"}
              </h2>
              <p className="text-[11px] text-slate-300 mt-2.5 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                {hero.subtitle || "Add a description in the editor"}
              </p>
              <button type="button" className="mt-5 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md" style={{ backgroundColor: primary }}>
                {hero.ctaLabel}
              </button>
            </div>

            {/* Home: featured vehicles */}
            {activePage === "home" && (
              <div className="p-4 bg-slate-900/50">
                <div className="flex items-center justify-between mb-3.5">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Featured Vehicles</p>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {loading ? "Loading…" : `Showing ${featured.length} of ${vehicles.length}`}
                  </span>
                </div>
                {featured.length === 0 && !loading ? (
                  <p className="text-[11px] text-slate-500 py-6 text-center">No vehicles yet. Add cars in Inventory.</p>
                ) : (
                  <div className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                    {featured.map((v) => (
                      <VehicleCard key={v.id} v={v} primary={primary} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Inventory: all vehicles */}
            {activePage === "inventory" && (
              <div className="p-4 bg-slate-900/50">
                <div className="flex items-center justify-between mb-3.5">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">All Vehicles</p>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {loading ? "Loading…" : `${vehicles.length} vehicles`}
                  </span>
                </div>
                {vehicles.length === 0 && !loading ? (
                  <p className="text-[11px] text-slate-500 py-6 text-center">No vehicles yet.</p>
                ) : (
                  <div className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                    {vehicles.map((v) => (
                      <VehicleCard key={v.id} v={v} primary={primary} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* About */}
            {activePage === "about" && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{data.about.title}</h3>
                <p className="mt-2 text-slate-400">{data.about.subtitle}</p>
                <p className="mt-6 text-sm leading-7 text-slate-300 whitespace-pre-line">{data.about.story}</p>
              </div>
            )}

            {/* Financing */}
            {activePage === "financing" && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{data.financing.title}</h3>
                <p className="mt-2 text-slate-400">{data.financing.subtitle}</p>
                <button className="mt-6 rounded-xl px-5 py-3 text-white font-bold text-sm" style={{ backgroundColor: primary }}>
                  Apply Now
                </button>
              </div>
            )}

            {/* Contact */}
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

            {/* Financing banner (home only) */}
            {activePage === "home" && data.home.showFinancing && (
              <div className="mx-4 mb-6 p-3.5 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 flex items-start gap-3">
                <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: `${primary}15`, color: primary }}>
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

            
            {/* Custom content sections (home only) */}
            {activePage === "home" &&
              (data.sections ?? [])
                .filter((s) => s.enabled)
                .map((sec) => {
                  if (sec.type === "text-image") {
                    return (
                      <div
                        key={sec.id}
                        className={`p-4 flex gap-3 items-center ${
                          device === "mobile"
                            ? "flex-col"
                            : sec.imageSide === "left"
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        {sec.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={sec.image} alt="" className="w-full sm:w-1/2 h-28 rounded-lg object-cover" />
                        ) : (
                          <div className="w-full sm:w-1/2 h-28 rounded-lg bg-slate-800" />
                        )}
                        <div className="w-full sm:w-1/2">
                          <h4 className="text-sm font-bold text-white">{sec.heading}</h4>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{sec.body}</p>
                          {sec.buttonText && (
                            <span className="inline-block mt-2 px-3 py-1 rounded-lg text-[10px] font-bold text-white" style={{ backgroundColor: primary }}>
                              {sec.buttonText}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === "cta") {
                    const bg = sec.background === "primary" ? primary : sec.background === "light" ? "#e2e8f0" : "#0f172a";
                    const txt = sec.background === "light" ? "#0f172a" : "#fff";
                    return (
                      <div key={sec.id} className="p-6 text-center" style={{ backgroundColor: bg, color: txt }}>
                        <h4 className="text-sm font-bold">{sec.heading}</h4>
                        {sec.body && <p className="text-[11px] opacity-90 mt-1">{sec.body}</p>}
                        {sec.buttonText && (
                          <span
                            className="inline-block mt-3 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                            style={{
                              backgroundColor: sec.background === "primary" ? "#fff" : primary,
                              color: sec.background === "primary" ? primary : "#fff",
                            }}
                          >
                            {sec.buttonText}
                          </span>
                        )}
                      </div>
                    );
                  }

                                    if (sec.type === "reviews") {
                    const clamp = (n: number) => Math.max(0, Math.min(5, n));
                    return (
                      <div key={sec.id} className="p-4 bg-slate-900/50">
                        <h4 className="text-sm font-bold text-white text-center mb-3">{sec.heading}</h4>
                        <div className={`grid gap-3 ${device === "mobile" ? "grid-cols-1" : "grid-cols-2"}`}>
                          {(sec.reviews ?? []).map((r, i) => (
                            <div key={i} className="bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                              <div className="text-[11px]" style={{ color: primary }}>
                                {"★".repeat(clamp(r.rating))}
                                <span className="text-slate-700">{"★".repeat(5 - clamp(r.rating))}</span>
                              </div>
                              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">{r.text}</p>
                              <p className="text-[10px] font-bold text-white mt-2">— {r.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === "banner") {
                    const bg = sec.background === "light" ? "#e2e8f0" : sec.background === "dark" ? "#0f172a" : primary;
                    const txt = sec.background === "light" ? "#0f172a" : "#fff";
                    return (
                      <div key={sec.id} className="px-4 py-3 flex items-center justify-center gap-3 text-center" style={{ backgroundColor: bg, color: txt }}>
                        <span className="text-xs font-bold">{sec.heading}</span>
                        {sec.buttonText && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/90" style={{ color: primary }}>{sec.buttonText}</span>}
                      </div>
                    );
                  }

                  if (sec.type === "gallery") {
                    return (
                      <div key={sec.id} className="p-4 bg-slate-900/50">
                        {sec.heading && <h4 className="text-sm font-bold text-white text-center mb-3">{sec.heading}</h4>}
                        <div className="grid grid-cols-3 gap-2">
                          {(sec.images ?? []).map((img, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={img} alt="" className="h-16 w-full object-cover rounded-lg" />
                          ))}
                          {(sec.images ?? []).length === 0 && <p className="col-span-3 text-[11px] text-slate-500 text-center py-3">Add images in the editor.</p>}
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === "brands") {
                    return (
                      <div key={sec.id} className="p-4">
                        {sec.heading && <h4 className="text-xs font-bold text-white text-center mb-3">{sec.heading}</h4>}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          {(sec.images ?? []).map((img, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={img} alt="" className="h-8 w-auto object-contain bg-white rounded p-1" />
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === "faq") {
                    return (
                      <div key={sec.id} className="p-4 space-y-2">
                        {sec.heading && <h4 className="text-sm font-bold text-white text-center mb-2">{sec.heading}</h4>}
                        {(sec.faqs ?? []).map((f, i) => (
                          <div key={i} className="rounded-lg bg-slate-950 border border-slate-800/80 p-2.5">
                            <p className="text-[11px] font-bold text-white">{f.q}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{f.a}</p>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  if (sec.type === "stats") {
                    return (
                      <div key={sec.id} className="p-4">
                        {sec.heading && <h4 className="text-sm font-bold text-white text-center mb-3">{sec.heading}</h4>}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          {(sec.stats ?? []).map((s, i) => (
                            <div key={i}>
                              <p className="text-lg font-black" style={{ color: primary }}>{s.value}</p>
                              <p className="text-[9px] text-slate-400">{s.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === "team") {
                    return (
                      <div key={sec.id} className="p-4">
                        {sec.heading && <h4 className="text-sm font-bold text-white text-center mb-3">{sec.heading}</h4>}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          {(sec.team ?? []).map((m, i) => (
                            <div key={i}>
                              {m.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={m.image} alt="" className="h-14 w-14 rounded-full object-cover mx-auto" />
                              ) : (
                                <div className="h-14 w-14 rounded-full bg-slate-800 mx-auto" />
                              )}
                              <p className="text-[10px] font-bold text-white mt-1.5">{m.name}</p>
                              <p className="text-[9px] text-slate-400">{m.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === "video") {
                    return (
                      <div key={sec.id} className="p-4">
                        {sec.heading && <h4 className="text-sm font-bold text-white text-center mb-2">{sec.heading}</h4>}
                        <div className="aspect-video rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-center">
                          <span className="text-3xl">▶️</span>
                        </div>
                      </div>
                    );
                  }

                                    return null;
                })}
          </div>

          {/* Chat widget */}
          {data.settings.enableChatWidget && (
            <div className="fixed bottom-4 right-4 z-20 shadow-xl pointer-events-none">
              <div className="h-9 w-9 rounded-full flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: primary }}>
                <MessageSquare size={16} />
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="border-t border-slate-800/60 bg-slate-950 px-4 py-3 flex items-center justify-between text-[9px] text-slate-500">
            <span>© {new Date().getFullYear()} {dealershipName}</span>
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