import { adminGet, adminPatch } from "@/lib/apiClients";

export interface AdminDealerRow {
  id: number;
  name: string;
  slug: string;
  city: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  is_active: boolean;
  is_verified: boolean;
  vehicles: number;
  logo_url: string | null;
  owner: { id: number; name: string; email: string; phone: string | null } | null;
  created_at: string | null;
}

export interface DealersMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export async function fetchAdminDealers(params: {
  search?: string;
  status?: string;
  page?: number;
}): Promise<{ success: boolean; dealers: AdminDealerRow[]; meta: DealersMeta }> {
  const q = new URLSearchParams();
  if (params.search) q.set("search", params.search);
  if (params.status && params.status !== "all") q.set("status", params.status);
  q.set("page", String(params.page ?? 1));
  q.set("per_page", "10");

  const res = await adminGet<{ success: boolean; dealers?: AdminDealerRow[]; meta?: DealersMeta }>(
    `/admin/dealers?${q.toString()}`
  );

  return {
    success: res?.success ?? false,
    dealers: res?.dealers ?? [],
    meta: res?.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 },
  };
}

export async function updateDealerStatus(
  id: number,
  status: string
): Promise<{ success: boolean; message?: string; dealer?: AdminDealerRow }> {
  const res = await adminPatch<{ success: boolean; message?: string; dealer?: AdminDealerRow }>(
    `/admin/dealers/${id}/status`,
    { status }
  );
  return { success: res?.success ?? false, message: res?.message, dealer: res?.dealer };
}