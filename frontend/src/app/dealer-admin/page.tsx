"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DealerAdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dealer-admin/dashboard");
  }, [router]);

  return null;
}
