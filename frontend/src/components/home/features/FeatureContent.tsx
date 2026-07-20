"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FeatureItem } from "./featuresData";

interface Props {
  feature: FeatureItem;
  allFeatures: readonly FeatureItem[];
  activeIndex: number;
}

export default function FeatureContent({ feature, allFeatures, activeIndex }: Props) {
  return (
    <div className="flex flex-col items-start text-left w-full">
      {/* 
        GRID STACK TRICK: 
        Sob content ek e grid cell-e stack kora thakbe. 
        Fole container-er height sobshomoy sobcheye boro text-tar soman fixed thakbe. 
        Kono jhakuni ba layout shift hobe na!
      */}
      <div className="grid w-full grid-cols-1 grid-rows-1">
        {allFeatures.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              className={`col-start-1 row-start-1 flex flex-col justify-start transition-opacity duration-300 ease-in-out ${
                isActive
                  ? "opacity-100 pointer-events-auto z-10"
                  : "opacity-0 pointer-events-none z-0 select-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FC5E01]" />
                {item.badge}
              </div>

              {/* Title */}
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                {item.title}
              </h2>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
                {item.description}
              </p>

              {/* Action Link */}
              <div className="mt-6">
                <Link
                  href={item.linkHref || "#"}
                  tabIndex={isActive ? 0 : -1}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#FC5E01]"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}