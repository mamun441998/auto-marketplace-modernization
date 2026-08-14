// admin/components/users/usersData.ts

export interface PlatformUser {
  id: number;
  name: string;
  email: string;
  role: "Super Admin" | "Dealer Owner" | "Dealer Staff";
  dealerName: string | null;
  status: "Active" | "Invited" | "Deactivated";
  lastActive: string;
  avatarInitials: string;
  gradient: string;
}

export const platformUsers: PlatformUser[] = [
  { id: 1, name: "Alex Turner", email: "alex@motohave.com", role: "Super Admin", dealerName: null, status: "Active", lastActive: "2026-07-08", avatarInitials: "AT", gradient: "from-[#FC5E01] to-[#E5540A]" },
  { id: 2, name: "Michael Anderson", email: "michael@andersonauto.com", role: "Dealer Owner", dealerName: "Anderson Auto Group", status: "Active", lastActive: "2026-07-08", avatarInitials: "MA", gradient: "from-blue-500 to-cyan-500" },
  { id: 3, name: "Sarah Williams", email: "sarah@primemotors.com", role: "Dealer Owner", dealerName: "Prime Motors", status: "Active", lastActive: "2026-07-07", avatarInitials: "SW", gradient: "from-violet-500 to-fuchsia-500" },
  { id: 4, name: "Tom Reilly", email: "tom@primemotors.com", role: "Dealer Staff", dealerName: "Prime Motors", status: "Active", lastActive: "2026-07-07", avatarInitials: "TR", gradient: "from-violet-500 to-fuchsia-500" },
  { id: 5, name: "Daniel Carter", email: "daniel@carterauto.com", role: "Dealer Owner", dealerName: "Carter Automotive", status: "Active", lastActive: "2026-07-05", avatarInitials: "DC", gradient: "from-green-500 to-emerald-500" },
  { id: 6, name: "Jessica Brown", email: "jessica@eliteauto.com", role: "Dealer Owner", dealerName: "Elite Auto Sales", status: "Active", lastActive: "2026-07-06", avatarInitials: "JB", gradient: "from-orange-500 to-red-500" },
  { id: 7, name: "Priya Nair", email: "priya@eliteauto.com", role: "Dealer Staff", dealerName: "Elite Auto Sales", status: "Invited", lastActive: "—", avatarInitials: "PN", gradient: "from-orange-500 to-red-500" },
  { id: 8, name: "Kevin Martinez", email: "kevin@metrocars.com", role: "Dealer Owner", dealerName: "Metro Cars", status: "Deactivated", lastActive: "2026-06-20", avatarInitials: "KM", gradient: "from-sky-500 to-blue-600" },
  { id: 9, name: "Emily Thompson", email: "emily@luxurydrive.com", role: "Dealer Owner", dealerName: "Luxury Drive", status: "Active", lastActive: "2026-07-08", avatarInitials: "ET", gradient: "from-pink-500 to-rose-500" },
  { id: 10, name: "Jordan Blake", email: "jordan@motohave.com", role: "Super Admin", dealerName: null, status: "Active", lastActive: "2026-07-08", avatarInitials: "JB", gradient: "from-[#FC5E01] to-[#E5540A]" },
];

export const usersStats = {
  totalUsers: 812,
  superAdmins: 3,
  dealerOwners: 530,
  pendingInvites: 12,
};