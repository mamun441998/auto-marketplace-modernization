"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import AuthInput from "../shared/AuthInput";

import { authService } from "@/services/auth";
import {
  signInSchema,
  type SignInFormValues,
} from "@/lib/validations/auth";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(data: SignInFormValues) {
    try {
      await authService.signIn(data);

      toast.success("Welcome back!");

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      if (error?.response?.status === 422) {
        const validationErrors =
          error?.response?.data?.errors ?? {};

        Object.keys(validationErrors).forEach((key) => {
          setError(key as keyof SignInFormValues, {
            type: "manual",
            message: validationErrors[key][0],
          });
        });

        return;
      }

      toast.error("Invalid email or password.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={<Mail size={18} />}
        error={errors.email?.message}
        {...register("email")}
      />

      <AuthInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        icon={<Lock size={18} />}
        showPassword={showPassword}
        onTogglePassword={() =>
          setShowPassword((prev) => !prev)
        }
        error={errors.password?.message}
        {...register("password")}
      />

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            {...register("remember")}
            className="
              h-4
              w-4
              rounded

              border
              border-white/15

              bg-[#223454]

              accent-[#EC5707]

              focus:ring-2
              focus:ring-[#EC5707]/25
            "
          />

          <span className="text-[13px] text-slate-300">
            Remember me
          </span>
        </label>

        <Link
          href="/forgot-password"
          className="
            text-[13px]
            font-medium

            text-slate-400

            transition
            hover:text-[#EC5707]
          "
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2

          rounded-xl

          bg-gradient-to-r
          from-[#EC5707]
          via-[#F86A16]
          to-[#FF7A18]

          text-[15px]
          font-semibold
          text-white

          shadow-[0_12px_30px_rgba(236,87,7,.30)]

          transition-all
          duration-300

          hover:-translate-y-[2px]
          hover:shadow-[0_18px_40px_rgba(236,87,7,.42)]
          hover:brightness-105

          active:scale-[0.99]

          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >
        {isSubmitting ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Trust Badge */}
      <div
        className="
          flex
          items-center
          gap-2

          rounded-xl

          border
          border-white/8

          bg-white/[0.025]

          px-3
          py-2.5
        "
      >
        <ShieldCheck
          size={16}
          className="text-[#EC5707]"
        />

        <span className="text-[11px] leading-5 text-slate-400">
          Enterprise-grade encryption protects your account.
        </span>
      </div>
    </form>
  );
}