"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Phone, MessageSquare, Mail, MapPin, Clock, ArrowRight,
  CheckCircle, ChevronDown, Sparkles, ShieldCheck, Zap,
  Globe, X, Send, Bot, Users, Star, Search, Check, Loader2, AlertCircle,
} from "lucide-react";

/* Shared heading size — সব section title একই look */
const HEADING =
  "font-extrabold tracking-[-0.04em] leading-[1.1] text-white text-[22px] sm:text-[25px] md:text-[28px] lg:text-[34px] xl:text-[38px] 2xl:text-[42px]";

/* ------------------------------------------------------------------ */
/* Searchable Country Dropdown                                         */
/* ------------------------------------------------------------------ */
const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
  "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Cyprus","Czechia",
  "Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
  "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
  "Oman",
  "Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar",
  "Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen",
  "Zambia","Zimbabwe",
];

function CountrySelect({
  name = "country",
  defaultValue = "",
  placeholder = "Select country",
}: {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(query.trim().toLowerCase())
  );

  const pick = (c: string) => {
    setSelected(c);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-[#FC5E01] bg-white/[0.05] px-4 py-3 text-left text-white transition-colors hover:border-[#FC5E01]/80"
      >
        <span className={selected ? "text-white" : "text-white/80"}>
          {selected || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[#FC5E01] bg-[#0D0C11] shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <Search className="h-4 w-4 text-white/40" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
            />
          </div>
          <ul className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-white/50">No country found</li>
            ) : (
              filtered.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => pick(c)}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-[#FC5E01]/20 ${
                      selected === c ? "text-[#FC5E01] font-medium" : "text-slate-200"
                    }`}
                  >
                    {c}
                    {selected === c && <Check className="h-4 w-4" />}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Searchable Vehicle Count Dropdown                                  */
/* ------------------------------------------------------------------ */
const VEHICLE_COUNTS = [
  "1 - 50 Vehicles",
  "50 - 150 Vehicles",
  "150 - 500 Vehicles",
  "500+ Vehicles (Enterprise)",
];

function VehicleCountSelect({
  name = "vehicleCount",
  defaultValue = "50 - 150 Vehicles",
  placeholder = "Select vehicle range",
}: {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const pick = (v: string) => {
    setSelected(v);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-[#FC5E01] bg-white/[0.05] px-4 py-3 text-left text-white transition-colors hover:border-[#FC5E01]/80"
      >
        <span className={selected ? "text-white" : "text-white/80"}>
          {selected || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[#FC5E01] bg-[#0D0C11] shadow-xl">
          <ul className="max-h-60 overflow-y-auto py-1">
            {VEHICLE_COUNTS.map((v) => (
              <li key={v}>
                <button
                  type="button"
                  onClick={() => pick(v)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-[#FC5E01]/20 ${
                    selected === v ? "text-[#FC5E01] font-medium" : "text-slate-200"
                  }`}
                >
                  {v}
                  {selected === v && <Check className="h-4 w-4" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Counting Number Animation                                          */
/* ------------------------------------------------------------------ */
function CounterNumber({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericMatch = value.match(/[\d.]+/);
  const numericVal = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = value.replace(/[\d.]+/, "");
  const isDecimal = value.includes(".");
  const decimals = isDecimal ? (value.split(".")[1].match(/\d+/)?.[0].length ?? 0) : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let raf: number;
    let startTime: number | undefined;
    const duration = 2000;

    const animateCount = (timestamp: number) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * numericVal);
      if (progress < 1) raf = requestAnimationFrame(animateCount);
    };

    raf = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(raf);
  }, [isInView, numericVal]);

  const formattedCount = isDecimal
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <div ref={ref} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
      <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FC5E01] to-orange-300 font-mono">
        {formattedCount}{suffix}
      </h3>
      <p className="text-sm text-slate-400 mt-2">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form status banner (success / error)                               */
/* ------------------------------------------------------------------ */
type Status = { state: "idle" | "loading" | "success" | "error"; message: string };

function StatusBanner({ status }: { status: Status }) {
  if (status.state !== "success" && status.state !== "error") return null;
  const ok = status.state === "success";
  return (
    <div
      role="status"
      aria-live="polite"
      className={`sm:col-span-2 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
        ok
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          : "border-red-500/30 bg-red-500/10 text-red-300"
      }`}
    >
      {ok ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
      {status.message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function EnterpriseContactPage() {
  const [activeTab, setActiveTab] = useState<"demo" | "message">("demo");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const [demoStatus, setDemoStatus] = useState<Status>({ state: "idle", message: "" });
  const [messageStatus, setMessageStatus] = useState<Status>({ state: "idle", message: "" });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formType: "demo" | "message"
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    const setStatus = formType === "demo" ? setDemoStatus : setMessageStatus;
    setStatus({ state: "loading", message: "" });

    try {
      await new Promise((r) => setTimeout(r, 900));
      console.log(`[${formType}] submit payload:`, payload);

      setStatus({
        state: "success",
        message: "Thank you! Your request has been sent to our team.",
      });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C11] text-white selection:bg-[#FC5E01] selection:text-white relative overflow-hidden font-sans">

      {/* Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FC5E01]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-[#FC5E01]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#FC5E01]" />
            <span className="text-sm font-medium text-white">
              Enterprise Automotive SaaS Experience
            </span>
          </div>

          <h1 className={`${HEADING} max-w-4xl mx-auto`}>
            Let&apos;s Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC5E01] to-orange-400">Dealership.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
            Talk to our team and discover how MotoHave can help you sell more vehicles, automate operations, and grow your dealership faster.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-[#FC5E01] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#E55A00] shadow-xl shadow-[#FC5E01]/30 gap-2 group"
            >
              Schedule Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact-form"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 backdrop-blur-md"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>

        {/* Live Response Time Badge */}
        <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-sm text-slate-300">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Average Response Time: <strong className="text-white">&lt; 15 Minutes</strong>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-amber-400"><Star className="w-4 h-4 fill-amber-400" /> 4.9/5 Dealer Rating</span>
        </div>
      </section>

      {/* 2. Contact Methods Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Phone, title: "Sales Hotline", desc: "Speak directly with our dealership specialists.", action: "Call Now", link: "tel:+8801700000000" },
            { icon: MessageSquare, title: "Live Chat", desc: "Instant answers from our product advisors.", action: "Start Chat", link: "#chat" },
            { icon: Mail, title: "Email Support", desc: "Get detailed proposals within hours.", action: "sales@motohave.com", link: "mailto:sales@motohave.com" },
            { icon: Clock, title: "Business Hours", desc: "Mon-Sat: 9:00 AM - 8:00 PM (GMT+6)", action: "View Schedule", link: "#" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-[#FC5E01]/50 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FC5E01]/10 flex items-center justify-center text-[#FC5E01] mb-4 group-hover:bg-[#FC5E01] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold tracking-tight text-white text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                </div>
                <a href={item.link} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FC5E01] group-hover:translate-x-1 transition-transform">
                  {item.action} <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3 & 4. Interactive Forms Section */}
      <section id="book-demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-12 backdrop-blur-2xl">

          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("demo")}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === "demo" ? "bg-[#FC5E01] text-white shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                Schedule Free Demo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("message")}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === "message" ? "bg-[#FC5E01] text-white shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                General Inquiry Form
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "demo" ? (
              <motion.form
                key="demo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={(e) => handleSubmit(e, "demo")}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input name="fullName" type="text" required placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Dealership Name *</label>
                  <input name="dealership" type="text" required placeholder="Apex Motors Ltd." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Business Email *</label>
                  <input name="email" type="email" required placeholder="john@apexmotors.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                  <input name="phone" type="tel" required placeholder="+880 1700-000000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Country / Region</label>
                  <CountrySelect name="country" defaultValue="Bangladesh" placeholder="Select country" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Number of Vehicles in Inventory</label>
                  <VehicleCountSelect name="vehicleCount" defaultValue="50 - 150 Vehicles" placeholder="Select vehicle range" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Current Website or Inventory Software (Optional)</label>
                  <input name="website" type="text" placeholder="https://yourdealership.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <input name="agree" type="checkbox" required id="terms" className="w-4 h-4 rounded accent-[#FC5E01]" />
                  <label htmlFor="terms" className="text-sm text-slate-400">I agree to MotoHave Terms of Service and Privacy Policy.</label>
                </div>

                <StatusBanner status={demoStatus} />

                <div className="sm:col-span-2 text-center mt-4">
                  <button
                    type="submit"
                    disabled={demoStatus.state === "loading"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#FC5E01] hover:bg-[#E55A00] text-white font-bold transition-all shadow-xl shadow-[#FC5E01]/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {demoStatus.state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {demoStatus.state === "loading" ? "Sending..." : "Book Free Demo Now"}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={(e) => handleSubmit(e, "message")}
                id="contact-form"
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                  <input name="firstName" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                  <input name="lastName" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Business Email *</label>
                  <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                  <input name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Subject / Inquiry Type</label>
                  <input name="subject" type="text" required placeholder="Partnership, Custom Integration, Billing, etc." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                  <textarea name="message" rows={4} required placeholder="How can our team help your dealership?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FC5E01]"></textarea>
                </div>

                <StatusBanner status={messageStatus} />

                <div className="sm:col-span-2 text-center mt-4">
                  <button
                    type="submit"
                    disabled={messageStatus.state === "loading"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#FC5E01] hover:bg-[#E55A00] text-white font-bold transition-all shadow-xl shadow-[#FC5E01]/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {messageStatus.state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                    {messageStatus.state === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Why Contact MotoHave? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={HEADING}>Why Dealerships Choose MotoHave</h2>
          <p className="mt-2 text-slate-400">Everything you need for a frictionless enterprise onboarding.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: CheckCircle, title: "Free Demo", desc: "Tailored live walk-through" },
            { icon: Zap, title: "Consultation", desc: "Expert digital roadmap" },
            { icon: Users, title: "Onboarding", desc: "White-glove data setup" },
            { icon: ShieldCheck, title: "Success Manager", desc: "Dedicated advisor" },
            { icon: Clock, title: "24/7 Support", desc: "Priority technician access" },
            { icon: Sparkles, title: "No Credit Card", desc: "Zero risk to start testing" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-[#FC5E01]/10 flex items-center justify-center text-[#FC5E01] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Trusted By */}
      <section className="border-y border-white/10 bg-white/[0.01] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-8">Trusted by leading dealerships globally</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            {["BMW Motors", "Toyota Fleet", "Ford Premier", "Honda Global", "Audi Center", "Mercedes Partner"].map((brand, i) => (
              <span key={i} className="text-lg font-extrabold tracking-wider text-slate-300 font-mono">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Global Presence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs text-[#FC5E01] mb-4">
              <Globe className="w-3.5 h-3.5" /> Worldwide Operations
            </div>
            <h2 className={HEADING}>Serving Dealerships Across Major Global Hubs</h2>
            <p className="mt-4 text-slate-400">With regional data centers and localized support, MotoHave powers inventory systems for enterprise auto groups across North America, Europe, Middle East, and Asia.</p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Bangladesh (HQ)", "USA & Canada", "United Kingdom", "Australia", "Middle East", "Europe"].map((loc, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FC5E01]" /> {loc}
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 p-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-[350px]">
            <div className="absolute inset-0 bg-[radial-gradient(#FC5E01_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
            <Globe className="w-24 h-24 text-[#FC5E01] animate-pulse mb-4" />
            <h3 className="text-xl font-bold text-white">Cloud Infrastructure Active</h3>
            <p className="text-sm text-slate-400 mt-1">99.99% Uptime SLA guaranteed globally</p>
          </div>
        </div>
      </section>

      {/* 8. Onboarding Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className={HEADING}>Your Onboarding Journey</h2>
          <p className="mt-2 text-slate-400">From first contact to fully automated dealership in 4 simple steps.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Book Demo", desc: "Pick your preferred time slot in 30 seconds." },
            { step: "02", title: "Talk to Expert", desc: "Customized solution walkthrough with an auto-expert." },
            { step: "03", title: "Platform Setup", desc: "Seamless inventory migration and team training." },
            { step: "04", title: "Grow Dealership", desc: "Start converting leads and boosting sales instantly." },
          ].map((item, i) => (
            <div key={i} className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <span className="text-3xl font-black text-[#FC5E01]/30 font-mono">{item.step}</span>
              <h3 className="text-lg font-bold text-white mt-2">{item.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Live Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <CounterNumber value="120+" label="Active Dealerships" />
          <CounterNumber value="100K+" label="Vehicles Managed" />
          <CounterNumber value="2.3M+" label="Leads Generated" />
          <CounterNumber value="99.99%" label="Platform Uptime" />
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={HEADING}>Frequently Asked Questions</h2>
          <p className="mt-2 text-slate-400">Everything you need to know about switching to MotoHave.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "How long does setup take?", a: "Most dealerships are fully set up and running within 24 to 48 hours with our dedicated migration team." },
            { q: "Can I migrate my existing inventory?", a: "Yes! We provide complete automated migration tools for CSV, Excel, or direct API integration from your legacy CRM." },
            { q: "Do you offer staff onboarding?", a: "Absolutely. Every enterprise plan includes personalized live training sessions for your sales and management teams." },
            { q: "How secure is my dealership data?", a: "We use enterprise-grade AES-256 encryption with daily automated backups and strict role-based access control." },
            { q: "How much does it cost?", a: "Pricing is structured based on inventory size and active rooftops. Book a demo to get a customized enterprise quote." },
          ].map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between font-semibold text-white hover:text-[#FC5E01] transition-colors"
                >
                  <span>{faq.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <ChevronDown className="w-5 h-5 text-[#FC5E01]" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm text-slate-400 border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#FC5E01]/20 via-[#0D0C11] to-blue-900/20 border border-white/10 p-8 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
          <h2 className={HEADING}>Ready to Transform Your Dealership?</h2>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">Book your free interactive demo today and experience the future of automotive sales SaaS.</p>
          <div className="mt-8 flex justify-center">
            <a href="#book-demo" className="px-8 py-4 rounded-2xl bg-[#FC5E01] hover:bg-[#E55A00] text-white font-bold transition-all shadow-xl shadow-[#FC5E01]/40 flex items-center gap-2">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isAiChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-80 sm:w-96 rounded-3xl bg-[#0F1A30] border border-white/10 shadow-2xl p-4 text-white backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FC5E01] flex items-center justify-center text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">MotoHave AI</h5>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">● Online</span>
                  </div>
                </div>
                <button type="button" aria-label="Close chat" onClick={() => setIsAiChatOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="py-4 text-sm text-slate-300 space-y-3 min-h-[180px]">
                <div className="p-3 rounded-2xl bg-white/5 text-xs">
                  Hi 👋 Need help choosing the right plan or scheduling an enterprise demo? Ask MotoHave AI!
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <input type="text" placeholder="Type your question..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FC5E01]" />
                <button type="button" aria-label="Send message" className="p-2 rounded-xl bg-[#FC5E01] text-white"><Send className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsAiChatOpen((prev) => !prev)}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#FC5E01] hover:bg-[#E55A00] text-white font-bold shadow-2xl shadow-[#FC5E01]/50 transition-all group"
        >
          <Bot className="w-5 h-5" />
          <span className="text-sm">Ask MotoHave AI</span>
        </button>
      </div>

    </div>
  );
}