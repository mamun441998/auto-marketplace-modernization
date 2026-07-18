// dealer-admin/lib/dealerData.ts

export const dealerProfile = {
  name: "John Doe",
  dealershipName: "Anderson Auto Group",
  role: "Super Admin",
};

export const dashboardStats = {
  totalInventory: 245,
  totalInventoryChange: 12,
  newLeads: 128,
  newLeadsChange: 18,
  totalSales: 86,
  totalSalesChange: 8,
  totalRevenue: 245840,
  totalRevenueChange: 15,
};

export const salesOverviewData = [
  { day: "May 28", sales: 20 },
  { day: "May 29", sales: 45 },
  { day: "May 30", sales: 55 },
  { day: "May 31", sales: 48 },
  { day: "Jun 01", sales: 65 },
  { day: "Jun 02", sales: 60 },
  { day: "Jun 03", sales: 90 },
];

export const leadsSourceData = [
  { name: "Website", value: 45, color: "#FC5E01" },
  { name: "Facebook", value: 32, color: "#3B82F6" },
  { name: "Instagram", value: 20, color: "#8B5CF6" },
  { name: "Marketplace", value: 18, color: "#F59E0B" },
  { name: "Others", value: 13, color: "#22C55E" },
];

export interface TopInventoryItem {
  id: number;
  model: string;
  specs: string;
  price: number;
  status: "In Stock" | "Reserved" | "Sold";
}

export const topInventory: TopInventoryItem[] = [
  { id: 1, model: "Toyota Camry 2023", specs: "Sedan · 2500cc · Black", price: 28500, status: "In Stock" },
  { id: 2, model: "Honda Civic 2022", specs: "Sedan · 1800cc · White", price: 22000, status: "In Stock" },
  { id: 3, model: "BMW X5 2023", specs: "SUV · 3000cc · Blue", price: 65000, status: "In Stock" },
];

export interface RecentLead {
  id: number;
  name: string;
  phone: string;
  interestedIn: string;
  date: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  avatarInitials: string;
  gradient: string;
}

export const recentLeads: RecentLead[] = [
  { id: 1, name: "Sarah Johnson", phone: "+1 234 567 8901", interestedIn: "Toyota Camry 2023", date: "2026-05-28T10:30:00", status: "New", avatarInitials: "SJ", gradient: "from-rose-500 to-pink-500" },
  { id: 2, name: "Michael Brown", phone: "+1 987 654 3210", interestedIn: "Honda Civic 2022", date: "2026-05-28T09:15:00", status: "Contacted", avatarInitials: "MB", gradient: "from-blue-500 to-cyan-500" },
  { id: 3, name: "David Wilson", phone: "+1 555 123 4567", interestedIn: "BMW X5 2023", date: "2026-05-27T04:45:00", status: "Qualified", avatarInitials: "DW", gradient: "from-emerald-500 to-teal-500" },
  { id: 4, name: "Emily Davis", phone: "+1 444 987 6543", interestedIn: "Toyota RAV4 2023", date: "2026-05-27T02:20:00", status: "Closed", avatarInitials: "ED", gradient: "from-amber-500 to-orange-500" },
];



// ei code ta dealerData.ts file er niche add koro (existing content er por)

export interface InventoryVehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  price: number;
  mileage: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  status: "In Stock" | "Reserved" | "Sold";
  dateAdded: string;
  gradient: string;
}

export const inventoryVehicles: InventoryVehicle[] = [
  { id: 1, make: "Toyota", model: "Camry", year: 2023, vin: "4T1B11HK5KU123456", price: 28500, mileage: 15600, bodyType: "Sedan", fuelType: "Hybrid", transmission: "Automatic", status: "In Stock", dateAdded: "2026-06-20", gradient: "from-blue-600 to-indigo-600" },
  { id: 2, make: "Honda", model: "Civic", year: 2022, vin: "2HGFC2F59NH123456", price: 22000, mileage: 24300, bodyType: "Sedan", fuelType: "Petrol", transmission: "Manual", status: "In Stock", dateAdded: "2026-06-18", gradient: "from-emerald-500 to-teal-600" },
  { id: 3, make: "BMW", model: "X5", year: 2023, vin: "5UXCR6C0XN9123456", price: 65000, mileage: 12500, bodyType: "SUV", fuelType: "Petrol", transmission: "Automatic", status: "Reserved", dateAdded: "2026-06-15", gradient: "from-slate-400 to-slate-600" },
  { id: 4, make: "Tesla", model: "Model Y", year: 2023, vin: "5YJYGDEE5NF123456", price: 47500, mileage: 8200, bodyType: "SUV", fuelType: "Electric", transmission: "Automatic", status: "In Stock", dateAdded: "2026-06-25", gradient: "from-red-500 to-rose-500" },
  { id: 5, make: "Ford", model: "F-150", year: 2023, vin: "1FTFW1E50NF123456", price: 52400, mileage: 9800, bodyType: "Truck", fuelType: "Petrol", transmission: "Automatic", status: "In Stock", dateAdded: "2026-06-10", gradient: "from-indigo-500 to-blue-700" },
  { id: 6, make: "Chevrolet", model: "Malibu", year: 2022, vin: "1G1ZD5ST8NF123456", price: 19800, mileage: 31200, bodyType: "Sedan", fuelType: "Petrol", transmission: "Automatic", status: "Sold", dateAdded: "2026-05-28", gradient: "from-amber-500 to-orange-600" },
  { id: 7, make: "Toyota", model: "RAV4", year: 2023, vin: "2T3P1RFV8NW123456", price: 31200, mileage: 11400, bodyType: "SUV", fuelType: "Hybrid", transmission: "Automatic", status: "In Stock", dateAdded: "2026-06-22", gradient: "from-blue-600 to-indigo-600" },
  { id: 8, make: "Hyundai", model: "Elantra", year: 2022, vin: "KMHL14JA3NA123456", price: 18500, mileage: 28900, bodyType: "Sedan", fuelType: "Petrol", transmission: "Automatic", status: "In Stock", dateAdded: "2026-06-05", gradient: "from-sky-500 to-blue-600" },
];

// ei code ta dealerData.ts file er niche add koro (existing content er por)

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  interestedIn: string;
  source: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  assignedTo: string;
  createdDate: string;
  lastContactDate: string | null;
  notes: string;
  avatarInitials: string;
  gradient: string;
}

export const leads: Lead[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "+1 234 567 8901",
    email: "sarah.j@example.com",
    interestedIn: "Toyota Camry 2023",
    source: "Website",
    status: "New",
    assignedTo: "John Doe",
    createdDate: "2026-07-08T10:30:00",
    lastContactDate: null,
    notes: "Filled out inquiry form on vehicle detail page. Asked about financing options.",
    avatarInitials: "SJ",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: 2,
    name: "Michael Brown",
    phone: "+1 987 654 3210",
    email: "michael.b@example.com",
    interestedIn: "Honda Civic 2022",
    source: "Facebook",
    status: "Contacted",
    assignedTo: "John Doe",
    createdDate: "2026-07-07T09:15:00",
    lastContactDate: "2026-07-08T11:00:00",
    notes: "Called and left voicemail. Sent follow-up email with pricing details.",
    avatarInitials: "MB",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "David Wilson",
    phone: "+1 555 123 4567",
    email: "david.w@example.com",
    interestedIn: "BMW X5 2023",
    source: "Instagram",
    status: "Qualified",
    assignedTo: "John Doe",
    createdDate: "2026-07-05T14:20:00",
    lastContactDate: "2026-07-07T16:30:00",
    notes: "Test drive scheduled for July 10. Pre-approved for financing, ready to close.",
    avatarInitials: "DW",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    name: "Emily Davis",
    phone: "+1 444 987 6543",
    email: "emily.d@example.com",
    interestedIn: "Toyota RAV4 2023",
    source: "Marketplace",
    status: "Closed",
    assignedTo: "John Doe",
    createdDate: "2026-06-28T08:00:00",
    lastContactDate: "2026-07-02T13:15:00",
    notes: "Deal closed. Vehicle delivered on July 2. Very satisfied customer.",
    avatarInitials: "ED",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    name: "James Miller",
    phone: "+1 333 222 1111",
    email: "james.m@example.com",
    interestedIn: "Tesla Model Y",
    source: "Website",
    status: "New",
    assignedTo: "John Doe",
    createdDate: "2026-07-08T15:45:00",
    lastContactDate: null,
    notes: "Requested more info on charging and range.",
    avatarInitials: "JM",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 6,
    name: "Linda Garcia",
    phone: "+1 222 333 4444",
    email: "linda.g@example.com",
    interestedIn: "Ford F-150 2023",
    source: "Facebook",
    status: "Contacted",
    assignedTo: "John Doe",
    createdDate: "2026-07-06T11:30:00",
    lastContactDate: "2026-07-07T10:00:00",
    notes: "Interested but comparing with another dealership. Following up in 2 days.",
    avatarInitials: "LG",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: 7,
    name: "Robert Taylor",
    phone: "+1 111 444 5555",
    email: "robert.t@example.com",
    interestedIn: "Hyundai Elantra 2022",
    source: "Website",
    status: "Qualified",
    assignedTo: "John Doe",
    createdDate: "2026-07-04T09:00:00",
    lastContactDate: "2026-07-06T14:20:00",
    notes: "Ready to purchase, negotiating final price.",
    avatarInitials: "RT",
    gradient: "from-green-500 to-emerald-600",
  },
];

// ei code ta dealerData.ts file er niche add koro (existing content er por)

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Sales Staff";
  status: "Active" | "Invited";
  lastActive: string | null;
  avatarInitials: string;
  gradient: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@andersonauto.com",
    role: "Owner",
    status: "Active",
    lastActive: "2026-07-08T10:00:00",
    avatarInitials: "JD",
    gradient: "from-[#FC5E01] to-[#E5540A]",
  },
  {
    id: 2,
    name: "Rachel Green",
    email: "rachel@andersonauto.com",
    role: "Manager",
    status: "Active",
    lastActive: "2026-07-08T09:15:00",
    avatarInitials: "RG",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Tom Reilly",
    email: "tom@andersonauto.com",
    role: "Sales Staff",
    status: "Active",
    lastActive: "2026-07-07T16:30:00",
    avatarInitials: "TR",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    name: "Priya Nair",
    email: "priya@andersonauto.com",
    role: "Sales Staff",
    status: "Invited",
    lastActive: null,
    avatarInitials: "PN",
    gradient: "from-violet-500 to-fuchsia-500",
  },
];


// ei code ta dealerData.ts file er niche add koro (existing content er por)

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Sales Staff";
  status: "Active" | "Invited";
  lastActive: string | null;
  avatarInitials: string;
  gradient: string;
}

export const InviteteamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@andersonauto.com",
    role: "Owner",
    status: "Active",
    lastActive: "2026-07-08T10:00:00",
    avatarInitials: "JD",
    gradient: "from-[#FC5E01] to-[#E5540A]",
  },
  {
    id: 2,
    name: "Rachel Green",
    email: "rachel@andersonauto.com",
    role: "Manager",
    status: "Active",
    lastActive: "2026-07-08T09:15:00",
    avatarInitials: "RG",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Tom Reilly",
    email: "tom@andersonauto.com",
    role: "Sales Staff",
    status: "Active",
    lastActive: "2026-07-07T16:30:00",
    avatarInitials: "TR",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    name: "Priya Nair",
    email: "priya@andersonauto.com",
    role: "Sales Staff",
    status: "Invited",
    lastActive: null,
    avatarInitials: "PN",
    gradient: "from-violet-500 to-fuchsia-500",
  },
];


// ei code ta dealerData.ts file er niche add koro (existing content er por)

export const analyticsOverview = {
  totalRevenue: 245840,
  revenueGrowth: 15.2,
  totalDeals: 86,
  avgDaysToSell: 18,
  conversionRate: 34,
};

export const monthlySalesData = [
  { month: "Feb", sales: 62000, deals: 22 },
  { month: "Mar", sales: 71500, deals: 25 },
  { month: "Apr", sales: 68200, deals: 24 },
  { month: "May", sales: 89400, deals: 31 },
  { month: "Jun", sales: 102300, deals: 36 },
  { month: "Jul", sales: 245840, deals: 86 },
];

export interface VehiclePerformance {
  model: string;
  views: number;
  inquiries: number;
  conversionRate: number;
}

export const vehiclePerformanceData: VehiclePerformance[] = [
  { model: "Toyota Camry", views: 842, inquiries: 34, conversionRate: 4.0 },
  { model: "Honda Civic", views: 654, inquiries: 28, conversionRate: 4.3 },
  { model: "BMW X5", views: 1203, inquiries: 52, conversionRate: 4.3 },
  { model: "Tesla Model Y", views: 980, inquiries: 41, conversionRate: 4.2 },
  { model: "Ford F-150", views: 567, inquiries: 19, conversionRate: 3.4 },
];

export const leadSourcePerformance = [
  { source: "Website", leads: 45, converted: 18 },
  { source: "Facebook", leads: 32, converted: 9 },
  { source: "Instagram", leads: 20, converted: 6 },
  { source: "Marketplace", leads: 18, converted: 5 },
  { source: "Others", leads: 13, converted: 2 },
];


// ei code ta dealerData.ts file er niche add koro (existing content er por)

export interface Notification {
  id: number;
  type: "lead" | "payment" | "inventory" | "team" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: 1,
    type: "lead",
    title: "New Lead Received",
    message: "James Miller is interested in Tesla Model Y.",
    timestamp: "2026-07-08T15:45:00",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    message: "Emily Davis completed payment for Toyota RAV4 2023 — $31,200.",
    timestamp: "2026-07-08T13:20:00",
    read: false,
  },
  {
    id: 3,
    type: "team",
    title: "Invite Accepted",
    message: "Rachel Green accepted your team invitation.",
    timestamp: "2026-07-08T10:05:00",
    read: false,
  },
  {
    id: 4,
    type: "inventory",
    title: "Low Stock Alert",
    message: "You're approaching your vehicle listing limit (48/50 used).",
    timestamp: "2026-07-07T18:30:00",
    read: true,
  },
  {
    id: 5,
    type: "lead",
    title: "Lead Status Updated",
    message: "David Wilson's lead moved to Qualified — ready to close.",
    timestamp: "2026-07-07T16:30:00",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "Weekly Report Ready",
    message: "Your dealership performance report for this week is available.",
    timestamp: "2026-07-06T09:00:00",
    read: true,
  },
];


// ei code ta dealerData.ts file er niche add koro (existing content er por)

export interface Transaction {
  id: number;
  customerName: string;
  vehicleName: string;
  amount: number;
  paymentMethod: "Visa" | "Mastercard" | "PayPal" | "Stripe";
  status: "Completed" | "Pending" | "Refunded";
  date: string;
  avatarInitials: string;
  gradient: string;
}

export const transactions: Transaction[] = [
  {
    id: 1,
    customerName: "Emily Davis",
    vehicleName: "Toyota RAV4 2023",
    amount: 31200,
    paymentMethod: "Visa",
    status: "Completed",
    date: "2026-07-08T13:20:00",
    avatarInitials: "ED",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 2,
    customerName: "David Wilson",
    vehicleName: "BMW X5 2023",
    amount: 65000,
    paymentMethod: "Stripe",
    status: "Pending",
    date: "2026-07-07T16:30:00",
    avatarInitials: "DW",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    customerName: "Michael Brown",
    vehicleName: "Honda Civic 2022",
    amount: 22000,
    paymentMethod: "Mastercard",
    status: "Completed",
    date: "2026-07-05T09:15:00",
    avatarInitials: "MB",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    customerName: "Sarah Johnson",
    vehicleName: "Toyota Camry 2023",
    amount: 28500,
    paymentMethod: "PayPal",
    status: "Completed",
    date: "2026-07-03T11:00:00",
    avatarInitials: "SJ",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: 5,
    customerName: "James Miller",
    vehicleName: "Tesla Model Y",
    amount: 47500,
    paymentMethod: "Stripe",
    status: "Refunded",
    date: "2026-06-28T15:45:00",
    avatarInitials: "JM",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 6,
    customerName: "Linda Garcia",
    vehicleName: "Ford F-150 2023",
    amount: 52400,
    paymentMethod: "Visa",
    status: "Completed",
    date: "2026-06-25T10:20:00",
    avatarInitials: "LG",
    gradient: "from-sky-500 to-blue-600",
  },
];

export const paymentStats = {
  totalRevenue: 245840,
  completedCount: 4,
  pendingCount: 1,
  refundedCount: 1,
};