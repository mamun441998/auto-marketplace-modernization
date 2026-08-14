// admin/components/superAdminData.ts

export interface AdminDealer {
  id: number;
  name: string;
  ownerName: string;
  email: string;
  city: string;
  state: string;
  plan: "Starter" | "Professional" | "Enterprise";
  status: "Active" | "Trial" | "Suspended" | "Overdue";
  joinDate: string;
  vehicleCount: number;
  monthlyRevenue: number;
  avatarInitials: string;
  gradient: string;
}

export const adminDealers: AdminDealer[] = [
  { id: 1, name: "Anderson Auto Group", ownerName: "Michael Anderson", email: "michael@andersonauto.com", city: "Austin", state: "TX", plan: "Professional", status: "Active", joinDate: "2026-01-15", vehicleCount: 245, monthlyRevenue: 129, avatarInitials: "AA", gradient: "from-blue-500 to-cyan-500" },
  { id: 2, name: "Prime Motors", ownerName: "Sarah Williams", email: "sarah@primemotors.com", city: "Dallas", state: "TX", plan: "Enterprise", status: "Active", joinDate: "2025-11-02", vehicleCount: 178, monthlyRevenue: 299, avatarInitials: "PM", gradient: "from-violet-500 to-fuchsia-500" },
  { id: 3, name: "Carter Automotive", ownerName: "Daniel Carter", email: "daniel@carterauto.com", city: "Houston", state: "TX", plan: "Starter", status: "Trial", joinDate: "2026-06-28", vehicleCount: 42, monthlyRevenue: 0, avatarInitials: "CA", gradient: "from-green-500 to-emerald-500" },
  { id: 4, name: "Elite Auto Sales", ownerName: "Jessica Brown", email: "jessica@eliteauto.com", city: "San Antonio", state: "TX", plan: "Professional", status: "Active", joinDate: "2025-09-19", vehicleCount: 87, monthlyRevenue: 129, avatarInitials: "EA", gradient: "from-orange-500 to-red-500" },
  { id: 5, name: "Metro Cars", ownerName: "Kevin Martinez", email: "kevin@metrocars.com", city: "Phoenix", state: "AZ", plan: "Enterprise", status: "Overdue", joinDate: "2025-07-04", vehicleCount: 203, monthlyRevenue: 299, avatarInitials: "MC", gradient: "from-sky-500 to-blue-600" },
  { id: 6, name: "Luxury Drive", ownerName: "Emily Thompson", email: "emily@luxurydrive.com", city: "Miami", state: "FL", plan: "Enterprise", status: "Active", joinDate: "2025-12-10", vehicleCount: 96, monthlyRevenue: 299, avatarInitials: "LD", gradient: "from-pink-500 to-rose-500" },
  { id: 7, name: "Westside Motors", ownerName: "Robert King", email: "robert@westsidemotors.com", city: "Denver", state: "CO", plan: "Starter", status: "Suspended", joinDate: "2025-05-22", vehicleCount: 0, monthlyRevenue: 0, avatarInitials: "WM", gradient: "from-indigo-500 to-purple-500" },
  { id: 8, name: "Sunrise Auto", ownerName: "Laura Diaz", email: "laura@sunriseauto.com", city: "Orlando", state: "FL", plan: "Professional", status: "Active", joinDate: "2026-02-08", vehicleCount: 188, monthlyRevenue: 129, avatarInitials: "SA", gradient: "from-amber-500 to-orange-600" },
  { id: 9, name: "Coastal Cars", ownerName: "James Lee", email: "james@coastalcars.com", city: "San Diego", state: "CA", plan: "Starter", status: "Trial", joinDate: "2026-07-01", vehicleCount: 18, monthlyRevenue: 0, avatarInitials: "CC", gradient: "from-teal-500 to-cyan-600" },
  { id: 10, name: "Northgate Auto", ownerName: "Angela White", email: "angela@northgateauto.com", city: "Seattle", state: "WA", plan: "Professional", status: "Active", joinDate: "2025-10-30", vehicleCount: 134, monthlyRevenue: 129, avatarInitials: "NA", gradient: "from-rose-500 to-pink-600" },
];

export const platformStats = {
  totalDealers: 530,
  activeDealers: 468,
  trialDealers: 42,
  totalRevenue: 68420,
  totalVehicles: 15240,
  churnRate: 2.4,
};

export const revenueData = [
  { month: "Jan", revenue: 42500 },
  { month: "Feb", revenue: 45800 },
  { month: "Mar", revenue: 48200 },
  { month: "Apr", revenue: 51600 },
  { month: "May", revenue: 55300 },
  { month: "Jun", revenue: 61200 },
  { month: "Jul", revenue: 68420 },
];

export const signupTrendData = [
  { month: "Jan", signups: 28 },
  { month: "Feb", signups: 34 },
  { month: "Mar", signups: 31 },
  { month: "Apr", signups: 42 },
  { month: "May", signups: 38 },
  { month: "Jun", signups: 47 },
  { month: "Jul", signups: 52 },
];

export const planDistribution = [
  { name: "Starter", value: 210, color: "#3B82F6" },
  { name: "Professional", value: 245, color: "#FC5E01" },
  { name: "Enterprise", value: 75, color: "#8B5CF6" },
];