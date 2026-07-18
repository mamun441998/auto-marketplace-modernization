// src/components/home/Everything/EverythingCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EverythingItem } from "./everythingData";

interface EverythingCardProps {
  item: EverythingItem;
  index: number;
}

export default function EverythingCard({ item, index }: EverythingCardProps) {
  const renderIcon = () => {
    const iconClasses = "w-5 h-5 transition-transform duration-300 group-hover:scale-110";
    switch (item.iconType) {
      case "inventory":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1a1 1 0 001-1v-4a1 1 0 00-1-1h-3m4 5a1 1 0 001-1v-4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1m-3-7h3m-3 3h3" />
          </svg>
        );
      case "crm":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "analytics":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
        );
      case "website":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
        );
      case "marketing":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      case "ai":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "payment":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 10h20" />
          </svg>
        );
      case "deal":
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="transform-gpu backface-hidden"
    >
      <Link
        href={item.href}
        className="group relative flex h-full flex-col rounded-2xl border border-[#262626] bg-[#171717] p-6 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#2d3d5e] hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
      >
        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

        <div className="relative z-10 flex flex-col h-full justify-between gap-5 select-none">
          <div className="flex items-center justify-between w-full">
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${item.accentColor} shadow-sm`}>
              {renderIcon()}
            </div>
            <div className="p-1.5 rounded-full border border-[#262626] bg-[#141414] group-hover:bg-[#1a263f] group-hover:border-[#2d3d5e] transition-colors duration-300">
              <svg className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#FC5E01] transition-colors duration-200">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed text-[#94A3B8] font-normal">
              {item.description}
            </p>
          </div>

          <div className="pt-3.5 border-t border-[#262626] flex items-center justify-between text-[10px] font-mono tracking-wider">
            <span className="text-[#64748B] font-medium uppercase">{item.liveLabel}</span>
            <span className="text-white font-bold bg-[#141414] px-2 py-0.5 rounded border border-[#262626] group-hover:bg-[#FC5E01]/10 group-hover:border-[#FC5E01]/30 group-hover:text-[#FC5E01] transition-colors duration-300">
              {item.liveValue}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}