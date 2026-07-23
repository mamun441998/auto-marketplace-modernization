import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SolutionCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function SolutionCTA({
  title = "Ready to Transform Your Dealership?",
  description = "Start your free trial today and experience the future of automotive dealership management.",
  buttonText = "Get Started",
  buttonLink = "/register",
}: SolutionCTAProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-[32px] border border-[#FC5E01]/30 bg-gradient-to-br from-[#FC5E01]/20 to-[#111827] p-12 text-center">

          <h2 className="text-4xl font-bold text-white">
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            {description}
          </p>

          <Link
            href={buttonLink}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#FC5E01] px-8 py-4 font-semibold text-white transition hover:bg-[#ff6a1a]"
          >
            {buttonText}
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

      </div>
    </section>
  );
}