"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import GoogleButton from "../right/GoogleButton";
import RegisterForm from "./RegisterForm";

export default function RegisterCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="
        relative
        w-full
        max-w-[395px]
        overflow-hidden
        rounded-[20px]
        border
        border-white/80
        bg-sky-50/60
        backdrop-blur-xl
        shadow-[0_18px_45px_rgba(15,23,42,.08)]
        px-5
        py-3
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
            height={100}
            priority
          />
        </div>

        {/* Heading */}
        <h2
          className="
            -mt-1
            text-center
            text-[17px]
            font-bold
            text-slate-900
          "
        >
          Create Account
        </h2>

        <p
          className="
            mt-0
            text-center
            text-[11px]
            text-slate-500
          "
        >
          Start managing your dealership
        </p>

        {/* Google Button */}
        <div className="mt-1.5">
          <GoogleButton />
        </div>

        {/* Divider */}
        <div className="relative my-1.5">
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
              tracking-[0.14em]
              text-slate-400
            "
          >
            OR
          </span>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Bottom */}
        <div
          className="
            mt-1.5
            text-center
            text-[11px]
            text-slate-500
          "
        >
          Already have an account?
          <Link
            href="/sign-in"
            className="
              ml-1
              font-semibold
              text-blue-600
              hover:text-blue-700
            "
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}