"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import GoogleButton from "./GoogleButton";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="
        relative
        w-full
        max-w-[400px]
        overflow-hidden
        rounded-[22px]
        border
        border-white/80
        bg-sky-50/60
        backdrop-blur-xl
        shadow-[0_20px_50px_rgba(15,23,42,.08)]
        px-6
        py-4
      "
    >
      {/* Top Gradient */}
      <div
        className="
          absolute
          left-0
          top-0
          h-[3px]
          w-full
          bg-gradient-to-r
          from-blue-700
          via-blue-500
          to-cyan-400
        "
      />

      <div className="relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/moto-have.png"
            alt="MotoHave"
            width={200}
            height={80}
            priority
          />
        </div>

        {/* Heading */}
        <h2 className="mt-1 text-center text-[18px] font-bold text-slate-900">
          Welcome Back
        </h2>

        <p className="mt-0.5 text-center text-[12px] text-slate-500">
          Sign in to manage your dealership
        </p>

        {/* Google */}
        <div className="mt-2">
          <GoogleButton />
        </div>

        {/* Divider */}
        <div className="relative my-2">
          <div className="h-px bg-slate-200" />
          <span
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              bg-white
              px-2
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            OR
          </span>
        </div>

        {/* Login */}
        <LoginForm />

        {/* Bottom */}
        <div className="mt-2 text-center text-[12px] text-slate-500">
          Don't have an account?
          <Link
            href="/register"
            className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    </motion.div>
  );
}