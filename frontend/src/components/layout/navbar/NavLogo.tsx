import Link from "next/link";
import Image from "next/image";

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center shrink-0 lg:ml-4"
      aria-label="MotoHave Home"
    >
      <Image
        src="/moto-have-logo.png"
        alt="MotoHave Logo"
        width={400}
        height={200}
        priority
        className="h-30 w-auto"
      />
    </Link>
  );
}