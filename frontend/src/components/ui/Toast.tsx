import clsx from "clsx";

type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

type ToastProps = {
  message: string;
  variant?: ToastVariant;
  className?: string;
};

export default function Toast({
  message,
  variant = "info",
  className,
}: ToastProps) {
  return (
    <div
      role="alert"
      className={clsx(
        "rounded-xl px-4 py-3 text-sm font-medium shadow-lg",
        {
          "bg-green-100 text-green-800": variant === "success",
          "bg-red-100 text-red-800": variant === "error",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-blue-100 text-blue-800": variant === "info",
        },
        className
      )}
    >
      {message}
    </div>
  );
}
