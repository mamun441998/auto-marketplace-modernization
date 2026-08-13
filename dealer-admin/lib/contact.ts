import { apiGet, apiUpload, apiDelete } from "@/lib/apiClient";

export interface Contact {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  source: string;
  tag: string | null;
  created_at: string | null;
}

export interface ContactStats {
  total: number;
  with_email: number;
  with_phone: number;
}

export interface ContactListResult {
  contacts: Contact[];
  stats: ContactStats;
}

/**
 * Fetch the dealer's contacts (optionally filtered by search term).
 */
export async function fetchContacts(search = ""): Promise<ContactListResult> {
  const qs = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await apiGet<{
    success: boolean;
    contacts?: Contact[];
    total?: number;
    with_email?: number;
    with_phone?: number;
  }>(`/dealer/contacts${qs}`);

  return {
    contacts: res?.contacts ?? [],
    stats: {
      total: res?.total ?? 0,
      with_email: res?.with_email ?? 0,
      with_phone: res?.with_phone ?? 0,
    },
  };
}

/**
 * Upload a CSV file to import contacts.
 */
export async function importContacts(file: File): Promise<{
  success: boolean;
  message: string;
  imported: number;
  skipped: number;
}> {
  const form = new FormData();
  form.append("file", file);

  const res = await apiUpload<{
    success: boolean;
    message?: string;
    imported?: number;
    skipped?: number;
  }>(`/dealer/contacts/import`, form);

  return {
    success: res?.success ?? false,
    message: res?.message ?? "Import failed.",
    imported: res?.imported ?? 0,
    skipped: res?.skipped ?? 0,
  };
}

/**
 * Delete a single contact.
 */
export async function deleteContact(id: number): Promise<{ success: boolean; message: string }> {
  const res = await apiDelete<{ success: boolean; message?: string }>(`/dealer/contacts/${id}`);
  return { success: res?.success ?? false, message: res?.message ?? "" };
}

/**
 * Delete ALL contacts for the dealer.
 */
export async function clearContacts(): Promise<{ success: boolean; message: string }> {
  const res = await apiDelete<{ success: boolean; message?: string }>(`/dealer/contacts/clear`);
  return { success: res?.success ?? false, message: res?.message ?? "" };
}