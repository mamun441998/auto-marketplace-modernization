"use client";

import { useEffect, useState } from "react";
import { CarFront, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { getCurrentDealerPlan } from "@/lib/planConfig";
import { fetchMyVehicles, Vehicle } from "@/lib/vehicle";

export default function InventoryStats() {
  const currentPlan = getCurrentDealerPlan();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMyVehicles({ per_page: 100 });
        if (res.success) setVehicles(res.vehicles ?? []);
      } catch (err) {
        console.error("Load inventory stats failed:", err);
      }
    })();
  }, []);

  // Real numbers from the dealer's inventory.
  const totalVehicles = vehicles.length;
  const inStock = vehicles.filter((v) => v.status === "active").length;
  const reserved = vehicles.filter((v) => v.status === "pending").length;
  const totalValue = vehicles.reduce((sum, v) => sum + Number(v.price ?? 0), 0);

  const isUnlimited = currentPlan.maxVehicleListings === "unlimited";
  const usagePercent = isUnlimited
    ? 0
    : Math.min(100, (totalVehicles / currentPlan.maxVehicleListings) * 100);
  const isNearLimit = !isUnlimited && usagePercent >= 80;

  return (
    <div className="flex flex-col gap-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-white">{inStock}</p>
          <p className="mt-0.5 text-xs text-[#64748B]">In Stock</p>
        </div>

        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Clock size={20} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-white">{reserved}</p>
          <p className="mt-0.5 text-xs text-[#64748B]">Reserved</p>
        </div>

        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 col-span-2 lg:col-span-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FC5E01]/10 text-[#FC5E01]">
            <DollarSign size={20} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-white">
            ${(totalValue / 1000).toFixed(0)}K
          </p>
          <p className="mt-0.5 text-xs text-[#64748B]">Total Inventory Value</p>
        </div>
      </div>

      {/* Plan Usage Bar */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CarFront size={16} className="text-[#FC5E01]" />
            <p className="text-sm font-bold text-white">Vehicle Listings Usage</p>
          </div>
          <span className="text-xs font-semibold text-[#94A3B8]">
            {totalVehicles} / {isUnlimited ? "Unlimited" : currentPlan.maxVehicleListings}
          </span>
        </div>

        {!isUnlimited && (
          <>
            <div className="h-2 rounded-full bg-[#0A0F1E] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isNearLimit ? "bg-rose-500" : "bg-[#FC5E01]"
                }`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            {isNearLimit && (
              <p className="mt-2 text-xs text-rose-400 font-medium">
                You&apos;re approaching your listing limit.{" "}
                <a href="/settings?tab=billing" className="underline hover:text-rose-300">
                  Upgrade your plan
                </a>{" "}
                to add more vehicles.
              </p>
            )}
          </>
        )}
        {isUnlimited && (
          <p className="text-xs text-emerald-400 font-medium">
            ✓ Unlimited listings included in your {currentPlan.tier} plan
          </p>
        )}
      </div>
    </div>
  );
}