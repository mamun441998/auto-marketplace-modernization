"use client";

import { Plus } from "lucide-react";

import type {
  ModulePageData,
  Tone,
  BadgeTone,
} from "./moduleData";

const ICON_TONES: Record<Tone, string> = {
  blue: "bg-blue-100 text-blue-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
  purple: "bg-purple-100 text-purple-600",
  cyan: "bg-cyan-100 text-cyan-600",
  rose: "bg-rose-100 text-rose-600",
  slate: "bg-slate-100 text-slate-600",
};

const BADGE_TONES: Record<BadgeTone, string> = {
  blue: "bg-blue-100 text-blue-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  slate: "bg-slate-200 text-slate-700",
};

export default function ModulePage({
  title,
  subtitle,
  action,
  stats,
  listTitle,
  listSubtitle,
  rows,
}: ModulePageData) {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* Header */}

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>

          <p className="mt-0.5 truncate text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        {action && (
          <button
            className="
              flex
              h-9
              shrink-0
              items-center
              gap-1.5

              rounded-lg

              bg-gradient-to-r
              from-blue-600
              to-cyan-500

              px-3

              text-xs
              font-bold
              text-white

              shadow-sm
              shadow-blue-500/20

              transition-all

              hover:-translate-y-0.5
            "
          >
            <Plus size={14} />
            {action}
          </button>
        )}
      </div>

      {/* Stats */}

      {stats && (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  min-w-0

                  rounded-xl
                  border
                  border-slate-200
                  bg-white

                  px-3
                  py-2.5

                  shadow-sm
                "
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </span>

                  <div
                    className={`
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center

                      rounded-lg

                      ${ICON_TONES[stat.tone]}
                    `}
                  >
                    <Icon size={15} strokeWidth={2.3} />
                  </div>
                </div>

                <div className="truncate text-xl font-extrabold leading-none text-slate-900">
                  {stat.value}
                </div>

                {stat.change && (
                  <p className="mt-1.5 truncate text-[10px] font-semibold text-emerald-600">
                    {stat.change}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* List */}

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col

          overflow-hidden

          rounded-xl
          border
          border-slate-200
          bg-white

          shadow-sm
        "
      >
        <div className="shrink-0 border-b border-slate-200 px-4 py-2.5">
          <h3 className="text-sm font-bold text-slate-900">
            {listTitle}
          </h3>

          {listSubtitle && (
            <p className="mt-0.5 text-[11px] text-slate-500">
              {listSubtitle}
            </p>
          )}
        </div>

        <div
          className="
            min-h-0
            flex-1

            divide-y
            divide-slate-100

            overflow-y-auto

            scrollbar-thin
            scrollbar-thumb-slate-200
          "
        >
          {rows.map((row, index) => {
            const Icon = row.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-3

                  px-4
                  py-2.5

                  hover:bg-slate-50
                "
              >
                {Icon && (
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center

                      rounded-lg

                      ${ICON_TONES[row.iconTone ?? "slate"]}
                    `}
                  >
                    <Icon size={16} />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {row.title}
                  </p>

                  {row.subtitle && (
                    <p className="mt-0.5 truncate text-[11px] text-slate-500">
                      {row.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-end">
                  {row.value && (
                    <p className="text-sm font-bold text-slate-900">
                      {row.value}
                    </p>
                  )}

                  {row.badge && (
                    <span
                      className={`
                        mt-1
                        inline-block

                        rounded-full

                        px-2.5
                        py-0.5

                        text-[10px]
                        font-bold

                        ${BADGE_TONES[row.badgeTone ?? "slate"]}
                      `}
                    >
                      {row.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
