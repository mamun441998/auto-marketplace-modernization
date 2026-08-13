"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LifeBuoy,
  Plus,
  Loader2,
  Send,
  X,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import FancySelect from "@/components/FancySelect";
import {
  fetchTickets,
  fetchTicket,
  createTicket,
  replyTicket,
  type SupportTicketSummary,
  type SupportTicketDetail,
} from "@/lib/support";

const BRAND = "#FC5E01";

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
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
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicketSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [detail, setDetail] = useState<SupportTicketDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    const res = await fetchTickets();
    if (res.success) setTickets(res.tickets);
    setLoading(false);
  }, []);

  const openTicket = useCallback(async (id: number) => {
    setActiveId(id);
    setDetailLoading(true);
    setDetail(null);
    const res = await fetchTicket(id);
    if (res.success) setDetail(res.ticket);
    setDetailLoading(false);
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  async function sendReply() {
    if (!detail || !reply.trim()) return;
    setSending(true);
    const res = await replyTicket(detail.id, reply.trim());
    if (res.success && res.ticket) {
      setDetail(res.ticket);
      setReply("");
      loadTickets();
    }
    setSending(false);
  }

  return (
    <div className="p-6 lg:p-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FC5E01]/10 flex items-center justify-center text-[#FC5E01]">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Support</h1>
            <p className="text-sm text-[#94A3B8]">
              Open a ticket and our team will help you out.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FC5E01] hover:bg-[#E55A00] text-white font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Ticket list */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1e2a4a] text-sm font-semibold text-[#94A3B8]">
            Your Tickets
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-[#64748B]">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm text-[#64748B]">
              No tickets yet. Click “New Ticket” to get started.
            </div>
          ) : (
            <div className="max-h-[560px] overflow-y-auto divide-y divide-[#1e2a4a]">
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
                    <span className="font-semibold text-sm truncate">
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
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] flex flex-col min-h-[560px]">
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
              {/* Thread header */}
              <div className="px-6 py-4 border-b border-[#1e2a4a] flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold">{detail.subject}</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Ticket #{detail.id} · Opened {timeAgo(detail.created_at)}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${statusStyle(
                    detail.status
                  )}`}
                >
                  {detail.status}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 max-h-[400px]">
                {detail.messages.map((m) => {
                  const isDealer = m.author_type === "dealer";
                  return (
                    <div
                      key={m.id}
                      className={`flex ${isDealer ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          isDealer
                            ? "bg-[#FC5E01] text-white"
                            : "bg-[#0A0F1E] border border-[#1e2a4a] text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold opacity-80">
                          {!isDealer && <ShieldCheck className="w-3 h-3" />}
                          {isDealer ? "You" : m.author_name || "Support"}
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

              {/* Reply box */}
              <div className="border-t border-[#1e2a4a] p-4">
                {detail.status === "closed" && (
                  <p className="text-xs text-[#64748B] mb-2">
                    This ticket is closed. Replying will re-open it.
                  </p>
                )}
                <div className="flex items-end gap-3">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={2}
                    placeholder="Write a reply…"
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

      {/* New ticket modal */}
      {showNew && (
        <NewTicketModal
          onClose={() => setShowNew(false)}
          onCreated={async (id) => {
            setShowNew(false);
            await loadTickets();
            openTicket(id);
          }}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */

function NewTicketModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (id: number) => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required.");
      return;
    }
    setSaving(true);
    setError(null);
    const res = await createTicket({
      subject: subject.trim(),
      message: message.trim(),
      priority,
    });
    setSaving(false);
    if (res.success && res.ticket) {
      onCreated(res.ticket.id);
    } else {
      setError(res.message || "Could not create the ticket.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white">New Support Ticket</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#64748B] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#94A3B8] mb-1.5">
              Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Short summary of the issue"
              className="w-full rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]/60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#94A3B8] mb-1.5">
              Priority
            </label>
            <FancySelect
              value={priority}
              onChange={setPriority}
              options={PRIORITIES}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#94A3B8] mb-1.5">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Describe your problem in detail…"
              className="w-full resize-none rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] px-4 py-3 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]/60"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#0A0F1E] border border-[#1e2a4a] text-white font-semibold text-sm hover:bg-[#0C1A32] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FC5E01] hover:bg-[#E55A00] disabled:opacity-50 text-white font-semibold text-sm transition-colors"
            style={{ backgroundColor: BRAND }}
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
}