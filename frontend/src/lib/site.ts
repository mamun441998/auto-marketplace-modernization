const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface DealerSite {
  is_published: boolean;
  custom_domain: string | null;
  meta_pixel_id: string | null;
  google_analytics_id: string | null;
  config: any; // saved WebsiteData (theme/home/inventory/about/financing/contact/branding)
  dealer: {
    id: number;
    name: string;
    slug: string;
    email: string | null;
    phone: string | null;
    city: string | null;
    address: string | null;
    logo_url: string | null;
    cover_image_url: string | null;
  };
}

async function parse<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return (text ? JSON.parse(text) : {}) as T;
  } catch {
    return { success: false } as T;
  }
}

/** GET /api/sites/{slug} — a dealer's live website. */
export async function fetchDealerSite(slug: string): Promise<{
  success: boolean;
  website?: DealerSite;
  message?: string;
}> {
  const res = await fetch(`${API_URL}/sites/${slug}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return parse(res);
}