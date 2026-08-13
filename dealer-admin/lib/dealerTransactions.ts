import { apiGet } from "@/lib/apiClient";

export interface DealerTransaction {
  id: number;
  customer_name: string;
  customer_email: string | null;
  vehicle: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  date: string | null;
}

export interface TransactionStats {
  revenue: number;
  completed: number;
  pending: number;
  refunded: number;
}

/** GET /api/dealer/transactions — real payments + stats. */
export async function fetchTransactions(): Promise<{
  success: boolean;
  stats: TransactionStats;
  transactions: DealerTransaction[];
}> {
  return apiGet(`/dealer/transactions`);
}