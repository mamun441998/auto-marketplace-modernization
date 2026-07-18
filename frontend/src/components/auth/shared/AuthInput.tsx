"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import { Eye, EyeOff } from "lucide-react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: ReactNode;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

const AuthInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      icon,
      error,
      showPassword,
      onTogglePassword,
      type,
      ...props
    },
    ref
  ) => {
    const isPasswordField =
      typeof onTogglePassword === "function" &&
      (type === "password" || type === "text");

    return (
      <div>
        <label
          className="
            mb-0.5
            block
            text-[11px]
            font-semibold
            text-white/80
          "
        >
          {label}
        </label>

        <div
          className="
            group
            flex
            h-[40px]
            items-center
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            transition-all
            focus-within:border-blue-500
            focus-within:ring-2
            focus-within:ring-blue-100
          "
        >
          <div className="mr-2 text-slate-400 transition-colors group-focus-within:text-blue-600">
            {icon}
          </div>

          <input
            ref={ref}
            type={type}
            {...props}
            className="
              flex-1
              bg-transparent
              text-[13px]
              text-slate-800
              outline-none
              placeholder:text-[12px]
              placeholder:text-slate-400
            "
          />

          {isPasswordField && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="
                ml-2
                text-slate-400
                transition-colors
                hover:text-blue-600
              "
            >
              {showPassword ? (
                <EyeOff size={15} />
              ) : (
                <Eye size={15} />
              )}
            </button>
          )}
        </div>

        {error && (
          <p
            className="
              mt-0.5
              text-[11px]
              text-red-400
            "
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;