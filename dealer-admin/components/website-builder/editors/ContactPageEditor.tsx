"use client";

import { WebsiteData } from "@/lib/websiteData";

interface Props {
  data: WebsiteData;
  onChange: (data: WebsiteData) => void;
}

const inputCls =
  "w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]";

export default function ContactPageEditor({ data, onChange }: Props) {
  const update = (key: string, value: string) => {
    onChange({ ...data, contact: { ...data.contact, [key]: value } });
  };

  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5 space-y-4">
      <h2 className="text-sm font-bold text-white border-b border-[#1e2a4a] pb-3">Contact Page</h2>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Heading</label>
        <input value={data.contact.title} onChange={(e) => update("title", e.target.value)} placeholder="Contact Us" className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Subtitle</label>
        <input value={data.contact.subtitle} onChange={(e) => update("subtitle", e.target.value)} placeholder="Our team is ready to help." className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Phone</label>
        <input value={data.contact.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 (555) 123-4567" className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Email</label>
        <input value={data.contact.email} onChange={(e) => update("email", e.target.value)} placeholder="info@dealership.com" className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Address</label>
        <input value={data.contact.address} onChange={(e) => update("address", e.target.value)} placeholder="123 Main Street, New York, NY" className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Business Hours</label>
        <input value={data.contact.hours || ""} onChange={(e) => update("hours", e.target.value)} placeholder="Mon–Sat: 9am–7pm" className={inputCls} />
      </div>
    </div>
  );
}