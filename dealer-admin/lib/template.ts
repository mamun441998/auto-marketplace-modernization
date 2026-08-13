import { apiGet, apiPost, apiDelete } from "@/lib/apiClient";

export interface Template {
  id: number;
  name: string;
  channel: "email" | "whatsapp";
  subject: string | null;
  body: string;
  created_at: string | null;
}

export interface TemplateInput {
  name: string;
  channel: "email" | "whatsapp";
  subject?: string | null;
  body: string;
}

export interface ApiResult<T = unknown> {
  success: boolean;
  message?: string;
  template?: T;
}

/** GET /api/dealer/templates */
export async function fetchTemplates() {
  return apiGet<{ success: boolean; templates: Template[] }>(`/dealer/templates`);
}

/** POST /api/dealer/templates */
export async function saveTemplate(input: TemplateInput) {
  return apiPost<ApiResult<Template>>(`/dealer/templates`, input);
}

/** DELETE /api/dealer/templates/{id} */
export async function deleteTemplate(id: number) {
  return apiDelete<ApiResult>(`/dealer/templates/${id}`);
}