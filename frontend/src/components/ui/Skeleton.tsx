import { HTMLAttributes } from "react";
import clsx from "clsx";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export default function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-xl bg-slate-200",
        className
      )}
      {...props}
    />
  );
}
