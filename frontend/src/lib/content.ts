// frontend/src/lib/content.ts
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface PublicFaq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface PublicTestimonial {
  id: number;
  name: string;
  company: string | null;
  role: string | null;
  rating: number;
  quote: string;
}

export async function fetchFaqs(): Promise<PublicFaq[]> {
  try {
    const res = await fetch(`${API_URL}/faqs`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.faqs) ? data.faqs : [];
  } catch {
    return [];
  }
}

export async function fetchTestimonials(): Promise<PublicTestimonial[]> {
  try {
    const res = await fetch(`${API_URL}/testimonials`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.testimonials) ? data.testimonials : [];
  } catch {
    return [];
  }
}