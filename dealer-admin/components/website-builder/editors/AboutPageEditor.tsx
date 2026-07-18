"use client";

import { WebsiteData } from "@/lib/websiteData";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

export default function AboutPageEditor({
  data,
  onChange
}: Props) {

  const update = (key: string, value: any) => {
    onChange({
      ...data,
      about: {
        ...data.about,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-5">

      <h2 className="text-lg font-bold text-white">
        About Page
      </h2>

      <input
        value={data.about.title}
        onChange={(e) => update("title", e.target.value)}
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white"
      />

      <input
        value={data.about.subtitle}
        onChange={(e) => update("subtitle", e.target.value)}
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white"
      />

      <textarea
        rows={5}
        value={data.about.story}
        onChange={(e) => update("story", e.target.value)}
        className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-4 py-3 text-white resize-none"
      />

    </div>
  );
}