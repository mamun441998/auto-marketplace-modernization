import { apiGet, apiPut, apiPost } from "@/lib/apiClient";

export interface EmailSettings {
  provider: string;
  host: string;
  port: number;
  username: string | null;
  has_password: boolean;
  encryption: string;
  from_email: string | null;
  from_name: string | null;
  is_active: boolean;
}

export interface EmailSettingsInput {
  provider: string;
  host: string;
  port: number;
  username?: string | null;
  password?: string | null; // blank = keep existing
  encryption: string;
  from_email: string;
  from_name?: string | null;
  is_active: boolean;
}

export interface ApiResult {
  success: boolean;
  message?: string;
}

/** GET /api/dealer/email-settings */
export async function fetchEmailSettings() {
  return apiGet<{ success: boolean; settings: EmailSettings | null }>(`/dealer/email-settings`);
}

/** PUT /api/dealer/email-settings */
export async function saveEmailSettings(input: EmailSettingsInput) {
  return apiPut<ApiResult>(`/dealer/email-settings`, input);
}

/** POST /api/dealer/email-settings/test */
export async function testEmailSettings(to: string) {
  return apiPost<ApiResult>(`/dealer/email-settings/test`, { to });
}