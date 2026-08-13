import { apiGet, apiPut } from "@/lib/apiClient";

export interface DealerPaymentForm {
  stripeKey: string;
  stripeEnabled: boolean;
  paypalClientId: string;
  paypalEnabled: boolean;
  deposit: string;
}

/** GET /api/dealer/payment-settings — the current dealer's gateway config. */
export async function fetchPaymentSettings(): Promise<{
  success: boolean;
  payment?: DealerPaymentForm;
  message?: string;
}> {
  return apiGet(`/dealer/payment-settings`);
}

/** PUT /api/dealer/payment-settings — save the gateway config. */
export async function savePaymentSettings(
  form: DealerPaymentForm
): Promise<{ success: boolean; message?: string }> {
  return apiPut(`/dealer/payment-settings`, form);
}