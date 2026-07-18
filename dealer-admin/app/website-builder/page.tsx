"use client";

import { useState } from "react";
import { Layout, Globe, ArrowUpRight, Lock } from "lucide-react";
import { hasFeatureAccess, getCurrentDealerPlan } from "@/lib/planConfig";
import { dealerProfile } from "@/lib/dealerData";
import {
  defaultWebsiteData,
  WebsiteData,
} from "@/lib/websiteData";

import WebsiteEditor from "@/components/website-builder/WebsiteEditor";
import DomainConnect from "@/components/website-builder/DomainConnect";

export default function WebsiteBuilderPage() {
  const [activeTab, setActiveTab] = useState("editor");

  // Website Builder State
  const [websiteData, setWebsiteData] =
    useState<WebsiteData>(defaultWebsiteData);

  const isFeatureAllowed = hasFeatureAccess("websiteBuilder");
  const currentPlan = getCurrentDealerPlan();

  if (!isFeatureAllowed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
          <Lock size={28} />
        </div>

        <h2 className="text-lg font-bold text-white">
          Website Builder Locked
        </h2>

        <p className="mt-1.5 max-w-sm text-sm text-[#64748B]">
          Your current{" "}
          <span className="font-semibold text-amber-400">
            {currentPlan.tier}
          </span>{" "}
          plan does not include the website builder.
        </p>

        <a
          href="/settings?tab=usage"
          className="mt-5 rounded-xl bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E5540A]"
        >
          Upgrade to Professional
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-400">
              Website Live
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white">
            Website Builder
          </h1>

          <p className="mt-1 text-sm text-[#94A3B8]">
            Manage your dealership website for{" "}
            <span className="font-medium text-white">
              {dealerProfile.dealershipName}
            </span>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://andersonauto.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5 text-sm font-semibold text-[#94A3B8] transition-colors hover:text-white"
          >
            andersonauto.com
            <ArrowUpRight size={14} className="text-[#64748B]" />
          </a>

          <div className="flex rounded-xl border border-[#1e2a4a] bg-[#111B33] p-1">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === "editor"
                  ? "bg-[#FC5E01] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Layout size={15} />
              Editor
            </button>

            <button
              onClick={() => setActiveTab("domain")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === "domain"
                  ? "bg-[#FC5E01] text-white"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <Globe size={15} />
              Custom Domain
            </button>
          </div>
        </div>
      </div>

      {activeTab === "editor" ? (
        <WebsiteEditor
          data={websiteData}
          onChange={setWebsiteData}
        />
      ) : (
        <DomainConnect />
      )}
    </div>
  );
}