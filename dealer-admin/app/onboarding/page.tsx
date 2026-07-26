import OnboardingForm from "@/components/onboarding/OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Set up your dealership
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Complete your profile to start using your MotoHave dashboard.
          </p>
        </div>

        <OnboardingForm />
      </div>
    </div>
  );
}