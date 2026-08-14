import { adminGet } from "@/lib/apiClients";

export interface AnalyticsKpis { dealers: number; vehicles: number; leads: number; active_subs: number; }
export interface GrowthPoint { month: string; dealers: number; cumulative: number; }
export interface GeoPoint { region: string; dealers: number; }
export interface PlanSlice { name: string; value: number; color: string; }
export interface TopDealer { id: number; name: string; city: string | null; state: string | null; vehicles: number; leads: number; }

export interface AdminAnalytics {
  kpis: AnalyticsKpis;
  growth: GrowthPoint[];
  geographic: GeoPoint[];
  plans: PlanSlice[];
  top_dealers: TopDealer[];
}

const EMPTY: AdminAnalytics = {
  kpis: { dealers: 0, vehicles: 0, leads: 0, active_subs: 0 },
  growth: [], geographic: [], plans: [], top_dealers: [],
};

export async function fetchAdminAnalytics(): Promise<{ success: boolean; data: AdminAnalytics }> {
  const res = await adminGet<{ success: boolean } & Partial<AdminAnalytics>>(`/admin/analytics`);
  if (!res?.success) return { success: false, data: EMPTY };
  return {
    success: true,
    data: {
      kpis: { ...EMPTY.kpis, ...(res.kpis ?? {}) },
      growth: res.growth ?? [],
      geographic: res.geographic ?? [],
      plans: res.plans ?? [],
      top_dealers: res.top_dealers ?? [],
    },
  };
}