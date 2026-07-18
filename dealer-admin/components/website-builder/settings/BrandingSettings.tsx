"use client";

import { Building2, Type } from "lucide-react";

import { WebsiteData } from "@/lib/websiteData";

import FormSection from "../ui/FormSection";
import FormInput from "../ui/FormInput";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

export default function BrandingSettings({
  data,
  onChange,
}: Props) {
  const branding = data.branding;

  const updateBranding = (
    key: keyof typeof branding,
    value: any
  ) => {
    onChange({
      ...data,
      branding: {
        ...branding,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">

      {/* ======================================
          Business Information
      ======================================= */}

      <FormSection
        title="Business Information"
        description="Basic dealership branding information."
        icon={<Building2 size={18} />}
      >

        <FormInput
          label="Dealership Name"
          placeholder="Anderson Auto"
          value={branding.dealershipName}
          onChange={(value) =>
            updateBranding("dealershipName", value)
          }
        />

        <FormInput
          label="Tagline"
          placeholder="Trusted Cars. Honest Prices."
          value={branding.tagline}
          onChange={(value) =>
            updateBranding("tagline", value)
          }
        />

      </FormSection>

      {/* ======================================
          Typography
      ======================================= */}

      <FormSection
        title="Typography"
        description="Global website font."
        icon={<Type size={18} />}
      >

        <FormInput
          label="Font Family"
          placeholder="Inter"
          value={branding.fontFamily}
          onChange={(value) =>
            updateBranding("fontFamily", value)
          }
        />

      </FormSection>

    </div>
  );
}