"use client";

import { useState } from "react";
import { Send, CheckCheck } from "lucide-react";

interface Message {
  sender: "customer" | "dealer";
  text: string;
  time: string;
}

interface ChatWindowProps {
  customerName: string;
  phone: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({ customerName, phone, messages, onSendMessage }: ChatWindowProps) {
  const [typedMessage, setTypedMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    onSendMessage(typedMessage);
    setTypedMessage("");
  };

  return (
    <div className="lg:col-span-5 bg-[#111B33] border border-[#1e2a4a] rounded-2xl flex flex-col overflow-hidden h-full">
      <div className="p-4 bg-[#0A0F1E]/60 border-b border-[#1e2a4a] flex-shrink-0">
        <span className="block text-xs font-black text-white">{customerName}</span>
        <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{phone}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0A0F1E]/20">
        {messages.map((msg, i) => {
          const isDealer = msg.sender === "dealer";
          return (
            <div key={i} className={`flex flex-col ${isDealer ? "items-end" : "items-start"}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                isDealer ? "bg-[#FC5E01] text-white rounded-tr-none" : "bg-[#1e2a4a] text-slate-100 rounded-tl-none"
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-[#64748B] font-mono mt-1 flex items-center gap-1">
                {msg.time} {isDealer && <CheckCheck size={10} className="text-[#FC5E01]" />}
              </span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="p-3 bg-[#0A0F1E] border-t border-[#1e2a4a] flex gap-2 flex-shrink-0">
        <input
          type="text"
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          placeholder="Type corporate reply message..."
          className="w-full bg-[#111B33] border border-[#1e2a4a] rounded-xl px-3 text-xs text-white focus:outline-none focus:border-[#FC5E01]"
        />
        <button type="submit" className="p-2.5 rounded-xl bg-[#FC5E01] text-white hover:bg-[#E5540A] transition-all flex-shrink-0">
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}