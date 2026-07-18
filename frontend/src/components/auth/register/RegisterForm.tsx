"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  User,
  Mail,
  Lock,
  Loader2,
  ShieldCheck,
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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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
        const validationErrors =
          error.response.data.errors;

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
        placeholder="Create your password"
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
        placeholder="Confirm your password"
        icon={<Lock size={18} />}
        autoComplete="new-password"
        showPassword={showConfirmPassword}
        onTogglePassword={() =>
          setShowConfirmPassword((prev) => !prev)
        }
        error={errors.password_confirmation?.message}
        {...register("password_confirmation")}
      />

      {/* Terms */}
      <div>
  <label className="flex cursor-pointer items-start gap-3">
    <input
      type="checkbox"
      {...register("terms")}
      className="
        mt-1
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

    <span className="text-[12px] leading-5 text-slate-300">
      I agree to the{" "}
      <Link
        href="/terms"
        className="
          font-semibold
          text-[#EC5707]
          transition
          hover:text-[#FF8A2B]
        "
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy"
        className="
          font-semibold
          text-[#EC5707]
          transition
          hover:text-[#FF8A2B]
        "
      >
        Privacy Policy
      </Link>
    </span>
  </label>

  {errors.terms && (
    <p className="mt-1 text-xs text-red-400">
      {errors.terms.message}
    </p>
  )}
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
      Creating Account...
    </>
  ) : (
    "Create Account"
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