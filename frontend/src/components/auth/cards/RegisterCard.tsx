"use client";

import Link from "next/link";

import { AuthCard } from "./AuthCard";
import { RegisterForm } from "../forms/RegisterForm";
import { SocialLogin } from "../shared/SocialLogin";
import { AuthDivider } from "../shared/AuthDivider";

export function RegisterCard() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
    >
      {/* Register Form */}
      <RegisterForm />

      {/* Social Login */}
      <AuthDivider text="Or continue with" />

      <SocialLogin />

      {/* Footer */}
      <div className="mt-6 border-t border-slate-800/80 pt-5 text-center">
        <p className="mb-2 text-xs text-muted-foreground">
          Already have an account?
        </p>

        <Link
          href="/sign-in"
          className="
            block
            w-full
            rounded-lg
            border
            border-slate-700/50
            bg-slate-800/50
            px-4
            py-2
            text-center
            text-xs
            font-semibold
            text-orange-400
            transition-all
            duration-200
            hover:border-orange-500/30
            hover:bg-slate-800
            hover:text-orange-300
          "
        >
          Sign in to your account
        </Link>
      </div>
    </AuthCard>
  );
}