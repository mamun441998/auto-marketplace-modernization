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
            mb-1
            block
            text-[12px]
            font-semibold
            text-slate-700
          "
        >
          {label}
        </label>

        <div
          className="
            group
            flex
            h-[42px]
            items-center
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            transition-all
            focus-within:border-blue-500
            focus-within:ring-3
            focus-within:ring-blue-100
          "
        >
          <div className="mr-3 text-slate-400 group-focus-within:text-blue-600">
            {icon}
          </div>

          <input
            ref={ref}
            type={type}
            {...props}
            className="
              flex-1
              bg-transparent
              text-[14px]
              text-slate-800
              outline-none
              placeholder:text-[13px]
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
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          )}
        </div>

        {error && (
          <p
            className="
              mt-1
              text-[12px]
              text-red-500
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