import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    apiUpload,
} from "./apiClient";

/**
 * ------------------------------------------------------------
 * Dealer Profile Types
 * ------------------------------------------------------------
 */

export interface DealerProfile {
    id: number;
    uuid: string;
    name: string;
    slug: string;
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    city: string | null;
    country: string | null;
    logo: string | null;
    logo_url?: string | null;
    cover_image?: string | null;
    cover_image_url?: string | null;
    description?: string | null;
    is_active: boolean;
}

/**
 * ------------------------------------------------------------
 * Get Dealer Profile
 * ------------------------------------------------------------
 */

export async function getDealerProfile() {
    return apiGet("/dealer/profile");
}

/**
 * ------------------------------------------------------------
 * Create Dealer Profile
 * ------------------------------------------------------------
 */

export async function createDealerProfile(data: any) {
    return apiPost("/dealer/profile", data);
}

/**
 * ------------------------------------------------------------
 * Update Dealer Profile
 * ------------------------------------------------------------
 */

export async function updateDealerProfile(data: any) {
    return apiPut("/dealer/profile", data);
}

/**
 * ------------------------------------------------------------
 * Delete Dealer Profile
 * ------------------------------------------------------------
 */

export async function deleteDealerProfile() {
    return apiDelete("/dealer/profile");
}

/**
 * ------------------------------------------------------------
 * Upload Dealer Logo
 * ------------------------------------------------------------
 */

export async function uploadDealerLogo(file: File) {
    const formData = new FormData();

    formData.append("logo", file);

    return apiUpload(
        "/dealer/profile/upload-logo",
        formData
    );
}

/**
 * ------------------------------------------------------------
 * Upload Dealer Cover Image
 * ------------------------------------------------------------
 */

export async function uploadDealerCover(file: File) {
    const formData = new FormData();

    formData.append("cover_image", file);

    return apiUpload(
        "/dealer/profile/upload-cover",
        formData
    );
}