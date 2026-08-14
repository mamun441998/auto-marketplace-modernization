// admin/components/security/SecurityStats.tsx
"use client";

import { LogIn, ShieldAlert, Users, AlertOctagon } from "lucide-react";
import { securityStats } from "./securityData";

export default function SecurityStats() {
  const stats = [
    {
      label: "Logins Today",
      value: securityStats.loginsToday.toString(),
      icon: LogIn,
      accent: "text-blue-400 bg-blue-500/10",
    },
    {
      label: "Failed Attempts",
      value: securityStats.failedAttempts.toString(),
      icon: ShieldAlert,
      accent: "text-amber-400 bg-amber-500/10",
    },
    {
      label: "Active Sessions",
      value: securityStats.activeSessions.toLocaleString(),
      icon: Users,
      accent: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Suspicious Alerts",
      value: securityStats.suspiciousAlerts.toString(),
      icon: AlertOctagon,
      accent: "text-rose-400 bg-rose-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}>
              <Icon size={20} />
            </div>
            <p className="mt-3 text-2xl font-extrabold text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs text-[#64748B]">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}