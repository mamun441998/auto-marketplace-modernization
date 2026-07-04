import Link from "next/link";

interface FooterNavigationProps {
  title?: string;
  links?: Array<{ label: string; href: string }>;
}

export default function FooterNavigation({ 
  title = "Company", 
  links = [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
    
    { label: "Contact", href: "/contact" },
  ] 
}: FooterNavigationProps) {
  return (
    <div>
      <h4 className="mb-5 text-sm font-semibold tracking-wider text-white">{title}</h4>
      <ul className="space-y-3 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-white hover:!text-[#FC5E01] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}