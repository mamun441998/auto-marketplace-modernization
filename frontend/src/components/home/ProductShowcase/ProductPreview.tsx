"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import overviewImage from "@/assets/Product-Overview/1-Overview.png";
import inventoryImage from "@/assets/Product-Overview/2-Inventory.png";
import crmImage from "@/assets/Product-Overview/3-Leads-CRM.png";
import websiteImage from "@/assets/Product-Overview/4-Website.png";
import analyticsImage from "@/assets/Product-Overview/5-Analytics.png";

import { ModuleType } from "./types";

const productImages: Record<ModuleType, StaticImageData> = {
  dashboard: overviewImage,
  inventory: inventoryImage,
  crm: crmImage,
  website: websiteImage,
  analytics: analyticsImage,
};

const altText: Record<ModuleType, string> = {
  dashboard: "Dashboard overview",
  inventory: "Inventory management overview",
  crm: "CRM and lead management overview",
  website: "Website builder overview",
  analytics: "Analytics overview",
};

interface Props {
  active: ModuleType;
}

export default function ProductPreview({ active }: Props) {
  return (
    <motion.div layout className="relative w-full">
      <div className="relative mx-auto w-full border border-white/10 bg-[#111216] shadow-[0_20px_60px_rgba(0,0,0,.35)] rounded-[12px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[370px] w-full sm:h-[420px] md:h-[460px] xl:h-[490px] overflow-hidden rounded-[12px] bg-[#111216]"
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={productImages[active]}
                alt={altText[active]}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-fill object-center p-1 rounded-[8px]"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}