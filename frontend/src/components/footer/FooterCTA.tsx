import Link from "next/link";

export default function FooterCTA() {
  return (
    <div className="space-y-7">
      <h3 className="max-w-[400px] text-[28px] font-normal leading-[1.2] tracking-tight text-white md:text-[32px]">
        Start exploring and building with our latest dealership platform.
      </h3>

      <Link
        href="/register"
        className="inline-flex items-center justify-center rounded-full bg-[#29ABE2] px-7 py-3 text-[15px] font-semibold text-white shadow-lg shadow-[#29ABE2]/25 transition-colors hover:bg-[#1E93C6]"
      >
        Sign up and get started
      </Link>
    </div>
  );
}