// dealer-admin/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DealerSidebar from "@/components/layout/DealerSidebar";
import DealerTopbar from "@/components/layout/DealerTopbar";
import { ProfileProvider } from "@/components/layout/ProfileContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dealer Dashboard | MotoHave",
    template: "%s | MotoHave Dashboard",
  },
  description: "MotoHave Dealer Dashboard - manage your inventory, leads and sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
          data-scroll-behavior="smooth" 
          >
          <body className="min-h-screen bg-[#0A0F1E]">
          <ProfileProvider>
          <DealerSidebar />
          <div className="ml-[260px]">
          <DealerTopbar />
          <main className="p-6 lg:p-8">{children}</main>
      </div>
    </ProfileProvider>
  </body>
</html>
  );
}