"use client";

import {
  CarFront,
  Users,
  Globe,
  Megaphone,
  BarChart3,
  Sparkles,
} from "lucide-react";

const cards = [
  { title: "Inventory", icon: CarFront, color: "bg-blue-500/10 text-blue-400" },
  { title: "CRM", icon: Users, color: "bg-violet-500/10 text-violet-400" },
  { title: "Website", icon: Globe, color: "bg-cyan-500/10 text-cyan-400" },
  { title: "Marketing", icon: Megaphone, color: "bg-[#FC5E01]/10 text-[#FC5E01]" },
  { title: "Analytics", icon: BarChart3, color: "bg-emerald-500/10 text-emerald-400" },
];

export default function WhyMotoHaveIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[#FC5E01]/10 blur-[90px]" />

      <div className="relative rounded-[28px] border border-[#262626] bg-[#141414] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FC5E01] text-white">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">MotoHave Platform</h3>
            <p className="text-sm text-[#94A3B8]">Everything Connected</p>
          </div>
        </div>

        {/* Workflow */}
        <div className="space-y-2">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <div className="flex items-center justify-between rounded-xl border border-[#262626] bg-[#171717] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-[#64748B]">Connected</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#FC5E01] to-[#E5540A] py-4 text-center text-white">
          <h4 className="text-base font-bold">One Login</h4>
          <p className="mt-1 text-sm text-white/90">One Platform • Unlimited Growth</p>
        </div>
      </div>
    </div>
  );
}