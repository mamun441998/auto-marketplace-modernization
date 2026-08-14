// admin/components/analytics/analyticsData.ts

export const analyticsOverview = {
  totalRevenue: 68420,
  revenueGrowth: 11.7,
  vehiclesSold: 3842,
  avgDealSize: 34200,
  platformGrowth: 22.4,
};

export const revenueGrowthData = [
  { month: "Jan", revenue: 42500, growth: 8.2 },
  { month: "Feb", revenue: 45800, growth: 7.8 },
  { month: "Mar", revenue: 48200, growth: 5.2 },
  { month: "Apr", revenue: 51600, growth: 7.1 },
  { month: "May", revenue: 55300, growth: 7.2 },
  { month: "Jun", revenue: 61200, growth: 10.7 },
  { month: "Jul", revenue: 68420, growth: 11.7 },
];

export const geographicData = [
  { state: "TX", dealers: 148 },
  { state: "CA", dealers: 112 },
  { state: "FL", dealers: 96 },
  { state: "AZ", dealers: 54 },
  { state: "CO", dealers: 41 },
  { state: "WA", dealers: 38 },
  { state: "NY", dealers: 41 },
];

export const planDistributionData = [
  { name: "Starter", value: 210, color: "#3B82F6" },
  { name: "Professional", value: 245, color: "#FC5E01" },
  { name: "Enterprise", value: 75, color: "#8B5CF6" },
];

export interface TopDealer {
  id: number;
  name: string;
  city: string;
  state: string;
  revenue: number;
  vehiclesSold: number;
  avatarInitials: string;
  gradient: string;
}

export const topDealers: TopDealer[] = [
  { id: 1, name: "Prime Motors", city: "Dallas", state: "TX", revenue: 428000, vehiclesSold: 62, avatarInitials: "PM", gradient: "from-violet-500 to-fuchsia-500" },
  { id: 2, name: "Luxury Drive", city: "Miami", state: "FL", revenue: 396500, vehiclesSold: 48, avatarInitials: "LD", gradient: "from-pink-500 to-rose-500" },
  { id: 3, name: "Metro Cars", city: "Phoenix", state: "AZ", revenue: 351200, vehiclesSold: 71, avatarInitials: "MC", gradient: "from-sky-500 to-blue-600" },
  { id: 4, name: "Anderson Auto Group", city: "Austin", state: "TX", revenue: 318900, vehiclesSold: 55, avatarInitials: "AA", gradient: "from-blue-500 to-cyan-500" },
  { id: 5, name: "Northgate Auto", city: "Seattle", state: "WA", revenue: 287400, vehiclesSold: 44, avatarInitials: "NA", gradient: "from-rose-500 to-pink-600" },
];