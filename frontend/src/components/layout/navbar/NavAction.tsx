import Link from "next/link";

export default function NavAction() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      {/* Sign In Button */}
      <Link 
        href="/sign-in"
        className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition-all hover:border-[#AA4D20] hover:bg-white/5 hover:text-[#AA4D20]"
      >
        Sign In
      </Link>

      {/* Get Started Button - Glow Effect */}
      <Link 
        href="/register"
        className="rounded-lg bg-[#FF6B00] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#AA4D20] hover:shadow-[0_0_0_4px_rgba(255,107,0,0.25)]"
      >
        Get Started
      </Link>
    </div>
  );
}