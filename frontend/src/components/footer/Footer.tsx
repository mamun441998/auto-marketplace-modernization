import FooterBrand from "./FooterBrand";
import FooterCTA from "./FooterCTA";
import FooterColumns from "./FooterColumns";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-[#121317] text-white w-full">
      <div className="w-full px-5 pt-16 pb-2 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
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
        <FooterBottom />
      </div>
    </footer>
  );
}