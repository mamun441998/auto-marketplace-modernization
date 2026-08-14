"use client";

import { useState } from "react";
import {
  Gauge,
  TrendingUp,
  BarChart2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import { suggestVehiclePricing, type AiPricingReport } from "@/lib/ai";

export default function AIPricingSuggestion() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AiPricingReport | null>(null);
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    model: "",
    mileage: "",
    condition: "Excellent",
  });

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.model.trim() || !inputs.mileage || loading) return;

    setLoading(true);
    setError("");

    const res = await suggestVehiclePricing({
      model: inputs.model.trim(),
      mileage: Number(inputs.mileage),
      condition: inputs.condition,
    });

    if (res.success && res.report) {
      setReport(res.report);
    } else {
      setReport(null);
      setError(res.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Input Panel */}
      <form
        onSubmit={handleAnalyze}
        className="lg:col-span-2 bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-5 space-y-4"
      >
        <div>
          <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
            Vehicle
          </label>
          <input
            type="text"
            required
            value={inputs.model}
            onChange={(e) => setInputs({ ...inputs, model: e.target.value })}
            placeholder="e.g., Toyota Camry 2023"
            className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FC5E01] font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Mileage
            </label>
            <input
              type="number"
              required
              min={0}
              value={inputs.mileage}
              onChange={(e) => setInputs({ ...inputs, mileage: e.target.value })}
              placeholder="15000"
              className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FC5E01] font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Condition
            </label>
            <select
              value={inputs.condition}
              onChange={(e) =>
                setInputs({ ...inputs, condition: e.target.value })
              }
              className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FC5E01]"
            >
              <option value="Excellent">Excellent / Clean</option>
              <option value="Good">Good / Normal</option>
              <option value="Fair">Fair / Reconditioned</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FC5E01] py-2.5 text-xs font-black text-white hover:bg-[#E5540A] transition-all disabled:opacity-50"
        >
          <Gauge size={13} className={loading ? "animate-spin" : ""} />
          {loading ? "Analyzing market..." : "Get pricing suggestion"}
        </button>
      </form>

      {/* Report */}
      <div className="lg:col-span-3 bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-5 flex flex-col justify-between min-h-[320px]">
        {report ? (
          <div className="space-y-5 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-3 border-b border-[#1e2a4a]/60 pb-4">
              <div>
                <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                  Demand
                </span>
                <span className="text-xs font-black text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> {report.market_demand}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                  Liquidity
                </span>
                <span className="text-xs font-black text-white mt-1 block font-mono">
                  {report.liquidity_score}%
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                  Days to Turn
                </span>
                <span className="text-xs font-black text-amber-400 mt-1 block font-mono">
                  {report.days_to_turn}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                Suggested pricing
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-3">
                  <p className="text-[9px] font-bold text-[#64748B] uppercase">
                    Quick Sell
                  </p>
                  <p className="text-sm font-black text-slate-300 mt-1 font-mono">
                    ${report.pricing.quick_turn.toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#FC5E01]/5 border border-[#FC5E01]/30 rounded-xl p-3">
                  <p className="text-[9px] font-bold text-[#FC5E01] uppercase">
                    Optimal
                  </p>
                  <p className="text-sm font-black text-white mt-1 font-mono">
                    ${report.pricing.optimal.toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#0A0F1E] border border-[#1e2a4a] rounded-xl p-3">
                  <p className="text-[9px] font-bold text-[#64748B] uppercase">
                    Max Margin
                  </p>
                  <p className="text-sm font-black text-slate-300 mt-1 font-mono">
                    ${report.pricing.max_gross.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e2a4a]/40 flex items-center gap-2 text-[10px] text-[#64748B] bg-[#0A0F1E]/40 p-2.5 rounded-xl">
              <CheckCircle size={12} className="text-emerald-500 flex-shrink-0" />
              <span>
                Based on{" "}
                <span className="text-white font-medium">
                  {report.competitor_count} similar live listings
                </span>{" "}
                in your market.
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-amber-300/90 flex-1">
            <AlertTriangle size={22} className="mb-2 text-amber-400" />
            <p className="text-xs max-w-xs leading-relaxed">{error}</p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-[#64748B] flex-1">
            <BarChart2 size={24} className="mb-2 text-[#1e2a4a]" />
            <p className="text-xs max-w-xs leading-relaxed">
              Enter a vehicle to get an AI-backed pricing suggestion and market
              positioning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
