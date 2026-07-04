"use client";

import { ReactNode } from "react";
import HeroCar from "../shared/HeroCar";

import AuthBackground from "../shared/AuthBackground";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="relative h-screen overflow-hidden bg-[#F8FBFF]">

      <AuthBackground />
      <HeroCar />

      <div
        className="
          relative
          z-10

          mx-auto

          flex

          h-screen

          max-w-[1600px]

          items-center
          justify-between

          px-12
          lg:px-20
          xl:px-28
        "
      >
        {/* LEFT */}

        <section
          className="
            hidden
            lg:flex

            h-full

            w-[47%]

            items-start

            pt-6
          "
        >
          <div className="w-full max-w-[470px]">
            {/* LeftPanel already contains logo */}
            {/*
              Logo
              Hero
              Features
            */}
            {require("../left/LeftPanel").default()}
          </div>
        </section>

        {/* RIGHT */}

       <section
  className="
    flex

    w-full

    items-center
    justify-center

    lg:w-[40%]

    xl:w-[37%]
  "
        >
          <div className="-mt-6">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}