"use client";

import { useEffect, useState } from "react";

export default function useOrbit() {
  const [radius, setRadius] = useState(235);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 480) {
        setRadius(110);
      } else if (w < 640) {
        setRadius(130);
      } else if (w < 768) {
        setRadius(155);
      } else if (w < 1024) {
        setRadius(180);
      } else if (w < 1280) {
        setRadius(205);
      } else if (w < 1536) {
        setRadius(225);
      } else {
        setRadius(245);
      }
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return radius;
}