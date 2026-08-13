import { apiGet, apiPost, apiPut, apiDelete, apiUpload } from "@/lib/apiClient";

/* =========================================================================
 |  Types
 |=========================================================================*/

export interface VehicleImage {
  id: number;
  vehicle_id: number;
  image_path: string;
  image_url: string;
  alt_text: string | null;
  is_featured: boolean;
  sort_order: number;
  image_source: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface VehicleDetails {
  features?: string[];
  engine?: string | null;
  drivetrain?: string | null;
  doors?: number | null;
  seats?: number | null;
  interior_color?: string | null;
  warranty?: string | null;
  highlights?: string | null;
}

export interface Vehicle {
  id: number;
  uuid: string;
  slug: string;

  title: string;
  description: string | null;
  vin: string | null;

  make: string;
  model: string;
  year: number;
  condition: string | null;
  body_type: string | null;
  fuel_type: string | null;
  transmission: string | null;
  color: string | null;
  details?: VehicleDetails | null;
  mileage: number | null;

  price: string | number | null;
  currency: string;
  formatted_price: string;

  status: "draft" | "active" | "pending" | "sold" | "archived";
  published_at: string | null;

  dealer?: any;
  inventory_source?: any;

  images?: VehicleImage[];
  featured_image?: VehicleImage | null;
  primary_image_url?: string | null;
  image_count?: number;

  created_at: string | null;
  updated_at: string | null;
}

export interface VehiclePaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

/** Filters accepted by list endpoints. */
export interface VehicleFilters {
  search?: string;
  make?: string;
  model?: string;
  fuel_type?: string;
  transmission?: string;
  condition?: string;
  body_type?: string;
  status?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  sort_by?: "created_at" | "price" | "year" | "mileage" | "title";
  sort_dir?: "asc" | "desc";
  per_page?: number;
  page?: number;
}

/** Payload for create / update. */
export interface VehiclePayload {
  title: string;
  description?: string | null;
  vin?: string | null;
  make: string;
  model: string;
  year: number;
  price: number;
  currency?: string;
  mileage?: number | null;
  fuel_type?: string | null;
  transmission?: string | null;
  condition: string;
  body_type?: string | null;
  color?: string | null;
  details?: VehicleDetails | null;
  status?: string;
}

/* =========================================================================
 |  Helpers
 |=========================================================================*/

function buildQuery(filters: VehicleFilters = {}): string {
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
 |  Public marketplace
 |=========================================================================*/

export async function fetchVehicles(filters: VehicleFilters = {}) {
  return apiGet<{
    success: boolean;
    vehicles: Vehicle[];
    meta: VehiclePaginationMeta;
  }>(`/vehicles${buildQuery(filters)}`);
}

export async function fetchVehicle(idOrSlug: string | number) {
  return apiGet<{ success: boolean; vehicle: Vehicle }>(`/vehicles/${idOrSlug}`);
}

/* =========================================================================
 |  Dealer inventory (authenticated)
 |=========================================================================*/

export async function fetchMyVehicles(filters: VehicleFilters = {}) {
  return apiGet<{
    success: boolean;
    vehicles: Vehicle[];
    meta: VehiclePaginationMeta;
  }>(`/dealer/vehicles${buildQuery(filters)}`);
}

export async function fetchMyVehicle(id: number | string) {
  return apiGet<{ success: boolean; vehicle: Vehicle }>(`/dealer/vehicles/${id}`);
}

/**
 * POST /api/dealer/vehicles — create a new vehicle.
 * With files -> one multipart request; object values (details) go as JSON.
 */
export async function createVehicle(
  payload: VehiclePayload,
  files: File[] = [],
  featuredIndex?: number
) {
  if (files.length) {
    const fd = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (typeof value === "object") {
        fd.append(key, JSON.stringify(value)); // details -> JSON string
      } else {
        fd.append(key, String(value));
      }
    });

    files.forEach((file) => fd.append("images[]", file));

    if (featuredIndex !== undefined) {
      fd.append("featured_image", String(featuredIndex));
    }

    return apiUpload<{ success: boolean; message: string; vehicle: Vehicle }>(
      `/dealer/vehicles`,
      fd
    );
  }

  return apiPost<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicles`,
    payload
  );
}

export async function updateVehicle(
  id: number | string,
  payload: Partial<VehiclePayload>
) {
  return apiPut<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicles/${id}`,
    payload
  );
}

export async function deleteVehicle(id: number | string) {
  return apiDelete<{ success: boolean; message: string }>(`/dealer/vehicles/${id}`);
}

/* =========================================================================
 |  Images
 |=========================================================================*/

export async function uploadVehicleImages(
  vehicleId: number | string,
  files: File[],
  featuredIndex?: number
) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images[]", file));
  if (featuredIndex !== undefined) {
    formData.append("featured_image", String(featuredIndex));
  }
  return apiUpload<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicles/${vehicleId}/images`,
    formData
  );
}

export async function deleteVehicleImage(imageId: number | string) {
  return apiDelete<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicle-images/${imageId}`
  );
}

export async function setFeaturedVehicleImage(
  vehicleId: number | string,
  imageId: number | string
) {
  return apiPost<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicles/${vehicleId}/featured-image/${imageId}`,
    {}
  );
}