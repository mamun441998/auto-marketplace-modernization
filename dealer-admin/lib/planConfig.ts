// dealer-admin/lib/planConfig.ts

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

// 💡 Ei mock function ta backend connect korar somoy replace hobe
// jemon: export async function getCurrentDealerPlan() { return await fetch("/api/dealer/plan").then(r => r.json()) }
export function getCurrentDealerPlan(): PlanLimits {
  // Ekhon test korar jonno "Professional" dhore rakha holo
  // Onno plan test korte "Starter" ba "Enterprise" e change koro
  return planConfigs.Professional;
}

// Helper: kono specific feature access ache kina check korar jonno
export function hasFeatureAccess(feature: keyof PlanLimits["features"]): boolean {
  const currentPlan = getCurrentDealerPlan();
  return currentPlan.features[feature];
}

// Helper: vehicle listing limit exceed korche kina check korar jonno
export function getVehicleUsagePercentage(currentCount: number): number {
  const currentPlan = getCurrentDealerPlan();
  if (currentPlan.maxVehicleListings === "unlimited") return 0;
  return Math.min(100, (currentCount / currentPlan.maxVehicleListings) * 100);
}