"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

  // Check and load saved avatar from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // রিফ্রেশ করার পর যদি লোকাল স্টোরেজে blob: ইউআরএল থাকে, তবে সেটা লোড না করে রিমুভ করে দেবে
    if (isValidUrl(saved) && !saved!.trim().toLowerCase().startsWith("blob:")) {
      setAvatarUrlState(saved);
    } else {
      // Clean up local storage if it contains trash values ("null" / "undefined")
      localStorage.removeItem(STORAGE_KEY);
    }
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