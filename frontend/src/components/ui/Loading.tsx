import clsx from "clsx";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Loading({
  size = "md",
  className,
}: LoadingProps) {
  return (
    <div
    role="status"
    aria-label="loading"
      className={clsx(
        "animate-spin rounded-full border-4 border-slate-200 border-t-blue-600",
        {
          "h-5 w-5": size === "sm",
          "h-8 w-8": size === "md",
          "h-12 w-12": size === "lg",
        },
        className
      )}
    />
  );
}
