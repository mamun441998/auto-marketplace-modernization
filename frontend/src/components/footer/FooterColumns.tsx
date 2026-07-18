import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Vehicle Inventory", href: "/features/inventory" },
      { label: "CRM & Lead Management", href: "/features/crm" },
      { label: "AI Automation", href: "/features/ai-automation" },
      { label: "Website & Domain Builder", href: "/features/website-builder" },
      { label: "Analytics & Reports", href: "/features/analytics" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Dealerships", href: "/solutions/dealerships" },
      { label: "For Auto Groups", href: "/solutions/auto-groups" },
      { label: "AI Campaign Booster", href: "/solutions/ai-campaigns" },
      { label: "Enterprise Security", href: "/solutions/security" },
      { label: "Marketplace", href: "/solutions/marketplace" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Dealers", href: "/dealers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Book a Demo", href: "/demo" },
      { label: "Start Free Trial", href: "/register" },
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/#faq" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function FooterColumns() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 pl-6 sm:grid-cols-4 sm:pl-10">
      {columns.map((col) => (
        <div key={col.title} className="space-y-4">
          <h4 className="text-[15px] font-medium text-white">{col.title}</h4>
          <ul className="space-y-3">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[15px] text-white/45 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}