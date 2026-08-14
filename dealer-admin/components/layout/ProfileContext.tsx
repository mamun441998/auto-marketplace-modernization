"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchMyDealer } from "@/lib/dealer";

interface ProfileContextType {
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = "motohave_dealer_avatar";

// Helper function to check for invalid URLs or string representation of null/undefined
const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  const normalized = url.trim().toLowerCase();
  return normalized !== "" && normalized !== "null" && normalized !== "undefined";
};

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [avatarUrl, setAvatarUrlState] = useState<string | null>(null);

  // On mount: show the cached avatar INSTANTLY as a placeholder, but ALWAYS
  // re-fetch the dealer's real logo from the backend and refresh the cache.
  // This guarantees a stale cached URL (e.g. an old /storage/... path that now
  // 404s) gets replaced by the current one on every load — not just after
  // visiting Settings.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isValidUrl(saved) && !saved!.trim().toLowerCase().startsWith("blob:")) {
      setAvatarUrlState(saved); // instant placeholder — refreshed below
    } else {
      // Clean up trash values ("null" / "undefined" / blob:).
      localStorage.removeItem(STORAGE_KEY);
    }

    let active = true;
    fetchMyDealer().then((d) => {
      if (!active) return;
      const url = d?.logo_url ?? null;
      if (isValidUrl(url) && !url!.toLowerCase().startsWith("blob:")) {
        setAvatarUrlState(url);
        localStorage.setItem(STORAGE_KEY, url!);
      } else {
        // Dealer has no logo — clear any stale cached value.
        setAvatarUrlState(null);
        localStorage.removeItem(STORAGE_KEY);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const setAvatarUrl = (url: string | null) => {
    if (isValidUrl(url)) {
      const validUrl = url!.trim();
      
      // 🚀 এখানে ফিক্স: ব্রাউজারের স্টেটে blob URL সেট হবে যাতে আপলোড করলে সাথে সাথে ছবি দেখা যায়
      setAvatarUrlState(validUrl);
      
      // কিন্তু localStorage-এ শুধুমাত্র রিয়েল ক্লাউড URL সেভ হবে, blob URL সেভ হবে না
      if (!validUrl.toLowerCase().startsWith("blob:")) {
        localStorage.setItem(STORAGE_KEY, validUrl);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      setAvatarUrlState(null);
      localStorage.removeItem(STORAGE_KEY);
    }
    
    // 💡 Backend Integration Note:
    // This is where you would handle the server-side API call (e.g., uploading to AWS S3/Cloudinary)
    // Example: await fetch("/api/dealer/avatar", { method: "PATCH", body: formData })
  };

  return (
    <ProfileContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}