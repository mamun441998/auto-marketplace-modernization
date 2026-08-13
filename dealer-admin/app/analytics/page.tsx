"use client";

import { useEffect, useState } from "react";
import {
  BarChart3, Car, Users, Mail, TrendingUp, DollarSign,
  MousePointerClick, Eye, Loader2, Target, Contact as ContactIcon,
} from "lucide-react";
import { fetchAnalytics, type AnalyticsData, type LeadPoint } from "@/lib/analytics";

const BRAND = "#FC5E01";

const LEAD_COLORS: Record<string, string> = {
  new: "#3B82F6", contacted: "#FC5E01", qualified: "#A855F7", closed: "#10B981", lost: "#64748B",
};
const INV_COLORS: Record<string, string> = {
  draft: "#64748B", active: "#10B981", pending: "#FC5E01", sold: "#3B82F6", archived: "#475569",
};

function money(v: number, c: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: c || "USD", maximumFractionDigits: 0 }).format(v);
  } catch {
    return `${c} ${Math.round(v).toLocaleString()}`;
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetchAnalytics();
    if (res.success) setData(res.data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-[60vh] text-[#64748B]">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading analytics…
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-[#64748B]">Unable to load analytics.</div>;
  }

  const t = data.totals;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 size={22} style={{ color: BRAND }} /> Analytics
        </h1>
        <p className="text-sm text-[#94A3B8] mt-1">Real-time insights across your inventory, leads and marketing.</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Car size={16} />} label="Total Vehicles" value={t.vehicles.toString()} sub={`${t.active} active · ${t.sold} sold`} />
        <StatCard icon={<Users size={16} />} label="Total Leads" value={t.leads.toString()} sub={`${t.conversion}% conversion`} />
        <StatCard icon={<ContactIcon size={16} />} label="Contacts" value={t.contacts.toString()} sub="Imported list" />
        <StatCard icon={<DollarSign size={16} />} label="Inventory Value" value={money(t.inventory_value, t.currency)} sub={`Avg ${money(t.avg_price, t.currency)}`} />
        <StatCard icon={<Mail size={16} />} label="Emails Sent" value={t.emails_sent.toString()} sub="All campaigns" />
        <StatCard icon={<Eye size={16} />} label="Open Rate" value={`${t.open_rate}%`} sub={`${t.total_opens} opens`} />
        <StatCard icon={<MousePointerClick size={16} />} label="Click Rate" value={`${t.click_rate}%`} sub={`${t.total_clicks} clicks`} />
        <StatCard icon={<Target size={16} />} label="Won Deals" value={(data.leads_by_status.closed ?? 0).toString()} sub="Closed leads" />
      </div>

      {/* Leads over time */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} style={{ color: BRAND }} />
          <h2 className="text-sm font-bold text-white">Leads — Last 30 Days</h2>
          <span className="ml-auto text-xs text-[#64748B]">
            {data.leads_over_time.reduce((s, p) => s + p.count, 0)} total
          </span>
        </div>
        <LeadsChart data={data.leads_over_time} />
        <div className="flex justify-between text-[10px] text-[#64748B] mt-2">
          <span>{data.leads_over_time[0]?.date ?? ""}</span>
          <span>{data.leads_over_time[data.leads_over_time.length - 1]?.date ?? ""}</span>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by status */}
        <Panel title="Leads by Status">
          {Object.entries(data.leads_by_status).length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-2.5">
              {Object.entries(data.leads_by_status).map(([status, count]) => (
                <BarRow
                  key={status}
                  label={status}
                  value={count}
                  max={Math.max(1, ...Object.values(data.leads_by_status))}
                  color={LEAD_COLORS[status] ?? BRAND}
                />
              ))}
            </div>
          )}
        </Panel>

        {/* Inventory by status */}
        <Panel title="Inventory by Status">
          {Object.entries(data.inventory_by_status).length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-2.5">
              {Object.entries(data.inventory_by_status).map(([status, count]) => (
                <BarRow
                  key={status}
                  label={status}
                  value={count}
                  max={Math.max(1, ...Object.values(data.inventory_by_status))}
                  color={INV_COLORS[status] ?? BRAND}
                />
              ))}
            </div>
          )}
        </Panel>

        {/* Top makes */}
        <Panel title="Top Vehicle Makes">
          {data.inventory_by_make.length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-2.5">
              {data.inventory_by_make.map((m) => (
                <BarRow
                  key={m.make}
                  label={m.make ?? "Unknown"}
                  value={m.count}
                  max={Math.max(1, ...data.inventory_by_make.map((x) => x.count))}
                  color={BRAND}
                />
              ))}
            </div>
          )}
        </Panel>

        {/* Lead sources */}
        <Panel title="Lead Sources">
          {data.leads_by_source.length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-2.5">
              {data.leads_by_source.map((s) => (
                <BarRow
                  key={s.source}
                  label={s.source ?? "Direct"}
                  value={s.count}
                  max={Math.max(1, ...data.leads_by_source.map((x) => x.count))}
                  color="#3B82F6"
                />
              ))}
            </div>
          )}
        </Panel>
      </div>

      {/* Recent campaigns */}
      <Panel title="Recent Campaign Performance">
        {data.recent_campaigns.length === 0 ? (
          <Empty text="No email campaigns sent yet." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-[#64748B] border-b border-[#1e2a4a]">
                  <th className="pb-2 pr-3 font-semibold">Campaign</th>
                  <th className="pb-2 pr-3 font-semibold">Sent</th>
                  <th className="pb-2 pr-3 font-semibold">Opens</th>
                  <th className="pb-2 pr-3 font-semibold">Clicks</th>
                  <th className="pb-2 font-semibold">Open Rate</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-[#1e2a4a]/50">
                    <td className="py-2.5 pr-3 text-white">{c.name}</td>
                    <td className="py-2.5 pr-3 text-[#94A3B8]">{c.recipients}</td>
                    <td className="py-2.5 pr-3 text-[#94A3B8]">{c.opens}</td>
                    <td className="py-2.5 pr-3 text-[#94A3B8]">{c.clicks}</td>
                    <td className="py-2.5">
                      <span className="text-xs font-semibold" style={{ color: BRAND }}>{c.open_rate}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

/* ---------- small components ---------- */
function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-4">
      <div className="flex items-center gap-2 text-[#94A3B8]">
        <span style={{ color: BRAND }}>{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white mt-2 truncate">{value}</p>
      {sub && <p className="text-[11px] text-[#64748B] mt-0.5 truncate">{sub}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
      <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function BarRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-xs text-[#94A3B8] capitalize truncate">{label}</span>
      <div className="flex-1 h-2.5 rounded-full bg-[#0A0F1E] overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-8 text-right text-xs font-semibold text-white">{value}</span>
    </div>
  );
}

function Empty({ text = "No data yet." }: { text?: string }) {
  return <div className="text-center py-8 text-[#64748B] text-sm">{text}</div>;
}

function LeadsChart({ data }: { data: LeadPoint[] }) {
  if (!data.length) return <Empty />;

  const W = 700, H = 160, pad = 10;
  const max = Math.max(1, ...data.map((d) => d.count));
  const step = data.length > 1 ? (W - pad * 2) / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const x = pad + i * step;
    const y = H - pad - (d.count / max) * (H - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1][0].toFixed(1)},${H - pad} L${points[0][0].toFixed(1)},${H - pad} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40" preserveAspectRatio="none">
      <defs>
        <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRAND} stopOpacity="0.35" />
          <stop offset="100%" stopColor={BRAND} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#leadGrad)" />
      <path d={line} fill="none" stroke={BRAND} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}