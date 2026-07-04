import Link from "next/link";

const resources = [
  { label: "Help Center", href: "/help" },
  { label: "Documentation", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Webinars", href: "/webinars" },
];

export default function FooterResources() {
  return (
    <div>
      <h4 className="mb-5 text-sm font-semibold tracking-wider text-white">Resources</h4>
      <ul className="space-y-3 text-sm">
        {resources.map((item, index) => (
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