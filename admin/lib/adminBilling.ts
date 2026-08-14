import { adminGet } from "@/lib/apiClients";

export interface BillingStatsData {
  mrr: number;
  active: number;
  trialing: number;
  avg: number;
  collected: number;
  currency: string;
}
export interface PlanData { key: string; name: string; monthly: number; yearly: number; currency: string; subscribers: number; features: string[]; }
export interface SubscriptionRow { id: number; dealer_name: string; plan: string; cycle: string; amount: number; renewal: string | null; status: string; }
export interface PaymentRow { id: number; dealer_name: string; plan: string; amount: number; currency: string; date: string | null; }
export interface AdminBilling {
  stats: BillingStatsData;
  plans: PlanData[];
  subscriptions: SubscriptionRow[];
  payments: PaymentRow[];
}

const EMPTY: AdminBilling = {
  stats: { mrr: 0, active: 0, trialing: 0, avg: 0, collected: 0, currency: "USD" },
  plans: [],
  subscriptions: [],
  payments: [],
};

export async function fetchBilling(): Promise<{ success: boolean; data: AdminBilling }> {
  const res = await adminGet<{ success: boolean } & Partial<AdminBilling>>(`/admin/billing`);
  if (!res?.success) return { success: false, data: EMPTY };
  return {
    success: true,
    data: {
      stats: { ...EMPTY.stats, ...(res.stats ?? {}) },
      plans: res.plans ?? [],
      subscriptions: res.subscriptions ?? [],
      payments: res.payments ?? [],
    },
  };
}