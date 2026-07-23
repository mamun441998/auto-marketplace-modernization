import { notFound } from "next/navigation";
import { solutions } from "@/config/solutions";

import SolutionHero from "@/components/solutions/SolutionHero";
import SolutionFeatures from "@/components/solutions/SolutionFeatures";
import SolutionBenefits from "@/components/solutions/SolutionBenefits";
import SolutionWorkflow from "@/components/solutions/SolutionWorkflow";
import SolutionIntegrations from "@/components/solutions/SolutionIntegrations";
import SolutionCTA from "@/components/solutions/SolutionCTA";

import {
  CreditCard,
  MessageCircle,
  MapPinned,
  Megaphone,
  Receipt,
  Mail,
  Workflow,
  Phone,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const solution = solutions[slug as keyof typeof solutions];

  if (!solution) {
    return notFound();
  }

  return (
    <main className="bg-[#0B0A0B] text-white">
      <SolutionHero
        badge={solution.badge}
        title={solution.title}
        description={solution.description}
        icon={<solution.icon className="h-14 w-14 text-[#FC5E01]" />}
      />

      <SolutionFeatures
        title="Key Features"
        subtitle={`Everything included in ${solution.title}.`}
        features={solution.features}
      />

      <SolutionBenefits
        title="Business Benefits"
        subtitle="Why dealerships choose this solution."
        benefits={solution.benefits}
      />

      <SolutionWorkflow
        title="How It Works"
        subtitle="Simple workflow from start to finish."
        workflow={solution.workflow}
      />

      <SolutionIntegrations
        integrations={[
          {
            name: "Stripe",
            icon: <CreditCard className="w-8 h-8" />,
          },
          {
            name: "WhatsApp",
            icon: <MessageCircle className="w-8 h-8" />,
          },
          {
            name: "Google Maps",
            icon: <MapPinned className="w-8 h-8" />,
          },
          {
            name: "Meta Ads",
            icon: <Megaphone className="w-8 h-8" />,
          },
          {
            name: "QuickBooks",
            icon: <Receipt className="w-8 h-8" />,
          },
          {
            name: "Mailchimp",
            icon: <Mail className="w-8 h-8" />,
          },
          {
            name: "Zapier",
            icon: <Workflow className="w-8 h-8" />,
          },
          {
            name: "Twilio",
            icon: <Phone className="w-8 h-8" />,
          },
          {
            name: "Carfax",
            icon: <ShieldCheck className="w-8 h-8" />,
          },
          {
            name: "Google Analytics",
            icon: <BarChart3 className="w-8 h-8" />,
          },
        ]}
      />

      <SolutionCTA
        title="Ready to Grow Your Dealership?"
        description="Start using MotoHave today and streamline your dealership operations."
        buttonText="Start Free Trial"
        buttonLink="/register"
      />
    </main>
  );
}