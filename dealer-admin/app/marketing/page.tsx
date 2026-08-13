"use client";

import {
  fetchContacts,
  importContacts,
  deleteContact,
  clearContacts,
  type Contact,
} from "@/lib/contact";

import { useEffect, useState } from "react";
import { Megaphone, Send, Users, Loader2, CheckCircle2, Mail, Server, Zap, MessageSquare, FileText, Trash2, Plus, Upload, Search, Download, Ticket, ToggleLeft, ToggleRight, Copy, Percent, DollarSign } from "lucide-react";
import { fetchCampaigns, sendCampaign, type Campaign } from "@/lib/campaign";
import { fetchEmailSettings, saveEmailSettings, testEmailSettings } from "@/lib/emailSettings";
import { fetchWhatsappSettings, saveWhatsappSettings, testWhatsapp, sendWhatsappBroadcast } from "@/lib/whatsapp";
import FancySelect from "@/components/FancySelect";
import { fetchTemplates, saveTemplate, deleteTemplate, type Template } from "@/lib/template";
import { fetchPromoCodes, createPromoCode, togglePromoCode, deletePromoCode, type PromoCode, type PromoInput } from "@/lib/promo";

const BRAND = "#FC5E01";

const AUDIENCES = [
  { value: "all", label: "All leads" },
  { value: "new", label: "New leads" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "negotiating", label: "Negotiating" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "imported", label: "Imported contacts" },
];

const PROVIDERS: Record<string, { label: string; host: string; port: number; hint: string }> = {
  brevo: { label: "Brevo", host: "smtp-relay.brevo.com", port: 587, hint: "Username = your Brevo login email · Password = SMTP key" },
  sendgrid: { label: "SendGrid", host: "smtp.sendgrid.net", port: 587, hint: 'Username = the word "apikey" · Password = your API key' },
  mailgun: { label: "Mailgun", host: "smtp.mailgun.org", port: 587, hint: "Username = postmaster@your-domain · Password = SMTP password" },
  ses: { label: "Amazon SES", host: "email-smtp.us-east-1.amazonaws.com", port: 587, hint: "Use your SES SMTP username & password (change region in host)" },
  smtp: { label: "Custom SMTP", host: "", port: 587, hint: "Enter your own SMTP host, port and credentials" },
};

const inputCls =
  "w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]";
const labelCls = "block text-xs font-semibold text-[#94A3B8] mb-1.5";

export default function MarketingPage() {
  const [tab, setTab] = useState<"campaigns" | "whatsapp" | "contacts" | "promos" | "templates" | "email">("campaigns");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Megaphone size={22} style={{ color: BRAND }} /> Marketing
        </h1>
        <p className="text-sm text-[#94A3B8] mt-1">Send email campaigns to your leads.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {([["campaigns", "Email Campaigns"], ["whatsapp", "WhatsApp"], ["contacts", "Contacts"], ["promos", "Promo Codes"], ["templates", "Templates"], ["email", "Email Provider"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === key ? "text-white" : "bg-[#111B33] text-[#94A3B8] hover:text-white"}`}
            style={tab === key ? { backgroundColor: BRAND } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "campaigns" ? <CampaignsTab /> : tab === "whatsapp" ? <WhatsappTab /> : tab === "contacts" ? <ContactsTab /> : tab === "promos" ? <PromosTab /> : tab === "templates" ? <TemplatesTab /> : <EmailProviderTab />}
    </div>
  );
}

/* ================= Campaigns ================= */
function CampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [reachable, setReachable] = useState(0);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
    const [audience, setAudience] = useState("all");
  const [scheduleAt, setScheduleAt] = useState("");

  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);

  async function load() {
    setLoading(true);
    const res = await fetchCampaigns();
    if (res?.success) {
      setCampaigns((res.campaigns ?? []).filter((c) => c.channel !== "whatsapp"));
      setReachable(res.audience?.total ?? 0);
    }
    const t = await fetchTemplates();
    if (t?.success) setTemplates((t.templates ?? []).filter((x) => x.channel === "email"));
    setLoading(false);
  }

  function applyTemplate(id: string) {
    const t = templates.find((x) => String(x.id) === id);
    if (t) { setSubject(t.subject || ""); setBody(t.body); }
  }
  useEffect(() => { load(); }, []);

    async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setNotice(null); setError(null);
    const res = await sendCampaign({ name, subject, body, audience, scheduled_at: scheduleAt || null });
    if (res?.success) {
      setNotice(res.message || "Campaign sent.");
      setName(""); setSubject(""); setBody(""); setAudience("all"); setScheduleAt("");
      load();
    } else {
      setError(res?.message || "Failed to send campaign.");
    }
    setSending(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Compose */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Mail size={16} style={{ color: BRAND }} />
          <h2 className="text-sm font-bold text-white">New Campaign</h2>
          <span className="ml-auto flex items-center gap-1 text-xs text-[#94A3B8]"><Users size={13} /> {reachable} reachable</span>
        </div>

        {notice && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 flex items-center gap-2"><CheckCircle2 size={15} /> {notice}</div>}
        {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>}

        <form onSubmit={handleSend} className="space-y-4">
          {templates.length > 0 && (
            <div><label className={labelCls}>Load a template</label><FancySelect value="" onChange={applyTemplate} placeholder="Choose a template…" options={templates.map((t) => ({ value: String(t.id), label: t.name }))} /></div>
          )}
          <div><label className={labelCls}>Campaign name (internal)</label><input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. October Offer" className={inputCls} /></div>
          <div><label className={labelCls}>Audience</label><FancySelect value={audience} onChange={setAudience} options={AUDIENCES} /></div>
          <div><label className={labelCls}>Email subject</label><input value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="New arrivals this week 🚗" className={inputCls} /></div>
                    <div><label className={labelCls}>Message</label><textarea rows={7} value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Write your message to customers…" className={`${inputCls} resize-none`} /></div>
          <div>
            <label className={labelCls}>Schedule for later (optional)</label>
            <input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-[#64748B] mt-1">Leave empty to send immediately.</p>
          </div>
          <button type="submit" disabled={sending} style={{ backgroundColor: BRAND }} className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
            {sending ? <><Loader2 size={15} className="animate-spin" /> {scheduleAt ? "Scheduling…" : "Sending…"}</> : <><Send size={15} /> {scheduleAt ? "Schedule Campaign" : "Send Campaign"}</>}
          </button>
        </form>
      </div>

      {/* History */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3 mb-3">Sent Campaigns</h2>
        {loading ? (
          <div className="text-center py-12 text-[#64748B]">Loading…</div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12 text-[#64748B]">No campaigns yet.</div>
        ) : (
          <div className="space-y-2 max-h-[560px] overflow-y-auto">
            {campaigns.map((c) => (
                            <div key={c.id} className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0"><p className="text-sm font-semibold text-white truncate">{c.name}</p><p className="text-xs text-[#94A3B8] truncate">{c.subject}</p></div>
                  {c.status === "scheduled" ? (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 flex-shrink-0">Scheduled</span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 flex-shrink-0">{c.recipients_count} sent</span>
                  )}
                </div>
                {c.status !== "scheduled" && c.recipients_count > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-[#111B33] p-2 text-center">
                      <p className="text-sm font-bold text-white">{c.opens_count}</p>
                      <p className="text-[10px] text-[#64748B]">Opens</p>
                    </div>
                    <div className="rounded-lg bg-[#111B33] p-2 text-center">
                      <p className="text-sm font-bold text-white">{c.clicks_count}</p>
                      <p className="text-[10px] text-[#64748B]">Clicks</p>
                    </div>
                    <div className="rounded-lg bg-[#111B33] p-2 text-center">
                      <p className="text-sm font-bold text-white">{c.recipients_count ? Math.round((c.opens_count / c.recipients_count) * 100) : 0}%</p>
                      <p className="text-[10px] text-[#64748B]">Open rate</p>
                    </div>
                  </div>
                )}
                <div className="mt-2 flex items-center gap-3 text-[11px] text-[#64748B]">
                  <span className="capitalize">Audience: {c.audience}</span><span>·</span>
                  <span>{c.status === "scheduled" ? (c.scheduled_at ? "Scheduled: " + new Date(c.scheduled_at).toLocaleString() : "—") : (c.sent_at ? new Date(c.sent_at).toLocaleString() : "—")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= Email Provider ================= */
function EmailProviderTab() {
  const [provider, setProvider] = useState("brevo");
  const [host, setHost] = useState(PROVIDERS.brevo.host);
  const [port, setPort] = useState(587);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("tls");
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [hasPassword, setHasPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [testTo, setTestTo] = useState("");
  const [testing, setTesting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetchEmailSettings();
      if (res?.success && res.settings) {
        const s = res.settings;
        setProvider(s.provider || "brevo");
        setHost(s.host || "");
        setPort(s.port || 587);
        setUsername(s.username || "");
        setEncryption(s.encryption || "tls");
        setFromEmail(s.from_email || "");
        setFromName(s.from_name || "");
        setIsActive(s.is_active);
        setHasPassword(s.has_password);
      }
    })();
  }, []);

  function onProvider(p: string) {
    setProvider(p);
    const preset = PROVIDERS[p];
    if (preset && preset.host) { setHost(preset.host); setPort(preset.port); }
  }

  async function save() {
    setSaving(true); setNotice(null); setError(null);
    const res = await saveEmailSettings({ provider, host, port, username, password: password || null, encryption, from_email: fromEmail, from_name: fromName || null, is_active: isActive });
    if (res?.success) { setNotice("Email settings saved."); if (password) setHasPassword(true); setPassword(""); }
    else setError(res?.message || "Failed to save.");
    setSaving(false);
  }

  async function runTest() {
    if (!testTo) return;
    setTesting(true); setNotice(null); setError(null);
    const res = await testEmailSettings(testTo);
    if (res?.success) setNotice(res.message || "Test sent.");
    else setError(res?.message || "Test failed.");
    setTesting(false);
  }

  return (
    <div className="max-w-2xl rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
        <Server size={16} style={{ color: BRAND }} />
        <h2 className="text-sm font-bold text-white">Email Provider (SMTP)</h2>
      </div>
      <p className="text-xs text-[#64748B] -mt-1">Connect SendGrid, Brevo, Mailgun or Amazon SES so campaigns land in the inbox — not spam. All use SMTP.</p>

      {notice && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 flex items-center gap-2"><CheckCircle2 size={15} /> {notice}</div>}
      {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>}

      <div>
        <label className={labelCls}>Provider</label>
        <FancySelect value={provider} onChange={onProvider} options={Object.entries(PROVIDERS).map(([k, v]) => ({ value: k, label: v.label }))} />
        <p className="text-[11px] text-[#64748B] mt-1">{PROVIDERS[provider]?.hint}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 sm:col-span-1"><label className={labelCls}>SMTP Host</label><input value={host} onChange={(e) => setHost(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Port</label><input type="number" value={port} onChange={(e) => setPort(Number(e.target.value))} className={inputCls} /></div>
        <div><label className={labelCls}>Encryption</label><FancySelect value={encryption} onChange={setEncryption} options={[{ value: "tls", label: "TLS" }, { value: "ssl", label: "SSL" }, { value: "none", label: "None" }]} /></div>
      </div>

      <div><label className={labelCls}>Username</label><input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Login / API username" className={inputCls} /></div>
      <div>
        <label className={labelCls}>Password / API Key</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={hasPassword ? "•••••••• (saved — leave blank to keep)" : "Your SMTP key"} className={inputCls} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div><label className={labelCls}>From Email</label><input type="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} placeholder="noreply@yourdealer.com" className={inputCls} /></div>
        <div><label className={labelCls}>From Name</label><input value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Your Dealership" className={inputCls} /></div>
      </div>

      <label className="flex items-center gap-2 text-sm text-white">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="accent-[#FC5E01]" />
        Use this provider for campaigns
      </label>

      <div className="flex gap-2 pt-1">
        <button onClick={save} disabled={saving} style={{ backgroundColor: BRAND }} className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Zap size={15} />} Save Settings
        </button>
      </div>

      {/* Test */}
      <div className="border-t border-[#1e2a4a] pt-4">
        <label className={labelCls}>Send a test email</label>
        <div className="flex gap-2">
          <input type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="you@example.com" className={inputCls} />
          <button onClick={runTest} disabled={testing || !testTo} className="flex-shrink-0 flex items-center gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#FC5E01] disabled:opacity-60">
            {testing ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Test
          </button>
        </div>
        <p className="text-[11px] text-[#64748B] mt-1.5">Save first, then send a test to confirm it works.</p>
      </div>
    </div>
  );
}

/* ================= WhatsApp ================= */
function WhatsappTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [reachable, setReachable] = useState(0);
  const [loading, setLoading] = useState(true);

  const [apiToken, setApiToken] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [fromNumber, setFromNumber] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [hasToken, setHasToken] = useState(false);

    const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [scheduleAt, setScheduleAt] = useState("");

  const [savingS, setSavingS] = useState(false);
  const [sending, setSending] = useState(false);
  const [testTo, setTestTo] = useState("");
  const [testing, setTesting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [templates, setTemplates] = useState<Template[]>([]);

  async function loadCampaigns() {
    setLoading(true);
    const res = await fetchCampaigns();
    if (res?.success) {
      setCampaigns((res.campaigns ?? []).filter((c) => c.channel === "whatsapp"));
      setReachable(res.audience?.phone ?? 0);
    }
    const t = await fetchTemplates();
    if (t?.success) setTemplates((t.templates ?? []).filter((x) => x.channel === "whatsapp"));
    setLoading(false);
  }

  function applyTemplate(id: string) {
    const t = templates.find((x) => String(x.id) === id);
    if (t) setBody(t.body);
  }

  useEffect(() => {
    (async () => {
      const s = await fetchWhatsappSettings();
      if (s?.success && s.settings) {
        setPhoneNumberId(s.settings.phone_number_id || "");
        setFromNumber(s.settings.from_number || "");
        setIsActive(s.settings.is_active);
        setHasToken(s.settings.has_token);
      }
    })();
    loadCampaigns();
  }, []);

  async function saveSettings() {
    setSavingS(true); setNotice(null); setError(null);
    const res = await saveWhatsappSettings({ provider: "meta", api_token: apiToken || null, phone_number_id: phoneNumberId, from_number: fromNumber, is_active: isActive });
    if (res?.success) { setNotice("WhatsApp settings saved."); if (apiToken) setHasToken(true); setApiToken(""); }
    else setError(res?.message || "Failed to save.");
    setSavingS(false);
  }

  async function runTest() {
    if (!testTo) return;
    setTesting(true); setNotice(null); setError(null);
    const res = await testWhatsapp(testTo);
    if (res?.success) setNotice(res.message || "Test sent.");
    else setError(res?.message || "Test failed.");
    setTesting(false);
  }

    async function send(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setNotice(null); setError(null);
    const res = await sendWhatsappBroadcast({ name, body, audience, scheduled_at: scheduleAt || null });
    if (res?.success) { setNotice(res.message || "Broadcast sent."); setName(""); setBody(""); setAudience("all"); setScheduleAt(""); loadCampaigns(); }
    else setError(res?.message || "Failed to send.");
    setSending(false);
  }

  return (
    <div className="space-y-6">
      {(notice || error) && (
        <div className={`rounded-lg border px-3 py-2 text-sm ${error ? "border-rose-500/30 bg-rose-500/10 text-rose-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"}`}>
          {error || notice}
        </div>
      )}

      {/* Settings */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <MessageSquare size={16} className="text-[#25D366]" />
          <h2 className="text-sm font-bold text-white">WhatsApp Connection</h2>
          {hasToken && <span className="ml-auto text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Connected</span>}
        </div>
        <p className="text-xs text-[#64748B] -mt-1">Uses the official <b>Meta WhatsApp Cloud API</b>. Paste your access token & phone number ID.</p>

        <div className="grid grid-cols-2 gap-3">
          <div><label className={labelCls}>Phone Number ID</label><input value={phoneNumberId} onChange={(e) => setPhoneNumberId(e.target.value)} placeholder="From Meta dashboard" className={inputCls} /></div>
          <div><label className={labelCls}>Sender Number (display)</label><input value={fromNumber} onChange={(e) => setFromNumber(e.target.value)} placeholder="+1 555 123 4567" className={inputCls} /></div>
        </div>
        <div>
          <label className={labelCls}>Access Token</label>
          <input type="password" value={apiToken} onChange={(e) => setApiToken(e.target.value)} placeholder={hasToken ? "•••••••• (saved — leave blank to keep)" : "Meta access token"} className={inputCls} />
        </div>
        <label className="flex items-center gap-2 text-sm text-white">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="accent-[#25D366]" />
          Use WhatsApp for broadcasts
        </label>
        <div className="flex flex-wrap gap-2">
          <button onClick={saveSettings} disabled={savingS} className="flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
            {savingS ? <Loader2 size={15} className="animate-spin" /> : <Zap size={15} />} Save
          </button>
          <div className="flex gap-2 flex-1 min-w-[240px]">
            <input value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="Test number e.g. +15551234567" className={inputCls} />
            <button onClick={runTest} disabled={testing || !testTo} className="flex-shrink-0 flex items-center gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#25D366] disabled:opacity-60">
              {testing ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Test
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast + History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
            <MessageSquare size={16} className="text-[#25D366]" />
            <h2 className="text-sm font-bold text-white">New Broadcast</h2>
            <span className="ml-auto flex items-center gap-1 text-xs text-[#94A3B8]"><Users size={13} /> {reachable} with phone</span>
          </div>
          <form onSubmit={send} className="space-y-4">
            {templates.length > 0 && (
              <div><label className={labelCls}>Load a template</label><FancySelect value="" onChange={applyTemplate} placeholder="Choose a template…" options={templates.map((t) => ({ value: String(t.id), label: t.name }))} /></div>
            )}
            <div><label className={labelCls}>Broadcast name (internal)</label><input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Weekend Offer" className={inputCls} /></div>
            <div><label className={labelCls}>Audience</label><FancySelect value={audience} onChange={setAudience} options={AUDIENCES} /></div>
                        <div><label className={labelCls}>Message</label><textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Your WhatsApp message…" className={`${inputCls} resize-none`} /></div>
            <div>
              <label className={labelCls}>Schedule for later (optional)</label>
              <input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} className={inputCls} />
              <p className="text-[11px] text-[#64748B] mt-1">Leave empty to send immediately.</p>
            </div>
            <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
              {sending ? <><Loader2 size={15} className="animate-spin" /> {scheduleAt ? "Scheduling…" : "Sending…"}</> : <><Send size={15} /> {scheduleAt ? "Schedule Broadcast" : "Send Broadcast"}</>}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
          <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3 mb-3">Sent Broadcasts</h2>
          {loading ? (
            <div className="text-center py-12 text-[#64748B]">Loading…</div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12 text-[#64748B]">No broadcasts yet.</div>
          ) : (
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {campaigns.map((c) => (
                <div key={c.id} className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 flex-shrink-0">{c.recipients_count} sent</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#64748B]">
                    <span className="capitalize">Audience: {c.audience}</span><span>·</span>
                    <span>{c.sent_at ? new Date(c.sent_at).toLocaleString() : "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= Templates ================= */
function TemplatesTab() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetchTemplates();
    if (res?.success) setTemplates(res.templates ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const res = await saveTemplate({ name, channel, subject: channel === "email" ? subject : null, body });
    if (res?.success) { setName(""); setSubject(""); setBody(""); load(); }
    else setError(res?.message || "Failed to save.");
    setSaving(false);
  }

  async function remove(id: number) {
    if (!confirm("Delete this template?")) return;
    const res = await deleteTemplate(id);
    if (res?.success) load();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <FileText size={16} style={{ color: BRAND }} />
          <h2 className="text-sm font-bold text-white">New Template</h2>
        </div>
        {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>}
        <form onSubmit={save} className="space-y-4">
          <div><label className={labelCls}>Template name</label><input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. New Arrival" className={inputCls} /></div>
          <div><label className={labelCls}>Channel</label><FancySelect value={channel} onChange={(v) => setChannel(v as "email" | "whatsapp")} options={[{ value: "email", label: "Email" }, { value: "whatsapp", label: "WhatsApp" }]} /></div>
          {channel === "email" && <div><label className={labelCls}>Subject</label><input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email subject" className={inputCls} /></div>}
          <div><label className={labelCls}>Message</label><textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Template message…" className={`${inputCls} resize-none`} /></div>
          <button type="submit" disabled={saving} style={{ backgroundColor: BRAND }} className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} Save Template
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3 mb-3">Saved Templates</h2>
        {loading ? (
          <div className="text-center py-12 text-[#64748B]">Loading…</div>
        ) : templates.length === 0 ? (
          <div className="text-center py-12 text-[#64748B]">No templates yet.</div>
        ) : (
          <div className="space-y-2 max-h-[520px] overflow-y-auto">
            {templates.map((t) => (
              <div key={t.id} className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                    {t.subject && <p className="text-xs text-[#94A3B8] truncate">{t.subject}</p>}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#1e2a4a] text-[#94A3B8] capitalize">{t.channel}</span>
                    <button onClick={() => remove(t.id)} className="text-[#64748B] hover:text-rose-400"><Trash2 size={14} /></button>
                  </div>
                </div>
                <p className="text-[11px] text-[#64748B] mt-1.5 whitespace-pre-line line-clamp-2">{t.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= Contacts (CSV Import) ================= */
function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState({ total: 0, with_email: 0, with_phone: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load(q = "") {
    setLoading(true);
    const res = await fetchContacts(q);
    setContacts(res.contacts);
    setStats(res.stats);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setNotice(null);
    setError(null);
    const res = await importContacts(file);
    if (res.success) {
      setNotice(res.message);
      load(search);
    } else {
      setError(res.message);
    }
    setUploading(false);
    e.target.value = "";
  }

  async function remove(id: number) {
    if (!confirm("Delete this contact?")) return;
    const res = await deleteContact(id);
    if (res.success) load(search);
  }

  async function clearAll() {
    if (!confirm("Delete ALL imported contacts? This cannot be undone.")) return;
    const res = await clearContacts();
    if (res.success) {
      setNotice(res.message);
      load();
    }
  }

  function downloadSample() {
    const csv = "name,email,phone\nJohn Smith,john@example.com,+15551234567\nSarah Lee,sarah@example.com,+15559876543\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts-sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {(notice || error) && (
        <div className={`rounded-lg border px-3 py-2 text-sm ${error ? "border-rose-500/30 bg-rose-500/10 text-rose-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"}`}>
          {error || notice}
        </div>
      )}

      {/* Stats + Import */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Users size={16} style={{ color: BRAND }} />
          <h2 className="text-sm font-bold text-white">Contact List</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-3.5 text-center">
            <p className="text-xl font-bold text-white">{stats.total}</p>
            <p className="text-[11px] text-[#64748B] mt-0.5">Total contacts</p>
          </div>
          <div className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-3.5 text-center">
            <p className="text-xl font-bold text-white">{stats.with_email}</p>
            <p className="text-[11px] text-[#64748B] mt-0.5">With email</p>
          </div>
          <div className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-3.5 text-center">
            <p className="text-xl font-bold text-white">{stats.with_phone}</p>
            <p className="text-[11px] text-[#64748B] mt-0.5">With phone</p>
          </div>
        </div>

        <p className="text-xs text-[#64748B]">
          Upload a <b>CSV</b> file with columns <code className="text-[#94A3B8]">name, email, phone</code>. Duplicates are skipped automatically.
        </p>

        <div className="flex flex-wrap gap-2">
          <label
            style={{ backgroundColor: BRAND }}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95"
          >
            {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            {uploading ? "Importing…" : "Import CSV"}
            <input type="file" accept=".csv,text/csv" onChange={onFile} disabled={uploading} className="hidden" />
          </label>

          <button
            onClick={downloadSample}
            className="flex items-center gap-2 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-2.5 text-sm font-semibold text-white hover:border-[#FC5E01]"
          >
            <Download size={15} /> Sample CSV
          </button>

          {stats.total > 0 && (
            <button
              onClick={clearAll}
              className="ml-auto flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 hover:bg-rose-500/20"
            >
              <Trash2 size={15} /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <div className="flex items-center justify-between gap-3 border-b border-[#1e2a4a] pb-3 mb-3">
          <h2 className="text-sm font-bold text-white">Contacts</h2>
          <div className="relative w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load(search)}
              placeholder="Search…"
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] pl-8 pr-3 py-2 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#64748B]">Loading…</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12 text-[#64748B]">No contacts yet. Import a CSV to get started.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-[#64748B] border-b border-[#1e2a4a]">
                  <th className="pb-2 pr-3 font-semibold">Name</th>
                  <th className="pb-2 pr-3 font-semibold">Email</th>
                  <th className="pb-2 pr-3 font-semibold">Phone</th>
                  <th className="pb-2 pr-3 font-semibold">Tag</th>
                  <th className="pb-2 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b border-[#1e2a4a]/50 hover:bg-[#0A0F1E]/40">
                    <td className="py-2.5 pr-3 text-white">{c.name || <span className="text-[#64748B]">—</span>}</td>
                    <td className="py-2.5 pr-3 text-[#94A3B8]">{c.email || <span className="text-[#64748B]">—</span>}</td>
                    <td className="py-2.5 pr-3 text-[#94A3B8]">{c.phone || <span className="text-[#64748B]">—</span>}</td>
                    <td className="py-2.5 pr-3">
                      {c.tag ? (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#1e2a4a] text-[#94A3B8]">{c.tag}</span>
                      ) : (
                        <span className="text-[#64748B]">—</span>
                      )}
                    </td>
                    <td className="py-2.5 text-right">
                      <button onClick={() => remove(c.id)} className="text-[#64748B] hover:text-rose-400">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= Promo Codes ================= */
function PromosTab() {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);

  const [code, setCode] = useState("");
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [value, setValue] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetchPromoCodes();
    if (res.success) setCodes(res.codes);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setNotice(null); setError(null);
    const input: PromoInput = {
      code: code.trim().toUpperCase(),
      type,
      value: Number(value) || 0,
      max_uses: maxUses ? Number(maxUses) : null,
      expires_at: expiresAt || null,
      is_active: true,
      description: description || null,
    };
    const res = await createPromoCode(input);
    if (res.success) {
      setNotice(res.message || "Promo code created.");
      setCode(""); setValue(""); setMaxUses(""); setExpiresAt(""); setDescription("");
      load();
    } else {
      setError(res.message || "Failed to create promo code.");
    }
    setSaving(false);
  }

  async function toggle(id: number) {
    const res = await togglePromoCode(id);
    if (res.success) load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this promo code?")) return;
    const res = await deletePromoCode(id);
    if (res.success) load();
  }

  function copyCode(c: PromoCode) {
    navigator.clipboard?.writeText(c.code);
    setCopied(c.id);
    setTimeout(() => setCopied(null), 1500);
  }

  function discountLabel(c: PromoCode) {
    return c.type === "percent" ? `${c.value}% off` : `$${c.value.toFixed(2)} off`;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Create */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3">
          <Ticket size={16} style={{ color: BRAND }} />
          <h2 className="text-sm font-bold text-white">New Promo Code</h2>
        </div>

        {notice && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 flex items-center gap-2"><CheckCircle2 size={15} /> {notice}</div>}
        {error && <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</div>}

        <form onSubmit={save} className="space-y-4">
          <div>
            <label className={labelCls}>Code</label>
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required placeholder="e.g. SUMMER10" className={`${inputCls} uppercase tracking-wide`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Discount type</label>
              <FancySelect value={type} onChange={(v) => setType(v as "percent" | "fixed")} options={[{ value: "percent", label: "Percentage (%)" }, { value: "fixed", label: "Fixed amount ($)" }]} />
            </div>
            <div>
              <label className={labelCls}>{type === "percent" ? "Percent off" : "Amount off"}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                  {type === "percent" ? <Percent size={14} /> : <DollarSign size={14} />}
                </span>
                <input type="number" min="0" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} required placeholder={type === "percent" ? "10" : "500"} className={`${inputCls} pl-9`} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Max uses (optional)</label>
              <input type="number" min="1" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} placeholder="Unlimited" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Expiry date (optional)</label>
              <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description (optional)</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Summer sale discount" className={inputCls} />
          </div>
          <button type="submit" disabled={saving} style={{ backgroundColor: BRAND }} className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} Create Code
          </button>
        </form>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3 mb-3">Your Promo Codes</h2>
        {loading ? (
          <div className="text-center py-12 text-[#64748B]">Loading…</div>
        ) : codes.length === 0 ? (
          <div className="text-center py-12 text-[#64748B]">No promo codes yet.</div>
        ) : (
          <div className="space-y-2 max-h-[560px] overflow-y-auto">
            {codes.map((c) => (
              <div key={c.id} className="rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white tracking-wide">{c.code}</span>
                      <button onClick={() => copyCode(c)} className="text-[#64748B] hover:text-white" title="Copy code">
                        {copied === c.id ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      </button>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{discountLabel(c)}{c.description ? ` · ${c.description}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {c.redeemable ? (
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Active</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#1e2a4a] text-[#64748B]">{c.is_active ? "Expired" : "Off"}</span>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-[#64748B]">
                  <div className="flex items-center gap-3">
                    <span>Used: {c.used_count}{c.max_uses ? ` / ${c.max_uses}` : ""}</span>
                    {c.expires_at && <><span>·</span><span>Expires {c.expires_at}</span></>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggle(c.id)} className="text-[#94A3B8] hover:text-white" title={c.is_active ? "Disable" : "Enable"}>
                      {c.is_active ? <ToggleRight size={18} className="text-emerald-400" /> : <ToggleLeft size={18} />}
                    </button>
                    <button onClick={() => remove(c.id)} className="text-[#64748B] hover:text-rose-400" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}