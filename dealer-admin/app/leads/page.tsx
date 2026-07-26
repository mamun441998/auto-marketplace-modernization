"use client";

import { useState, useEffect, useCallback } from "react";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import LeadsStats from "@/components/leads/LeadsStats";
import LeadsTable from "@/components/leads/LeadsTable";
import LeadsPipeline from "@/components/leads/LeadsPipeline";
import { fetchMyLeads, Lead } from "@/lib/lead";

export default function LeadsPage() {
  const [currentView, setCurrentView] = useState<"table" | "pipeline">("table");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchMyLeads({ per_page: 200 });
      if (res.success) setLeads(res.leads ?? []);
    } catch (err) {
      console.error("Load leads failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return (
    <div className="space-y-6 p-6 min-h-screen bg-[#0A0F1E]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Leads Management</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Track, filter, and manage your incoming dealership leads.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-[#1e2a4a] bg-[#111B33] p-1">
          <button
            onClick={() => setCurrentView("table")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
              currentView === "table" ? "bg-[#FC5E01] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <List size={14} />
            Table View
          </button>
          <button
            onClick={() => setCurrentView("pipeline")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
              currentView === "pipeline" ? "bg-[#FC5E01] text-white" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <LayoutGrid size={14} />
            Pipeline (Kanban)
          </button>
        </div>
      </div>

      {/* Stats */}
      <LeadsStats leads={leads} />

      {/* Main view */}
      <div className="pt-2">
        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-[#1e2a4a] bg-[#111B33] py-20 text-[#94A3B8]">
            <Loader2 size={20} className="animate-spin mr-2" />
            Loading leads...
          </div>
        ) : currentView === "table" ? (
          <LeadsTable leads={leads} onRefresh={loadLeads} />
        ) : (
          <LeadsPipeline leads={leads} onRefresh={loadLeads} />
        )}
      </div>
    </div>
  );
}