import {
  Building2,
  CarFront,
  Crown,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";

export const testimonialStats = [
  { icon: Building2, value: "530+", label: "Active Dealerships" },
  { icon: CarFront, value: "15K+", label: "Vehicles Managed" },
  { icon: TrendingUp, value: "98%", label: "Sales Growth" },
  { icon: ShieldCheck, value: "99%", label: "Customer Satisfaction" },
];

export const testimonials = [
  {
    id: 1,
    name: "Michael Anderson",
    company: "Anderson Auto Group",
    role: "Owner",
    rating: 5,
    avatar: "MA",
    gradient: "from-blue-500 to-cyan-500",
    quote:
      "We were using 3 different tools before — one for inventory, one for leads, and a separate website. Switched to MotoHave in March and cut our admin time by almost half. The VIN decoding alone saves my team 2-3 hours a week.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    company: "Prime Motors",
    role: "Sales Director",
    rating: 5,
    avatar: "SW",
    gradient: "from-violet-500 to-fuchsia-500",
    quote:
      "Honestly wasn't sure a new CRM would actually change anything, but the automated follow-up reminders caught leads we were straight up losing before. Our close rate went from around 18% to 27% in about 2 months.",
  },
  {
    id: 3,
    name: "Daniel Carter",
    company: "Carter Automotive",
    role: "General Manager",
    rating: 5,
    avatar: "DC",
    gradient: "from-green-500 to-emerald-500",
    quote:
      "Had our website live in under a day, which I didn't believe until it actually happened. The part I like most is that when I add a car to inventory, it just shows up on the site — no double entry, no syncing plugins.",
  },
  {
    id: 4,
    name: "Jessica Brown",
    company: "Elite Auto Sales",
    role: "Dealer Principal",
    rating: 5,
    avatar: "JB",
    gradient: "from-orange-500 to-red-500",
    quote:
      "My sales team isn't very technical and they picked this up in a day, no training sessions needed. Support answered a billing question at 9pm on a Sunday, which honestly surprised me.",
  },
  {
    id: 5,
    name: "Kevin Martinez",
    company: "Metro Cars",
    role: "Operations Manager",
    rating: 4,
    avatar: "KM",
    gradient: "from-sky-500 to-blue-600",
    quote:
      "We run 3 locations and MotoHave finally gave us one shared view of stock across all of them, instead of 3 separate spreadsheets. Reporting could still use a few more filter options, but overall it's been solid.",
  },
  {
    id: 6,
    name: "Emily Thompson",
    company: "Luxury Drive",
    role: "Managing Director",
    rating: 5,
    avatar: "ET",
    gradient: "from-pink-500 to-rose-500",
    quote:
      "The AI pricing suggestion flagged that we were underpricing two SUVs by almost $2,000 combined. Small thing, but it paid for a year of the subscription in one afternoon.",
  },
];

export const stars = [Star, Star, Star, Star, Star];

export const premiumBadge = {
  icon: Crown,
  title: "Trusted Worldwide",
  subtitle: "500+ Dealerships Choose MotoHave",
};