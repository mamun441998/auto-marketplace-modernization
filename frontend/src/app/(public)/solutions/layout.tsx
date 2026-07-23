import type { ReactNode } from "react";

export default function SolutionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      {children}
    </main>
  );
}