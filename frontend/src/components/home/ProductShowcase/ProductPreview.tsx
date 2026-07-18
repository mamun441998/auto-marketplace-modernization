// src/components/home/ProductShowcase/ProductPreview.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import DashboardOverview from "./dashboard/DashboardOverview";
import DashboardCRM from "./dashboard/DashboardCRM";
import DashboardInventory from "./dashboard/DashboardInventory";
import DashboardWebsite from "./dashboard/DashboardWebsite";
import DashboardAIPayments from "./dashboard/DashboardAIPayments";
import MocBrowser from "./dashboard/MocBrowser";

type Props = {
  activeTab: string;
};

export default function ProductPreview({ activeTab }: Props) {
  return (
    <div className="w-full max-w-[660px] xl:max-w-[720px] transition-all duration-500 origin-top">
      <div className="relative rounded-[20px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] bg-[#141414]">
        <MocBrowser>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              {activeTab === "dashboard" && <DashboardOverview />}
              {activeTab === "inventory" && <DashboardInventory />}
              {activeTab === "crm" && <DashboardCRM />}
              {activeTab === "website" && <DashboardWebsite />}
              {activeTab === "ai-payments" && <DashboardAIPayments />}
            </motion.div>
          </AnimatePresence>
        </MocBrowser>
      </div>
    </div>
  );
}