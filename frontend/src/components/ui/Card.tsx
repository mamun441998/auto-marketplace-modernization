import { HTMLAttributes } from "react";
import clsx from "clsx";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200",
        "hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
