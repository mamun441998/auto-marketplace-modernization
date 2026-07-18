"use client";

import {
  LayoutDashboard,
  FileText,
  Palette,
  Image,
  Menu,
  PanelsTopLeft,
  PanelsBottomLeft,
  CarFront,
  BadgeDollarSign,
  Wrench,
  Phone,
  Search,
  Globe,
  Rocket,
} from "lucide-react";

const menuItems = [
  { id: "pages", label: "Pages", icon: FileText },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "branding", label: "Branding", icon: Image },
  { id: "navigation", label: "Navigation", icon: Menu },
  { id: "header", label: "Header", icon: PanelsTopLeft },
  { id: "footer", label: "Footer", icon: PanelsBottomLeft },
  { id: "inventory", label: "Inventory", icon: CarFront },
  { id: "financing", label: "Financing", icon: BadgeDollarSign },
  { id: "services", label: "Services", icon: Wrench },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "seo", label: "SEO", icon: Search },
  { id: "domain", label: "Domain", icon: Globe },
  { id: "publish", label: "Publish", icon: Rocket },
];

interface Props {
  active: string;
  onChange: (value: string) => void;
}

export default function BuilderSidebar({
  active,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-4">

      <div className="mb-5 flex items-center gap-2">
        <LayoutDashboard className="text-[#FC5E01]" size={18} />
        <h2 className="text-sm font-bold text-white">
          Website Builder
        </h2>
      </div>

      <div className="space-y-1">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
                active === item.id
                  ? "bg-[#FC5E01] text-white"
                  : "text-[#94A3B8] hover:bg-[#0A0F1E] hover:text-white"
              }`}
            >
              <Icon size={18} />

              <span className="text-sm font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}