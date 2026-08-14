import { adminGet, adminPost, adminPatch, adminDelete } from "@/lib/apiClients";

export interface AdminUserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string | null;
  avatar_url: string | null;
  created_at: string | null;
}
export interface UsersCounts { total: number; super_admin: number; admin: number; dealer: number; }
export interface UsersMeta { current_page: number; last_page: number; per_page: number; total: number; }

export const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin / Staff",
  dealer: "Dealer",
};

export async function fetchUsers(params: { search?: string; role?: string; page?: number }): Promise<{
  success: boolean; users: AdminUserRow[]; meta: UsersMeta; counts: UsersCounts;
}> {
  const q = new URLSearchParams();
  if (params.search) q.set("search", params.search);
  if (params.role && params.role !== "all") q.set("role", params.role);
  q.set("page", String(params.page ?? 1));
  q.set("per_page", "10");

  const res = await adminGet<{ success: boolean; users?: AdminUserRow[]; meta?: UsersMeta; counts?: UsersCounts }>(
    `/admin/users?${q.toString()}`
  );
  return {
    success: res?.success ?? false,
    users: res?.users ?? [],
    meta: res?.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 },
    counts: res?.counts ?? { total: 0, super_admin: 0, admin: 0, dealer: 0 },
  };
}

export async function createUser(input: { name: string; email: string; password: string; role: string }): Promise<{
  success: boolean; message?: string; user?: AdminUserRow;
}> {
  const res = await adminPost<{ success: boolean; message?: string; user?: AdminUserRow; errors?: Record<string, string[]> }>(
    `/admin/users`,
    input
  );
  return {
    success: res?.success ?? false,
    message: res?.message || res?.errors?.email?.[0] || res?.errors?.password?.[0],
    user: res?.user,
  };
}

export async function updateUserRole(id: number, role: string): Promise<{ success: boolean; message?: string }> {
  const res = await adminPatch<{ success: boolean; message?: string }>(`/admin/users/${id}/role`, { role });
  return { success: res?.success ?? false, message: res?.message };
}

export async function updateUserStatus(id: number, status: string): Promise<{ success: boolean; message?: string }> {
  const res = await adminPatch<{ success: boolean; message?: string }>(`/admin/users/${id}/status`, { status });
  return { success: res?.success ?? false, message: res?.message };
}

export async function deleteUser(id: number): Promise<{ success: boolean; message?: string }> {
  const res = await adminDelete<{ success: boolean; message?: string }>(`/admin/users/${id}`);
  return { success: res?.success ?? false, message: res?.message };
}