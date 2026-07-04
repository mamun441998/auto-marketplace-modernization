// src/app/(auth)/register/page.tsx

import type { Metadata } from "next";

import AuthLayout from "@/components/auth/layout/AuthLayout";
import RegisterCard from "@/components/auth/register/RegisterCard";

export const metadata: Metadata = {
  title: "Create Account | MotoHave",
  description:
    "Create your MotoHave dealership account and start managing your inventory, customers and sales.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterCard />
    </AuthLayout>
  );
}
