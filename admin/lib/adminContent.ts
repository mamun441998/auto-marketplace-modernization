import { adminGet, adminPost, adminPatch, adminDelete } from "@/lib/apiClients";

export interface Faq { id: number; question: string; answer: string; category: string; published: boolean; }
export interface Testimonial { id: number; name: string; company: string | null; role: string | null; rating: number; quote: string; published: boolean; }

export async function fetchFaqs(): Promise<Faq[]> {
  const res = await adminGet<{ success: boolean; faqs?: Faq[] }>(`/admin/faqs`);
  return res?.faqs ?? [];
}
export async function saveFaq(input: { question: string; answer: string; category: string; published: boolean }, id?: number) {
  const res = id
    ? await adminPatch<{ success: boolean; message?: string }>(`/admin/faqs/${id}`, input)
    : await adminPost<{ success: boolean; message?: string }>(`/admin/faqs`, input);
  return { success: res?.success ?? false, message: res?.message };
}
export async function deleteFaqApi(id: number) {
  const res = await adminDelete<{ success: boolean; message?: string }>(`/admin/faqs/${id}`);
  return { success: res?.success ?? false, message: res?.message };
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await adminGet<{ success: boolean; testimonials?: Testimonial[] }>(`/admin/testimonials`);
  return res?.testimonials ?? [];
}
export async function saveTestimonial(input: { name: string; company: string; role: string; rating: number; quote: string; published: boolean }, id?: number) {
  const res = id
    ? await adminPatch<{ success: boolean; message?: string }>(`/admin/testimonials/${id}`, input)
    : await adminPost<{ success: boolean; message?: string }>(`/admin/testimonials`, input);
  return { success: res?.success ?? false, message: res?.message };
}
export async function deleteTestimonialApi(id: number) {
  const res = await adminDelete<{ success: boolean; message?: string }>(`/admin/testimonials/${id}`);
  return { success: res?.success ?? false, message: res?.message };
}