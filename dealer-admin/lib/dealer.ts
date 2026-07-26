import { apiGet, apiPost, apiPut, apiUpload } from "./apiClient";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface DealerSocial {
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  youtube: string | null;
}

export interface Dealer {
  id: number;
  uuid: string;
  user_id: number;

  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;

  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;

  latitude: number | null;
  longitude: number | null;

  license_number: string | null;
  tax_number: string | null;

  social: DealerSocial;

  logo: string | null;
  logo_url: string | null;
  cover_image: string | null;
  cover_image_url: string | null;
  theme: string;

  meta_title: string | null;
  meta_description: string | null;

  status: string;
  is_active: boolean;
  is_verified: boolean;
  is_featured: boolean;

  vehicles_count?: number;
  created_at?: string;
  updated_at?: string;
}

/* Onboarding / create + update form-এ যা যা পাঠাব */
export interface DealerFormData {
  name: string;
  phone?: string;
  website?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  meta_title?: string;
  meta_description?: string;
}

/* Backend-এর standard response shape */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

/* ------------------------------------------------------------------ */
/* API calls                                                           */
/* ------------------------------------------------------------------ */

/**
 * Logged-in user-এর dealer আছে কিনা (না থাকলে null)।
 * GET /my-dealer  →  { success, dealer: {...} | null }
 */
export async function fetchMyDealer(): Promise<Dealer | null> {
  try {
    const res = await apiGet("/my-dealer");
    return (res?.dealer as Dealer) ?? null;
  } catch (error) {
    console.error("fetchMyDealer failed:", error);
    return null;
  }
}

/**
 * নতুন dealer তৈরি (onboarding)।
 * POST /dealers  →  { success, message, data: Dealer }
 */
export async function createDealer(
  data: DealerFormData
): Promise<ApiResponse<Dealer>> {
  return apiPost("/dealers", data);
}

/**
 * Dealer update (edit profile)।
 * PUT /dealers/{id}
 */
export async function updateDealer(
  id: number,
  data: Partial<DealerFormData>
): Promise<ApiResponse<Dealer>> {
  return apiPut(`/dealers/${id}`, data);
}

/**
 * Logo upload (multipart)।
 * POST /dealers/{id}/logo
 */
export async function uploadDealerLogo(
  id: number,
  file: File
): Promise<ApiResponse<Dealer>> {
  const formData = new FormData();
  formData.append("logo", file);
  return apiUpload(`/dealers/${id}/logo`, formData);
}

/**
 * Cover image upload (multipart)।
 * POST /dealers/{id}/cover
 */
export async function uploadDealerCover(
  id: number,
  file: File
): Promise<ApiResponse<Dealer>> {
  const formData = new FormData();
  formData.append("cover_image", file);
  return apiUpload(`/dealers/${id}/cover`, formData);
}