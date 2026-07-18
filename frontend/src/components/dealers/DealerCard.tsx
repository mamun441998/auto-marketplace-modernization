// src/components/dealers/DealerCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Star, CarFront, BadgeCheck } from "lucide-react";
import { Dealer } from "./dealersData";

interface DealerCardProps {
  dealer: Dealer;
  index: number;
}

export default function DealerCard({ dealer, index }: DealerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-[#262626] bg-[#171717] p-6 transition-all duration-300 hover:border-[#2d3d5e] hover:shadow-xl hover:shadow-black/20"
    >
      {/* Header: Avatar + Verified Badge */}
      <div className="flex items-start justify-between">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${dealer.gradient} text-lg font-bold text-white shadow-sm`}>
          {dealer.avatarInitials}
        </div>

        {dealer.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
            <BadgeCheck size={12} />
            Verified
          </span>
        )}
      </div>

      {/* Name + Location */}
      <h3 className="mt-4 text-lg font-bold text-white group-hover:text-[#FC5E01] transition-colors">
        {dealer.name}
      </h3>
      <div className="mt-1 flex items-center gap-1.5 text-sm text-[#94A3B8]">
        <MapPin size={14} className="text-[#64748B]" />
        {dealer.city}, {dealer.state}
      </div>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-white">{dealer.rating}</span>
        </div>
        <span className="text-xs text-[#64748B]">({dealer.reviewCount} reviews)</span>
      </div>

      {/* Specialties */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {dealer.specialties.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#262626] bg-[#0A0A0A] px-2.5 py-1 text-[11px] font-medium text-[#94A3B8]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Inventory Count + CTA */}
      <div className="mt-5 flex items-center justify-between border-t border-[#262626] pt-4">
        <div className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
          <CarFront size={16} className="text-[#FC5E01]" />
          <span className="font-bold text-white">{dealer.inventoryCount}</span> vehicles
        </div>

        <Link
          href={`/inventory?dealer=${dealer.id}`}
          className="rounded-lg bg-[#FC5E01]/10 border border-[#FC5E01]/20 px-3 py-1.5 text-xs font-semibold text-[#FC5E01] transition-colors hover:bg-[#FC5E01] hover:text-white"
        >
          View Inventory
        </Link>
      </div>
    </motion.div>
  );
}