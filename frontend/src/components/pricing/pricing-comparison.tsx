import { Fragment } from "react";
import { Check, X } from "lucide-react";
import { comparisonFeatures, pricingPlans } from "@/lib/pricing-data";

export default function PricingComparison() {
  // Group features by category
  const categories = Array.from(
    new Set(comparisonFeatures.map((item) => item.category))
  );

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="mx-auto h-5 w-5 text-[#22C55E]" />
      ) : (
        <X className="mx-auto h-5 w-5 text-[#4B5563]" />
      );
    }
    return <span className="text-sm font-medium text-white">{value}</span>;
  };

  // Helper to get the value for a specific plan key on a feature row
  const getPlanValue = (
    row: (typeof comparisonFeatures)[number],
    planKey: "starter" | "professional" | "enterprise"
  ) => row[planKey];

  return (
    <div className="mt-28">

      {/* Section Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Compare All <span className="text-[#FC5E01]">Features</span>
        </h2>
        <p className="mt-4 text-lg text-[#94A3B8]">
          A detailed look at what each plan includes
        </p>
      </div>

      {/* ---------- DESKTOP TABLE (lg and up, matches pricing-cards breakpoint) ---------- */}
      <div className="mt-12 hidden overflow-x-auto rounded-2xl border border-[#262626] bg-[#141414] lg:block">
        <table className="w-full min-w-[700px] border-collapse">
          {/* Header */}
          <thead>
            <tr className="border-b border-[#262626]">
              <th className="px-6 py-5 text-left text-sm font-semibold text-[#94A3B8]">
                Features
              </th>
              <th className="px-6 py-5 text-center text-sm font-semibold text-white">
                Starter
              </th>
              <th className="px-6 py-5 text-center text-sm font-semibold text-white">
                <span className="rounded-full bg-[#FC5E01]/10 px-3 py-1 text-[#FC5E01]">
                  Professional
                </span>
              </th>
              <th className="px-6 py-5 text-center text-sm font-semibold text-white">
                Enterprise
              </th>
            </tr>
          </thead>

          {/* Body grouped by category */}
          <tbody>
            {categories.map((category) => (
              <Fragment key={`cat-${category}`}>
                {/* Category Row */}
                <tr className="bg-[#171717]">
                  <td
                    colSpan={4}
                    className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#FC5E01]"
                  >
                    {category}
                  </td>
                </tr>

                {/* Feature Rows */}
                {comparisonFeatures
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#262626] last:border-0 hover:bg-[#171717]/50"
                    >
                      <td className="px-6 py-4 text-sm text-white">{item.feature}</td>
                      <td className="px-6 py-4 text-center">{renderCell(item.starter)}</td>
                      <td className="px-6 py-4 text-center">{renderCell(item.professional)}</td>
                      <td className="px-6 py-4 text-center">{renderCell(item.enterprise)}</td>
                    </tr>
                  ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- MOBILE/TABLET STACKED CARDS (below lg, matches pricing-cards breakpoint) ---------- */}
      <div className="mt-12 flex flex-col gap-8 lg:hidden">
        {pricingPlans.map((plan) => {
          const planKey = plan.name.toLowerCase() as
            | "starter"
            | "professional"
            | "enterprise";

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-5 ${
                plan.isPopular
                  ? "border-[#FC5E01] bg-[#171717]"
                  : "border-[#262626] bg-[#141414]"
              }`}
            >
              {/* Plan Name Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                {plan.isPopular && (
                  <span className="rounded-full bg-[#FC5E01] px-3 py-1 text-xs font-bold text-white">
                    POPULAR
                  </span>
                )}
              </div>

              {/* Categories & Features */}
              <div className="flex flex-col gap-5">
                {categories.map((category) => (
                  <div key={`${plan.id}-${category}`}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#FC5E01]">
                      {category}
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {comparisonFeatures
                        .filter((item) => item.category === category)
                        .map((item) => {
                          const value = getPlanValue(item, planKey);
                          const isBoolean = typeof value === "boolean";
                          const isIncluded = isBoolean ? value : true;

                          return (
                            <li
                              key={item.id}
                              className="flex items-start justify-between gap-3"
                            >
                              <span
                                className={`text-sm ${
                                  isIncluded ? "text-white" : "text-[#4B5563] line-through"
                                }`}
                              >
                                {item.feature}
                              </span>
                              <span className="flex-shrink-0">
                                {isBoolean ? (
                                  value ? (
                                    <Check className="h-5 w-5 text-[#22C55E]" />
                                  ) : (
                                    <X className="h-5 w-5 text-[#4B5563]" />
                                  )
                                ) : (
                                  <span className="text-sm font-semibold text-white">
                                    {value}
                                  </span>
                                )}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}