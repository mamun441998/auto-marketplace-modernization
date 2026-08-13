import { apiGet } from "@/lib/apiClient";

export interface PlanConfig {
  name: string;
  price: number;
  currency: string;
  interval: string;
  vehicle_listings: number | null;
  team_members: number | null;
  features: Record<string, boolean>;
  support: string;
}

export interface SubscriptionStatus {
  plan: string | null;
  active_plan: string;
  status: string;
  on_trial: boolean;
  has_access: boolean;
  trial_expired: boolean;
  trial_ends_at: string | null;
  trial_days_left: number;
  subscription_ends_at: string | null;
  plan_config: PlanConfig;
  usage: {
    vehicle_listings: number;
    vehicle_limit: number | null;
    vehicle_percent: number;
  };
}

/** GET /api/subscription — logged-in dealer's subscription/trial state. */
export async function fetchSubscription() {
  return apiGet<{ success: boolean; subscription: SubscriptionStatus }>(`/subscription`);
}

/** GET /api/plans — all plans (public). */
export async function fetchPlans() {
  return apiGet<{
    success: boolean;
    trial_days: number;
    plans: Record<string, PlanConfig>;
  }>(`/plans`);
}