"use client";

import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardMain from "./DashboardMain";

import { dashboardMenus, DashboardMenuType } from "./data";

export default function Dashboard() {
  const [activePage, setActivePage] =
    useState<DashboardMenuType>("dashboard");

  const activeLabel =
    dashboardMenus.find((item) => item.id === activePage)
      ?.label ?? "Dashboard";

  return (
    <div
      className="
        w-full

        h-[480px]
        sm:h-[560px]
        lg:h-[590px]

        overflow-hidden

        rounded-[22px]

        border
        border-slate-200

        bg-white

        shadow-[0_30px_80px_rgba(37,99,235,0.08)]

        flex
        flex-col
      "
    >
      {/* Header */}

      <div className="shrink-0">
        <DashboardHeader title={activeLabel} />
      </div>

      {/* Body */}

      <div
        className="
          flex

          flex-1

          min-h-0

          overflow-hidden
        "
      >
        {/* Sidebar */}

        <div
          className="
            w-[60px]
            sm:w-[200px]
            lg:w-[235px]

            shrink-0

            border-r
            border-slate-200

            overflow-hidden
          "
        >
          <DashboardSidebar
            activePage={activePage}
            onChange={setActivePage}
          />
        </div>

        {/* Main */}

        <div
          className="
            flex-1

            min-w-0
            min-h-0

            overflow-hidden
          "
        >
          <DashboardMain
            activePage={activePage}
          />
        </div>
      </div>
    </div>
  );
}