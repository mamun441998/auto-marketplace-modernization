"use client";

import React, { ReactNode } from 'react';

interface AuthGridProps {
  brandingNode: ReactNode;
  formNode: ReactNode;
}

export const AuthGrid: React.FC<AuthGridProps> = ({ brandingNode, formNode }) => {
  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-12 items-center">
      
      {/* ফর্ম কার্ড অংশ: মোবাইলে আরও ওপরে তুলতে নেগেটিভ মার্জিন (-mt-10 sm:-mt-12) অনেক বাড়ানো হয়েছে */}
      <div className="w-full lg:col-span-7 flex items-center justify-center lg:justify-end order-1 lg:order-2 -mt-10 sm:-mt-12 lg:mt-0">
        <div className="w-full max-w-[480px] lg:-mr-6">
          {formNode}
        </div>
      </div>
      
      {/* ব্র্যান্ডিং ও কন্টেন্ট অংশ: মোবাইলে ফর্মের নিচে থাকবে */}
      <div className="w-full lg:col-span-5 flex flex-col justify-center space-y-6 lg:space-y-8 pr-0 lg:pr-4 order-2 lg:order-1 pt-4">
        {brandingNode}
      </div>
      
    </div>
  );
};