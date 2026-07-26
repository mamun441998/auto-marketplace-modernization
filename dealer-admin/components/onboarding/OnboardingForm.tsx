"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createDealer,
  uploadDealerLogo,
  uploadDealerCover,
  DealerFormData,
} from "@/lib/dealer";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0F1526] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300";

export default function OnboardingForm() {
  const router = useRouter();

  const [form, setForm] = useState<DealerFormData>({
    name: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    country: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
    setLogoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCoverFile(file);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setFieldErrors({});

    if (!form.name.trim()) {
      setFieldErrors({ name: ["Dealership name is required."] });
      return;
    }

    setLoading(true);

    try {
      // 1) dealer create
      const res = await createDealer(form);

      if (!res.success || !res.data) {
        if (res.errors) setFieldErrors(res.errors);
        setError(res.message || "Could not create dealership.");
        setLoading(false);
        return;
      }

      const dealerId = res.data.id;

      // 2) logo upload — fail হলে জানাও
      if (logoFile) {
        const logoRes = await uploadDealerLogo(dealerId, logoFile);
        if (!logoRes.success) {
          setError(
            logoRes.message ||
              "Logo upload failed. Try a smaller image (max 5MB)."
          );
          setLoading(false);
          return;
        }
      }

      // 3) cover upload — fail হলে জানাও
      if (coverFile) {
        const coverRes = await uploadDealerCover(dealerId, coverFile);
        if (!coverRes.success) {
          setError(
            coverRes.message ||
              "Cover upload failed. Try a smaller image (max 10MB)."
          );
          setLoading(false);
          return;
        }
      }

      // 4) dashboard-এ যাও
      router.replace("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Dealership Name */}
      <div>
        <label className={labelClass}>Dealership Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Apex Motors Ltd."
          className={inputClass}
        />
        {fieldErrors.name && (
          <p className="mt-2 text-sm text-red-400">{fieldErrors.name[0]}</p>
        )}
      </div>

      {/* Phone + Website */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+880 1700-000000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Website</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://yourdealership.com"
            className={inputClass}
          />
          {fieldErrors.website && (
            <p className="mt-2 text-sm text-red-400">{fieldErrors.website[0]}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className={labelClass}>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Gulshan Avenue, Dhaka"
          className={inputClass}
        />
      </div>

      {/* City + Country */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Dhaka"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Bangladesh"
            className={inputClass}
          />
        </div>
      </div>

      {/* Logo */}
      <div>
        <label className={labelClass}>Logo (max 5MB)</label>
        <div className="flex items-center gap-4">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo preview"
              className="h-16 w-16 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-white/15 text-xs text-slate-500">
              Logo
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleLogo}
            className="text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white hover:file:bg-orange-600"
          />
        </div>
      </div>

      {/* Cover */}
      <div>
        <label className={labelClass}>Cover Photo (max 10MB)</label>
        {coverPreview ? (
          <img
            src={coverPreview}
            alt="Cover preview"
            className="mb-3 h-32 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="mb-3 flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-white/15 text-xs text-slate-500">
            Cover photo
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleCover}
          className="text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white hover:file:bg-orange-600"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {loading ? "Creating your dealership..." : "Create Dealership & Continue"}
      </button>
    </form>
  );
}