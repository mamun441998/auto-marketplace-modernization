"use client";

import { motion } from "framer-motion";
import { CircleHelp } from "lucide-react";

export default function FAQHeader() {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#24314F] bg-[#131D34] px-5 py-2 text-sm font-semibold text-white">
        <CircleHelp size={16} className="text-orange-400" />
        Frequently Asked Questions
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
        Got Questions?
        <span className="mt-2 block text-[#EC5707]">
          We've Got Answers
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        Learn more about MotoHave, our dealership platform,
        pricing, security, CRM, inventory management, and
        everything you need before getting started.
      </p>
    </motion.div>
  );
}