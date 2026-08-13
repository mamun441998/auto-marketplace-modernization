import { apiGet, apiPost, apiPut } from "@/lib/apiClient";

export interface NotificationPrefs {
  leads: boolean;
  inventory: boolean;
  billing: boolean;
}

export interface DealerSettings {
  custom_domain: string | null;
  notifications: NotificationPrefs;
}

const DEFAULT_NOTIFS: NotificationPrefs = { leads: true, inventory: false, billing: true };

/** Load current settings from the dealer profile. */
export async function fetchDealerSettings(): Promise<DealerSettings> {
  const res = await apiGet<{
    success: boolean;
    dealer?: { custom_domain?: string | null; notification_prefs?: Partial<NotificationPrefs> | null };
  }>(`/my-dealer`);
  const d = res?.dealer;
  return {
    custom_domain: d?.custom_domain ?? null,
    notifications: { ...DEFAULT_NOTIFS, ...(d?.notification_prefs ?? {}) },
  };
}

/** Save custom domain and/or notification prefs. */
export async function saveDealerSettings(input: {
  custom_domain?: string | null;
  notifications?: NotificationPrefs;
}) {
  return apiPut<{
    success: boolean;
    message?: string;
    custom_domain?: string | null;
    notifications?: NotificationPrefs;
  }>(`/dealer/settings`, input);
}

/** Change account password. */
export async function changePassword(input: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}) {
  return apiPost<{ success: boolean; message?: string }>(`/change-password`, input);
}