import { apiGet, apiPut, apiPatch, apiUpload } from "@/lib/apiClient";

/* =========================================================================
 |  Types
 |=========================================================================*/

export interface WebsiteConfig {
  theme: {
    preset?: string;
    primary: string;
    secondary: string;
    font?: string;
  };
  branding: {
    siteName?: string | null;
    logo?: string | null;
    favicon?: string | null;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage?: string | null;
    featuredCount: number;
    showFinancing: boolean;
  };
  inventory: { enabled: boolean; title: string; subtitle: string };
  about: { enabled: boolean; title: string; subtitle: string; story: string };
  financing: { enabled: boolean; title: string; subtitle: string };
  contact: {
    enabled: boolean;
    title: string;
    subtitle: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    hours?: string | null;
  };
  social: {
    facebook?: string | null;
    instagram?: string | null;
    youtube?: string | null;
    whatsapp?: string | null;
  };
  seo: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: string | null;
  };
  tracking: {
    metaPixelId?: string | null;
    googleAnalyticsId?: string | null;
  };
  features: { chatWidget: boolean };
}

export interface WebsiteDealer {
  id: number;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  address: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
}

export interface DealerWebsite {
  is_published: boolean;
  custom_domain: string | null;
  meta_pixel_id: string | null;
  google_analytics_id: string | null;
  config: WebsiteConfig;
  dealer: WebsiteDealer;
  preview_url: string;
}

/* =========================================================================
 |  API
 |=========================================================================*/

/** GET /api/dealer/website — load (or auto-create) my website. */
export async function fetchMyWebsite() {
  return apiGet<{ success: boolean; website: DealerWebsite }>(`/dealer/website`);
}

/** PUT /api/dealer/website — save config + tracking ids. */
export async function saveWebsite(payload: {
  config: WebsiteConfig;
  meta_pixel_id?: string | null;
  google_analytics_id?: string | null;
  custom_domain?: string | null;
}) {
  return apiPut<{ success: boolean; message: string; website: DealerWebsite }>(
    `/dealer/website`,
    payload
  );
}

/** PATCH /api/dealer/website/publish — go live / unpublish. */
export async function publishWebsite(isPublished: boolean) {
  return apiPatch<{ success: boolean; message: string; website: DealerWebsite }>(
    `/dealer/website/publish`,
    { is_published: isPublished }
  );
}

/** POST /api/dealer/website/upload — upload an image, returns its public URL. */
export async function uploadWebsiteAsset(file: File) {
  const fd = new FormData();
  fd.append("image", file);
  return apiUpload<{ success: boolean; url: string; path: string; message?: string }>(
    `/dealer/website/upload`,
    fd
  );
}