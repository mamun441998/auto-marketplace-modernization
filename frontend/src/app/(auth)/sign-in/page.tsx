import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/layout/AuthLayout";
import { AuthNavbar } from "@/components/auth/layout/AuthNavbar";
import { AuthGrid } from "@/components/auth/layout/AuthGrid";
import { AuthLeftContent } from "@/components/auth/branding/AuthLeftContent";
import { LoginCard } from "@/components/auth/cards/LoginCard";

export const metadata: Metadata = {
  title: "Sign In | MotoHave Dealership OS",
  description: "Sign in to your MotoHave account to manage your dealership.",
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-4 lg:space-y-0">
        <AuthNavbar mode="login" />
        <AuthGrid 
          brandingNode={<AuthLeftContent />} 
          formNode={<LoginCard />} 
        />
      </div>
    </AuthLayout>
  );
}