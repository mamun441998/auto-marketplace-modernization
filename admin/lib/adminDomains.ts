import { adminGet, adminDelete } from "@/lib/apiClients";

export interface DomainRow {
  id: number;
  domain: string;
  dealer_name: string;
  slug: string;
  published: boolean;
  created_at: string | null;
}
export interface DomainStats { total: number; live: number; pending: number; }

export async function fetchDomains(): Promise<{ success: boolean; domains: DomainRow[]; stats: DomainStats }> {
  const res = await adminGet<{ success: boolean; domains?: DomainRow[]; stats?: DomainStats }>(`/admin/domains`);
  return {
    success: res?.success ?? false,
    domains: res?.domains ?? [],
    stats: res?.stats ?? { total: 0, live: 0, pending: 0 },
  };
}

export async function removeDomain(id: number): Promise<{ success: boolean; message?: string }> {
  const res = await adminDelete<{ success: boolean; message?: string }>(`/admin/domains/${id}`);
  return { success: res?.success ?? false, message: res?.message };
}