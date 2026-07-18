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
      transition={{ duration: 0.55 }}
      className="
        relative
        w-full
        max-w-[460px]
        overflow-hidden

        rounded-[28px]

        border
        border-white/10

        bg-[#1B2A49]/88
        backdrop-blur-[28px]

        shadow-[0_35px_90px_rgba(0,0,0,.55)]

        px-8
        py-5
      "
    >
      {/* ================= Background Effects ================= */}

      {/* Orange Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-24
          left-1/2
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          blur-[110px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(236,87,7,.18) 0%, transparent 72%)",
        }}
      />

      {/* Blue Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -right-20
          h-64
          w-64
          rounded-full
          blur-[120px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 72%)",
        }}
      />

      {/* Top Accent */}
      <div
        className="
          absolute
          left-0
          top-0
          h-[3px]
          w-full
          bg-gradient-to-r
          from-[#EC5707]
          via-[#FF8A2B]
          to-[#FFC371]
        "
      />

      <div className="relative z-10">
       {/* Logo */}
<div className="flex justify-center">
  <Image
    src="/moto_have-logo.png"
    alt="MotoHave"
    width={175}
    height={88}
    priority
    className="h-auto w-auto"
  />
</div>

{/* Heading */}
<h2
  className="
    mt-2
    text-center
    text-[30px]
    font-bold
    tracking-tight
    text-white
  "
>
  Create Account
</h2>

<p
  className="
    mt-1
    text-center
    text-sm
    leading-5
    text-slate-300
  "
>
  Start managing your dealership with MotoHave.
</p>
        {/* Google */}
        <div className="mt-4">
          <GoogleButton />
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="h-px bg-white/10" />

          <span
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2

              rounded-full
              border
              border-white/10

              bg-[#1B2A49]

              px-5
              py-1

              text-[11px]
              font-semibold
              uppercase
              tracking-[0.25em]

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
            mt-4
            text-center
            text-sm
            text-slate-400
          "
        >
          Already have an account?

          <Link
            href="/sign-in"
            className="
              ml-2
              font-semibold
              text-[#EC5707]
              transition-colors
              duration-300
              hover:text-[#FF8A2B]
            "
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}