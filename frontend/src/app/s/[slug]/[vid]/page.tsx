"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, X, Gauge, Fuel, Settings2, Calendar, Palette, Tag,
  CarFront, Loader2, CheckCircle2, Calculator,
} from "lucide-react";


import { fetchDealerSite, DealerSite } from "@/lib/site";
import { fetchMarketplaceVehicle, submitInquiry, ApiVehicle } from "@/lib/marketplace";

const cap = (s?: string | null) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");

/* ---- EMI / Finance calculator ---- */
function FinanceCalculator({ price, primary, defaultApr }: { price: number; primary: string; defaultApr: number }) {
  
  const [down, setDown] = useState(() => Math.round(price * 0.1));
  const [rate, setRate] = useState(defaultApr);
  const [term, setTerm] = useState(60);

  const principal = Math.max(0, price - down);
  const r = rate / 100 / 12;
  const monthly = r === 0 ? principal / term : (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);

  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Calculator size={16} style={{ color: primary }} />
        <h3 className="text-base font-bold">Finance Calculator</h3>
      </div>
      <p className="text-xs text-gray-400 mb-4">Estimate your monthly payment.</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
            <span>Down payment</span>
            <span>${down.toLocaleString()}</span>
          </div>
          <input type="range" min={0} max={price || 1} step={Math.max(100, Math.round((price || 1000) / 100))} value={down} onChange={(e) => setDown(Number(e.target.value))} className="w-full" style={{ accentColor: primary }} />
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
            <span>Interest rate (APR)</span>
            <span>{rate}%</span>
          </div>
          <input type="range" min={0} max={30} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" style={{ accentColor: primary }} />
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
            <span>Loan term</span>
            <span>{term} months</span>
          </div>
          <input type="range" min={12} max={84} step={12} value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full" style={{ accentColor: primary }} />
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">Estimated monthly payment</p>
        <p className="text-3xl font-black mt-1" style={{ color: primary }}>
          ${isFinite(monthly) ? Math.round(monthly).toLocaleString() : "—"}
          <span className="text-sm font-semibold text-gray-400">/mo</span>
        </p>
        <p className="text-[10px] text-gray-400 mt-2">*Estimate only. Contact us for exact financing terms.</p>
      </div>
    </div>
  );
}

/* ---- Book a Test Drive modal ---- */
function TestDriveModal({ vehicle, dealerId, primary, onClose }: { vehicle: ApiVehicle; dealerId: number; primary: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning (9am–12pm)");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setErr(null);
    const msg = `🚗 TEST DRIVE REQUEST\nVehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}\nPreferred date: ${date || "—"}\nPreferred time: ${time}`;
    try {
      const res = await submitInquiry({
        dealer_id: dealerId,
        vehicle_id: vehicle.id,
        name: name.trim(),
        email: email.trim() || null,
        phone: phone.trim() || null,
        message: msg,
        source: "website",
      });
      if (res.success) setSent(true);
      else setErr((res as any).message || "Failed to book. Try again.");
    } catch {
      setErr("Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-gray-900">Book a Test Drive</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <p className="text-xs text-gray-400 mb-4">{vehicle.year} {vehicle.make} {vehicle.model}</p>

        {sent ? (
          <div className="flex flex-col items-center text-center py-8">
            <CheckCircle2 size={44} className="text-emerald-500 mb-3" />
            <p className="font-semibold text-gray-800">Test drive requested!</p>
            <p className="mt-1 text-sm text-gray-500">We'll confirm your booking shortly.</p>
            <button onClick={onClose} className="mt-5 px-6 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: primary }}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            {err && <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-600">{err}</div>}
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name *" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone *" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
              <select value={time} onChange={(e) => setTime(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-500">
                <option>Morning (9am–12pm)</option>
                <option>Afternoon (12pm–4pm)</option>
                <option>Evening (4pm–7pm)</option>
              </select>
            </div>
            <button type="submit" disabled={sending} className="rounded-xl py-3 text-white text-sm font-semibold disabled:opacity-60" style={{ background: primary }}>
              {sending ? "Booking..." : "Request Test Drive"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}



export default function DealerProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const vid = params?.vid as string;

  const [site, setSite] = useState<DealerSite | null>(null);
  const [vehicle, setVehicle] = useState<ApiVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);
    const [showTD, setShowTD] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !vid) return;
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const [siteRes, vRes] = await Promise.all([
          fetchDealerSite(slug),
          fetchMarketplaceVehicle(vid),
        ]);
        if (siteRes.success && siteRes.website && vRes.success && vRes.vehicle) {
          setSite(siteRes.website);
          setVehicle(vRes.vehicle);
          setForm((f) => ({
            ...f,
            message: `Hi, I'm interested in the ${vRes.vehicle!.year} ${vRes.vehicle!.make} ${vRes.vehicle!.model}. Is it available?`,
          }));
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, vid]);

  
  // SEO title + favicon (per dealer)
  useEffect(() => {
    if (!site) return;
    const seo = site.config?.seo ?? {};
    const brand = site.config?.branding ?? {};
    const name = brand.dealershipName || site.dealer?.name || "Dealership";
    document.title = seo.metaTitle || name;

    if (brand.favicon) {
      document.head
        .querySelectorAll<HTMLLinkElement>("link[rel~='icon'], link[rel='shortcut icon']")
        .forEach((l) => { if (l.id !== "mh-favicon") l.href = brand.favicon; });
      let link = document.getElementById("mh-favicon") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.id = "mh-favicon";
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = brand.favicon;
    }
  }, [site]);

  const primary = site?.config?.settings?.ctaColor || site?.config?.settings?.theme?.primary || "#FC5E01";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dealerId = site?.dealer?.id ?? vehicle?.dealer_id ?? null;
    if (sending || !dealerId || !vehicle) return;
    setFormError(null);
    setSending(true);
    try {
      const res = await submitInquiry({
        dealer_id: dealerId,
        vehicle_id: vehicle.id,
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        message: form.message.trim() || null,
        source: "website",
      });
      if (res.success) setSent(true);
      else setFormError((res as any).message || "Failed to send.");
    } catch {
      setFormError("Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={26} className="animate-spin" style={{ color: primary }} />
      </div>
    );
  }

  if (notFound || !vehicle || !site) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <CarFront size={44} className="text-gray-300 mb-4" />
        <h1 className="text-xl font-bold text-gray-800">Vehicle not found</h1>
        <Link href={`/s/${slug}`} className="mt-4 text-sm font-semibold" style={{ color: primary }}>
          ← Back to site
        </Link>
      </div>
    );
  }

  const branding = site.config?.branding ?? {};
  const settings = site.config?.settings ?? {};
  const siteName = branding.dealershipName || branding.siteName || site.dealer.name;
  const logo = branding.logo || site.dealer.logo_url || null;
  const headerBg = settings.headerBg || null;
  const headerText = settings.textColor || null;
  const contactPhone = site.config?.contact?.phone || branding.phone || site.dealer.phone || null;
  const invEnabled = site.config?.inventory?.enabled !== false;
  const images = vehicle.images ?? [];

  const mainImage = images[activeImg]?.image_url || vehicle.primary_image_url || null;
  const price = vehicle.price != null ? `$${Number(vehicle.price).toLocaleString()}` : "—";
  const d = vehicle.details ?? {};

  const specs = [
    { icon: Calendar, label: "Year", value: vehicle.year?.toString() },
    { icon: Gauge, label: "Mileage", value: vehicle.mileage != null ? `${(vehicle.mileage / 1000).toFixed(1)}K mi` : "—" },
    { icon: CarFront, label: "Body Type", value: cap(vehicle.body_type) },
    { icon: Fuel, label: "Fuel Type", value: cap(vehicle.fuel_type) },
    { icon: Settings2, label: "Transmission", value: cap(vehicle.transmission) },
    { icon: Tag, label: "Condition", value: cap(vehicle.condition) },
    { icon: Palette, label: "Color", value: cap(vehicle.color) },
    { icon: Settings2, label: "Engine", value: d.engine || "—" },
    { icon: Settings2, label: "Drivetrain", value: d.drivetrain || "—" },
    { icon: CarFront, label: "Doors", value: d.doors != null ? String(d.doors) : "—" },
    { icon: CarFront, label: "Seats", value: d.seats != null ? String(d.seats) : "—" },
    { icon: Palette, label: "Interior", value: d.interior_color || "—" },
    { icon: Tag, label: "Warranty", value: d.warranty || "—" },
    { icon: Tag, label: "VIN", value: vehicle.vin || "—" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
            {/* Header (same as main site) */}
      <header
        className="sticky top-0 z-40 backdrop-blur border-b border-gray-100"
        style={{ background: headerBg || "rgba(255,255,255,0.9)", color: headerText || undefined }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/s/${slug}`} className="flex items-center gap-2">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={siteName} className="h-10 w-auto max-w-[190px] object-contain" />
            ) : (
              <>
                <div className="h-9 w-9 rounded-lg flex items-center justify-center text-white font-bold" style={{ background: primary }}>
                  {siteName.charAt(0)}
                </div>
                <span className="font-bold text-lg">{siteName}</span>
              </>
            )}
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium" style={{ color: headerText || "#4b5563" }}>
            <Link href={`/s/${slug}#home`} className="hover:opacity-70">Home</Link>
            {invEnabled && <Link href={`/s/${slug}#inventory`} className="hover:opacity-70">Inventory</Link>}
            <Link href={`/s/${slug}#about`} className="hover:opacity-70">About</Link>
            <Link href={`/s/${slug}#contact`} className="hover:opacity-70">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={`/s/${slug}`} className="hidden sm:flex items-center gap-1 text-sm hover:opacity-70" style={{ color: headerText || "#4b5563" }}>
              <ChevronLeft size={16} /> Back
            </Link>
            {contactPhone && (
              <a href={`tel:${contactPhone}`} className="text-sm font-semibold text-white px-4 py-2 rounded-lg" style={{ background: primary }}>
                Call Now
              </a>
            )}
          </div>
        </div>
      </header>

            {/* Image zoom lightbox */}
      {zoom && mainImage && (
        <div onClick={() => setZoom(false)} className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setZoom(false)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i - 1 + images.length) % images.length); }}
                className="absolute left-4 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i + 1) % images.length); }}
                className="absolute right-4 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg select-none"
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {/* Gallery */}
          <div className="rounded-2xl border border-gray-200 p-4">
                        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              {mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainImage}
                  alt=""
                  onClick={() => setZoom(true)}
                  className="h-full w-full object-cover cursor-zoom-in"
                  title="Click to zoom"
                />
              ) : (
                <span className="text-7xl">🚗</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button key={img.id} onClick={() => setActiveImg(i)}
                    className="aspect-square rounded-lg overflow-hidden border"
                    style={{ borderColor: activeImg === i ? primary : "#e5e7eb" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.image_url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-base font-bold mb-5">Vehicle Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {specs.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} style={{ color: primary }} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{s.label}</span>
                    </div>
                    <p className="text-sm font-bold capitalize break-words">{s.value}</p>
                  </div>
                );
              })}
            </div>

            {vehicle.description && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{vehicle.description}</p>
              </div>
            )}

            {d.highlights && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 mb-2">Highlights</h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{d.highlights}</p>
              </div>
            )}

            {d.features && d.features.length > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {d.features.map((f) => (
                    <span key={f} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200 p-6">
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold">{vehicle.year}</span>
            <h1 className="mt-2 text-2xl font-extrabold capitalize">{vehicle.make} {vehicle.model}</h1>
            <p className="mt-2 text-3xl font-black" style={{ color: primary }}>{price}</p>
          </div>

          
                    {Number(vehicle.price) > 0 && settings.showFinanceCalc !== false && (
            <FinanceCalculator price={Number(vehicle.price)} primary={primary} defaultApr={settings.financeApr ?? 8} />
          )}

          
          <button
            onClick={() => setShowTD(true)}
            className="w-full rounded-2xl border-2 py-3 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            style={{ borderColor: primary, color: primary }}
          >
            <Calendar size={17} /> Book a Test Drive
          </button>

          {showTD && (
            <TestDriveModal vehicle={vehicle} dealerId={site.dealer.id} primary={primary} onClose={() => setShowTD(false)} />
          )}

          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-base font-bold mb-1">Contact {siteName}</h3>
            <p className="text-xs text-gray-400 mb-5">Send an inquiry about this vehicle.</p>
            {sent ? (
              <div className="flex flex-col items-center text-center py-6">
                <CheckCircle2 size={40} className="text-emerald-500 mb-3" />
                <p className="text-sm font-semibold">Inquiry sent!</p>
                <p className="mt-1 text-xs text-gray-500">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {formError && <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-600">{formError}</div>}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name *" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
                <p className="text-[10px] text-gray-400 -mt-1">Provide at least an email or phone.</p>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-gray-500" />
                <button type="submit" disabled={sending} className="rounded-xl py-3 text-white text-sm font-semibold disabled:opacity-60" style={{ background: primary }}>
                  {sending ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}