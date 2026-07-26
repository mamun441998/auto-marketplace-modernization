import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/apiClient";

/* =========================================================================
 |  Types
 |=========================================================================*/

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "lost";
export type LeadSource = "website" | "whatsapp" | "phone" | "walk_in" | "other";

export interface LeadVehicle {
  id: number;
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
}

export interface Lead {
  id: number;
  uuid: string;

  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  initials: string;

  status: LeadStatus;
  source: LeadSource;

  dealer_id: number | null;
  vehicle_id: number | null;
  vehicle?: LeadVehicle | null;

  created_at: string | null;
  updated_at: string | null;
}

export interface LeadPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface LeadFilters {
  search?: string;
  status?: LeadStatus | string;
  source?: LeadSource | string;
  per_page?: number;
  page?: number;
}

/** Payload a public visitor submits. */
export interface LeadPayload {
  dealer_id: number;
  vehicle_id?: number | null;
  name: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source?: LeadSource;
}

export interface LeadStats {
  total: number;
  by_status: Record<string, number>;
  by_source: Record<string, number>;
}

/* =========================================================================
 |  Helpers
 |=========================================================================*/

function buildQuery(filters: LeadFilters = {}): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/* =========================================================================
 |  Public — submit a lead / inquiry
 |=========================================================================*/

/** POST /api/leads */
export async function submitLead(payload: LeadPayload) {
  return apiPost<{ success: boolean; message: string; lead: Lead }>(
    `/leads`,
    payload
  );
}

/* =========================================================================
 |  Dealer (authenticated)
 |=========================================================================*/

/** GET /api/dealer/leads */
export async function fetchMyLeads(filters: LeadFilters = {}) {
  return apiGet<{
    success: boolean;
    leads: Lead[];
    meta: LeadPaginationMeta;
  }>(`/dealer/leads${buildQuery(filters)}`);
}

/** GET /api/dealer/leads/stats */
export async function fetchLeadStats() {
  return apiGet<{ success: boolean; stats: LeadStats }>(`/dealer/leads/stats`);
}

/** GET /api/dealer/leads/{id} */
export async function fetchLead(id: number | string) {
  return apiGet<{ success: boolean; lead: Lead }>(`/dealer/leads/${id}`);
}

/** PATCH /api/dealer/leads/{id}/status */
export async function updateLeadStatus(id: number | string, status: LeadStatus) {
  return apiPatch<{ success: boolean; message: string; lead: Lead }>(
    `/dealer/leads/${id}/status`,
    { status }
  );
}

/** DELETE /api/dealer/leads/{id} */
export async function deleteLead(id: number | string) {
  return apiDelete<{ success: boolean; message: string }>(
    `/dealer/leads/${id}`
  );
}