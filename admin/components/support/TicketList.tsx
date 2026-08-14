// admin/components/support/TicketList.tsx
"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import TicketDetail from "./TicketDetail";
import { supportTickets, SupportTicket } from "./supportData";

const statusStyles: Record<string, string> = {
  Open: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "In Progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const statusOptions = ["All Status", "Open", "In Progress", "Resolved"];

export default function TicketList() {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedTicketId, setSelectedTicketId] = useState<number>(supportTickets[0]?.id ?? 0);

  const filteredTickets = useMemo(() => {
    if (selectedStatus === "All Status") return supportTickets;
    return supportTickets.filter((t) => t.status === selectedStatus);
  }, [selectedStatus]);

  const selectedTicket: SupportTicket | null =
    supportTickets.find((t) => t.id === selectedTicketId) || null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
      {/* Ticket List */}
      <div className="flex flex-col">
        {/* Filter */}
        <div className="relative mb-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#1e2a4a] bg-[#111B33] pl-4 pr-9 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status} className="bg-[#0A0F1E]">
                {status}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
        </div>

        {/* List */}
        <div className="flex flex-col gap-2.5 max-h-[600px] overflow-y-auto pr-1">
          {filteredTickets.map((ticket) => {
            const isActive = ticket.id === selectedTicketId;
            const lastMessage = ticket.messages[ticket.messages.length - 1];

            return (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  isActive
                    ? "border-[#FC5E01] bg-[#FC5E01]/5"
                    : "border-[#1e2a4a] bg-[#111B33] hover:border-[#2d3d5e]"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${ticket.gradient} text-[10px] font-bold text-white`}>
                      {ticket.avatarInitials}
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{ticket.dealerName}</p>
                  </div>
                  <span className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold ${statusStyles[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </div>

                <p className="text-sm font-bold text-white mb-1 line-clamp-1">{ticket.subject}</p>
                <p className="text-xs text-[#64748B] line-clamp-1">{lastMessage.message}</p>

                <p className="mt-2 text-[10px] text-[#475569]">
                  {new Date(ticket.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </button>
            );
          })}

          {filteredTickets.length === 0 && (
            <div className="rounded-xl border border-[#1e2a4a] bg-[#111B33] py-10 text-center text-sm text-[#64748B]">
              No tickets match this filter.
            </div>
          )}
        </div>
      </div>

      {/* Ticket Detail */}
      <TicketDetail ticket={selectedTicket} />
    </div>
  );
}