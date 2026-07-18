export default function PricingHero() {
  return (
    <div className="flex flex-col items-center text-center px-4">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#171717] px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FC5E01]" />
        <span className="text-sm font-medium text-white">Simple, Transparent Pricing</span>
      </div>

      {/* Heading */}
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-5xl">
        Plans That Scale With
        <br />
        Your <span className="text-[#FC5E01]">Dealership</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-lg text-[#94A3B8]">
        Choose the perfect plan for your dealership. All plans include a 14-day
        free trial. No credit card required, cancel anytime.
      </p>
    </div>
  );
}