import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/layout/AuthLayout";
import { AuthNavbar } from "@/components/auth/layout/AuthNavbar";
import { AuthGrid } from "@/components/auth/layout/AuthGrid";
import { AuthLeftContent } from "@/components/auth/branding/AuthLeftContent";
import { RegisterCard } from "@/components/auth/cards/RegisterCard";

export const metadata: Metadata = {
  title: "Create Account | MotoHave Dealership OS",
  description: "Create your MotoHave dealership account and start managing inventory.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-4 lg:space-y-0">
        <AuthNavbar mode="register" />
        <AuthGrid
          brandingNode={<AuthLeftContent />}
          formNode={
            <Suspense fallback={null}>
              <RegisterCard />
            </Suspense>
          }
        />
      </div>
    </AuthLayout>
  );
}