"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Gauge,
  Fuel,
  Settings2,
  Calendar,
  Palette,
  Tag,
  CarFront,
  MapPin,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { fetchMarketplaceVehicle, submitInquiry, ApiVehicle } from "@/lib/marketplace";

const cap = (s?: string | null) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [vehicle, setVehicle] = useState<ApiVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  // Inquiry form
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const res = await fetchMarketplaceVehicle(id);
        if (res.success && res.vehicle) {
          setVehicle(res.vehicle);
          setForm((f) => ({
            ...f,
            message: `Hi, I'm interested in the ${res.vehicle!.year} ${res.vehicle!.make} ${res.vehicle!.model}. Is it still available?`,
          }));
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Load vehicle failed:", err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dealerId = vehicle?.dealer_id ?? vehicle?.dealer?.id ?? null;
    if (submitting || !dealerId) {
      setFormError("Dealer info missing for this vehicle.");
      return;
    }

    setFormError(null);
    setSubmitting(true);
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

      if (res.success) {
        setSent(true);
      } else {
        setFormError((res as any).message || "Failed to send. Please try again.");
      }
    } catch (err) {
      console.error("Inquiry failed:", err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---- Loading ---- */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center text-[#94A3B8]">
          <Loader2 size={24} className="animate-spin mx-auto text-[#FC5E01]" />
          <p className="mt-3 text-sm">Loading vehicle...</p>
        </div>
      </main>
    );
  }

  /* ---- Not found ---- */
  if (notFound || !vehicle) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="text-center">
          <CarFront size={40} className="text-[#64748B] mx-auto mb-4" />
          <h1 className="text-lg font-bold text-white">Vehicle not found</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">This vehicle may no longer be available.</p>
          <Link
            href="/inventory"
            className="mt-5 inline-block rounded-xl bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
          >
            Back to Inventory
          </Link>
        </div>
      </main>
    );
  }

  const images = vehicle.images ?? [];
  const mainImage = images[activeImg]?.image_url || vehicle.primary_image_url || null;
  const price = vehicle.price != null ? `$${Number(vehicle.price).toLocaleString()}` : "—";

  const specs = [
    { icon: Calendar, label: "Year", value: vehicle.year?.toString() },
    { icon: Gauge, label: "Mileage", value: vehicle.mileage != null ? `${(vehicle.mileage / 1000).toFixed(1)}K mi` : "—" },
    { icon: CarFront, label: "Body Type", value: cap(vehicle.body_type) },
    { icon: Fuel, label: "Fuel Type", value: cap(vehicle.fuel_type) },
    { icon: Settings2, label: "Transmission", value: cap(vehicle.transmission) },
    { icon: Tag, label: "Condition", value: cap(vehicle.condition) },
    { icon: Palette, label: "Color", value: cap(vehicle.color) },
    { icon: Tag, label: "VIN", value: vehicle.vin || "—" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors mb-6"
        >
          <ChevronLeft size={16} />
          Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* LEFT: Gallery + specs + description */}
          <div className="flex flex-col gap-6">
            {/* Gallery */}
            <div className="rounded-2xl border border-[#262626] bg-[#171717] p-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
                {mainImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={mainImage} alt={`${vehicle.make} ${vehicle.model}`} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-7xl">🚗</span>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImg(i)}
                      className={`aspect-square rounded-lg overflow-hidden border transition-colors ${
                        activeImg === i ? "border-[#FC5E01] ring-1 ring-[#FC5E01]/40" : "border-[#262626]"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.image_url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specs */}
            <div className="rounded-2xl border border-[#262626] bg-[#171717] p-6">
              <h2 className="text-base font-bold text-white mb-5">Vehicle Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {specs.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="rounded-xl border border-[#262626] bg-[#0A0A0A]/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} className="text-[#FC5E01]" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">{s.label}</span>
                      </div>
                      <p className="text-sm font-bold text-white capitalize break-words">{s.value}</p>
                    </div>
                  );
                })}
              </div>

              {vehicle.description && (
                <div className="mt-5 pt-5 border-t border-[#262626]">
                  <h3 className="text-xs font-semibold text-[#94A3B8] mb-2">Description</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-line">{vehicle.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Title/price + dealer + inquiry */}
          <div className="flex flex-col gap-6">
            {/* Title + price */}
            <div className="rounded-2xl border border-[#262626] bg-[#171717] p-6">
              <div className="flex items-center gap-2 mb-2">
                {vehicle.condition?.toLowerCase() === "new" && (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">NEW</span>
                )}
                <span className="rounded-full bg-black/40 border border-[#262626] px-2 py-0.5 text-[10px] font-bold text-white">
                  {vehicle.year}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white capitalize">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="mt-2 text-3xl font-black text-[#FC5E01]">{price}</p>
            </div>

            {/* Dealer */}
            {vehicle.dealer && (
              <div className="rounded-2xl border border-[#262626] bg-[#171717] p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">Sold by</h3>
                <p className="text-base font-bold text-white">{vehicle.dealer.name}</p>
                <div className="mt-3 flex flex-col gap-2 text-sm text-[#94A3B8]">
                  {vehicle.dealer.city && (
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-[#FC5E01]" /> {vehicle.dealer.city}</span>
                  )}
                  {vehicle.dealer.phone && (
                    <span className="flex items-center gap-2"><Phone size={14} className="text-[#FC5E01]" /> {vehicle.dealer.phone}</span>
                  )}
                  {vehicle.dealer.email && (
                    <span className="flex items-center gap-2"><Mail size={14} className="text-[#FC5E01]" /> {vehicle.dealer.email}</span>
                  )}
                </div>
              </div>
            )}

            {/* Inquiry form */}
            <div className="rounded-2xl border border-[#262626] bg-[#171717] p-6">
              <h3 className="text-base font-bold text-white mb-1">Contact Dealer</h3>
              <p className="text-xs text-[#64748B] mb-5">Send an inquiry about this vehicle.</p>

              {sent ? (
                <div className="flex flex-col items-center text-center py-6">
                  <CheckCircle2 size={40} className="text-emerald-400 mb-3" />
                  <p className="text-sm font-semibold text-white">Inquiry sent!</p>
                  <p className="mt-1 text-xs text-[#94A3B8]">The dealer will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {formError && (
                    <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                      {formError}
                    </div>
                  )}

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name *"
                    className="w-full rounded-lg border border-[#262626] bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    className="w-full rounded-lg border border-[#262626] bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
                  />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full rounded-lg border border-[#262626] bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
                  />
                  <p className="text-[10px] text-[#64748B] -mt-1">Provide at least an email or phone.</p>

                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Message"
                    className="w-full resize-none rounded-lg border border-[#262626] bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-[#FC5E01] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}