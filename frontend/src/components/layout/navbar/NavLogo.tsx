import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/final-logo-removebg-preview.png";

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center shrink-0 lg:ml-4"
      aria-label="MotoHave Home"
    >
      <Image
        src={logo}
        alt="MotoHave Logo"
        width={160}
        height={80}
        priority
        className="h-20 w-60 object-contain"
      />
    </Link>
  );
}