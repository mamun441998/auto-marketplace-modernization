"use client";

import { useState, useRef, useEffect } from "react";
import { Building2, MapPin, Globe, ShieldCheck, Save, Loader2, Camera, Trash2 } from "lucide-react";
import { useProfile } from "@/components/layout/ProfileContext";
import { fetchMyDealer, updateDealer, uploadDealerLogo, Dealer } from "@/lib/dealer";

export default function ProfileSettings() {
  const { avatarUrl, setAvatarUrl } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  /* avatar বদলালে img error state reset */
  useEffect(() => {
    setImgFailed(false);
  }, [avatarUrl]);

  const [profile, setProfile] = useState({
    dealerName: "",
    licenseNumber: "",
    phone: "",
    website: "",
    address: "",
  });

  /* আসল dealer load */
  useEffect(() => {
    fetchMyDealer().then((d) => {
      if (!d) return;
      setDealer(d);
      setProfile({
        dealerName: d.name ?? "",
        licenseNumber: d.license_number ?? "",
        phone: d.phone ?? "",
        website: d.website ?? "",
        address: d.address ?? "",
      });
      if (d.logo_url) setAvatarUrl(d.logo_url);
    });
  }, [setAvatarUrl]);

  /* Save (update dealer) */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealer || loading) return;

    setLoading(true);
    setMessage(null);

    const res = await updateDealer(dealer.id, {
      name: profile.dealerName,
      phone: profile.phone,
      website: profile.website,
      address: profile.address,
    });

    setLoading(false);

    if (res.success) {
      setMessage({ ok: true, text: "Profile updated successfully." });
    } else {
      setMessage({ ok: false, text: res.message || "Update failed." });
    }
  };

  /* Logo upload (real) */
  const MAX_LOGO_BYTES = 5 * 1024 * 1024; // 5MB

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !dealer) return;

    // ৫MB-এর বেশি হলে সাথে সাথে থামাও — সার্ভারে পাঠানোর দরকার নেই
    if (file.size > MAX_LOGO_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      setMessage({ ok: false, text: `Logo is ${mb}MB — please choose an image under 5MB.` });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // সাথে সাথে preview
    setAvatarUrl(URL.createObjectURL(file));

    const res = await uploadDealerLogo(dealer.id, file);
    if (res.success && res.data?.logo_url) {
      setAvatarUrl(res.data.logo_url); // আসল URL (localStorage-এ persist হয়)
      setMessage({ ok: true, text: "Logo uploaded successfully." });
    } else {
      setMessage({ ok: false, text: res.message || "Logo upload failed (max 5MB)." });
    }
  };

  const handleRemovePhoto = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const initials = (profile.dealerName || "D").trim().charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`rounded-xl border p-3 text-sm ${
            message.ok
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Photo (Logo) */}
      <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-1">Logo</h3>
        <p className="text-xs text-[#64748B] mb-5">This logo will appear across your dashboard.</p>

        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            {avatarUrl && !imgFailed ? (
              <img
                src={avatarUrl}
                alt="Logo"
                onError={() => setImgFailed(true)}
                className="h-20 w-20 rounded-2xl border border-[#1e2a4a] object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FC5E01] text-white text-2xl font-bold">
                {initials}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#FC5E01] text-white border-2 border-[#111B33] hover:bg-[#E5540A] transition-colors"
            >
              <Camera size={13} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-[#FC5E01] px-4 py-2 text-xs font-semibold text-white hover:bg-[#E5540A] transition-colors"
              >
                Upload Logo
              </button>
              {avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex items-center gap-1.5 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-2 text-xs font-semibold text-rose-400 hover:border-rose-500/40 transition-colors"
                >
                  <Trash2 size={13} />
                  Remove
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#64748B]">JPG, PNG or WEBP, max 5MB.</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handlePhotoSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Dealership Info Form */}
      <form onSubmit={handleUpdate} className="space-y-6 bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6">
        <div className="flex items-center justify-between border-b border-[#1e2a4a] pb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Dealership Profile</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Manage your dealership&apos;s public information.</p>
          </div>
          {dealer?.is_verified && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck size={12} />
              Verified Dealer
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Dealership Name</label>
            <div className="relative">
              <Building2 size={14} className="absolute left-3.5 top-3.5 text-[#64748B]" />
              <input
                type="text"
                required
                value={profile.dealerName}
                onChange={(e) => setProfile({ ...profile, dealerName: e.target.value })}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Dealer License Number</label>
            <input
              type="text"
              disabled
              value={profile.licenseNumber || "—"}
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E]/50 px-3.5 py-2.5 text-sm text-[#64748B] cursor-not-allowed font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Website</label>
            <div className="relative">
              <Globe size={14} className="absolute left-3.5 top-3.5 text-[#64748B]" />
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Dealership Address</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3.5 top-3.5 text-[#64748B]" />
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-[#1e2a4a] pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-[#FC5E01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E5540A] transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}