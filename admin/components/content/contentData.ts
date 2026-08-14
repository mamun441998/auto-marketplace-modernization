// admin/components/content/contentData.ts

export interface AdminTestimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  rating: number;
  quote: string;
  avatarInitials: string;
  gradient: string;
  published: boolean;
}

export const adminTestimonials: AdminTestimonial[] = [
  {
    id: 1,
    name: "Michael Anderson",
    company: "Anderson Auto Group",
    role: "Owner",
    rating: 5,
    quote: "We were using 3 different tools before — one for inventory, one for leads, and a separate website. Switched to MotoHave in March and cut our admin time by almost half.",
    avatarInitials: "MA",
    gradient: "from-blue-500 to-cyan-500",
    published: true,
  },
  {
    id: 2,
    name: "Sarah Williams",
    company: "Prime Motors",
    role: "Sales Director",
    rating: 5,
    quote: "Honestly wasn't sure a new CRM would actually change anything, but the automated follow-up reminders caught leads we were straight up losing before.",
    avatarInitials: "SW",
    gradient: "from-violet-500 to-fuchsia-500",
    published: true,
  },
  {
    id: 3,
    name: "Daniel Carter",
    company: "Carter Automotive",
    role: "General Manager",
    rating: 5,
    quote: "Had our website live in under a day, which I didn't believe until it actually happened.",
    avatarInitials: "DC",
    gradient: "from-green-500 to-emerald-500",
    published: true,
  },
  {
    id: 4,
    name: "Kevin Martinez",
    company: "Metro Cars",
    role: "Operations Manager",
    rating: 4,
    quote: "We run 3 locations and MotoHave finally gave us one shared view of stock across all of them, instead of 3 separate spreadsheets.",
    avatarInitials: "KM",
    gradient: "from-sky-500 to-blue-600",
    published: false,
  },
];

export interface AdminFAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  published: boolean;
}

export const adminFAQs: AdminFAQItem[] = [
  {
    id: 1,
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan anytime from your dashboard. Changes take effect immediately, and billing is prorated automatically.",
    category: "Billing",
    published: true,
  },
  {
    id: 2,
    question: "Is there a free trial?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required to get started.",
    category: "General",
    published: true,
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, PayPal, and Stripe-supported payment methods for all subscription plans.",
    category: "Billing",
    published: true,
  },
  {
    id: 4,
    question: "Do you offer discounts for annual billing?",
    answer: "Yes, choosing yearly billing saves you approximately 20% compared to monthly billing on all plans.",
    category: "Billing",
    published: true,
  },
  {
    id: 5,
    question: "What happens if I exceed my listing limit?",
    answer: "We'll notify you before you reach your limit. You can upgrade your plan anytime to increase your vehicle listing capacity.",
    category: "General",
    published: true,
  },
  {
    id: 6,
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription anytime from your account settings with no cancellation fees.",
    category: "Billing",
    published: true,
  },
];