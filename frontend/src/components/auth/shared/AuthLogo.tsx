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
    return (
      <div>

        <label
          className="
            mb-2
            block
            text-[14px]
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
            h-[56px]
            items-center

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-5

            transition-all

            focus-within:border-blue-500
            focus-within:ring-4
            focus-within:ring-blue-100
          "
        >

          <div className="mr-4 text-slate-400 group-focus-within:text-blue-600">
            {icon}
          </div>

          <input
            ref={ref}
            type={type}
            {...props}
            className="
              flex-1

              bg-transparent

              text-[15px]

              text-slate-800

              outline-none

              placeholder:text-slate-400
            "
          />

          {type === "password" && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="
                ml-3

                text-slate-400

                transition-colors

                hover:text-blue-600
              "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}

        </div>

        {error && (
          <p
            className="
              mt-2

              text-[13px]

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