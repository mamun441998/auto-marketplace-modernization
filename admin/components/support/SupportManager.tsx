"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Loader2,
  Send,
  MessageSquare,
  Search,
  Building2,
  ShieldCheck,
} from "lucide-react";
import FancySelect from "@/components/FancySelect";
import {
  fetchTickets,
  fetchTicket,
  replyTicket,
  updateTicketStatus,
  type SupportTicketSummary,
  type SupportTicketDetail,
  type SupportCounts,
} from "@/lib/adminSupport";

const STATUS_FILTERS = [
  { value: "", label: "All statuses" },
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "closed", label: "Closed" },
];

const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "closed", label: "Closed" },
];

function statusStyle(status: string): string {
  switch (status) {
    case "open":
      return "bg-[#FC5E01]/15 text-[#FC5E01]";
    case "pending":
      return "bg-amber-500/15 text-amber-400";
    case "closed":
      return "bg-slate-500/15 text-slate-400";
    default:
      return "bg-slate-500/15 text-slate-400";
  }
}

function priorityStyle(priority: string): string {
  switch (priority) {
    case "high":
      return "text-red-400";
    case "medium":
      return "text-amber-400";
    default:
      return "text-slate-400";
  }
}

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SupportManager() {
  const [tickets, setTickets] = useState<SupportTicketSummary[]>([]);
  const [counts, setCounts] = useState<SupportCounts>({
    total: 0,
    open: 0,
    pending: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const [activeId, setActiveId] = useState<number | null>(null);
  const [detail, setDetail] = useState<SupportTicketDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetchTickets({
      status: statusFilter || undefined,
      search: search.trim() || undefined,
    });
    setTickets(res.tickets);
    setCounts(res.counts);
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const openTicket = useCallback(async (id: number) => {
    setActiveId(id);
    setDetailLoading(true);
    setDetail(null);
    const t = await fetchTicket(id);
    setDetail(t);
    setDetailLoading(false);
  }, []);

  async function sendReply() {
    if (!detail || !reply.trim()) return;
    setSending(true);
    const res = await replyTicket(detail.id, reply.trim());
    if (res.success && res.ticket) {
      setDetail(res.ticket);
      setReply("");
      load();
    }
    setSending(false);
  }

  async function changeStatus(status: string) {
    if (!detail) return;
    setSavingStatus(true);
    const res = await updateTicketStatus(detail.id, status);
    if (res.success && res.ticket) {
      setDetail(res.ticket);
      load();
    }
    setSavingStatus(false);
  }

  const stats = [
    { label: "Total", value: counts.total, color: "text-white" },
    { label: "Open", value: counts.open, color: "text-[#FC5E01]" },
    { label: "Pending", value: counts.pending, color: "text-amber-400" },
    { label: "Closed", value: counts.closed, color: "text-slate-400" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] px-5 py-4"
          >
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#94A3B8] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by subject…"
            className="w-full rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]/60"
          />
        </div>
        <div className="w-full sm:w-48">
          <FancySelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_FILTERS}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
        {/* Ticket list */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-[#64748B]">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm text-[#64748B]">
              No tickets found.
            </div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto divide-y divide-[#1e2a4a]">
              {tickets.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openTicket(t.id)}
                  className={`w-full text-left px-5 py-4 transition-colors ${
                    activeId === t.id ? "bg-[#0C1A32]" : "hover:bg-[#0C1A32]/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-sm text-white truncate">
                      {t.subject}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${statusStyle(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1">
                    <Building2 className="w-3 h-3" />
                    <span className="truncate">{t.dealer_name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {t.messages_count}
                      <span className={`ml-2 capitalize ${priorityStyle(t.priority)}`}>
                        {t.priority}
                      </span>
                    </span>
                    <span>{timeAgo(t.last_reply_at || t.created_at)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Thread */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] flex flex-col min-h-[600px]">
          {!activeId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-[#64748B] p-10">
              <MessageSquare className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm">Select a ticket to view the conversation.</p>
            </div>
          ) : detailLoading || !detail ? (
            <div className="flex-1 flex items-center justify-center text-[#64748B]">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#1e2a4a] flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-bold text-white">{detail.subject}</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Ticket #{detail.id} · {detail.dealer_name} · Opened{" "}
                    {timeAgo(detail.created_at)}
                  </p>
                </div>
                <div className="w-40 flex items-center gap-2">
                  {savingStatus && (
                    <Loader2 className="w-4 h-4 animate-spin text-[#64748B]" />
                  )}
                  <FancySelect
                    value={detail.status}
                    onChange={changeStatus}
                    options={STATUS_OPTIONS}
                  />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 max-h-[420px]">
                {detail.messages.map((m) => {
                  const isAdmin = m.author_type === "admin";
                  return (
                    <div
                      key={m.id}
                      className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          isAdmin
                            ? "bg-[#FC5E01] text-white"
                            : "bg-[#0A0F1E] border border-[#1e2a4a] text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold opacity-80">
                          {isAdmin && <ShieldCheck className="w-3 h-3" />}
                          {isAdmin ? m.author_name || "Support" : m.author_name || "Dealer"}
                        </div>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {m.body}
                        </p>
                        <div className="text-[10px] opacity-60 mt-1.5">
                          {timeAgo(m.created_at)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply */}
              <div className="border-t border-[#1e2a4a] p-4">
                <div className="flex items-end gap-3">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={2}
                    placeholder="Write a reply to the dealer…"
                    className="flex-1 resize-none rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]/60"
                  />
                  <button
                    type="button"
                    onClick={sendReply}
                    disabled={sending || !reply.trim()}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FC5E01] hover:bg-[#E55A00] disabled:opacity-50 text-white font-semibold text-sm transition-colors"
                  >
                    {sending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}