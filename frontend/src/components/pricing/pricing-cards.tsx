"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import PricingToggle from "./pricing-toggle";
import { pricingPlans } from "@/lib/pricing-data";
import { BillingCycle } from "@/types/pricing";

export default function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="mt-14">
      {/* Toggle */}
      <PricingToggle billingCycle={billingCycle} onChange={setBillingCycle} />

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
        {pricingPlans.map((plan) => {
          const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
          const period = billingCycle === "monthly" ? "/month" : "/year";

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.isPopular
                  ? "border-[#FC5E01] bg-[#171717] shadow-[0_0_40px_rgba(252,94,1,0.15)] lg:-translate-y-4"
                  : "border-[#262626] bg-[#141414] hover:border-[#2d3d5e]"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-[#FC5E01] px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name & Tagline */}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-[#94A3B8]">{plan.tagline}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">${price}</span>
                <span className="text-sm text-[#94A3B8]">{period}</span>
              </div>
              {billingCycle === "yearly" && (
                <p className="mt-1 text-xs text-[#22C55E]">
                  ${(price / 12).toFixed(0)}/month billed annually
                </p>
              )}

              {/* CTA Button */}
              <Link
                href={plan.ctaHref}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold transition-all active:scale-[0.985] ${
                  plan.isPopular
                    ? "bg-[#FC5E01] text-white hover:bg-[#E55A00]"
                    : "border border-[#262626] bg-transparent text-white hover:bg-[#1a263f] hover:border-[#FC5E01]"
                }`}
              >
                {plan.ctaLabel}
              </Link>

              {/* Features */}
              <ul className="mt-8 flex flex-col gap-4">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#22C55E]" />
                    ) : (
                      <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#4B5563]" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-white" : "text-[#4B5563] line-through"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}