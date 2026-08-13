import { apiGet, apiPost } from "@/lib/apiClient";

export interface SupportTicketSummary {
  id: number;
  subject: string;
  status: string;
  priority: string;
  messages_count: number;
  last_reply_at: string | null;
  created_at: string | null;
}

export interface SupportMessage {
  id: number;
  author_type: "dealer" | "admin";
  author_name: string | null;
  body: string;
  created_at: string | null;
}

export interface SupportTicketDetail {
  id: number;
  subject: string;
  status: string;
  priority: string;
  created_at: string | null;
  last_reply_at: string | null;
  messages: SupportMessage[];
}

/** GET /api/dealer/support — the current dealer's tickets. */
export async function fetchTickets(): Promise<{
  success: boolean;
  tickets: SupportTicketSummary[];
}> {
  return apiGet(`/dealer/support`);
}

/** GET /api/dealer/support/{id} — one ticket with its full thread. */
export async function fetchTicket(id: number): Promise<{
  success: boolean;
  ticket: SupportTicketDetail;
}> {
  return apiGet(`/dealer/support/${id}`);
}

/** POST /api/dealer/support — open a new ticket. */
export async function createTicket(input: {
  subject: string;
  message: string;
  priority: string;
}): Promise<{ success: boolean; message?: string; ticket?: { id: number } }> {
  return apiPost(`/dealer/support`, input);
}

/** POST /api/dealer/support/{id}/reply — reply to a ticket. */
export async function replyTicket(
  id: number,
  message: string
): Promise<{ success: boolean; message?: string; ticket?: SupportTicketDetail }> {
  return apiPost(`/dealer/support/${id}/reply`, { message });
}