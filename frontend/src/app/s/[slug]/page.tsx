"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  Loader2, Gauge, Fuel, Settings2, Phone, Mail, MapPin, Clock,
  CheckCircle2, CarFront, ChevronDown, Check, Heart, X,
} from "lucide-react";

import { fetchDealerSite, DealerSite } from "@/lib/site";
import { fetchMarketplaceVehicles, submitInquiry, ApiVehicle } from "@/lib/marketplace";
import ChatWidget from "@/components/ChatWidget";

const cap = (s?: string | null) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

/* ---- Brand social icons (inline SVG — lucide brand icons unavailable) ---- */
const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor" as const };
const FacebookIcon = () => (<svg {...iconProps}><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z"/></svg>);
const InstagramIcon = () => (<svg {...iconProps}><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>);
const YoutubeIcon = () => (<svg {...iconProps}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>);
const TiktokIcon = () => (<svg {...iconProps}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>);
const LinkedinIcon = () => (<svg {...iconProps}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const WhatsappIcon = () => (<svg {...iconProps}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>);

/* ---- Scroll-reveal wrapper ---- */
function Reveal({ animation, children }: { animation: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(animation === "none");

  useEffect(() => {
    if (animation === "none") return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animation]);

  const hidden: Record<string, string> = {
    fade: "opacity-0",
    "slide-up": "opacity-0 translate-y-10",
    zoom: "opacity-0 scale-95",
  };

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : hidden[animation] || ""}`}>
      {children}
    </div>
  );
}

/* ---- Star row ---- */
function StarRow({ n, color }: { n: number; color: string }) {
  const c = Math.max(0, Math.min(5, n));
  return (
    <div className="flex gap-0.5 text-lg">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= c ? color : "#d1d5db" }}>★</span>
      ))}
    </div>
  );
}

/* ---- YouTube URL → embed ---- */
function youtubeEmbed(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

/* ---- FAQ accordion item ---- */
function FaqItem({ q, a, color }: { q: string; a: string; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-semibold text-gray-900">{q}</span>
        <span className="text-2xl leading-none flex-shrink-0" style={{ color }}>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-4 text-gray-600 leading-relaxed whitespace-pre-line">{a}</div>}
    </div>
  );
}

/* ---- Animated counter ---- */
function CountUp({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseFloat(String(value).replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    const prefix = String(value).match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = String(value).match(/[^0-9.]*$/)?.[0] ?? "";
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const startT = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - startT) / 1200);
          setDisplay(`${prefix}${Math.round(num * p).toLocaleString()}${suffix}`);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <p ref={ref} className="text-4xl font-black" style={{ color }}>{display}</p>;
}

/* ---- A single custom section on the live site ---- */
function SiteSection({ sec, primary }: { sec: any; primary: string }) {
  if (sec.type === "text-image") {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className={sec.imageSide === "left" ? "md:order-1" : "md:order-2"}>
            {sec.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sec.image} alt="" className="w-full rounded-2xl object-cover shadow-sm" />
            ) : (
              <div className="w-full h-64 rounded-2xl bg-gray-100" />
            )}
          </div>
          <div className={sec.imageSide === "left" ? "md:order-2" : "md:order-1"}>
            <h2 className="text-3xl font-bold">{sec.heading}</h2>
            <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">{sec.body}</p>
            {sec.buttonText && (
              <a href={sec.buttonLink || "#contact"} className="inline-block mt-6 px-6 py-3 rounded-xl text-white font-semibold" style={{ background: primary }}>
                {sec.buttonText}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (sec.type === "cta") {
    const isPrimary = sec.background === "primary";
    const isLight = sec.background === "light";
    const bg = isPrimary ? primary : isLight ? "#f8fafc" : "#0f172a";
    const txt = isLight ? "#0f172a" : "#fff";
    return (
      <section className="py-16" style={{ background: bg, color: txt }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">{sec.heading}</h2>
          {sec.body && <p className="mt-3 opacity-90">{sec.body}</p>}
          {sec.buttonText && (
            <a
              href={sec.buttonLink || "#contact"}
              className="inline-block mt-6 px-7 py-3 rounded-xl font-semibold"
              style={{ background: isPrimary ? "#fff" : primary, color: isPrimary ? primary : "#fff" }}
            >
              {sec.buttonText}
            </a>
          )}
        </div>
      </section>
    );
  }

   if (sec.type === "reviews") {
    return (
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{sec.heading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(sec.reviews ?? []).map((r: any, i: number) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                <StarRow n={r.rating} color={primary} />
                <p className="mt-3 text-gray-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-4 font-semibold text-gray-900">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sec.type === "banner") {
    const isPrimary = sec.background === "primary";
    const isLight = sec.background === "light";
    const bg = isPrimary ? primary : isLight ? "#f8fafc" : "#0f172a";
    const txt = isLight ? "#0f172a" : "#fff";
    return (
      <section style={{ background: bg, color: txt }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <span className="font-bold">{sec.heading}</span>
          {sec.buttonText && (
            <a href={sec.buttonLink || "#inventory"} className="px-5 py-2 rounded-lg text-sm font-semibold" style={{ background: isPrimary ? "#fff" : primary, color: isPrimary ? primary : "#fff" }}>
              {sec.buttonText}
            </a>
          )}
        </div>
      </section>
    );
  }

  if (sec.type === "gallery") {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {sec.heading && <h2 className="text-3xl font-bold text-center mb-10">{sec.heading}</h2>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(sec.images ?? []).map((img: string, i: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img} alt="" className="w-full h-56 object-cover rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sec.type === "brands") {
    return (
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          {sec.heading && <h2 className="text-xl font-bold text-center mb-8 text-gray-700">{sec.heading}</h2>}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {(sec.images ?? []).map((img: string, i: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img} alt="" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sec.type === "faq") {
    return (
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {sec.heading && <h2 className="text-3xl font-bold text-center mb-10">{sec.heading}</h2>}
          <div className="space-y-3">
            {(sec.faqs ?? []).map((f: any, i: number) => (
              <FaqItem key={i} q={f.q} a={f.a} color={primary} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sec.type === "stats") {
    return (
      <section className="py-16" style={{ background: primary }}>
        <div className="max-w-5xl mx-auto px-4">
          {sec.heading && <h2 className="text-3xl font-bold text-center mb-10 text-white">{sec.heading}</h2>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center text-white">
            {(sec.stats ?? []).map((s: any, i: number) => (
              <div key={i}>
                <CountUp value={s.value} color="#fff" />
                <p className="mt-1 text-sm opacity-90">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sec.type === "team") {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {sec.heading && <h2 className="text-3xl font-bold text-center mb-10">{sec.heading}</h2>}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {(sec.team ?? []).map((m: any, i: number) => (
              <div key={i} className="text-center">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt={m.name} className="h-28 w-28 rounded-full object-cover mx-auto" />
                ) : (
                  <div className="h-28 w-28 rounded-full bg-gray-100 mx-auto" />
                )}
                <p className="mt-3 font-bold text-gray-900">{m.name}</p>
                <p className="text-sm" style={{ color: primary }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sec.type === "video") {
    const embed = youtubeEmbed(sec.videoUrl || "");
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {sec.heading && <h2 className="text-3xl font-bold mb-3">{sec.heading}</h2>}
          {sec.body && <p className="text-gray-600 mb-8">{sec.body}</p>}
          {embed ? (
            <div className="aspect-video rounded-2xl overflow-hidden shadow">
              <iframe src={embed} title="Video" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : (
            <div className="aspect-video rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">Add a YouTube URL</div>
          )}
        </div>
      </section>
    );
  }

  return null;
}

/* ---- Themed dropdown (matches CTA/primary color) ---- */
function FancySelect({
  value, onChange, options, primary, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  primary: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 rounded-xl border bg-white pl-4 pr-3 py-2.5 text-sm text-left focus:outline-none transition-colors"
        style={{ borderColor: open ? primary : "#d1d5db" }}
      >
        <span className={current && current.value ? "text-gray-900" : "text-gray-500"}>
          {current?.label || placeholder}
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden max-h-64 overflow-y-auto py-1">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors"
                style={active ? { background: primary, color: "#fff" } : undefined}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = `${primary}18`; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = ""; }}
              >
                {o.label}
                {active && <Check size={15} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


export default function DealerLiveSite() {
  const params = useParams();
  const slug = params?.slug as string;

  const [site, setSite] = useState<DealerSite | null>(null);
  const [vehicles, setVehicles] = useState<ApiVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [vehicleId, setVehicleId] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [makeF, setMakeF] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "year-desc">("newest");

  const [saved, setSaved] = useState<number[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);

  const [compare, setCompare] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetchDealerSite(slug);
        if (res.success && res.website) {
          setSite(res.website);
          const vRes = await fetchMarketplaceVehicles(`?dealer_id=${res.website.dealer.id}&per_page=50`);
          if (vRes.success) setVehicles(vRes.vehicles ?? []);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // Inject Meta Pixel + Google Analytics
  useEffect(() => {
    if (!site) return;
    const w = window as any;

    if (site.meta_pixel_id && !w.__fbqLoaded) {
      w.__fbqLoaded = true;
      const n: any = (w.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!w._fbq) w._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = document.createElement("script");
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      const s = document.getElementsByTagName("script")[0];
      s.parentNode?.insertBefore(t, s);
      w.fbq("init", site.meta_pixel_id);
      w.fbq("track", "PageView");
    }

    if (site.google_analytics_id && !w.__gaLoaded) {
      w.__gaLoaded = true;
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${site.google_analytics_id}`;
      document.head.appendChild(s);
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer.push(arguments); };
      w.gtag("js", new Date());
      w.gtag("config", site.google_analytics_id);
    }
  }, [site]);

  
  // SEO meta tags + favicon
  useEffect(() => {
    if (!site) return;
    const seo = site.config?.seo ?? {};
    const brand = site.config?.branding ?? {};
    const name = brand.dealershipName || site.dealer?.name || "Dealership";
    const title = seo.metaTitle || name;
    document.title = title;

    const setMeta = (attr: string, key: string, val: string) => {
      if (!val) return;
      let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
    };
    setMeta("name", "description", seo.metaDescription || "");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", seo.metaDescription || "");
    setMeta("property", "og:image", seo.ogImage || "");

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

  const cfg = site?.config ?? {};
  const dealer = site?.dealer;
  const branding = cfg?.branding ?? {};
  const settings = cfg?.settings ?? {};
  const theme = settings?.theme ?? {};

  // CTA/button color: custom overrides theme
  const primary = settings.ctaColor || theme.primary || branding.primaryColor || "#FC5E01";
  const headerBg = settings.headerBg || null;
  const headerText = settings.textColor || null;

  const siteName = branding.dealershipName || cfg?.branding?.siteName || dealer?.name || "Dealership";
  const tagline = branding.tagline || "";
  const logo = branding.logo || dealer?.logo_url || null;

  const home = cfg?.home ?? {};
  const invCfg = cfg?.inventory ?? { enabled: true, title: "Our Inventory", subtitle: "" };
  const aboutCfg = cfg?.about ?? {};
  const finCfg = cfg?.financing ?? { enabled: false };
  const contactCfg = cfg?.contact ?? {};

  const hasHero = Boolean(home?.heroImage);

  // Social — merge cfg.social + branding
  const rawWhatsapp = cfg?.social?.whatsapp || branding.whatsapp || null;
  const waHref = rawWhatsapp
    ? (String(rawWhatsapp).startsWith("http") ? rawWhatsapp : `https://wa.me/${String(rawWhatsapp).replace(/[^0-9]/g, "")}`)
    : null;

    const normalizeUrl = (u: unknown): string | null => {
    if (!u) return null;
    const t = String(u).trim();
    if (!t) return null;
    return /^https?:\/\//i.test(t) ? t : `https://${t}`;
  };

    const socialLinks = [
    { key: "facebook", href: normalizeUrl(cfg?.social?.facebook || branding.facebook), Icon: FacebookIcon, bg: "#1877F2" },
    { key: "instagram", href: normalizeUrl(cfg?.social?.instagram || branding.instagram), Icon: InstagramIcon, bg: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" },
    { key: "youtube", href: normalizeUrl(cfg?.social?.youtube || branding.youtube), Icon: YoutubeIcon, bg: "#FF0000" },
    { key: "tiktok", href: normalizeUrl(cfg?.social?.tiktok || branding.tiktok), Icon: TiktokIcon, bg: "#000000" },
    { key: "linkedin", href: normalizeUrl(cfg?.social?.linkedin || branding.linkedin), Icon: LinkedinIcon, bg: "#0A66C2" },
    { key: "whatsapp", href: waHref, Icon: WhatsappIcon, bg: "#25D366" },
  ].filter((s) => s.href);

  const contactPhone = contactCfg?.phone || branding.phone || dealer?.phone || null;
  const contactEmail = contactCfg?.email || branding.email || dealer?.email || null;
  const contactAddress = contactCfg?.address || branding.address || dealer?.address || null;

    const featuredIdSet = useMemo(() => new Set<number>(home?.featuredVehicleIds ?? []), [home]);
  const makes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make).filter(Boolean))).sort(),
    [vehicles]
  );
    const shownVehicles = useMemo(() => {
    let list = [...vehicles];
    if (onlySaved) list = list.filter((v) => saved.includes(v.id));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((v) => `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(s));
    }
    if (makeF) list = list.filter((v) => v.make === makeF);
    if (sortBy === "price-asc") list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    else if (sortBy === "price-desc") list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    else if (sortBy === "year-desc") list.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
    return list;
  }, [vehicles, q, makeF, sortBy, onlySaved, saved]);

  // Load saved vehicles from localStorage
  useEffect(() => {
    if (!slug) return;
    try {
      const raw = localStorage.getItem(`motohave_saved_${slug}`);
      if (raw) setSaved(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [slug]);

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem(`motohave_saved_${slug}`, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  
  const toggleCompare = (id: number) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) { alert("You can compare up to 3 vehicles."); return prev; }
      return [...prev, id];
    });
  };



  const scrollToContact = (v?: ApiVehicle) => {
    if (v) {
      setVehicleId(v.id);
      setForm((f) => ({ ...f, message: `Hi, I'm interested in the ${v.year} ${v.make} ${v.model}. Is it available?` }));
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || !dealer) return;
    setFormError(null);
    setSending(true);
    try {
      const res = await submitInquiry({
        dealer_id: dealer.id,
        vehicle_id: vehicleId,
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        message: form.message.trim() || null,
        source: "website",
      });
      if (res.success) setSent(true);
      else setFormError((res as any).message || "Failed to send. Please try again.");
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

  if (notFound || !site || !dealer) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <CarFront size={44} className="text-gray-300 mb-4" />
        <h1 className="text-xl font-bold text-gray-800">Website not found</h1>
        <p className="mt-1 text-sm text-gray-500">This dealership website is not live yet.</p>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Announcement bar */}
      {settings.announcement && (
        <div className="text-center text-sm font-medium py-2 px-4" style={{ background: primary, color: "#fff" }}>
          {settings.announcementLink ? (
            <a href={settings.announcementLink} className="hover:underline">{settings.announcement}</a>
          ) : (
            <span>{settings.announcement}</span>
          )}
        </div>
      )}

      {/* Header */}
           <header
        className="sticky top-0 z-40 backdrop-blur border-b border-gray-100"
        style={{ background: headerBg || "rgba(255,255,255,0.9)", color: headerText || undefined }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium" style={{ color: headerText || "#4b5563" }}>
          <a href="#home" className="hover:text-gray-900">Home</a>
            {invCfg.enabled !== false && <a href="#inventory" className="hover:text-gray-900">Inventory</a>}
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
          </nav>
          {contactPhone && (
            <a href={`tel:${contactPhone}`} className="text-sm font-semibold text-white px-4 py-2 rounded-lg" style={{ background: primary }}>
              Call Now
            </a>
          )}
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative bg-cover bg-center"
        style={hasHero ? { backgroundImage: `url(${home.heroImage})` } : undefined}
      >
        {hasHero && <div className="absolute inset-0 bg-black/60" />}
        <div className={`relative max-w-6xl mx-auto px-4 ${hasHero ? "py-32" : "py-20"} text-center`}>
          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${hasHero ? "text-white" : "text-gray-900"}`}>
            {home?.heroTitle || "Find Your Dream Vehicle Today"}
          </h1>
          {tagline && <p className="mt-2 text-sm font-semibold" style={{ color: hasHero ? "#fff" : primary }}>{tagline}</p>}
          <p className={`mt-4 max-w-2xl mx-auto text-lg ${hasHero ? "text-gray-100" : "text-gray-600"}`}>
            {home?.heroSubtitle || "Explore our premium collection of quality vehicles."}
          </p>
                    <button
            onClick={() =>
              (document.getElementById("inventory") ?? document.getElementById("contact"))?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 px-7 py-3 rounded-xl text-white font-semibold shadow-lg"
            style={{ background: primary }}
          >
            Browse Vehicles
          </button>
        </div>
      </section>

            {/* Inventory */}
      {invCfg.enabled !== false && (
        <section id="inventory" className="bg-gray-50 border-y border-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">{invCfg.title || "Our Inventory"}</h2>
              {invCfg.subtitle && <p className="mt-2 text-gray-600">{invCfg.subtitle}</p>}
            </div>

                        {/* Filter / search / sort bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search make, model, year…"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
              />
              <div className="sm:w-44">
                <FancySelect
                  value={makeF}
                  onChange={setMakeF}
                  primary={primary}
                  placeholder="All makes"
                  options={[{ value: "", label: "All makes" }, ...makes.map((m) => ({ value: m, label: m }))]}
                />
              </div>

              <div className="sm:w-52">
                <FancySelect
                  value={sortBy}
                  onChange={(v) => setSortBy(v as typeof sortBy)}
                  primary={primary}
                  options={[
                    { value: "newest", label: "Newest" },
                    { value: "price-asc", label: "Price: Low → High" },
                    { value: "price-desc", label: "Price: High → Low" },
                                        { value: "year-desc", label: "Year: New → Old" },
                  ]}
                                />
              </div>

              <button
                type="button"
                onClick={() => setOnlySaved((s) => !s)}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${onlySaved ? "text-white" : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"}`}
                style={onlySaved ? { background: primary, borderColor: primary } : undefined}
              >
                <Heart size={15} className={onlySaved ? "fill-white" : ""} /> Saved ({saved.length})
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-5">{shownVehicles.length} vehicle{shownVehicles.length !== 1 ? "s" : ""}</p>


            {shownVehicles.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No vehicles match your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shownVehicles.map((v) => {
                  const img = v.primary_image_url || v.featured_image?.image_url;
                  const isFeatured = featuredIdSet.has(v.id);
                  const isSold = (v as any).status === "sold";
                  return (
                    <div key={v.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-5xl">🚗</span>
                        )}
                                                <button
                          onClick={() => toggleSave(v.id)}
                          aria-label="Save"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition"
                        >
                          <Heart size={16} className={saved.includes(v.id) ? "fill-rose-500 text-rose-500" : "text-gray-500"} />
                        </button>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg capitalize">{v.make} {v.model}</h3>
                        <p className="text-xl font-extrabold mt-1" style={{ color: primary }}>
                          {v.price != null ? `$${Number(v.price).toLocaleString()}` : "—"}
                        </p>
                        <div className="mt-3 grid grid-cols-3 gap-2 border-y border-gray-100 py-3 text-center">
                          <div className="flex flex-col items-center gap-1"><Gauge size={15} className="text-gray-400" /><span className="text-[10px] text-gray-500">{v.mileage != null ? `${(v.mileage / 1000).toFixed(1)}K mi` : "—"}</span></div>
                          <div className="flex flex-col items-center gap-1 border-x border-gray-100"><Fuel size={15} className="text-gray-400" /><span className="text-[10px] text-gray-500 capitalize">{cap(v.fuel_type)}</span></div>
                          <div className="flex flex-col items-center gap-1"><Settings2 size={15} className="text-gray-400" /><span className="text-[10px] text-gray-500 capitalize">{cap(v.transmission)}</span></div>
                        </div>
                        <a href={`/s/${slug}/${v.id}`} className="mt-4 block w-full text-center py-2.5 rounded-lg text-white text-sm font-semibold" style={{ background: primary }}>View Details</a>
                        <button onClick={() => scrollToContact(v)} className="mt-2 w-full py-2.5 rounded-lg border text-sm font-semibold" style={{ borderColor: primary, color: primary }}>Inquire Now</button>
                        <button onClick={() => toggleCompare(v.id)} className={`mt-2 w-full py-2 rounded-lg text-xs font-semibold transition ${compare.includes(v.id) ? "text-white" : "text-gray-500 bg-gray-50 hover:bg-gray-100"}`} style={compare.includes(v.id) ? { background: primary } : undefined}>
                          {compare.includes(v.id) ? "✓ In Compare" : "⇄ Compare"}
                        </button>
                        
                        </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}


      {/* About */}
      <section id="about" className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">{aboutCfg?.title || "About Us"}</h2>
          {aboutCfg?.subtitle && <p className="mt-2 text-gray-600">{aboutCfg.subtitle}</p>}
          <p className="mt-6 text-gray-600 leading-relaxed">{aboutCfg?.story || "We help customers find the right vehicle with honesty and great service."}</p>
        </div>
      </section>

      
      {/* Custom content sections */}
      {(cfg?.sections ?? [])
        .filter((s: any) => s.enabled)
        .map((sec: any) => (
          <Reveal key={sec.id} animation={sec.animation}>
            <SiteSection sec={sec} primary={primary} />
          </Reveal>
        ))}

      {/* Financing */}
      {finCfg?.enabled && (
        <section className="py-16" style={{ background: primary }}>
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold">{finCfg.title || "Flexible Financing"}</h2>
            {finCfg.subtitle && <p className="mt-2 opacity-90">{finCfg.subtitle}</p>}
            <button onClick={() => scrollToContact()} className="mt-6 bg-white px-7 py-3 rounded-xl font-semibold" style={{ color: primary }}>
              Get Pre-Approved
            </button>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold">{contactCfg?.title || "Contact Us"}</h2>
            {contactCfg?.subtitle && <p className="mt-2 text-gray-600">{contactCfg.subtitle}</p>}
            <div className="mt-6 flex flex-col gap-3 text-gray-700">
              {contactPhone && <span className="flex items-center gap-3"><Phone size={18} style={{ color: primary }} /> {contactPhone}</span>}
              {contactEmail && <span className="flex items-center gap-3"><Mail size={18} style={{ color: primary }} /> {contactEmail}</span>}
              {contactAddress && <span className="flex items-center gap-3"><MapPin size={18} style={{ color: primary }} /> {contactAddress}</span>}
                            {contactCfg?.hours && <span className="flex items-center gap-3"><Clock size={18} style={{ color: primary }} /> {contactCfg.hours}</span>}
            </div>

                                    {settings.showMap !== false && (() => {
              const raw = (branding.googleMaps || "").trim();
              let src: string | null = null;
              if (raw) {
                const m = raw.match(/src="([^"]+)"/i);   // full <iframe> embed → extract URL
                const url = m ? m[1] : raw;
                src = (url.includes("/maps/embed") || url.includes("/embed?"))
                  ? url
                  : `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
              } else if (contactAddress) {
                src = `https://www.google.com/maps?q=${encodeURIComponent(contactAddress)}&output=embed`;
              }
              return src ? (
                <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 h-56">
                  <iframe title="Location" src={src} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              ) : null;
            })()}

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            {sent ? (
              <div className="flex flex-col items-center text-center py-8">
                <CheckCircle2 size={44} className="text-emerald-500 mb-3" />
                <p className="font-semibold text-gray-800">Inquiry sent!</p>
                <p className="mt-1 text-sm text-gray-500">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {formError && <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-xs text-rose-600">{formError}</div>}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name *" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-gray-500" />
                <p className="text-[11px] text-gray-400 -mt-1">Provide at least an email or phone.</p>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-gray-500" />
                <button type="submit" disabled={sending} className="rounded-xl py-3 text-white text-sm font-semibold disabled:opacity-60" style={{ background: primary }}>
                  {sending ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={siteName} className="h-9 w-auto max-w-[170px] object-contain" />
          ) : (
            <span className="font-bold text-white">{siteName}</span>
          )}

                    {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map(({ key, href, Icon, bg }) => (
                <a
                  key={key}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={key}
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:opacity-90 hover:scale-110 transition-transform"
                  style={{ background: bg }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}

                    <span className="text-xs">© {new Date().getFullYear()} {siteName}. Powered by MotoHave.</span>
        </div>
      </footer>

            {/* Compare bar */}
      {compare.length > 0 && !showCompare && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-white rounded-full shadow-2xl border border-gray-200 px-5 py-3 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">{compare.length} to compare</span>
          <button onClick={() => setShowCompare(true)} disabled={compare.length < 2} className="px-4 py-1.5 rounded-full text-white text-sm font-semibold disabled:opacity-50" style={{ background: primary }}>Compare</button>
          <button onClick={() => setCompare([])} aria-label="Clear" className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
        </div>
      )}

      {/* Compare modal */}
      {showCompare && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCompare(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Compare Vehicles</h2>
              <button onClick={() => setShowCompare(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 w-32"></th>
                    {vehicles.filter((v) => compare.includes(v.id)).map((v) => {
                      const img = v.primary_image_url || v.featured_image?.image_url;
                      return (
                        <th key={v.id} className="p-3 text-left align-top min-w-[160px]">
                          <div className="h-24 w-full rounded-lg bg-gray-100 overflow-hidden mb-2">
                            {img ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={img} alt="" className="h-full w-full object-cover" />
                            ) : null}
                          </div>
                          <p className="font-bold capitalize">{v.make} {v.model}</p>
                          <p className="font-extrabold" style={{ color: primary }}>{v.price != null ? `$${Number(v.price).toLocaleString()}` : "—"}</p>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Year", get: (v: ApiVehicle) => (v.year ?? "—") as any },
                    { label: "Mileage", get: (v: ApiVehicle) => v.mileage != null ? `${(v.mileage / 1000).toFixed(1)}K mi` : "—" },
                    { label: "Fuel", get: (v: ApiVehicle) => cap(v.fuel_type) || "—" },
                    { label: "Transmission", get: (v: ApiVehicle) => cap(v.transmission) || "—" },
                    { label: "Body Type", get: (v: ApiVehicle) => cap(v.body_type) || "—" },
                    { label: "Condition", get: (v: ApiVehicle) => cap(v.condition) || "—" },
                    { label: "Color", get: (v: ApiVehicle) => cap(v.color) || "—" },
                  ].map((row) => (
                    <tr key={row.label} className="border-t border-gray-100">
                      <td className="p-3 font-semibold text-gray-500">{row.label}</td>
                      {vehicles.filter((v) => compare.includes(v.id)).map((v) => (
                        <td key={v.id} className="p-3 capitalize">{row.get(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* Live chat widget */}
      {settings.enableChatWidget !== false && dealer && (
        <ChatWidget dealerId={dealer.id} dealerName={siteName} accent={primary} />
      )}


      {/* Floating WhatsApp button */}
      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        >
          <span className="scale-[1.4]">
            <WhatsappIcon />
          </span>
        </a>
      )}
    </div>
  );
}