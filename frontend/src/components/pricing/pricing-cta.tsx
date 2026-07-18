import Link from "next/link";

export default function PricingCTA() {
  return (
    <div className="mt-28">
      <div className="relative overflow-hidden rounded-3xl border border-[#262626] bg-gradient-to-br from-[#171717] to-[#141414] px-8 py-16 text-center sm:px-16">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#FC5E01]/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Transform Your Dealership?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#94A3B8]">
            Join 500+ dealerships already growing with MotoHave. Start your
            14-day free trial today, no credit card required.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#FC5E01] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#E55A00] active:scale-[0.985]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-[#262626] bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1a263f] hover:border-[#FC5E01]"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}