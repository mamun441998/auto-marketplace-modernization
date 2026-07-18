"use client";

import { WebsiteData } from "@/lib/websiteData";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

export default function ContactPageEditor({
  data,
  onChange
}: Props) {

  const update = (key: string, value: any) => {
    onChange({
      ...data,
      contact: {
        ...data.contact,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-5">

      <h2 className="text-lg font-bold text-white">
        Contact Page
      </h2>

      <input
        value={data.contact.phone}
        onChange={(e) => update("phone", e.target.value)}
        placeholder="Phone"
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white"
      />

      <input
        value={data.contact.email}
        onChange={(e) => update("email", e.target.value)}
        placeholder="Email"
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white"
      />

      <input
        value={data.contact.address}
        onChange={(e) => update("address", e.target.value)}
        placeholder="Address"
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white"
      />

    </div>
  );
}