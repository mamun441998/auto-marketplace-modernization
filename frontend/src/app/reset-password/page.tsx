import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/forms/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <h1 className="text-center text-2xl font-bold text-white">Reset password</h1>
        <p className="mb-6 mt-2 text-center text-sm text-slate-400">
          Enter the code sent to your email and set a new password.
        </p>
        <Suspense fallback={<p className="text-center text-sm text-slate-400">Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}