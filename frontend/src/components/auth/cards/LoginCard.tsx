"use client";

import Link from "next/link";

import { AuthCard } from "./AuthCard";
import { LoginForm } from "../forms/LoginForm";
import { SocialLogin } from "../shared/SocialLogin";
import { AuthDivider } from "../shared/AuthDivider";

export function LoginCard() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Enter your credentials to access your MotoHave workspace."
    >
      {/* Login Form */}

      <LoginForm />

      {/* Social Login */}

      <AuthDivider />

      <SocialLogin />

      {/* Register */}

      <div className="mt-6 border-t border-slate-800/80 pt-5">
        <p className="mb-3 text-center text-xs text-slate-400">
          Don't have an account?
        </p>

        <Link
          href="/register"
          aria-label="Create a MotoHave account"
          className="
            block
            w-full
            rounded-xl
            border
            border-slate-700/60
            bg-slate-800/40
            px-4
            py-2.5
            text-center
            text-sm
            font-semibold
            text-orange-400
            transition-all
            duration-200
            hover:border-[#FC5E01]
            hover:bg-slate-800
            hover:text-orange-300
            focus:outline-none
            focus:ring-2
            focus:ring-[#FC5E01]/40
          "
        >
          Create an account
        </Link>
      </div>
    </AuthCard>
  );
}