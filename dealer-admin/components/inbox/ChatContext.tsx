"use client";

import { Car, User, Phone, Mail, ShieldAlert } from "lucide-react";

interface ChatContextProps {
  vehicleContext: string;
  price: string;
  customerName: string;
  phone: string;
}

export default function ChatContext({ vehicleContext, price, customerName, phone }: ChatContextProps) {
  return (
    <div className="lg:col-span-3 bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-4 space-y-5 overflow-y-auto h-full">
      <span className="text-[9px] font-black uppercase text-[#64748B] tracking-widest block border-b border-[#1e2a4a] pb-2">
        Deal Context
      </span>
      
      <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-3.5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-[#FC5E01]/10 text-[#FC5E01] border border-[#FC5E01]/20 flex items-center justify-center">
            <Car size={14} />
          </div>
          <div>
            <span className="block text-xs font-black text-white">{vehicleContext}</span>
            {/* এখানে প্রাইস ডাইনামিক্যালি প্রোপস থেকে ক্লিন হয়ে আসবে */}
            <span className="block text-[10px] font-mono text-[#FC5E01] font-bold mt-0.5">{price}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <span className="text-[9px] font-black uppercase text-[#64748B] tracking-widest block">Buyer Credentials</span>
        <div className="text-xs space-y-2.5">
          <div className="flex items-center gap-2 text-slate-300">
            <User size={12} className="text-[#64748B]" />
            <span>{customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <Phone size={12} className="text-[#64748B]" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Mail size={12} className="text-[#64748B]" />
            <span>client@identity-node.io</span>
          </div>
        </div>
      </div>

      <div className="bg-[#FC5E01]/5 border border-[#FC5E01]/10 rounded-xl p-3 flex gap-2 items-start text-[10px] text-slate-400 leading-relaxed">
        <ShieldAlert size={14} className="text-[#FC5E01] flex-shrink-0 mt-0.5" />
        <p>Ensure all transaction/token negotiations align with the compliance framework mapped inside your active billing sub-tier.</p>
      </div>
    </div>
  );
}