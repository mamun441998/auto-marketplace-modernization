// admin/components/support/TicketDetail.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Inbox, ChevronDown, Check } from "lucide-react";
import { SupportTicket } from "./supportData";

interface TicketDetailProps {
  ticket: SupportTicket | null;
}

const statusStyles: Record<string, string> = {
  Open: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "In Progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const priorityStyles: Record<string, string> = {
  High: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const statusOptions: Array<"Open" | "In Progress" | "Resolved"> = ["Open", "In Progress", "Resolved"];

export default function TicketDetail({ ticket }: TicketDetailProps) {
  const [replyText, setReplyText] = useState("");
  const [currentStatus, setCurrentStatus] = useState(ticket?.status);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  // Jokhon alada ticket select hobe, status dropdown reset hobe sei ticket er nijer status e
  useEffect(() => {
    setCurrentStatus(ticket?.status);
  }, [ticket?.id, ticket?.status]);

  // Outside click e dropdown bondho hobe
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setIsStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!ticket) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A0F1E] border border-[#1e2a4a] text-[#64748B] mb-4">
          <Inbox size={26} />
        </div>
        <p className="text-sm font-semibold text-white">No ticket selected</p>
        <p className="text-xs text-[#64748B] mt-1">Select a ticket from the list to view the conversation</p>
      </div>
    );
  }

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    // 💡 Backend connect korar somoy: eikhane API call hobe
    // jemon: await fetch(`/api/tickets/${ticket.id}/reply`, { method: "POST", body: JSON.stringify({ message: replyText }) })
    alert(`Reply sent: "${replyText}" (backend not connected yet)`);
    setReplyText("");
  };

  const handleStatusChange = (newStatus: "Open" | "In Progress" | "Resolved") => {
    // 💡 Backend connect korar somoy: eikhane API call hobe
    // jemon: await fetch(`/api/tickets/${ticket.id}/status`, { method: "PATCH", body: JSON.stringify({ status: newStatus }) })
    setCurrentStatus(newStatus);
    setIsStatusOpen(false);
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-visible">
      {/* Header */}
      <div className="border-b border-[#1e2a4a] p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-bold text-white">{ticket.subject}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Status Dropdown - ekhane change korle status update hobe */}
            <div className="relative" ref={statusRef}>
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors ${statusStyles[currentStatus ?? "Open"]}`}
              >
                {currentStatus}
                <ChevronDown size={11} className={`transition-transform ${isStatusOpen ? "rotate-180" : ""}`} />
              </button>

              {isStatusOpen && (
                <div className="absolute right-0 top-full z-30 mt-1.5 w-40 rounded-xl border border-[#1e2a4a] bg-[#0C1A32] p-1.5 shadow-xl">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-white hover:bg-[#111B33] transition-colors"
                    >
                      {status}
                      {currentStatus === status && <Check size={13} className="text-[#FC5E01]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${priorityStyles[ticket.priority]}`}>
              {ticket.priority}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${ticket.gradient} text-[11px] font-bold text-white`}>
            {ticket.avatarInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{ticket.dealerName}</p>
            <p className="text-xs text-[#64748B]">{ticket.dealerEmail}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[400px]">
        {ticket.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${msg.sender === "admin" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.sender === "admin"
                  ? "bg-[#FC5E01] text-white rounded-br-sm"
                  : "bg-[#0A0F1E] border border-[#1e2a4a] text-[#CBD5E1] rounded-bl-sm"
              }`}
            >
              {msg.message}
            </div>
            <p className="text-[10px] text-[#64748B] px-1">
              {msg.senderName} ·{" "}
              {new Date(msg.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Reply Box */}
      <form onSubmit={handleReply} className="border-t border-[#1e2a4a] p-4">
        <div className="flex items-end gap-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            rows={2}
            className="flex-1 resize-none rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
          />
          <button
            type="submit"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#FC5E01] text-white hover:bg-[#E5540A] transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}