import type { Metadata } from "next";

import { AuthLayout } from "@/components/auth/layout/AuthLayout";
import { AuthNavbar } from "@/components/auth/layout/AuthNavbar";
import { AuthGrid } from "@/components/auth/layout/AuthGrid";

import { AuthLeftContent } from "@/components/auth/branding/AuthLeftContent";
import { LoginCard } from "@/components/auth/cards/LoginCard";

export const metadata: Metadata = {
  title: "Sign In | MotoHave Dealership OS",
  description:
    "Sign in to your MotoHave dealership account to manage inventory, customers, analytics and your dealership website.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "/sign-in",
  },
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-4 lg:space-y-0">
        <AuthNavbar mode="login" />

        <AuthGrid
          brandingNode={<AuthLeftContent />}
          formNode={<LoginCard />}
        />
      </div>
    </AuthLayout>
  );
}