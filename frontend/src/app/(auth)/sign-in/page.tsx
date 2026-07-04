// src/app/(auth)/sign-in/page.tsx
import type { Metadata } from "next";
import AuthLayout from "@/components/auth/layout/AuthLayout";
import LoginCard from "@/components/auth/right/LoginCard";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your MotoHave account to manage your dealership.",
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <LoginCard />
    </AuthLayout>
  );
}