import { apiGet, apiPut, apiPost } from "@/lib/apiClient";
import type { Campaign, ApiResult } from "@/lib/campaign";

export interface WhatsappSettings {
  provider: string;
  phone_number_id: string | null;
  from_number: string | null;
  has_token: boolean;
  is_active: boolean;
}

export interface WhatsappSettingsInput {
  provider: string;
  api_token?: string | null;
  phone_number_id?: string | null;
  from_number?: string | null;
  is_active: boolean;
}

/** GET /api/dealer/whatsapp-settings */
export async function fetchWhatsappSettings() {
  return apiGet<{ success: boolean; settings: WhatsappSettings | null }>(`/dealer/whatsapp-settings`);
}

/** PUT /api/dealer/whatsapp-settings */
export async function saveWhatsappSettings(input: WhatsappSettingsInput) {
  return apiPut<{ success: boolean; message?: string }>(`/dealer/whatsapp-settings`, input);
}

/** POST /api/dealer/whatsapp-settings/test */
export async function testWhatsapp(to: string) {
  return apiPost<{ success: boolean; message?: string }>(`/dealer/whatsapp-settings/test`, { to });
}

/** POST /api/dealer/campaigns/whatsapp */
export async function sendWhatsappBroadcast(input: { name: string; body: string; audience: string; scheduled_at?: string | null }) {
  return apiPost<ApiResult<Campaign>>(`/dealer/campaigns/whatsapp`, input);
}