import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/apiClient";

export interface PromoCode {
  id: number;
  code: string;
  type: "percent" | "fixed";
  value: number;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  redeemable: boolean;
  description: string | null;
  created_at: string | null;
}

export interface PromoInput {
  code: string;
  type: "percent" | "fixed";
  value: number;
  max_uses: number | null;
  expires_at: string | null;
  is_active: boolean;
  description: string | null;
}

/** Fetch all promo codes for the dealer. */
export async function fetchPromoCodes(): Promise<{ success: boolean; codes: PromoCode[] }> {
  const res = await apiGet<{ success: boolean; codes?: PromoCode[] }>(`/dealer/promo-codes`);
  return { success: res?.success ?? false, codes: res?.codes ?? [] };
}

/** Create a new promo code. */
export async function createPromoCode(input: PromoInput): Promise<{
  success: boolean;
  message?: string;
  code?: PromoCode;
}> {
  const res = await apiPost<{ success: boolean; message?: string; code?: PromoCode }>(
    `/dealer/promo-codes`,
    input
  );
  return { success: res?.success ?? false, message: res?.message, code: res?.code };
}

/** Toggle active/inactive. */
export async function togglePromoCode(id: number): Promise<{ success: boolean; code?: PromoCode }> {
  const res = await apiPatch<{ success: boolean; code?: PromoCode }>(
    `/dealer/promo-codes/${id}/toggle`,
    {}
  );
  return { success: res?.success ?? false, code: res?.code };
}

/** Delete a promo code. */
export async function deletePromoCode(id: number): Promise<{ success: boolean; message?: string }> {
  const res = await apiDelete<{ success: boolean; message?: string }>(`/dealer/promo-codes/${id}`);
  return { success: res?.success ?? false, message: res?.message };
}