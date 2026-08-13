"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Loader2, User, X, CheckCheck, RefreshCw } from "lucide-react";
import {
  fetchInbox, fetchThread, replyToThread, toggleThread,
  type InboxListItem, type InboxMessage, type InboxThread,
} from "@/lib/inbox";

const BRAND = "#FC5E01";

function timeShort(at: string | null) {
  if (!at) return "";
  const d = new Date(at.replace(" ", "T"));
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<InboxListItem[]>([]);
  const [unreadTotal, setUnreadTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(true);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [thread, setThread] = useState<InboxThread | null>(null);
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  async function loadList() {
    const res = await fetchInbox();
    if (res.success) {
      setConversations(res.conversations);
      setUnreadTotal(res.unread_total);
    }
    setLoadingList(false);
  }

  async function loadThread(id: number) {
    const res = await fetchThread(id);
    if (res.success) {
      setThread(res.conversation);
      setMessages(res.messages);
    }
  }

  // Poll conversation list every 5s.
  useEffect(() => {
    loadList();
    const t = setInterval(loadList, 5000);
    return () => clearInterval(t);
  }, []);

  // Poll the open thread every 4s.
  useEffect(() => {
    if (activeId == null) return;
    loadThread(activeId);
    const t = setInterval(() => loadThread(activeId), 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // Auto-scroll to newest message.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!reply.trim() || activeId == null) return;
    setSending(true);
    const res = await replyToThread(activeId, reply.trim());
    if (res.success) {
      setMessages(res.messages);
      setReply("");
      loadList();
    }
    setSending(false);
  }

  async function onToggle() {
    if (activeId == null) return;
    const res = await toggleThread(activeId);
    if (res.success && thread) {
      setThread({ ...thread, status: res.status ?? thread.status });
      loadList();
    }
  }

  return (
    <div className="p-6 h-[calc(100vh-90px)] flex flex-col">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare size={22} style={{ color: BRAND }} />
        <h1 className="text-2xl font-bold text-white">Live Inbox</h1>
        {unreadTotal > 0 && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FC5E01] text-white">{unreadTotal} new</span>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 min-h-0">
        {/* Conversation list */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] flex flex-col min-h-0">
          <div className="px-4 py-3 border-b border-[#1e2a4a] flex items-center justify-between">
            <span className="text-sm font-bold text-white">Conversations</span>
            <button onClick={loadList} className="text-[#64748B] hover:text-white" title="Refresh">
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loadingList ? (
              <div className="text-center py-12 text-[#64748B] text-sm">Loading…</div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-12 text-[#64748B] text-sm px-4">No conversations yet. Messages from your website chat will appear here.</div>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left px-4 py-3 border-b border-[#1e2a4a]/60 transition ${
                    activeId === c.id ? "bg-[#0A0F1E]" : "hover:bg-[#0A0F1E]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white truncate flex items-center gap-1.5">
                      <User size={13} className="text-[#64748B]" /> {c.name}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {c.unread > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FC5E01] text-white">{c.unread}</span>
                      )}
                      <span className="text-[10px] text-[#64748B]">{timeShort(c.last_at)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#94A3B8] truncate mt-1">
                    {c.preview_from === "dealer" && <span className="text-[#64748B]">You: </span>}
                    {c.preview || "…"}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Thread */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] flex flex-col min-h-0">
          {activeId == null || !thread ? (
            <div className="flex-1 flex items-center justify-center text-[#64748B] text-sm">
              Select a conversation to start chatting.
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="px-4 py-3 border-b border-[#1e2a4a] flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{thread.name}</p>
                  <p className="text-[11px] text-[#64748B] truncate">
                    {thread.email || thread.phone || "No contact info"}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${thread.status === "open" ? "bg-emerald-500/10 text-emerald-400" : "bg-[#1e2a4a] text-[#64748B]"}`}>
                    {thread.status === "open" ? "Open" : "Closed"}
                  </span>
                  <button onClick={onToggle} className="text-xs text-[#94A3B8] hover:text-white border border-[#1e2a4a] rounded-lg px-2.5 py-1">
                    {thread.status === "open" ? "Close" : "Reopen"}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "dealer" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                        m.sender === "dealer"
                          ? "bg-[#FC5E01] text-white rounded-br-sm"
                          : "bg-[#0A0F1E] text-[#E2E8F0] border border-[#1e2a4a] rounded-bl-sm"
                      }`}
                    >
                      <p className="whitespace-pre-line break-words">{m.body}</p>
                      <p className={`text-[10px] mt-1 flex items-center gap-1 justify-end ${m.sender === "dealer" ? "text-white/70" : "text-[#64748B]"}`}>
                        {timeShort(m.at)}
                        {m.sender === "dealer" && <CheckCheck size={12} />}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Reply box */}
              <form onSubmit={send} className="p-3 border-t border-[#1e2a4a] flex gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply…"
                  className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
                />
                <button
                  type="submit"
                  disabled={sending || !reply.trim()}
                  style={{ backgroundColor: BRAND }}
                  className="flex-shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
                >
                  {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}