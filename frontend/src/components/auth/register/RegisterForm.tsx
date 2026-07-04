"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  User,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

import AuthInput from "../shared/AuthInput";

import { authService } from "@/services/auth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      await authService.register(data);

      toast.success("Account created successfully.");

      router.push("/sign-in");
      router.refresh();
    } catch (error: any) {
      if (error?.response?.status === 422) {
        const validationErrors = error.response.data.errors;

        Object.keys(validationErrors).forEach((key) => {
          setError(key as keyof RegisterFormValues, {
            type: "manual",
            message: validationErrors[key][0],
          });
        });

        return;
      }

      toast.error(
        error?.response?.data?.message ??
          "Unable to create your account."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <AuthInput
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={<User size={18} />}
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={<Mail size={18} />}
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <AuthInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Create password"
        icon={<Lock size={18} />}
        autoComplete="new-password"
        showPassword={showPassword}
        onTogglePassword={() =>
          setShowPassword((prev) => !prev)
        }
        error={errors.password?.message}
        {...register("password")}
      />

      <AuthInput
        label="Confirm Password"
        type={
          showConfirmPassword ? "text" : "password"
        }
        placeholder="Confirm password"
        icon={<Lock size={18} />}
        autoComplete="new-password"
        showPassword={showConfirmPassword}
        onTogglePassword={() =>
          setShowConfirmPassword((prev) => !prev)
        }
        error={errors.password_confirmation?.message}
        {...register("password_confirmation")}
      />

      <div className="pt-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("terms")}
            className="
              mt-1
              h-4
              w-4
              rounded
              border-slate-300
              text-blue-600
              focus:ring-2
              focus:ring-blue-200
            "
          />

          <span className="text-[14px] leading-6 text-slate-600">
            I agree to the{" "}
            <a
              href="/terms"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Privacy Policy
            </a>
          </span>
        </label>

        {errors.terms && (
          <p className="mt-2 text-sm text-red-500">
            {errors.terms.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          flex
          h-[60px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-blue-700
          via-blue-600
          to-cyan-500
          text-[16px]
          font-semibold
          text-white
          shadow-[0_15px_35px_rgba(37,99,235,0.28)]
          transition-all
          hover:scale-[1.02]
          hover:shadow-[0_20px_45px_rgba(37,99,235,0.35)]
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
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}