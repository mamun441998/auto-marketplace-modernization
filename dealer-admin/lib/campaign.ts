import { apiGet, apiPost } from "@/lib/apiClient";

export interface Campaign {
  id: number;
  name: string;
  subject: string;
  body: string;
  audience: string;
  channel: string;
  status: string;
  recipients_count: number;
  opens_count: number;
  clicks_count: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string | null;
}

export interface CampaignInput {
  name: string;
  subject: string;
  body: string;
  audience: string;
  scheduled_at?: string | null;
}

export interface ApiResult<T = unknown> {
  success: boolean;
  message?: string;
  code?: string;
  campaign?: T;
}

/** GET /api/dealer/campaigns — list + reachable audience count. */
export async function fetchCampaigns() {
  return apiGet<{
    success: boolean;
    campaigns: Campaign[];
    audience: { total: number; phone: number };
  }>(`/dealer/campaigns`);
}

/** POST /api/dealer/campaigns — create + send (or schedule). */
export async function sendCampaign(input: CampaignInput) {
  return apiPost<ApiResult<Campaign>>(`/dealer/campaigns`, input);
}