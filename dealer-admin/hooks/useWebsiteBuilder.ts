"use client";

import { useCallback, useMemo, useState } from "react";

import { defaultWebsite } from "@/lib/website-builder/defaultWebsite";
import { WebsiteSchema } from "@/lib/website-builder/schema";

export function useWebsiteBuilder() {
  const [website, setWebsite] =
    useState<WebsiteSchema>(defaultWebsite);

  const updateWebsite = useCallback(
    (data: WebsiteSchema) => {
      setWebsite(data);
    },
    []
  );

  const updateSection = useCallback(
    (key: keyof WebsiteSchema, value: any) => {
      setWebsite((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const resetWebsite = useCallback(() => {
    setWebsite(defaultWebsite);
  }, []);

  const publishWebsite = useCallback(async () => {
    /**
     * Laravel Backend
     *
     * await api.post(...)
     */

    console.log("Publish Website");
  }, []);

  const saveDraft = useCallback(async () => {
    /**
     * Laravel Backend
     */

    console.log("Save Draft");
  }, []);

  return useMemo(
    () => ({
      website,

      updateWebsite,

      updateSection,

      resetWebsite,

      saveDraft,

      publishWebsite,
    }),
    [
      website,

      updateWebsite,

      updateSection,

      resetWebsite,

      saveDraft,

      publishWebsite,
    ]
  );
}