import FooterBrand from "./FooterBrand";
import FooterCTA from "./FooterCTA";
import FooterColumns from "./FooterColumns";

export default function Footer() {
  return (
    <footer className="bg-[#121317] text-white">
      <div className="mx-auto max-w-[1600px] px-5 pt-16 pb-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        {/* Top: CTA (left) + Columns (right) */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="lg:w-[30%] lg:max-w-[400px]">
            <FooterCTA />
          </div>
          <div className="lg:flex-1">
            <FooterColumns />
          </div>
        </div>

        {/* Brand logo */}
        <div className="mt-12 md:mt-14">
          <FooterBrand />
        </div>

        {/* Bottom bar */}
        <div className="mt-8">
        </div>
      </div>
    </footer>
  );
}