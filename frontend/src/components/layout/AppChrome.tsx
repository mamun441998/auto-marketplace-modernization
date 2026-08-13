"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Dealer live websites (/s/{slug}) should NOT show the MotoHave navbar/footer.
  const hideChrome = pathname?.startsWith("/s/");

  return (
    <>
      {!hideChrome && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}