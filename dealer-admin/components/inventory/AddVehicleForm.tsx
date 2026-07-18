// dealer-admin/components/inventory/AddVehicleForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  X,
  Sparkles,
  Lock,
  ChevronLeft,
  CarFront,
  DollarSign,
  ImageIcon,
  FileText,
} from "lucide-react";
import { hasFeatureAccess } from "@/lib/planConfig";
import { InventoryVehicle } from "@/lib/dealerData";

const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const transmissions = ["Automatic", "Manual"];
const conditions = ["New", "Used", "Certified Pre-Owned"];

interface AddVehicleFormProps {
  vehicle?: InventoryVehicle; // 💡 Dile "Edit mode", na dile "Add mode"
}

export default function AddVehicleForm({ vehicle }: AddVehicleFormProps) {
  const router = useRouter();
  const canUseAI = hasFeatureAccess("aiDescriptionGenerator");
  const isEditMode = Boolean(vehicle);

  const [formData, setFormData] = useState({
    make: vehicle?.make ?? "",
    model: vehicle?.model ?? "",
    year: vehicle?.year?.toString() ?? "",
    vin: vehicle?.vin ?? "",
    bodyType: vehicle?.bodyType ?? "Sedan",
    condition: "Used",
    price: vehicle?.price?.toString() ?? "",
    mileage: vehicle?.mileage?.toString() ?? "",
    fuelType: vehicle?.fuelType ?? "Petrol",
    transmission: vehicle?.transmission ?? "Automatic",
    description: "",
  });

  const [photos, setPhotos] = useState<string[]>(isEditMode ? ["placeholder", "placeholder"] : []);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 💡 Backend connect korar somoy: eikhane actual file upload hobe (S3/storage)
    const newPhotos = Array.from(files).map(() => "placeholder");
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 8));
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateDescription = () => {
    if (!canUseAI) return;
    setIsGeneratingDescription(true);
    // 💡 Backend connect korar somoy: eikhane AI API call hobe
    setTimeout(() => {
      updateField(
        "description",
        `This well-maintained ${formData.year || "2023"} ${formData.make || "vehicle"} ${
          formData.model || ""
        } offers a smooth driving experience with excellent fuel efficiency. Featuring a ${formData.transmission.toLowerCase()} transmission and ${formData.fuelType.toLowerCase()} engine, this ${formData.bodyType.toLowerCase()} is perfect for daily commutes or family trips. Comes with a clean history and is ready for its next owner.`
      );
      setIsGeneratingDescription(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      // 💡 Backend connect korar somoy: eikhane API call hobe
      // jemon: await fetch(`/api/vehicles/${vehicle!.id}`, { method: "PATCH", body: JSON.stringify(formData) })
      alert(`Vehicle "${formData.make} ${formData.model}" updated (backend not connected yet)`);
      router.push(`/inventory/${vehicle!.id}`);
    } else {
      // 💡 Backend connect korar somoy: eikhane API call hobe
      // jemon: await fetch("/api/vehicles", { method: "POST", body: JSON.stringify(formData) })
      alert("Vehicle added successfully (backend not connected yet)");
      router.push("/inventory");
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Back Link */}
      <button
        onClick={() => router.push(isEditMode ? `/inventory/${vehicle!.id}` : "/inventory")}
        className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors mb-4"
      >
        <ChevronLeft size={16} />
        {isEditMode ? "Back to Vehicle Details" : "Back to Inventory"}
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Section 1: Basic Info */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FC5E01]/10 text-[#FC5E01]">
              <CarFront size={18} />
            </div>
            <h2 className="text-sm font-bold text-white">Vehicle Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Make</label>
              <input
                type="text"
                required
                value={formData.make}
                onChange={(e) => updateField("make", e.target.value)}
                placeholder="e.g. Toyota"
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Model</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => updateField("model", e.target.value)}
                placeholder="e.g. Camry"
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Year</label>
              <input
                type="number"
                required
                min="1980"
                max="2027"
                value={formData.year}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder="e.g. 2023"
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">VIN Number</label>
              <input
                type="text"
                required
                value={formData.vin}
                onChange={(e) => updateField("vin", e.target.value.toUpperCase())}
                placeholder="e.g. 4T1B11HK5KU123456"
                maxLength={17}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Body Type</label>
              <select
                value={formData.bodyType}
                onChange={(e) => updateField("bodyType", e.target.value)}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
              >
                {bodyTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#0A0F1E]">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => updateField("condition", e.target.value)}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
              >
                {conditions.map((c) => (
                  <option key={c} value={c} className="bg-[#0A0F1E]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Specs */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign size={18} />
            </div>
            <h2 className="text-sm font-bold text-white">Pricing & Specifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Price (USD)</label>
              <div className="flex items-center rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
                <span className="text-sm text-[#64748B] mr-1">$</span>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="28500"
                  className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Mileage</label>
              <div className="flex items-center rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
                <input
                  type="number"
                  required
                  value={formData.mileage}
                  onChange={(e) => updateField("mileage", e.target.value)}
                  placeholder="15600"
                  className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
                />
                <span className="text-sm text-[#64748B] ml-1">mi</span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Fuel Type</label>
              <select
                value={formData.fuelType}
                onChange={(e) => updateField("fuelType", e.target.value)}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
              >
                {fuelTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#0A0F1E]">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Transmission</label>
              <select
                value={formData.transmission}
                onChange={(e) => updateField("transmission", e.target.value)}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer"
              >
                {transmissions.map((t) => (
                  <option key={t} value={t} className="bg-[#0A0F1E]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Photos */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <ImageIcon size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Vehicle Photos</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Upload up to 8 photos. First photo will be the cover image.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {photos.map((_, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] flex items-center justify-center overflow-hidden"
              >
                <span className="text-2xl">🚗</span>
                {index === 0 && (
                  <span className="absolute top-1.5 left-1.5 rounded-full bg-[#FC5E01] px-1.5 py-0.5 text-[8px] font-bold text-white">
                    Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-rose-500 transition-colors"
                >
                  <X size={11} />
                </button>
              </div>
            ))}

            {photos.length < 8 && (
              <label className="aspect-square rounded-xl border-2 border-dashed border-[#1e2a4a] bg-[#0A0F1E]/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[#FC5E01]/40 transition-colors">
                <Upload size={20} className="text-[#64748B]" />
                <span className="text-[10px] font-semibold text-[#64748B]">Upload</span>
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Section 4: Description (AI-gated) */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <FileText size={18} />
              </div>
              <h2 className="text-sm font-bold text-white">Description</h2>
            </div>

            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={!canUseAI || isGeneratingDescription}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                canUseAI
                  ? "bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20"
                  : "bg-[#0A0F1E] border border-[#1e2a4a] text-[#64748B] cursor-not-allowed"
              }`}
            >
              {canUseAI ? (
                <>
                  <Sparkles size={14} />
                  {isGeneratingDescription ? "Generating..." : "Generate with AI"}
                </>
              ) : (
                <>
                  <Lock size={13} />
                  AI Generator (Professional+)
                </>
              )}
            </button>
          </div>

          <textarea
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={5}
            placeholder="Write a compelling description of this vehicle..."
            className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(isEditMode ? `/inventory/${vehicle!.id}` : "/inventory")}
            className="flex-1 sm:flex-none rounded-xl border border-[#1e2a4a] bg-[#111B33] px-6 py-3 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 sm:flex-none rounded-xl bg-[#FC5E01] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors"
          >
            {isEditMode ? "Save Changes" : "Add Vehicle to Inventory"}
          </button>
        </div>
      </form>
    </div>
  );
}