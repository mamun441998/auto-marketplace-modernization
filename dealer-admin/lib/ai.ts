// dealer-admin/lib/ai.ts
//
// Real AI service client. These call the Laravel backend, which routes the
// request to the Claude API server-side (the model key never touches the
// browser). Until the backend AI endpoints + key are configured, the helpers
// return a clear { success: false } state so the UI shows an honest message
// instead of fake output.
//
// Backend contract (to implement / configure):
//   POST /api/dealer/ai/description
//     body { title, condition, tone, include_features }
//     200  { success: true, description: "..." }
//   POST /api/dealer/ai/pricing
//     body { model, mileage, condition }
//     200  { success: true, report: { market_demand, liquidity_score,
//            days_to_turn, pricing: { quick_turn, optimal, max_gross },
//            competitor_count } }

import { apiPost } from "./apiClient";

export interface AiDescriptionInput {
  title: string;
  condition: string;
  tone: string;
  include_features: boolean;
}

export interface AiDescriptionResult {
  success: boolean;
  description?: string;
  message?: string;
}

export async function generateVehicleDescription(
  input: AiDescriptionInput
): Promise<AiDescriptionResult> {
  try {
    const res = await apiPost("/dealer/ai/description", input);
    const description: string | null =
      res?.description ?? res?.data?.description ?? null;

    if (res?.success && description) return { success: true, description };

    return {
      success: false,
      message:
        res?.message ||
        "AI copywriter is not configured yet. Add your AI key and the /dealer/ai/description endpoint to enable it.",
    };
  } catch {
    return {
      success: false,
      message: "Could not reach the AI service. Check your connection and try again.",
    };
  }
}

export interface AiPricingInput {
  model: string;
  mileage: number;
  condition: string;
}

export interface AiPricingReport {
  market_demand: string;
  liquidity_score: number;
  days_to_turn: string;
  pricing: { quick_turn: number; optimal: number; max_gross: number };
  competitor_count: number;
}

export interface AiPricingResult {
  success: boolean;
  report?: AiPricingReport;
  message?: string;
}

export async function suggestVehiclePricing(
  input: AiPricingInput
): Promise<AiPricingResult> {
  try {
    const res = await apiPost("/dealer/ai/pricing", input);
    const report: AiPricingReport | null =
      res?.report ?? res?.data?.report ?? null;

    if (res?.success && report) return { success: true, report };

    return {
      success: false,
      message:
        res?.message ||
        "AI pricing engine is not configured yet. Add your AI key and the /dealer/ai/pricing endpoint to enable it.",
    };
  } catch {
    return {
      success: false,
      message: "Could not reach the AI service. Check your connection and try again.",
    };
  }
}
