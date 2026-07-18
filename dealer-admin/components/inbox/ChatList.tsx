"use client";

import { Search, Car } from "lucide-react";

interface ChatSession {
  id: string;
  customerName: string;
  phone: string;
  vehicleContext: string;
  price: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface ChatListProps {
  chats: ChatSession[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
}

export default function ChatList({ chats, activeChatId, onSelectChat }: ChatListProps) {
  return (
    <div className="lg:col-span-4 bg-[#111B33] border border-[#1e2a4a] rounded-2xl flex flex-col overflow-hidden h-full">
      <div className="p-4 border-b border-[#1e2a4a] relative flex-shrink-0">
        <Search size={14} className="absolute left-7 top-[26px] text-[#64748B]" />
        <input 
          type="text" 
          placeholder="Filter active channels..." 
          className="w-full bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#FC5E01]"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1.5 ${
              activeChatId === chat.id ? "bg-[#0A0F1E] border border-[#1e2a4a]" : "bg-transparent hover:bg-[#0A0F1E]/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white flex items-center gap-1.5">
                {chat.customerName}
                {chat.unread && <span className="h-2 w-2 rounded-full bg-[#FC5E01]" />}
              </span>
              <span className="text-[10px] text-[#64748B] font-mono">{chat.timestamp}</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate pr-4">{chat.lastMessage}</p>
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#FC5E01] bg-[#FC5E01]/5 w-fit px-2 py-0.5 rounded border border-[#FC5E01]/10">
              <Car size={10} /> {chat.vehicleContext}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}