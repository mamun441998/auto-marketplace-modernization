"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ইমেজ ফাইলটি এখানে সরাসরি ইম্পোর্ট করে নেওয়া হলো
import HeroImageFinal from "@/assets/HeroImage/Hero-Image-Final.png";

export default function HeroSlider() {
  return (
    <div className="relative mx-auto w-full max-w-[1320px]">
      {/* Glass Frame */}
      <div className="relative overflow-hidden rounded-[30px] border border-white/5 bg-[#171A20] shadow-[0_40px_120px_rgba(0,0,0,.45)]">
        
        {/* Card Content Layout */}
        <div className="relative aspect-[18/9] w-full p-2 lg:p-3">
          
          {/* Inner Dark Background */}
          <div className="relative h-full w-full overflow-hidden rounded-[22px] border border-white/5 bg-[#0D0D10] flex items-center justify-center">
            
            {/* Image Wrapper */}
            <motion.div
              animate={{ scale: [1, 1.005, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full p-2"
            >
              <Image
                src={HeroImageFinal} // এখানে অবজেক্ট হিসেবে ইমেজটি সরাসরি বসানো হলো
                alt="MotoHave Dashboard Preview"
                fill
                priority
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="object-contain object-center select-none pointer-events-none"
              />
            </motion.div>

            {/* Glass Overlays */}
            <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/[0.02] via-transparent to-black/[0.06] pointer-events-none" />
            <div className="absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}