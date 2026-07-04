"use client";

import { motion } from "framer-motion";
import { Check } from "./pricingData";

type PricingCardProps = {
  icon: React.ElementType;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearly: boolean;
  button: string;
  popular: boolean;
  badge: string;
  features: string[];
};

export default function PricingCard({
  icon: Icon,
  name,
  description,
  monthlyPrice,
  yearlyPrice,
  yearly,
  button,
  popular,
  badge,
  features,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: popular ? 1.035 : 1.02,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`
        relative
        flex
        flex-col
        overflow-hidden

        rounded-[28px]

        border

        bg-white

        p-5

        shadow-lg

        transition-all
        duration-300

        ${
          popular
            ? "border-blue-600 shadow-blue-200/60 scale-[1.03] z-10"
            : "border-slate-200 hover:border-blue-200"
        }
      `}
    >
      {/* Badge */}

      {popular && (
        <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white">
          {badge}
        </div>
      )}

      {/* Icon */}

      <div
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl

          ${
            popular
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-600"
          }
        `}
      >
        <Icon size={20} />
      </div>

      {/* Title */}

      <h3 className="mt-4 text-xl font-bold text-slate-900">
        {name}
      </h3>

      {/* Description */}

      <p className="mt-1.5 text-sm leading-5 text-slate-600">
        {description}
      </p>

      {/* Price */}

      <div className="mt-4 flex items-end gap-1">
        <motion.h2
          key={yearly ? yearlyPrice : monthlyPrice}
          className="text-[36px] font-extrabold text-slate-900"
        >
          ${yearly ? yearlyPrice : monthlyPrice}
        </motion.h2>

        <span className="mb-1 text-sm text-slate-500">
          / {yearly ? "year" : "month"}
        </span>
      </div>

      {/* Button */}

      <button
        className={`
          mt-5
          w-full
          rounded-xl
          py-2.5
          text-sm
          font-semibold
          transition-all

          ${
            popular
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-100 text-slate-900 hover:bg-slate-200"
          }
        `}
      >
        {button}
      </button>

      {/* Divider */}

      <div className="my-5 h-px bg-slate-100" />

      {/* Features */}

      <div className="space-y-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Check size={10} />
            </div>

            <span className="text-[13px] text-slate-700 leading-5">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}