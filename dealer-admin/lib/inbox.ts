import { apiGet, apiPost, apiPatch } from "@/lib/apiClient";

export interface InboxListItem {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  status: string;
  unread: number;
  preview: string;
  preview_from: string | null;
  last_at: string | null;
}

export interface InboxMessage {
  id: number;
  sender: string; // "customer" | "dealer"
  body: string;
  at: string | null;
}

export interface InboxThread {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  status: string;
}

/** GET /api/dealer/inbox — conversation list + total unread. */
export async function fetchInbox(): Promise<{
  success: boolean;
  conversations: InboxListItem[];
  unread_total: number;
}> {
  const res = await apiGet<{
    success: boolean;
    conversations?: InboxListItem[];
    unread_total?: number;
  }>(`/dealer/inbox`);
  return {
    success: res?.success ?? false,
    conversations: res?.conversations ?? [],
    unread_total: res?.unread_total ?? 0,
  };
}

/** GET /api/dealer/inbox/{id} — thread + messages (marks read). */
export async function fetchThread(id: number): Promise<{
  success: boolean;
  conversation: InboxThread | null;
  messages: InboxMessage[];
}> {
  const res = await apiGet<{
    success: boolean;
    conversation?: InboxThread;
    messages?: InboxMessage[];
  }>(`/dealer/inbox/${id}`);
  return {
    success: res?.success ?? false,
    conversation: res?.conversation ?? null,
    messages: res?.messages ?? [],
  };
}

/** POST /api/dealer/inbox/{id}/reply — dealer sends a message. */
export async function replyToThread(id: number, body: string): Promise<{
  success: boolean;
  messages: InboxMessage[];
}> {
  const res = await apiPost<{ success: boolean; messages?: InboxMessage[] }>(
    `/dealer/inbox/${id}/reply`,
    { body }
  );
  return { success: res?.success ?? false, messages: res?.messages ?? [] };
}

/** PATCH /api/dealer/inbox/{id}/toggle — open/close conversation. */
export async function toggleThread(id: number): Promise<{ success: boolean; status?: string }> {
  const res = await apiPatch<{ success: boolean; status?: string }>(
    `/dealer/inbox/${id}/toggle`,
    {}
  );
  return { success: res?.success ?? false, status: res?.status };
}