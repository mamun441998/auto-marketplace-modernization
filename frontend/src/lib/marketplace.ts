const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

/* ---- Backend vehicle shape ---- */
export interface ApiVehicleImage {
  id: number;
  image_url: string;
  is_featured: boolean;
}

export interface ApiVehicle {
  id: number;
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
  details?: {
    features?: string[];
    engine?: string | null;
    drivetrain?: string | null;
    doors?: number | null;
    seats?: number | null;
    interior_color?: string | null;
    warranty?: string | null;
    highlights?: string | null;
  } | null;
  mileage: number | null;
  price: string | number | null;
  currency: string;
  status: string;
  dealer_id: number | null;
  dealer?: { id: number; name: string; slug?: string; city?: string; phone?: string; email?: string } | null;
  images?: ApiVehicleImage[];
  featured_image?: ApiVehicleImage | null;
  primary_image_url?: string | null;
  created_at?: string | null;
}

async function parse<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return (text ? JSON.parse(text) : {}) as T;
  } catch {
    return { success: false, message: "Unexpected server response." } as T;
  }
}

/** GET /api/vehicles — public marketplace listing (all dealers). */
export async function fetchMarketplaceVehicles(query = ""): Promise<{
  success: boolean;
  vehicles: ApiVehicle[];
  meta?: any;
}> {
  const res = await fetch(`${API_URL}/vehicles${query}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return parse(res);
}

/** GET /api/vehicles/{idOrSlug} — public single vehicle. */
export async function fetchMarketplaceVehicle(idOrSlug: string | number): Promise<{
  success: boolean;
  vehicle?: ApiVehicle;
  message?: string;
}> {
  const res = await fetch(`${API_URL}/vehicles/${idOrSlug}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return parse(res);
}

/** POST /api/leads — visitor submits an inquiry (used on detail page). */
export async function submitInquiry(payload: {
  dealer_id: number;
  vehicle_id?: number | null;
  name: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source?: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parse(res);
}