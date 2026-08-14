import { adminGet, adminPatch } from "@/lib/apiClients";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchSettings(): Promise<Record<string, any>> {
  const res = await adminGet<{ success: boolean; settings?: Record<string, unknown> }>(`/admin/settings`);
  return (res?.settings as Record<string, unknown>) ?? {};
}

export async function saveSettings(partial: Record<string, unknown>): Promise<{ success: boolean; message?: string }> {
  const res = await adminPatch<{ success: boolean; message?: string }>(`/admin/settings`, { settings: partial });
  return { success: res?.success ?? false, message: res?.message };
}