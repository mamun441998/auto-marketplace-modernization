import Link from "next/link";

const solutions = [
  { label: "Automotive CRM", href: "/solutions/crm" },
  { label: "Vehicle Inventory", href: "/solutions/inventory" },
  { label: "AI Vehicle Pricing", href: "/solutions/ai-pricing" },
  { label: "Lead Management", href: "/solutions/leads" },
  { label: "Digital Inspection", href: "/solutions/inspection" },
  { label: "Dealership Management", href: "/solutions/dealership" },
];

export default function FooterSolutions() {
  return (
    <div>
      <h4 className="mb-5 text-sm font-semibold tracking-wider text-white">Solutions</h4>
      <ul className="space-y-3 text-sm">
        {solutions.map((item, index) => (
          <li key={index}>
            <Link 
              href={item.href} 
              className="text-white hover:!text-[#FC5E01] transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}