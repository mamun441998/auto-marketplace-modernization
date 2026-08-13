const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface PlatformStats {
  dealers: number;
  vehicles: number;
  leads: number;
}

export async function fetchPlatformStats(): Promise<PlatformStats> {
  try {
    const res = await fetch(`${API}/stats`, { headers: { Accept: "application/json" } });
    const data = await res.json();
    if (data?.success && data.stats) {
      return {
        dealers: data.stats.dealers ?? 0,
        vehicles: data.stats.vehicles ?? 0,
        leads: data.stats.leads ?? 0,
      };
    }
  } catch {
    /* ignore — fall through to zeros */
  }
  return { dealers: 0, vehicles: 0, leads: 0 };
}