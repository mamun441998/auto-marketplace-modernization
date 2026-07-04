import { ReactNode } from "react";
import clsx from "clsx";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
    role="status"
      className={clsx(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-5 text-5xl text-slate-400">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}