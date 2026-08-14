// admin/app/content/page.tsx
"use client";

import { useState } from "react";
import ContentTabs from "@/components/content/ContentTabs";
import TestimonialsManager from "@/components/content/TestimonialsManager";
import FAQManager from "@/components/content/FAQManager";

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<"testimonials" | "faq">("testimonials");

  return (
    <div className="flex flex-col gap-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Content Management</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Manage testimonials and FAQ shown across the public MotoHave website.
        </p>
      </div>

      {/* Tabs */}
      <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      {activeTab === "testimonials" ? <TestimonialsManager /> : <FAQManager />}
    </div>
  );
}