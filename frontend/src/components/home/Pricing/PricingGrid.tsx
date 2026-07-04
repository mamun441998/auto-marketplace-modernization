"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import PricingCard from "./PricingCard";
import PricingToggle from "./PricingToggle";
import { pricingPlans } from "./pricingData";

export default function PricingGrid() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      {/* Toggle */}

      <PricingToggle
        yearly={yearly}
        setYearly={setYearly}
      />

      {/* Cards */}

      <motion.div
        className="
          mt-14

          grid

          grid-cols-1

          gap-6

          md:grid-cols-2
          md:gap-6

          lg:grid-cols-3
          lg:gap-5

          items-stretch
        "
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.id}
            className="flex h-full"
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="w-full">
              <PricingCard
                icon={plan.icon}
                name={plan.name}
                description={plan.description}
                monthlyPrice={plan.monthlyPrice}
                yearlyPrice={plan.yearlyPrice}
                yearly={yearly}
                button={plan.button}
                popular={plan.popular}
                badge={plan.badge}
                features={plan.features}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}