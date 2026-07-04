import { ReactNode } from "react";
import clsx from "clsx";

type TableProps = {
  children: ReactNode;
  className?: string;
};

export default function Table({
  children,
  className,
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table
        className={clsx(
          "min-w-full border-collapse text-left",
          className
        )}
      >
        {children}
      </table>
    </div>
  );
}
