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
  status?: string;
}

/* =========================================================================
 |  Helpers
 |=========================================================================*/

/** Turn a filters object into a `?a=1&b=2` query string (skips empty values). */
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

/** GET /api/vehicles — public marketplace listing. */
export async function fetchVehicles(filters: VehicleFilters = {}) {
  return apiGet<{
    success: boolean;
    vehicles: Vehicle[];
    meta: VehiclePaginationMeta;
  }>(`/vehicles${buildQuery(filters)}`);
}

/** GET /api/vehicles/{idOrSlug} — public single vehicle. */
export async function fetchVehicle(idOrSlug: string | number) {
  return apiGet<{ success: boolean; vehicle: Vehicle }>(
    `/vehicles/${idOrSlug}`
  );
}

/* =========================================================================
 |  Dealer inventory (authenticated)
 |=========================================================================*/

/** GET /api/dealer/vehicles — logged-in dealer's own inventory. */
export async function fetchMyVehicles(filters: VehicleFilters = {}) {
  return apiGet<{
    success: boolean;
    vehicles: Vehicle[];
    meta: VehiclePaginationMeta;
  }>(`/dealer/vehicles${buildQuery(filters)}`);
}

/** GET /api/dealer/vehicles/{id} — load one owned vehicle for editing. */
export async function fetchMyVehicle(id: number | string) {
  return apiGet<{ success: boolean; vehicle: Vehicle }>(
    `/dealer/vehicles/${id}`
  );
}

/**
 * POST /api/dealer/vehicles — create a new vehicle.
 * If `files` are provided, everything is sent as ONE multipart request
 * (the backend store() method saves the images together with the vehicle).
 */
export async function createVehicle(
  payload: VehiclePayload,
  files: File[] = [],
  featuredIndex?: number
) {
  if (files.length) {
    const fd = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
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

/** PUT /api/dealer/vehicles/{id} — update an owned vehicle. */
export async function updateVehicle(
  id: number | string,
  payload: Partial<VehiclePayload>
) {
  return apiPut<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicles/${id}`,
    payload
  );
}

/** DELETE /api/dealer/vehicles/{id} — soft-delete an owned vehicle. */
export async function deleteVehicle(id: number | string) {
  return apiDelete<{ success: boolean; message: string }>(
    `/dealer/vehicles/${id}`
  );
}

/* =========================================================================
 |  Images
 |=========================================================================*/

/**
 * POST /api/dealer/vehicles/{id}/images — upload one or more images.
 * `featuredIndex` = which uploaded file (0-based) should be the featured one.
 */
export async function uploadVehicleImages(
  vehicleId: number | string,
  files: File[],
  featuredIndex?: number
) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images[]", file);
  });

  if (featuredIndex !== undefined) {
    formData.append("featured_image", String(featuredIndex));
  }

  return apiUpload<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicles/${vehicleId}/images`,
    formData
  );
}

/** DELETE /api/dealer/vehicle-images/{imageId} — delete one image. */
export async function deleteVehicleImage(imageId: number | string) {
  return apiDelete<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicle-images/${imageId}`
  );
}

/**
 * POST /api/dealer/vehicles/{vehicleId}/featured-image/{imageId}
 * Mark one image as the featured image.
 */
export async function setFeaturedVehicleImage(
  vehicleId: number | string,
  imageId: number | string
) {
  return apiPost<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/dealer/vehicles/${vehicleId}/featured-image/${imageId}`,
    {}
  );
}