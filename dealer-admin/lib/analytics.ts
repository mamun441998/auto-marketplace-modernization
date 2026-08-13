import { apiGet } from "@/lib/apiClient";

export interface AnalyticsTotals {
  vehicles: number;
  active: number;
  sold: number;
  leads: number;
  contacts: number;
  emails_sent: number;
  total_opens: number;
  total_clicks: number;
  open_rate: number;
  click_rate: number;
  conversion: number;
  inventory_value: number;
  avg_price: number;
  currency: string;
}

export interface LeadPoint {
  date: string;
  count: number;
}

export interface NamedCount {
  make?: string;
  source?: string;
  count: number;
}

export interface RecentCampaign {
  id: number;
  name: string;
  recipients: number;
  opens: number;
  clicks: number;
  open_rate: number;
  sent_at: string | null;
}

export interface AnalyticsData {
  totals: AnalyticsTotals;
  inventory_by_status: Record<string, number>;
  leads_by_status: Record<string, number>;
  leads_over_time: LeadPoint[];
  leads_by_source: NamedCount[];
  inventory_by_make: NamedCount[];
  recent_campaigns: RecentCampaign[];
}

const EMPTY: AnalyticsData = {
  totals: {
    vehicles: 0, active: 0, sold: 0, leads: 0, contacts: 0,
    emails_sent: 0, total_opens: 0, total_clicks: 0,
    open_rate: 0, click_rate: 0, conversion: 0,
    inventory_value: 0, avg_price: 0, currency: "USD",
  },
  inventory_by_status: {},
  leads_by_status: {},
  leads_over_time: [],
  leads_by_source: [],
  inventory_by_make: [],
  recent_campaigns: [],
};

/** GET /api/dealer/analytics — real dashboard insights. */
export async function fetchAnalytics(): Promise<{ success: boolean; data: AnalyticsData }> {
  const res = await apiGet<{ success: boolean } & Partial<AnalyticsData>>(`/dealer/analytics`);
  if (!res?.success) return { success: false, data: EMPTY };

  return {
    success: true,
    data: {
      totals: { ...EMPTY.totals, ...(res.totals ?? {}) },
      inventory_by_status: res.inventory_by_status ?? {},
      leads_by_status: res.leads_by_status ?? {},
      leads_over_time: res.leads_over_time ?? [],
      leads_by_source: res.leads_by_source ?? [],
      inventory_by_make: res.inventory_by_make ?? [],
      recent_campaigns: res.recent_campaigns ?? [],
    },
  };
}