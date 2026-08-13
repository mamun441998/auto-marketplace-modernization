const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface ApiDealer {
  id: number;
  name: string;
  slug: string;
  city: string | null;
  state: string | null;
  logo_url: string | null;
  is_verified: boolean;
  vehicles_count?: number;
}

/** GET /api/dealers — public list of active dealers. */
export async function fetchDealers(query = ""): Promise<{ success: boolean; dealers: ApiDealer[]; meta?: unknown }> {
  try {
    const res = await fetch(`${API}/dealers${query}`, { headers: { Accept: "application/json" }, cache: "no-store" });
    const data = await res.json();
    if (data?.success) {
      return { success: true, dealers: data.data ?? [], meta: data.meta };
    }
  } catch {
    /* ignore */
  }
  return { success: false, dealers: [] };
}