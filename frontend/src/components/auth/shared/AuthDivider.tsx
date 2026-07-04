"use client";

export default function AuthDivider() {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-1 border-t border-slate-200" />

      <span
        className="
          bg-white

          px-5

          font-[family:var(--font-inter)]

          text-sm

          font-medium

          text-slate-400
        "
      >
        OR CONTINUE WITH
      </span>

      <div className="flex-1 border-t border-slate-200" />
    </div>
  );
}