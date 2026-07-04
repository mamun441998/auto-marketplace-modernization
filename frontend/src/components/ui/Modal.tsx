"use client";

import { ReactNode, useEffect } from "react";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={clsx(
          "w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <h2
            id="modal-title"
            className="mb-4 text-xl font-semibold text-slate-900"
          >
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}