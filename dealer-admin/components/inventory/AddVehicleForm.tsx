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
  Wrench,
  Plus,
} from "lucide-react";
import { hasFeatureAccess } from "@/lib/planConfig";
import {
  createVehicle,
  updateVehicle,
  uploadVehicleImages,
  VehiclePayload,
  Vehicle,
} from "@/lib/vehicle";

const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const transmissions = ["Automatic", "Manual"];
const conditions = ["New", "Used", "Certified Pre-Owned"];
const drivetrains = ["", "FWD", "RWD", "AWD", "4WD"];

function toCondition(c: string): string {
  if (c === "Certified Pre-Owned") return "certified";
  return c.toLowerCase();
}

function conditionToDisplay(value?: string | null): string {
  if (!value) return "Used";
  if (value === "certified") return "Certified Pre-Owned";
  const map: Record<string, string> = { new: "New", used: "Used" };
  return map[value] ?? "Used";
}

function matchOption(options: string[], value?: string | null, fallback = ""): string {
  if (!value) return fallback;
  return options.find((o) => o.toLowerCase() === value.toLowerCase()) ?? fallback;
}

function extractError(res: any): string {
  if (res?.errors) {
    const first = Object.values(res.errors)[0];
    if (Array.isArray(first) && first.length) return String(first[0]);
  }
  return res?.message || "Failed to save vehicle. Please try again.";
}

interface AddVehicleFormProps {
  vehicle?: Vehicle;
}

export default function AddVehicleForm({ vehicle }: AddVehicleFormProps) {
  const router = useRouter();
  const canUseAI = hasFeatureAccess("aiDescriptionGenerator");
  const isEditMode = Boolean(vehicle);

  const initialDetails = vehicle?.details ?? {};

  const [formData, setFormData] = useState({
    make: vehicle?.make ?? "",
    model: vehicle?.model ?? "",
    year: vehicle?.year?.toString() ?? "",
    vin: vehicle?.vin ?? "",
    bodyType: matchOption(bodyTypes, vehicle?.body_type, "Sedan"),
    condition: conditionToDisplay(vehicle?.condition),
    price: vehicle?.price != null ? String(Number(vehicle.price)) : "",
    mileage: vehicle?.mileage != null ? String(vehicle.mileage) : "",
    fuelType: matchOption(fuelTypes, vehicle?.fuel_type, "Petrol"),
    transmission: matchOption(transmissions, vehicle?.transmission, "Automatic"),
    description: vehicle?.description ?? "",
  });

  // ---- Extra details ----
  const [features, setFeatures] = useState<string[]>(initialDetails.features ?? []);
  const [featureInput, setFeatureInput] = useState("");
  const [details, setDetails] = useState({
    engine: initialDetails.engine ?? "",
    drivetrain: initialDetails.drivetrain ?? "",
    doors: initialDetails.doors != null ? String(initialDetails.doors) : "",
    seats: initialDetails.seats != null ? String(initialDetails.seats) : "",
    interior_color: initialDetails.interior_color ?? "",
    warranty: initialDetails.warranty ?? "",
    highlights: initialDetails.highlights ?? "",
  });

  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const updateDetail = (field: keyof typeof details, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    const f = featureInput.trim();
    if (!f) return;
    if (!features.includes(f)) setFeatures((prev) => [...prev, f].slice(0, 50));
    setFeatureInput("");
  };
  const removeFeature = (f: string) => setFeatures((prev) => prev.filter((x) => x !== f));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selected = Array.from(files).map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...selected].slice(0, 8));
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleGenerateDescription = () => {
    if (!canUseAI) return;
    setIsGeneratingDescription(true);
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

  const buildPayload = (): VehiclePayload => ({
    title: `${formData.year} ${formData.make} ${formData.model}`.trim(),
    make: formData.make.trim(),
    model: formData.model.trim(),
    year: Number(formData.year),
    vin: formData.vin ? formData.vin.trim() : null,
    body_type: formData.bodyType.toLowerCase(),
    condition: toCondition(formData.condition),
    price: Number(formData.price),
    currency: "USD",
    mileage: formData.mileage ? Number(formData.mileage) : null,
    fuel_type: formData.fuelType.toLowerCase(),
    transmission: formData.transmission.toLowerCase(),
    description: formData.description ? formData.description : null,
    status: isEditMode ? (vehicle?.status ?? "active") : "active",
    details: {
      features,
      engine: details.engine.trim() || null,
      drivetrain: details.drivetrain.trim() || null,
      doors: details.doors ? Number(details.doors) : null,
      seats: details.seats ? Number(details.seats) : null,
      interior_color: details.interior_color.trim() || null,
      warranty: details.warranty.trim() || null,
      highlights: details.highlights.trim() || null,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const payload = buildPayload();

      if (isEditMode) {
        const res = await updateVehicle(vehicle!.id, payload);
        if (!res.success) {
          setError(extractError(res));
          return;
        }
        if (photos.length) {
          const upRes = await uploadVehicleImages(res.vehicle?.id ?? vehicle!.id, photos.map((p) => p.file));
          if (!upRes.success) {
            setError("Vehicle saved, but photo upload failed: " + extractError(upRes));
            return;
          }
        }
        router.push(`/inventory/${res.vehicle?.id ?? vehicle!.id}`);
        router.refresh();
      } else {
        const res = await createVehicle(payload, photos.map((p) => p.file));
        if (!res.success || !res.vehicle) {
          setError(extractError(res));
          return;
        }
        router.push("/inventory");
        router.refresh();
      }
    } catch (err) {
      console.error("Vehicle save failed:", err);
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => router.push(isEditMode ? `/inventory/${vehicle!.id}` : "/inventory")}
        className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors mb-4"
      >
        <ChevronLeft size={16} />
        {isEditMode ? "Back to Vehicle Details" : "Back to Inventory"}
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {error}
          </div>
        )}

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
              <input type="text" required value={formData.make} onChange={(e) => updateField("make", e.target.value)} placeholder="e.g. Toyota" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Model</label>
              <input type="text" required value={formData.model} onChange={(e) => updateField("model", e.target.value)} placeholder="e.g. Camry" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Year</label>
              <input type="number" required min="1980" max="2027" value={formData.year} onChange={(e) => updateField("year", e.target.value)} placeholder="e.g. 2023" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">VIN Number</label>
              <input type="text" value={formData.vin} onChange={(e) => updateField("vin", e.target.value.toUpperCase())} placeholder="e.g. 4T1B11HK5KU123456" maxLength={17} className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Body Type</label>
              <select value={formData.bodyType} onChange={(e) => updateField("bodyType", e.target.value)} className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer">
                {bodyTypes.map((type) => (<option key={type} value={type} className="bg-[#0A0F1E]">{type}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Condition</label>
              <select value={formData.condition} onChange={(e) => updateField("condition", e.target.value)} className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer">
                {conditions.map((c) => (<option key={c} value={c} className="bg-[#0A0F1E]">{c}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Specs */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400"><DollarSign size={18} /></div>
            <h2 className="text-sm font-bold text-white">Pricing & Specifications</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Price (USD)</label>
              <div className="flex items-center rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
                <span className="text-sm text-[#64748B] mr-1">$</span>
                <input type="number" required value={formData.price} onChange={(e) => updateField("price", e.target.value)} placeholder="28500" className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Mileage</label>
              <div className="flex items-center rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5">
                <input type="number" value={formData.mileage} onChange={(e) => updateField("mileage", e.target.value)} placeholder="15600" className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none" />
                <span className="text-sm text-[#64748B] ml-1">mi</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Fuel Type</label>
              <select value={formData.fuelType} onChange={(e) => updateField("fuelType", e.target.value)} className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer">
                {fuelTypes.map((type) => (<option key={type} value={type} className="bg-[#0A0F1E]">{type}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Transmission</label>
              <select value={formData.transmission} onChange={(e) => updateField("transmission", e.target.value)} className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer">
                {transmissions.map((t) => (<option key={t} value={t} className="bg-[#0A0F1E]">{t}</option>))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Features & Details (NEW) */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400"><Wrench size={18} /></div>
            <h2 className="text-sm font-bold text-white">Features & Details</h2>
          </div>

          {/* Features chips */}
          <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Features</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
              placeholder="e.g. Sunroof, Leather Seats, Backup Camera"
              className="flex-1 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]"
            />
            <button type="button" onClick={addFeature} className="flex items-center gap-1 rounded-lg bg-[#FC5E01] px-3 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors">
              <Plus size={15} /> Add
            </button>
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {features.map((f) => (
                <span key={f} className="flex items-center gap-1.5 rounded-full border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-1 text-xs text-white">
                  {f}
                  <button type="button" onClick={() => removeFeature(f)} className="text-[#64748B] hover:text-rose-400"><X size={12} /></button>
                </span>
              ))}
            </div>
          )}

          {/* Detail fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Engine</label>
              <input type="text" value={details.engine} onChange={(e) => updateDetail("engine", e.target.value)} placeholder="e.g. 2.0L Turbo" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Drivetrain</label>
              <select value={details.drivetrain} onChange={(e) => updateDetail("drivetrain", e.target.value)} className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] cursor-pointer">
                {drivetrains.map((d) => (<option key={d} value={d} className="bg-[#0A0F1E]">{d || "Select..."}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Doors</label>
              <input type="number" min="0" max="10" value={details.doors} onChange={(e) => updateDetail("doors", e.target.value)} placeholder="4" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Seats</label>
              <input type="number" min="0" max="50" value={details.seats} onChange={(e) => updateDetail("seats", e.target.value)} placeholder="5" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Interior Color</label>
              <input type="text" value={details.interior_color} onChange={(e) => updateDetail("interior_color", e.target.value)} placeholder="e.g. Black" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Warranty</label>
              <input type="text" value={details.warranty} onChange={(e) => updateDetail("warranty", e.target.value)} placeholder="e.g. 1 Year Dealer Warranty" className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-semibold text-[#94A3B8]">Highlights</label>
            <textarea value={details.highlights} onChange={(e) => updateDetail("highlights", e.target.value)} rows={2} placeholder="e.g. Single owner, full service history, no accidents" className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
          </div>
        </div>

        {/* Section 4: Photos */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"><ImageIcon size={18} /></div>
            <div>
              <h2 className="text-sm font-bold text-white">Vehicle Photos</h2>
              <p className="text-xs text-[#64748B] mt-0.5">{isEditMode ? "Add more photos (existing photos are managed on the detail page)." : "Upload up to 8 photos. First photo will be the cover image."}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {photos.map((photo, index) => (
              <div key={photo.url} className="relative aspect-square rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="h-full w-full object-cover" />
                {index === 0 && !isEditMode && (<span className="absolute top-1.5 left-1.5 rounded-full bg-[#FC5E01] px-1.5 py-0.5 text-[8px] font-bold text-white">Cover</span>)}
                <button type="button" onClick={() => removePhoto(index)} className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-rose-500 transition-colors"><X size={11} /></button>
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

        {/* Section 5: Description */}
        <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400"><FileText size={18} /></div>
              <h2 className="text-sm font-bold text-white">Description</h2>
            </div>
            <button type="button" onClick={handleGenerateDescription} disabled={!canUseAI || isGeneratingDescription}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${canUseAI ? "bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20" : "bg-[#0A0F1E] border border-[#1e2a4a] text-[#64748B] cursor-not-allowed"}`}>
              {canUseAI ? (<><Sparkles size={14} />{isGeneratingDescription ? "Generating..." : "Generate with AI"}</>) : (<><Lock size={13} />AI Generator (Professional+)</>)}
            </button>
          </div>
          <textarea value={formData.description} onChange={(e) => updateField("description", e.target.value)} rows={5} placeholder="Write a compelling description of this vehicle..." className="w-full resize-none rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#FC5E01]" />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.push(isEditMode ? `/inventory/${vehicle!.id}` : "/inventory")} disabled={isSubmitting} className="flex-1 sm:flex-none rounded-xl border border-[#1e2a4a] bg-[#111B33] px-6 py-3 text-sm font-semibold text-white hover:border-[#2d3d5e] transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none rounded-xl bg-[#FC5E01] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-60">
            {isSubmitting ? (isEditMode ? "Saving..." : "Adding...") : isEditMode ? "Save Changes" : "Add Vehicle to Inventory"}
          </button>
        </div>
      </form>
    </div>
  );
}