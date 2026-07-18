export interface FeatureItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  highlightText: string;
  colorTheme: string;
}

export const featuresData: FeatureItem[] = [
  {
    id: 1,
    badge: "AI Marketing",
    title: "AI-Powered Smart Campaign Booster",
    description:
      "Launch automated Facebook, Instagram, and Google ads for your dealership inventory in one click. Our smart AI auto-generates copy and targets high-intent car buyers seamlessly.",
    highlightText: "3x Higher Lead Conversion Rate",
    colorTheme: "from-[#FC5E01] to-[#E5540A]",
  },
  {
    id: 2,
    badge: "Real-Time Analytics",
    title: "Next-Gen Intelligent Command Center",
    description:
      "Track your entire dealership inventory, customer inquiries, and sales metrics from a centralized dashboard. Real-time data graphs give you total business control.",
    highlightText: "All Dealership Data In One Viewport",
    colorTheme: "from-blue-600 to-indigo-600",
  },
  {
    id: 3,
    badge: "Smart Listing",
    title: "Instant Car Valuation & Listing Engine",
    description:
      "Upload a car image and let our advanced AI vision instantly detect the model, specs, and condition to auto-generate a premium, conversion-optimized marketplace listing.",
    highlightText: "Reduce Listing Time By Over 90%",
    colorTheme: "from-violet-600 to-fuchsia-600",
  },
  {
    id: 4,
    badge: "Secure Deals",
    title: "Seamless Dealer-to-Buyer Checkout",
    description:
      "Close deals faster with secure integrated payment gateways, instant digital documentation signing, and automated invoice generation for a completely paperless workflow.",
    highlightText: "100% Secure & Encrypted Transactions",
    colorTheme: "from-emerald-600 to-teal-600",
  },
];