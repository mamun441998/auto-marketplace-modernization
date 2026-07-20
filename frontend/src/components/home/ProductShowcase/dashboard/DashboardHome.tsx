"use client";

import {
  Activity,
  CarFront,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Top */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Welcome back to MotoHave
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#18191F] px-4 py-2 text-sm text-slate-300">
          Last updated · Just now
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Card
          title="Vehicles"
          value="1,284"
          icon={<CarFront size={20} />}
        />

        <Card
          title="Sales"
          value="$248K"
          icon={<DollarSign size={20} />}
        />

        <Card
          title="Leads"
          value="932"
          icon={<Users size={20} />}
        />

        <Card
          title="Growth"
          value="+18%"
          icon={<TrendingUp size={20} />}
        />
      </div>

      {/* Analytics */}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_.9fr]">
        {/* Chart */}

        <div className="rounded-2xl border border-white/10 bg-[#16171D] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Sales Overview
            </h3>

            <Activity
              className="text-[#FC5E01]"
              size={18}
            />
          </div>

          <div className="flex h-[230px] items-end gap-3">
            {[35, 60, 52, 88, 74, 95, 70].map((v, i) => (
              <div
                key={i}
                className="flex flex-1 flex-col items-center"
              >
                <div
                  className="w-full rounded-full bg-gradient-to-t from-[#FC5E01] to-[#FFB36A]"
                  style={{
                    height: `${v}%`,
                  }}
                />

                <span className="mt-2 text-[11px] text-slate-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}

        <div className="space-y-4">
          <Stat title="Pending Leads" value="124" />

          <Stat title="Appointments" value="18 Today" />

          <Stat title="Website Visits" value="24,812" />

          <Stat title="Conversion" value="7.8%" />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#16171D] p-5">
      <div className="flex items-center justify-between">
        <div className="text-slate-400">{icon}</div>

        <span className="text-xs text-green-400">
          +12%
        </span>
      </div>

      <div className="mt-5 text-2xl font-bold text-white">
        {value}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {title}
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#16171D] p-5">
      <div className="text-sm text-slate-400">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold text-white">
        {value}
      </div>
    </div>
  );
}