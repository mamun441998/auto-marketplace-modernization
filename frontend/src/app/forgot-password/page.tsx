import { ForgotPasswordForm } from "@/components/auth/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <h1 className="text-center text-2xl font-bold text-white">Forgot password?</h1>
        <p className="mb-6 mt-2 text-center text-sm text-slate-400">
          Enter your email and we’ll send you a verification code.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}