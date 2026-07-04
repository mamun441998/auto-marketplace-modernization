"use client";

import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import DashboardInventory from "./DashboardInventory";
import DashboardActivity from "./DashboardActivity";

import InventoryPage from "./inventory/InventoryPage";

import ModulePage from "./modules/ModulePage";
import { modulePages } from "./modules/moduleData";

import type { DashboardMenuType } from "./data";

type Props = {
  activePage: DashboardMenuType;
};

const scrollArea = `
  h-full

  overflow-y-auto
  overflow-x-hidden

  bg-slate-50

  p-3
  sm:p-4

  scrollbar-thin
  scrollbar-thumb-slate-300
`;

export default function DashboardMain({
  activePage,
}: Props) {
  /* ---------------- Inventory ---------------- */

  if (activePage === "inventory") {
    return (
      <div className={scrollArea}>
        <InventoryPage />
      </div>
    );
  }

  /* ---------------- Dashboard ---------------- */

  if (activePage === "dashboard") {
    return (
      <div className={scrollArea}>
        <div
          className="
            flex
            flex-col
            gap-4
          "
        >
          <DashboardStats />

          <DashboardChart />

          <div
            className="
              grid
              grid-cols-1
              gap-4

              sm:grid-cols-2
            "
          >
            <DashboardInventory />

            <DashboardActivity />
          </div>
        </div>
      </div>
    );
  }

  /* -------- Other Modules (data-driven demo) -------- */

  const page = modulePages[activePage];

  if (page) {
    return (
      <div className={scrollArea}>
        <ModulePage {...page} />
      </div>
    );
  }

  /* ---------------- Fallback ---------------- */

  return (
    <div className="flex h-full items-center justify-center bg-slate-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {activePage.charAt(0).toUpperCase() +
            activePage.slice(1)}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          This module preview is coming next.
        </p>
      </div>
    </div>
  );
}
