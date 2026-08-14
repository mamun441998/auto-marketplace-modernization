import { getAdminToken } from "@/lib/adminAuth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

async function parse<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return (text ? JSON.parse(text) : {}) as T;
  } catch {
    return { success: false, message: "Unexpected server response." } as unknown as T;
  }
}

function headers(json = true): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" };
  if (json) h["Content-Type"] = "application/json";
  const t = getAdminToken();
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
}

export async function adminGet<T>(path: string): Promise<T> {
  return parse<T>(await fetch(`${API}${path}`, { headers: headers(false), cache: "no-store" }));
}
export async function adminPost<T>(path: string, body?: unknown): Promise<T> {
  return parse<T>(await fetch(`${API}${path}`, { method: "POST", headers: headers(), body: body ? JSON.stringify(body) : undefined }));
}
export async function adminPatch<T>(path: string, body?: unknown): Promise<T> {
  return parse<T>(await fetch(`${API}${path}`, { method: "PATCH", headers: headers(), body: body ? JSON.stringify(body) : undefined }));
}
export async function adminDelete<T>(path: string): Promise<T> {
  return parse<T>(await fetch(`${API}${path}`, { method: "DELETE", headers: headers(false) }));
}