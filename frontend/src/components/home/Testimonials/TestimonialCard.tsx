"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  company: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
  gradient: string;
};

export default function TestimonialCard({
  name,
  company,
  role,
  quote,
  avatar,
  rating,
  gradient,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-[#262626] bg-[#171717] p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-[#FC5E01]/30 hover:shadow-2xl hover:shadow-[#FC5E01]/5"
    >
      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#FC5E01]/10 blur-3xl opacity-60" />

      {/* Avatar + Quote Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${gradient} text-base font-bold text-white shadow-lg`}
        >
          {avatar}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0A] border border-[#262626] text-[#FC5E01]">
          <Quote size={16} />
        </div>
      </div>

      {/* Name */}
      <div className="relative z-10 mt-4">
        <h3 className="text-base font-bold text-white">{name}</h3>
        <p className="mt-0.5 text-xs font-medium text-[#FC5E01]">{role}</p>
        <p className="text-xs text-[#64748B]">{company}</p>
      </div>

      {/* Stars */}
      <div className="relative z-10 mt-3 flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={index < rating ? "fill-amber-400 text-amber-400" : "fill-[#262626] text-[#262626]"}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="relative z-10 mt-3.5 text-sm leading-6 text-[#94A3B8]">
        "{quote}"
      </p>

      {/* Bottom */}
      <div className="relative z-10 mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-400">
          ✔ Verified Dealer
        </span>
        <span className="rounded-full bg-[#0A0A0A] border border-[#262626] px-2.5 py-1 text-[10px] font-semibold text-white/70">
          MotoHave User
        </span>
      </div>
    </motion.div>
  );
}