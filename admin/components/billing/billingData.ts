// admin/components/billing/billingData.ts

export interface PlanConfig {
  id: number;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  activeSubscribers: number;
  features: string[];
}

export const planConfigs: PlanConfig[] = [
  {
    id: 1,
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 470,
    activeSubscribers: 210,
    features: [
      "Up to 50 vehicle listings",
      "Basic CRM & lead tracking",
      "1 team member",
      "Email support",
    ],
  },
  {
    id: 2,
    name: "Professional",
    monthlyPrice: 129,
    yearlyPrice: 1238,
    activeSubscribers: 245,
    features: [
      "Up to 500 vehicle listings",
      "Advanced CRM & sales pipeline",
      "Up to 10 team members",
      "Priority support (24/7 chat)",
      "AI vehicle pricing",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    monthlyPrice: 299,
    yearlyPrice: 2870,
    activeSubscribers: 75,
    features: [
      "Unlimited vehicle listings",
      "Advanced CRM & sales pipeline",
      "Unlimited team members",
      "Dedicated account manager",
      "Custom ERP integration",
    ],
  },
];

export interface Subscription {
  id: number;
  dealerName: string;
  avatarInitials: string;
  gradient: string;
  plan: "Starter" | "Professional" | "Enterprise";
  billingCycle: "Monthly" | "Yearly";
  amount: number;
  nextBillingDate: string;
  status: "Paid" | "Pending" | "Failed";
}

export const subscriptions: Subscription[] = [
  { id: 1, dealerName: "Anderson Auto Group", avatarInitials: "AA", gradient: "from-blue-500 to-cyan-500", plan: "Professional", billingCycle: "Monthly", amount: 129, nextBillingDate: "2026-08-15", status: "Paid" },
  { id: 2, dealerName: "Prime Motors", avatarInitials: "PM", gradient: "from-violet-500 to-fuchsia-500", plan: "Enterprise", billingCycle: "Yearly", amount: 2870, nextBillingDate: "2026-11-02", status: "Paid" },
  { id: 3, dealerName: "Elite Auto Sales", avatarInitials: "EA", gradient: "from-orange-500 to-red-500", plan: "Professional", billingCycle: "Monthly", amount: 129, nextBillingDate: "2026-08-19", status: "Paid" },
  { id: 4, dealerName: "Metro Cars", avatarInitials: "MC", gradient: "from-sky-500 to-blue-600", plan: "Enterprise", billingCycle: "Monthly", amount: 299, nextBillingDate: "2026-07-04", status: "Failed" },
  { id: 5, dealerName: "Luxury Drive", avatarInitials: "LD", gradient: "from-pink-500 to-rose-500", plan: "Enterprise", billingCycle: "Yearly", amount: 2870, nextBillingDate: "2026-12-10", status: "Paid" },
  { id: 6, dealerName: "Sunrise Auto", avatarInitials: "SA", gradient: "from-amber-500 to-orange-600", plan: "Professional", billingCycle: "Monthly", amount: 129, nextBillingDate: "2026-08-08", status: "Pending" },
  { id: 7, dealerName: "Northgate Auto", avatarInitials: "NA", gradient: "from-rose-500 to-pink-600", plan: "Professional", billingCycle: "Monthly", amount: 129, nextBillingDate: "2026-07-30", status: "Paid" },
];

export const billingStats = {
  mrr: 68420,
  activeSubscriptions: 468,
  failedPayments: 1,
  avgRevenuePerDealer: 146,
};