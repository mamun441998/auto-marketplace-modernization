"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Lock, Loader2 } from "lucide-react";

import AuthInput from "../shared/AuthInput";
import { authService } from "@/services/auth";
import { signInSchema, type SignInFormValues } from "@/lib/validations/auth";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await authService.signIn(data);

      toast.success("Login successful!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      if (error?.response?.status === 422) {
        const validationErrors = error.response?.data?.errors || {};

        Object.keys(validationErrors).forEach((key) => {
          setError(key as keyof SignInFormValues, {
            type: "manual",
            message: validationErrors[key]?.[0],
          });
        });

        return;
      }

      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={<Mail size={16} />}
        error={errors.email?.message}
        {...register("email")}
      />

      <AuthInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        icon={<Lock size={16} />}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between pt-0.5">
        <label className="flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            {...register("remember")}
            className="
              h-3.5
              w-3.5
              rounded
              border-slate-300
              text-blue-600
              focus:ring-2
              focus:ring-blue-200
            "
          />
          <span className="text-[13px] text-slate-600">Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="text-[13px] font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          flex
          h-11
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-blue-700
          via-blue-600
          to-cyan-500
          text-[14px]
          font-semibold
          text-white
          shadow-[0_10px_25px_rgba(37,99,235,0.24)]
          transition-all
          hover:scale-[1.01]
          hover:shadow-[0_14px_30px_rgba(37,99,235,0.3)]
          disabled:cursor-not-allowed
          disabled:opacity-70
          disabled:hover:scale-100
        "
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}