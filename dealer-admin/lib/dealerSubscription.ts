import { apiGet, apiPost } from "@/lib/apiClient";

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

export interface SubscriptionState {
  plan: string | null;
  active_plan: string | null;
  status: string | null;
  on_trial: boolean;
  has_access: boolean;
  trial_expired: boolean;
  trial_ends_at: string | null;
  trial_days_left: number | null;
  subscription_ends_at: string | null;
  plan_config: PlanConfig | null;
}

/** GET /api/plans — all plans for the billing page. */
export async function fetchPlans(): Promise<{
  success: boolean;
  trial_days: number;
  plans: Record<string, PlanConfig>;
}> {
  return apiGet(`/plans`);
}

/** GET /api/subscription — the current dealer's subscription state. */
export async function fetchSubscription(): Promise<{
  success: boolean;
  subscription: SubscriptionState;
}> {
  return apiGet(`/subscription`);
}

/** POST /api/dealer/subscription/checkout — start a Stripe checkout for a plan. */
export async function startSubscriptionCheckout(input: {
  plan: string;
  success_url: string;
  cancel_url: string;
}): Promise<{ success: boolean; url?: string; message?: string }> {
  return apiPost(`/dealer/subscription/checkout`, input);
}

/** GET /api/dealer/subscription/confirm — verify after returning from Stripe. */
export async function confirmSubscription(
  sessionId: string
): Promise<{ success: boolean; status?: string; plan?: string; message?: string }> {
  return apiGet(`/dealer/subscription/confirm?session_id=${encodeURIComponent(sessionId)}`);
}