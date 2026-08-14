// dealer-admin/lib/planConfig.ts

import { fetchSubscription } from "./subscription";

export type PlanTier = "Starter" | "Professional" | "Enterprise";

export interface PlanLimits {
  tier: PlanTier;
  maxVehicleListings: number | "unlimited";
  maxTeamMembers: number | "unlimited";
  features: {
    aiPricing: boolean;
    aiDescriptionGenerator: boolean;
    autoAuctionAccess: boolean;
    advancedCRM: boolean;
    websiteBuilder: boolean;
    marketingCampaigns: boolean;
    customERPIntegration: boolean;
    prioritySupport: boolean;
    advancedAnalytics: boolean;
    customReportBuilder: boolean;
  };
}

export const planConfigs: Record<PlanTier, PlanLimits> = {
  Starter: {
    tier: "Starter",
    maxVehicleListings: 50,
    maxTeamMembers: 1,
    features: {
      aiPricing: false,
      aiDescriptionGenerator: false,
      autoAuctionAccess: false,
      advancedCRM: false,
      websiteBuilder: true,
      marketingCampaigns: false,
      customERPIntegration: false,
      prioritySupport: false,
      advancedAnalytics: false,
      customReportBuilder: false,
    },
  },
  Professional: {
    tier: "Professional",
    maxVehicleListings: 500,
    maxTeamMembers: 10,
    features: {
      aiPricing: true,
      aiDescriptionGenerator: true,
      autoAuctionAccess: true,
      advancedCRM: true,
      websiteBuilder: true,
      marketingCampaigns: true,
      customERPIntegration: false,
      prioritySupport: true,
      advancedAnalytics: true,
      customReportBuilder: false,
    },
  },
  Enterprise: {
    tier: "Enterprise",
    maxVehicleListings: "unlimited",
    maxTeamMembers: "unlimited",
    features: {
      aiPricing: true,
      aiDescriptionGenerator: true,
      autoAuctionAccess: true,
      advancedCRM: true,
      websiteBuilder: true,
      marketingCampaigns: true,
      customERPIntegration: true,
      prioritySupport: true,
      advancedAnalytics: true,
      customReportBuilder: true,
    },
  },
};

/* ------------------------------------------------------------------
 | Real plan resolution
 |
 | The dealer's plan is fetched from GET /api/subscription (which returns
 | plan_config with the real name + limits) once on app load and cached in
 | localStorage. The synchronous getters below read that cache, so every page
 | that already calls getCurrentDealerPlan()/hasFeatureAccess() keeps working —
 | but the answer now reflects the dealer's actual subscription instead of a
 | hardcoded tier.
 |------------------------------------------------------------------ */

const PLAN_STORAGE_KEY = "motohave_plan_limits";

/** Normalize any backend value ("pro", "PROFESSIONAL", "Enterprise") to a tier. */
function normalizeTier(raw?: string | null): PlanTier | null {
  if (!raw) return null;
  const v = String(raw).trim().toLowerCase();
  if (v.startsWith("start")) return "Starter";
  if (v.startsWith("pro")) return "Professional";
  if (v.startsWith("enter")) return "Enterprise";
  return null;
}

/** Pre-load fallback (before the subscription resolves). Override via env. */
function defaultPlan(): PlanLimits {
  const tier = normalizeTier(process.env.NEXT_PUBLIC_DEFAULT_PLAN) ?? "Professional";
  return planConfigs[tier];
}

/** Current plan limits — from the cached real subscription, else the default. */
export function getCurrentDealerPlan(): PlanLimits {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as PlanLimits;
      } catch {
        /* corrupt cache — fall through to default */
      }
    }
  }
  return defaultPlan();
}

function cachePlan(limits: PlanLimits): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(limits));
  }
}

/**
 * Resolve the dealer's real plan from GET /api/subscription and cache it.
 * Call once on app load. Picks the feature matrix by plan name and takes the
 * backend's real numeric limits. Tolerant of a missing endpoint (keeps cache).
 */
export async function refreshDealerPlan(): Promise<PlanLimits> {
  try {
    const res = await fetchSubscription();
    const sub = res?.subscription;
    const pc = sub?.plan_config;
    if (pc) {
      const tier =
        normalizeTier(pc.name) ?? normalizeTier(sub?.active_plan) ?? "Starter";
      const base = planConfigs[tier];
      const limits: PlanLimits = {
        ...base,
        tier,
        maxVehicleListings:
          pc.vehicle_listings == null ? "unlimited" : pc.vehicle_listings,
        maxTeamMembers: pc.team_members == null ? "unlimited" : pc.team_members,
      };
      cachePlan(limits);
      return limits;
    }
  } catch {
    /* endpoint not ready — keep whatever is cached */
  }
  return getCurrentDealerPlan();
}

/** Feature-gate helper used across the dashboard. */
export function hasFeatureAccess(feature: keyof PlanLimits["features"]): boolean {
  return getCurrentDealerPlan().features[feature];
}

/** Vehicle-usage bar helper (0 when the plan is unlimited). */
export function getVehicleUsagePercentage(currentCount: number): number {
  const currentPlan = getCurrentDealerPlan();
  if (currentPlan.maxVehicleListings === "unlimited") return 0;
  return Math.min(100, (currentCount / currentPlan.maxVehicleListings) * 100);
}