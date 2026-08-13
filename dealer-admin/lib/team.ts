import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/apiClient";

export type TeamRole = "owner" | "manager" | "staff";

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  team_role: TeamRole;
  status: string;
  is_owner: boolean;
  initials: string;
  joined_at: string | null;
}

export interface TeamUsage {
  used: number;
  limit: number | null;   // null = unlimited
  can_add: boolean;
  unlimited: boolean;
}

export interface TeamMemberInput {
  name: string;
  email: string;
  password: string;
  team_role: "manager" | "staff";
}

export interface ApiResult<T = unknown> {
  success: boolean;
  message?: string;
  code?: string;
  data?: T;
}

/** GET /api/team — owner + members + plan usage. */
export async function fetchTeam() {
  return apiGet<{
    success: boolean;
    data: TeamMember[];
    usage: TeamUsage;
    message?: string;
  }>(`/team`);
}

/** POST /api/team — add a new team member. */
export async function addTeamMember(input: TeamMemberInput) {
  return apiPost<ApiResult<TeamMember>>(`/team`, input);
}

/** PATCH /api/team/{id}/role — change a member's role. */
export async function updateTeamRole(id: number, team_role: "manager" | "staff") {
  return apiPatch<ApiResult<TeamMember>>(`/team/${id}/role`, { team_role });
}

/** DELETE /api/team/{id} — remove a member. */
export async function removeTeamMember(id: number) {
  return apiDelete<ApiResult>(`/team/${id}`);
}