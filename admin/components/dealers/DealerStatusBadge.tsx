"use client";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  suspended: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function DealerStatusBadge({ status }: { status: string }) {
  const cls = statusStyles[status] ?? "bg-[#1e2a4a] text-[#94A3B8] border-[#1e2a4a]";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}