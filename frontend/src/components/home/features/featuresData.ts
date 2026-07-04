export interface FeatureItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  highlightText: string;
  imagePath: string;
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
    imagePath: "/feature-first-image.png",
    colorTheme: "from-blue-600 via-blue-500 to-cyan-400",
  },
  {
    id: 2,
    badge: "SaaS Dashboard",
    title: "Next-Gen Intelligent Analytics Hub",
    description:
      "Track your entire dealership inventory, customer inquiries, and sales metrics from a centralized command center. Real-time data graphs give you total business control.",
    highlightText: "All dealership data in a single viewport",
    imagePath: "/images/features/dealership-dashboard.svg",
    colorTheme: "from-blue-700 via-indigo-600 to-blue-500",
  },
  {
    id: 3,
    badge: "Smart Selling",
    title: "Instant Car Valuation & Listing Engine",
    description:
      "Upload a car image and let our advanced AI vision instantly detect the model, specs, and condition to auto-generate a premium, conversion-optimized marketplace listing.",
    highlightText: "Reduce listing time by over 90%",
    imagePath: "/images/features/car-listing-ai.svg",
    colorTheme: "from-cyan-500 via-blue-500 to-indigo-600",
  },
  {
    id: 4,
    badge: "Secure Deals",
    title: "Seamless Dealer-to-Buyer Portal",
    description:
      "Close deals faster with secure integrated payment gateways, instant digital documentation signing, and automated invoice generation for a completely paperless workflow.",
    highlightText: "100% Secure & Encrypted Transactions",
    imagePath: "/images/features/secure-digital-deals.svg",
    colorTheme: "from-blue-600 via-cyan-500 to-blue-400",
  },
];