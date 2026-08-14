import { adminGet } from "@/lib/apiClients";

export interface AdminTotals {
  dealers: number;
  dealers_active: number;
  dealers_pending: number;
  users: number;
  staff: number;
  dealer_users: number;
  vehicles: number;
  leads: number;
  trialing: number;
  active_subs: number;
}

export interface SignupPoint {
  date: string;
  count: number;
}

export interface RecentDealer {
  id: number;
  name: string;
  owner: string | null;
  email: string | null;
  city: string | null;
  status: string;
  is_active: boolean;
  vehicles: number;
  created_at: string | null;
}

export interface AdminDashboard {
  totals: AdminTotals;
  signups_trend: SignupPoint[];
  recent_dealers: RecentDealer[];
}

const EMPTY: AdminDashboard = {
  totals: {
    dealers: 0, dealers_active: 0, dealers_pending: 0, users: 0, staff: 0,
    dealer_users: 0, vehicles: 0, leads: 0, trialing: 0, active_subs: 0,
  },
  signups_trend: [],
  recent_dealers: [],
};

export async function fetchAdminDashboard(): Promise<{ success: boolean; data: AdminDashboard }> {
  const res = await adminGet<{ success: boolean } & Partial<AdminDashboard>>(`/admin/dashboard`);
  if (!res?.success) return { success: false, data: EMPTY };
  return {
    success: true,
    data: {
      totals: { ...EMPTY.totals, ...(res.totals ?? {}) },
      signups_trend: res.signups_trend ?? [],
      recent_dealers: res.recent_dealers ?? [],
    },
  };
}