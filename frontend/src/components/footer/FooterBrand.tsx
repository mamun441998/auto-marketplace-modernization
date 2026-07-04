import Link from "next/link";

const socialLinks = [
  { name: "Facebook", href: "#", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { name: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { name: "X", href: "#", icon: "M18.244 2.25l-7.451 8.502L4.5 2.25H1.5l6.99 8.01L1.5 21.75h3l6.3-7.2 6.3 7.2h3l-6.99-8.01L21.75 2.25h-3.506z" },
  { name: "YouTube", href: "#", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l6.425 4-6.425 4z" },
  { name: "LinkedIn", href: "#", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
];

export default function FooterBrand() {
  return (
    <div className="max-w-sm">
      {/* Logo + Brand Name */}
      <Link href="/" className="flex items-center gap-3">
        <img 
          src="/moto-have-logo.png" 
          alt="MotoHave Logo" 
          className="h-30 w-auto" 
        />
        
      </Link>

      {/* Description */}
      <p className="mt-5 text-sm leading-relaxed text-[#94a3b8]">
        AI-powered platform for car dealerships. Manage inventory, 
        generate leads, and grow your business with intelligent tools.
      </p>

      {/* Address & Contact */}
      <div className="mt-6 space-y-1 text-sm text-[#64748b]">
        
        <p>+880 1978529953 • motohave@gmail.com</p>
      </div>

      {/* Social Icons */}
      <div className="mt-6 flex gap-3">
        {socialLinks.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            aria-label={social.name}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1e2a4a] text-white transition-all hover:border-[#FD6001] hover:text-[#FD6001]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d={social.icon} />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}