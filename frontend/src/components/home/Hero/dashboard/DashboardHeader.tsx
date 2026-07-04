"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

type Props = {
  title: string;
};

export default function DashboardHeader({ title }: Props) {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        gap-3

        overflow-hidden

        border-b
        border-slate-200

        bg-white

        px-4
        py-3
      "
    >
      {/* Left (title truncates so it never pushes the box) */}

      <div className="min-w-0">
        <h2 className="truncate text-base font-bold text-slate-900">
          {title}
        </h2>

        <p className="truncate text-[11px] text-slate-500">
          Welcome back, John 👋
        </p>
      </div>

      {/* Right (fixed-size cluster, never shrinks/overflows) */}

      <div className="flex shrink-0 items-center gap-2">
        {/* Search */}

        <div className="relative hidden lg:block">
          <Search
            size={15}
            className="
              absolute
              left-2.5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-40
              xl:w-52

              rounded-lg
              border
              border-slate-200

              bg-slate-50

              py-1.5
              pl-8
              pr-3

              text-xs

              outline-none

              focus:border-blue-500
            "
          />
        </div>

        {/* Notification */}

        <button
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center

            rounded-lg

            bg-slate-100

            transition

            hover:bg-slate-200
          "
        >
          <Bell size={16} />
        </button>

        {/* User */}

        <button
          className="
            flex
            shrink-0
            items-center
            gap-2

            rounded-lg

            bg-slate-100

            px-2
            py-1.5

            transition

            hover:bg-slate-200
          "
        >
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center

              rounded-full

              bg-blue-600

              text-xs
              font-bold
              text-white
            "
          >
            J
          </div>

          <div className="hidden text-left xl:block">
            <p className="text-xs font-semibold leading-tight text-slate-900">
              John Carter
            </p>

            <p className="text-[10px] leading-tight text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={14}
            className="hidden text-slate-400 xl:block"
          />
        </button>
      </div>
    </header>
  );
}
