"use client";

import { Home, CarFront, Building2, BadgeDollarSign, Phone } from "lucide-react";
import { WebsiteData, WebsitePage } from "@/lib/websiteData";

interface PageManagerProps {
  data: WebsiteData;
  activePage: WebsitePage;
  onPageChange: (page: WebsitePage) => void;
}

const pages = [
  { id: "home" as WebsitePage, label: "Home", icon: Home },
  { id: "inventory" as WebsitePage, label: "Inventory", icon: CarFront },
  { id: "about" as WebsitePage, label: "About", icon: Building2 },
  { id: "financing" as WebsitePage, label: "Financing", icon: BadgeDollarSign },
  { id: "contact" as WebsitePage, label: "Contact", icon: Phone },
];

export default function PageManager({ data, activePage, onPageChange }: PageManagerProps) {
  const isPageDisabled = (pageId: WebsitePage) => {
    if (pageId === "financing") return !data.financing.enabled;
    if (pageId === "inventory") return !data.inventory.enabled;
    return false;
  };

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
      <div className="mb-4 border-b border-[#1e2a4a] pb-3">
        <h3 className="text-sm font-bold text-white">Website Pages</h3>
        <p className="mt-1 text-xs text-[#64748B]">Select a page to customize.</p>
      </div>

      <div className="space-y-2">
        {pages.map((page) => {
          const Icon = page.icon;
          const active = activePage === page.id;
          const disabled = isPageDisabled(page.id);

          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onPageChange(page.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-[#FC5E01] bg-[#FC5E01]/10 text-white"
                  : "border-[#1e2a4a] bg-[#0A0F1E] text-[#94A3B8] hover:border-[#2d3d5e] hover:text-white"
              }`}
            >
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                  active ? "bg-[#FC5E01] text-white" : "bg-[#111B33] text-[#94A3B8]"
                }`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{page.label}</span>
                  {disabled && (
                    <span className="rounded-full bg-[#1e2a4a] px-2 py-0.5 text-[9px] font-bold text-[#64748B]">
                      Hidden
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#64748B]">Edit {page.label.toLowerCase()} page</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}