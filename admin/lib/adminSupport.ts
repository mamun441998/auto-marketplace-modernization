import { adminGet, adminPost, adminPatch } from "@/lib/apiClients";

export interface SupportTicketSummary {
  id: number;
  subject: string;
  status: string;
  priority: string;
  dealer_id: number;
  dealer_name: string;
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
  dealer_id: number;
  dealer_name: string;
  created_at: string | null;
  last_reply_at: string | null;
  messages: SupportMessage[];
}

export interface SupportCounts {
  total: number;
  open: number;
  pending: number;
  closed: number;
}

export async function fetchTickets(params?: { status?: string; search?: string }): Promise<{
  tickets: SupportTicketSummary[];
  counts: SupportCounts;
}> {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.search) qs.set("search", params.search);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";

  const res = await adminGet<{
    success: boolean;
    tickets?: SupportTicketSummary[];
    counts?: SupportCounts;
  }>(`/admin/support${suffix}`);

  return {
    tickets: res?.tickets ?? [],
    counts: res?.counts ?? { total: 0, open: 0, pending: 0, closed: 0 },
  };
}

export async function fetchTicket(id: number): Promise<SupportTicketDetail | null> {
  const res = await adminGet<{ success: boolean; ticket?: SupportTicketDetail }>(
    `/admin/support/${id}`
  );
  return res?.ticket ?? null;
}

export async function replyTicket(
  id: number,
  message: string
): Promise<{ success: boolean; ticket?: SupportTicketDetail }> {
  const res = await adminPost<{ success: boolean; ticket?: SupportTicketDetail }>(
    `/admin/support/${id}/reply`,
    { message }
  );
  return { success: res?.success ?? false, ticket: res?.ticket };
}

export async function updateTicketStatus(
  id: number,
  status: string
): Promise<{ success: boolean; ticket?: SupportTicketDetail }> {
  const res = await adminPatch<{ success: boolean; ticket?: SupportTicketDetail }>(
    `/admin/support/${id}/status`,
    { status }
  );
  return { success: res?.success ?? false, ticket: res?.ticket };
}