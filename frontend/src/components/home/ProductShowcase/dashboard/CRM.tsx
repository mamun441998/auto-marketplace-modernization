"use client";

import {
  Calendar,
  Mail,
  Phone,
  Search,
  UserRound,
} from "lucide-react";

const leads = [
  {
    name: "John Anderson",
    email: "john@email.com",
    phone: "+1 202 555 0121",
    status: "Hot",
    car: "BMW X5",
  },
  {
    name: "Emily Brown",
    email: "emily@email.com",
    phone: "+1 202 555 0182",
    status: "Warm",
    car: "Tesla Model Y",
  },
  {
    name: "David Miller",
    email: "david@email.com",
    phone: "+1 202 555 0134",
    status: "Cold",
    car: "Mercedes C300",
  },
  {
    name: "Sophia Wilson",
    email: "sophia@email.com",
    phone: "+1 202 555 0165",
    status: "Hot",
    car: "Land Cruiser",
  },
];

export default function CRM() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Lead CRM
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage dealership customer leads
          </p>
        </div>

        <button className="rounded-xl bg-[#FC5E01] px-5 py-2 text-sm font-semibold text-white">
          + New Lead
        </button>
      </div>

      {/* Search */}

      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#17181D] px-4 py-3">
        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          placeholder="Search leads..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {/* Lead Cards */}

      <div className="grid gap-4">
        {leads.map((lead) => (
          <div
            key={lead.email}
            className="rounded-2xl border border-white/10 bg-[#16171D] p-5 transition hover:border-[#FC5E01]/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FC5E01]/10">
                  <UserRound
                    className="text-[#FC5E01]"
                    size={20}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    {lead.name}
                  </h4>

                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail size={13} />
                      {lead.email}
                    </span>

                    <span className="flex items-center gap-1">
                      <Phone size={13} />
                      {lead.phone}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {lead.car}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  lead.status === "Hot"
                    ? "bg-red-500/15 text-red-400"
                    : lead.status === "Warm"
                    ? "bg-yellow-500/15 text-yellow-400"
                    : "bg-slate-500/15 text-slate-400"
                }`}
              >
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}