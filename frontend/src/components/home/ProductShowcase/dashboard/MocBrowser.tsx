// src/components/home/ProductShowcase/dashboard/MocBrowser.tsx
"use client";

type Props = {
  children: React.ReactNode;
};

export default function MocBrowser({ children }: Props) {
  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-[#262626]
        bg-[#141414]
        transition-all
        duration-300
      "
    >
      {/* Browser Header */}
      <div className="flex items-center justify-between border-b border-[#262626] bg-[#171717] px-5 py-3.5 select-none">
        <div className="flex items-center gap-2 group">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAA2C]" />
        </div>

        <div className="flex items-center justify-center gap-1.5 w-64 md:w-72 rounded-lg bg-[#0A0A0A] border border-[#262626] px-4 py-1 text-center text-[11px] font-medium tracking-wide text-[#94A3B8]">
          <span className="text-[10px] opacity-70">🔒</span>
          <span className="truncate">motohave.com/dashboard</span>
        </div>

        <div className="w-14" />
      </div>

      {/* Browser Content Area */}
      <div className="bg-[#0A0A0A] p-4 md:p-6">
        {children}
      </div>
    </div>
  );
}