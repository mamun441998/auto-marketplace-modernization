// src/components/home/Everything/EverythingGrid.tsx
"use client";

import React from "react";
import { everythingData } from "./everythingData";
import EverythingCard from "./EverythingCard";

export default function EverythingGrid() {
  return (
    <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {everythingData.map((item, index) => (
          <EverythingCard
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}