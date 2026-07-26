const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000/api";

/**
 * ------------------------------------------------------------
 * Get Auth Token
 * ------------------------------------------------------------
 */
export function getAuthToken(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("motohave_token");
}

/**
 * ------------------------------------------------------------
 * Default Headers (JSON)
 * ------------------------------------------------------------
 */
function defaultHeaders(): HeadersInit {
    const token = getAuthToken();

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

/**
 * ------------------------------------------------------------
 * Safe JSON parse (never crashes on empty / non-JSON responses)
 * ------------------------------------------------------------
 */
async function parseResponse<T>(response: Response): Promise<T> {
    const text = await response.text();

    try {
        return (text ? JSON.parse(text) : {}) as T;
    } catch {
        // Backend returned HTML / plain text (e.g. a 500 page).
        return {
            success: false,
            message: "Unexpected server response.",
        } as T;
    }
}

/**
 * ------------------------------------------------------------
 * GET
 * ------------------------------------------------------------
 */
export async function apiGet<T = any>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers: defaultHeaders(),
    });

    return parseResponse<T>(response);
}

/**
 * ------------------------------------------------------------
 * POST
 * ------------------------------------------------------------
 */
export async function apiPost<T = any>(
    endpoint: string,
    body: any = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: defaultHeaders(),
        body: JSON.stringify(body),
    });

    return parseResponse<T>(response);
}

/**
 * ------------------------------------------------------------
 * PUT
 * ------------------------------------------------------------
 */
export async function apiPut<T = any>(
    endpoint: string,
    body: any = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: defaultHeaders(),
        body: JSON.stringify(body),
    });

    return parseResponse<T>(response);
}

/**
 * ------------------------------------------------------------
 * PATCH
 * ------------------------------------------------------------
 */
export async function apiPatch<T = any>(
    endpoint: string,
    body: any = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PATCH",
        headers: defaultHeaders(),
        body: JSON.stringify(body),
    });

    return parseResponse<T>(response);
}

/**
 * ------------------------------------------------------------
 * DELETE
 * ------------------------------------------------------------
 */
export async function apiDelete<T = any>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: defaultHeaders(),
    });

    return parseResponse<T>(response);
}

/**
 * ------------------------------------------------------------
 * Upload File (Multipart)
 * ------------------------------------------------------------
 */
export async function apiUpload<T = any>(
    endpoint: string,
    formData: FormData
): Promise<T> {
    const token = getAuthToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // NOTE: Content-Type deliberately NOT set — the browser sets
            // the correct multipart boundary automatically for FormData.
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    return parseResponse<T>(response);
}